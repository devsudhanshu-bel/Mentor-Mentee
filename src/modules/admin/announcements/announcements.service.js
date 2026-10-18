
import { randomUUID } from "node:crypto";

import prisma from "../../../config/prisma.hod.js";

const VALID_AUDIENCES = ["MENTORS", "STUDENTS", "ALL"];

const VALID_CATEGORIES = [
  "GENERAL",
  "ACADEMIC",
  "MEETING_EVENT",
  "URGENT_NOTICE",
];

const VALID_PRIORITIES = ["NORMAL", "HIGH", "URGENT"];

const VALID_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"];

class AnnouncementsService {
  async getAdminAccount(userId) {
    if (!userId) {
      const error = new Error("Authenticated user ID is required.");
      error.statusCode = 401;
      throw error;
    }

    const admin = await prisma.user_accounts.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        isActive: true,
      },
    });

    if (
      !admin ||
      !admin.isActive ||
      !["ADMIN", "SYSTEM_ADMIN"].includes(admin.role)
    ) {
      const error = new Error("Administrator access is required.");
      error.statusCode = 403;
      throw error;
    }

    return admin;
  }

  validateAnnouncement(data, partial = false) {
    const {
      title,
      message,
      audience,
      category,
      priority,
      status,
      expiresAt,
    } = data;

    if (!partial || title !== undefined) {
      if (
        typeof title !== "string" ||
        !title.trim() ||
        title.trim().length > 150
      ) {
        const error = new Error(
          "Title is required and must not exceed 150 characters."
        );
        error.statusCode = 400;
        throw error;
      }
    }

    if (!partial || message !== undefined) {
      if (
        typeof message !== "string" ||
        !message.trim() ||
        message.trim().length > 10000
      ) {
        const error = new Error(
          "Message is required and must not exceed 10000 characters."
        );
        error.statusCode = 400;
        throw error;
      }
    }

    if (
      audience !== undefined &&
      !VALID_AUDIENCES.includes(audience)
    ) {
      const error = new Error("Invalid announcement audience.");
      error.statusCode = 400;
      throw error;
    }

    if (
      category !== undefined &&
      !VALID_CATEGORIES.includes(category)
    ) {
      const error = new Error("Invalid announcement category.");
      error.statusCode = 400;
      throw error;
    }

    if (
      priority !== undefined &&
      !VALID_PRIORITIES.includes(priority)
    ) {
      const error = new Error("Invalid announcement priority.");
      error.statusCode = 400;
      throw error;
    }

    if (
      status !== undefined &&
      !VALID_STATUSES.includes(status)
    ) {
      const error = new Error("Invalid announcement status.");
      error.statusCode = 400;
      throw error;
    }

    if (expiresAt !== undefined && expiresAt !== null && expiresAt !== "") {
      const expiry = new Date(expiresAt);

      if (Number.isNaN(expiry.getTime())) {
        const error = new Error("Invalid expiry date.");
        error.statusCode = 400;
        throw error;
      }

      if (expiry <= new Date()) {
        const error = new Error("Expiry date must be in the future.");
        error.statusCode = 400;
        throw error;
      }
    }
  }

  async getRecipientIds(tx, audience) {
    const recipients = [];

    if (audience === "MENTORS" || audience === "ALL") {
      const mentors = await tx.user_accounts.findMany({
        where: {
          role: "MENTOR",
          isActive: true,
          teachers: {
            is: {
              isActive: true,
            },
          },
        },
        select: {
          id: true,
        },
      });

      recipients.push(...mentors.map((user) => user.id));
    }

    if (audience === "STUDENTS" || audience === "ALL") {
      const students = await tx.user_accounts.findMany({
        where: {
          role: "STUDENT",
          isActive: true,
          students: {
            is: {
              status: "ACTIVE",
            },
          },
        },
        select: {
          id: true,
        },
      });

      recipients.push(...students.map((user) => user.id));
    }

    return [...new Set(recipients)];
  }

  async createAnnouncement(userId, payload) {
    const admin = await this.getAdminAccount(userId);

    this.validateAnnouncement(payload);

    const {
      title,
      message,
      audience = "ALL",
      category = "GENERAL",
      priority = "NORMAL",
      status = "PUBLISHED",
      expiresAt,
    } = payload;

    const published = status === "PUBLISHED";
    const expiryDate =
      expiresAt && expiresAt !== ""
        ? new Date(expiresAt)
        : null;

    const announcement = await prisma.$transaction(async (tx) => {
      const created = await tx.announcements.create({
        data: {
          id: randomUUID(),
          title: title.trim(),
          message: message.trim(),
          audience,
          category,
          priority,
          status,
          publishedById: admin.id,
          publishedAt: published ? new Date() : null,
          expiresAt: expiryDate,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      if (published) {
        const recipientIds = await this.getRecipientIds(tx, audience);

        if (recipientIds.length > 0) {
          await tx.announcement_recipients.createMany({
            data: recipientIds.map((userAccountId) => ({
              id: randomUUID(),
              announcementId: created.id,
              userAccountId,
              deliveredAt: new Date(),
              createdAt: new Date(),
            })),
            skipDuplicates: true,
          });
        }
      }

      return tx.announcements.findUnique({
        where: { id: created.id },
        include: {
          user_accounts: {
            select: {
              id: true,
              username: true,
              admin_profiles: {
                select: {
                  fullName: true,
                },
              },
            },
          },
          _count: {
            select: {
              announcement_recipients: true,
            },
          },
        },
      });
    });

    return announcement;
  }

  async getAnnouncements(userId, query = {}) {
    await this.getAdminAccount(userId);

    const {
      search = "",
      audience,
      status = "PUBLISHED",
      page = "1",
      limit = "20",
    } = query;

    if (audience && !VALID_AUDIENCES.includes(audience)) {
      const error = new Error("Invalid audience filter.");
      error.statusCode = 400;
      throw error;
    }

    if (status && !VALID_STATUSES.includes(status)) {
      const error = new Error("Invalid status filter.");
      error.statusCode = 400;
      throw error;
    }

    const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number.parseInt(limit, 10) || 20)
    );

    const where = {
      ...(status ? { status } : {}),
      ...(audience ? { audience } : {}),
      ...(search.trim()
        ? {
            OR: [
              {
                title: {
                  contains: search.trim(),
                  mode: "insensitive",
                },
              },
              {
                message: {
                  contains: search.trim(),
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    };

    const [items, total] = await prisma.$transaction([
      prisma.announcements.findMany({
        where,
        include: {
          user_accounts: {
            select: {
              id: true,
              username: true,
              admin_profiles: {
                select: {
                  fullName: true,
                },
              },
            },
          },
          _count: {
            select: {
              announcement_recipients: true,
            },
          },
        },
        orderBy: [
          { publishedAt: "desc" },
          { createdAt: "desc" },
        ],
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),

      prisma.announcements.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getAnnouncementById(userId, announcementId) {
    await this.getAdminAccount(userId);

    const announcement = await prisma.announcements.findUnique({
      where: { id: announcementId },
      include: {
        user_accounts: {
          select: {
            id: true,
            username: true,
            admin_profiles: {
              select: {
                fullName: true,
              },
            },
          },
        },
        announcement_recipients: {
          select: {
            id: true,
            userAccountId: true,
            deliveredAt: true,
            readAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            announcement_recipients: true,
          },
        },
      },
    });

    if (!announcement) {
      const error = new Error("Announcement not found.");
      error.statusCode = 404;
      throw error;
    }

    return announcement;
  }

  async archiveAnnouncement(userId, announcementId) {
    await this.getAdminAccount(userId);

    const existing = await prisma.announcements.findUnique({
      where: { id: announcementId },
      select: { id: true, status: true },
    });

    if (!existing) {
      const error = new Error("Announcement not found.");
      error.statusCode = 404;
      throw error;
    }

    return prisma.announcements.update({
      where: { id: announcementId },
      data: {
        status: "ARCHIVED",
        updatedAt: new Date(),
      },
    });
  }

  async markAnnouncementRead(userId, announcementId) {
    const user = await prisma.user_accounts.findUnique({
      where: { id: userId },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      const error = new Error("Active user account not found.");
      error.statusCode = 401;
      throw error;
    }

    const recipient = await prisma.announcement_recipients.findUnique({
      where: {
        announcementId_userAccountId: {
          announcementId,
          userAccountId: userId,
        },
      },
      select: {
        id: true,
        readAt: true,
      },
    });

    if (!recipient) {
      const error = new Error(
        "You are not a recipient of this announcement."
      );
      error.statusCode = 404;
      throw error;
    }

    if (recipient.readAt) {
      return recipient;
    }

    return prisma.announcement_recipients.update({
      where: { id: recipient.id },
      data: {
        readAt: new Date(),
      },
    });
  }
}

export default new AnnouncementsService();
