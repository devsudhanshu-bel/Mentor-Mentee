import { randomUUID } from "node:crypto";
import prisma from "../../config/prisma.hod.js";

const DEFAULT_PAGE_SIZE = 30;
const MAX_PAGE_SIZE = 100;

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getUserId = (userId) => {
  if (!userId || typeof userId !== "string") {
    throw createError("Authenticated user ID is required.", 401);
  }

  return userId;
};

const getPagination = (page, limit) => {
  const parsedPage = Math.max(1, Number.parseInt(page, 10) || 1);
  const parsedLimit = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Number.parseInt(limit, 10) || DEFAULT_PAGE_SIZE)
  );

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit,
  };
};

/**
 * Check whether any assignment exists between the mentor
 * and mentee, regardless of its status.
 *
 * Conversations store user-account IDs.
 * Mentor assignments store teacher/student profile IDs.
 */
const hasAnyAssignment = async (conversation, tx = prisma) => {
  const [mentor, mentee] = await Promise.all([
    tx.teachers.findUnique({
      where: {
        userAccountId: conversation.mentorUserAccountId,
      },
      select: { id: true },
    }),

    tx.students.findUnique({
      where: {
        userAccountId: conversation.menteeUserAccountId,
      },
      select: { id: true },
    }),
  ]);

  if (!mentor || !mentee) {
    return false;
  }

  const assignment = await tx.mentor_assignments.findFirst({
    where: {
      teacherId: mentor.id,
      studentId: mentee.id,
    },
    select: { id: true },
  });

  return Boolean(assignment);
};

/**
 * Validate conversation existence, participant access,
 * and assignment existence regardless of status.
 */
const getConversationForUser = async (
  conversationId,
  userId,
  tx = prisma
) => {
  const conversation = await tx.conversations.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) {
    throw createError("Conversation not found.", 404);
  }

  const isParticipant =
    conversation.mentorUserAccountId === userId ||
    conversation.menteeUserAccountId === userId;

  if (!isParticipant) {
    throw createError(
      "You do not have access to this conversation.",
      403
    );
  }

  const assignmentExists = await hasAnyAssignment(
    conversation,
    tx
  );

  if (!assignmentExists) {
    throw createError(
      "No assignment exists between this mentor and mentee.",
      403
    );
  }

  return conversation;
};

/**
 * Fetch or create conversations for ALL mentor assignments,
 * regardless of assignment status.
 *
 * Returns participant details, latest message, and unread count.
 */
export const getMyConversations = async (authenticatedUserId) => {
  const userId = getUserId(authenticatedUserId);

  const [teacher, student] = await Promise.all([
    prisma.teachers.findUnique({
      where: { userAccountId: userId },
      select: { id: true },
    }),

    prisma.students.findUnique({
      where: { userAccountId: userId },
      select: { id: true },
    }),
  ]);

  if (!teacher && !student) {
    return [];
  }

  if (teacher && student) {
    throw createError(
      "This account is linked to both a teacher and student profile.",
      403
    );
  }

  let assignments = [];

  // Mentor: fetch every assigned student, without a status filter.
  if (teacher) {
    assignments = await prisma.mentor_assignments.findMany({
      where: {
        teacherId: teacher.id,
      },
      include: {
        students: true,
      },
    });
  } else {
    // Mentee: fetch their mentor regardless of assignment status.
    assignments = await prisma.mentor_assignments.findMany({
      where: {
        studentId: student.id,
      },
      include: {
        teachers: true,
      },
    });
  }

  const results = [];

  for (const assignment of assignments) {
    const assignedTeacher = teacher
      ? null
      : assignment.teachers;

    const assignedStudent = student
      ? null
      : assignment.students;

    const [teacherProfile, studentProfile] = await Promise.all([
      teacher
        ? prisma.teachers.findUnique({
            where: { id: teacher.id },
          })
        : Promise.resolve(assignedTeacher),

      student
        ? prisma.students.findUnique({
            where: { id: student.id },
          })
        : Promise.resolve(assignedStudent),
    ]);

    const mentorUserAccountId =
      teacherProfile?.userAccountId;

    const menteeUserAccountId =
      studentProfile?.userAccountId;

    if (!mentorUserAccountId || !menteeUserAccountId) {
      continue;
    }

    const conversation = await prisma.conversations.upsert({
      where: {
        mentorUserAccountId_menteeUserAccountId: {
          mentorUserAccountId,
          menteeUserAccountId,
        },
      },

      update: {},

      create: {
        id: randomUUID(),
        mentorUserAccountId,
        menteeUserAccountId,
      },
    });

    const recipientLastReadAt = teacher
      ? conversation.mentorLastReadAt
      : conversation.menteeLastReadAt;

    const [latestMessage, unreadCount] = await Promise.all([
      prisma.messages.findFirst({
        where: {
          conversationId: conversation.id,
          deletedAt: null,
        },
        orderBy: [
          { createdAt: "desc" },
          { id: "desc" },
        ],
      }),

      prisma.messages.count({
        where: {
          conversationId: conversation.id,
          deletedAt: null,
          senderId: teacher
            ? menteeUserAccountId
            : mentorUserAccountId,
          createdAt: {
            gt: recipientLastReadAt ?? new Date(0),
          },
        },
      }),
    ]);

    const studentName = [
      studentProfile?.firstName,
      studentProfile?.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const mentorName = [
      teacherProfile?.firstName,
      teacherProfile?.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    results.push({
      ...conversation,

      mentee: {
        ...(studentProfile || {}),
        name:
          studentProfile?.fullName ||
          studentProfile?.name ||
          studentName ||
          "Mentee",
        profileImage:
          studentProfile?.profileImage ||
          studentProfile?.profilePicture ||
          studentProfile?.avatar ||
          null,
      },

      mentor: {
        ...(teacherProfile || {}),
        name:
          teacherProfile?.fullName ||
          teacherProfile?.name ||
          mentorName ||
          "Mentor",
      },

      lastMessage: latestMessage,
      unreadCount,
    });
  }

  // Avoid duplicate conversations when assignments contain
  // multiple rows for the same mentor/mentee pair.
  const uniqueConversations = Array.from(
    new Map(results.map((item) => [item.id, item])).values()
  );

  return uniqueConversations.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  );
};

/**
 * Get paginated messages in a conversation.
 */
export const getConversationMessages = async (
  authenticatedUserId,
  conversationId,
  page = 1,
  limit = DEFAULT_PAGE_SIZE
) => {
  const userId = getUserId(authenticatedUserId);

  if (!conversationId) {
    throw createError("Conversation ID is required.");
  }

  await getConversationForUser(conversationId, userId);

  const pagination = getPagination(page, limit);

  const [messages, total] = await prisma.$transaction([
    prisma.messages.findMany({
      where: {
        conversationId,
        deletedAt: null,
      },
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" },
      ],
      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.messages.count({
      where: {
        conversationId,
        deletedAt: null,
      },
    }),
  ]);

  return {
    items: messages.reverse(),

    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    },
  };
};

/**
 * Send a message and emit it after the transaction commits.
 */
export const sendMessage = async (
  authenticatedUserId,
  conversationId,
  content,
  io = null
) => {
  const userId = getUserId(authenticatedUserId);

  if (!conversationId) {
    throw createError("Conversation ID is required.");
  }

  if (typeof content !== "string" || !content.trim()) {
    throw createError("Message content cannot be empty.");
  }

  const trimmedContent = content.trim();

  if (trimmedContent.length > 10000) {
    throw createError("Message cannot exceed 10,000 characters.");
  }

  const { message, conversation } = await prisma.$transaction(
    async (tx) => {
      const conversation = await getConversationForUser(
        conversationId,
        userId,
        tx
      );

      const message = await tx.messages.create({
        data: {
          id: randomUUID(),
          conversationId,
          senderId: userId,
          content: trimmedContent,
        },
      });

      await tx.conversations.update({
        where: { id: conversationId },
        data: { updatedAt: message.createdAt },
      });

      return {
        message,
        conversation,
      };
    }
  );

  // Broadcast only after the database transaction succeeds.
  // The socket room must be joined by authorized participants.
  if (io) {
    io.to(`conversation:${conversation.id}`).emit(
      "chat:message",
      message
    );
  }

  return message;
};

/**
 * Mark the authenticated participant's conversation as read.
 */
export const markConversationRead = async (
  authenticatedUserId,
  conversationId
) => {
  const userId = getUserId(authenticatedUserId);

  if (!conversationId) {
    throw createError("Conversation ID is required.");
  }

  return prisma.$transaction(async (tx) => {
    const conversation = await getConversationForUser(
      conversationId,
      userId,
      tx
    );

    const isMentor =
      conversation.mentorUserAccountId === userId;

    return tx.conversations.update({
      where: { id: conversationId },

      data: isMentor
        ? { mentorLastReadAt: new Date() }
        : { menteeLastReadAt: new Date() },
    });
  });
};