import prisma from "../../../config/prisma.hod.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getUserId = (req) =>
  req.user?.id || req.user?.userId || req.user?.userAccountId;

class MentorAnnouncementsController {
  async getForMentor(req, res) {
    try {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authenticated mentor account is required.",
          data: null,
        });
      }

      // Parent mentor router already applies authenticate + authorize("MENTOR").
      // Confirm account is active before returning announcements.
      const account = await prisma.user_accounts.findUnique({
        where: { id: userId },
        select: { id: true, role: true, isActive: true },
      });

      if (!account || !account.isActive || account.role !== "MENTOR") {
        return res.status(403).json({
          success: false,
          message: "Mentor access is required.",
          data: null,
        });
      }

      const now = new Date();
      const items = await prisma.announcements.findMany({
        where: {
          status: "PUBLISHED",
          audience: { in: ["MENTORS", "ALL"] },
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
          announcement_recipients: {
            some: { userAccountId: userId },
          },
        },
        select: {
          id: true,
          title: true,
          message: true,
          audience: true,
          category: true,
          priority: true,
          publishedAt: true,
          expiresAt: true,
          createdAt: true,
        },
        orderBy: [
          { publishedAt: "desc" },
          { createdAt: "desc" },
        ],
        take: 20,
      });

      return res.status(200).json(
        new ApiResponse(200, "Mentor announcements fetched successfully.", {
          items,
          total: items.length,
        })
      );
    } catch (error) {
      console.error("Failed to fetch mentor announcements:", error);
      return res.status(500).json({
        success: false,
        message: "Unable to fetch announcements.",
        data: null,
      });
    }
  }
}

export default new MentorAnnouncementsController();
