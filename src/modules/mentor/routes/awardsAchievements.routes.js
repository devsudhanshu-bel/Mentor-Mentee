
import { Router } from "express";

import awardsAchievementsController from "../controllers/awardsAchievements.controller.js";

import validate from "../../../middleware/validate.middleware.js";

import {
  getAwardsAchievementsDocumentsSchema,
  getAwardsAchievementsDashboardSchema,
  getAwardsAchievementsDocumentSchema,
  reviewAwardsAchievementsSchema,
} from "../validators/awardsAchievements.validation.js";

const router = Router();

// ==========================================================
// GET AWARDS & ACHIEVEMENTS DASHBOARD
// ==========================================================

router.get(
  "/:studentId/awards-achievements/dashboard",
  validate(getAwardsAchievementsDashboardSchema),
  awardsAchievementsController.getDashboard
);

// ==========================================================
// REVIEW AWARD OR ACHIEVEMENT
// ==========================================================

router.patch(
  "/:studentId/awards-achievements/:documentId/review",
  validate(reviewAwardsAchievementsSchema),
  awardsAchievementsController.reviewDocument
);

// ==========================================================
// GET SINGLE AWARD OR ACHIEVEMENT
// ==========================================================

router.get(
  "/:studentId/awards-achievements/:documentId",
  validate(getAwardsAchievementsDocumentSchema),
  awardsAchievementsController.getDocumentById
);

// ==========================================================
// GET ALL AWARDS & ACHIEVEMENTS
// ==========================================================

router.get(
  "/:studentId/awards-achievements",
  validate(getAwardsAchievementsDocumentsSchema),
  awardsAchievementsController.getDocuments
);

export default router;
