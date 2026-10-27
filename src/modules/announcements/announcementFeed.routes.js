import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import prisma from "../../config/prisma.hod.js";

const router = Router();

router.use(authenticate);
router.use(authorize("STUDENT", "MENTOR"));

// GET /api/announcements — published announcements for the signed-in role.
router.get("/", async (req, res, next) => {
  try {
    const role = req.user?.role;
    const audience = role === "STUDENT" ? ["STUDENTS", "ALL"] : ["MENTORS", "ALL"];
    const now = new Date();

    const items = await prisma.announcements.findMany({
      where: {
        status: "PUBLISHED",
        audience: { in: audience },
        AND: [
          { OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] },
          { OR: [{ publishedAt: null }, { publishedAt: { lte: now } }] },
        ],
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
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 10,
    });

    return res.status(200).json({
      success: true,
      message: "Announcements fetched successfully.",
      data: items,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
