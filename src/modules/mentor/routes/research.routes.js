import { Router } from "express";

import researchController from "../controllers/research.controller.js";

import validate from "../../../middleware/validate.middleware.js";

import {
  getResearchDocumentsSchema,
  getResearchDashboardSchema,
  getResearchDocumentSchema,
  reviewResearchSchema,
} from "../validators/research.validation.js";

const router = Router();

// ==========================================================
// GET RESEARCH DASHBOARD
// GET /api/mentor/students/:studentId/research/dashboard
// ==========================================================

router.get(
  "/:studentId/research/dashboard",
  validate(getResearchDashboardSchema),
  researchController.getDashboard
);

// ==========================================================
// REVIEW RESEARCH DOCUMENT
// PATCH /api/mentor/students/:studentId/research/:documentId/review
// ==========================================================

router.patch(
  "/:studentId/research/:documentId/review",
  validate(reviewResearchSchema),
  researchController.reviewDocument
);

// ==========================================================
// GET SINGLE RESEARCH DOCUMENT
// GET /api/mentor/students/:studentId/research/:documentId
// ==========================================================

router.get(
  "/:studentId/research/:documentId",
  validate(getResearchDocumentSchema),
  researchController.getDocumentById
);

// ==========================================================
// GET ALL RESEARCH DOCUMENTS
// GET /api/mentor/students/:studentId/research
// ==========================================================

router.get(
  "/:studentId/research",
  validate(getResearchDocumentsSchema),
  researchController.getDocuments
);

export default router;