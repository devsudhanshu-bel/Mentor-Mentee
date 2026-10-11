
import { Router } from "express";

import cocurricularController from "../controllers/cocurricular.controller.js";

import validate from "../../../middleware/validate.middleware.js";

import {
  getCoCurricularDocumentsSchema,
  getCoCurricularDashboardSchema,
  getCoCurricularDocumentSchema,
  reviewCoCurricularSchema,
} from "../validators/cocurricular.validation.js";

const router = Router();

// ==========================================================
// GET CO-CURRICULAR DASHBOARD
// ==========================================================

router.get(
  "/:studentId/cocurricular/dashboard",
  validate(getCoCurricularDashboardSchema),
  cocurricularController.getDashboard
);

// ==========================================================
// REVIEW CO-CURRICULAR DOCUMENT
// ==========================================================

router.patch(
  "/:studentId/cocurricular/:documentId/review",
  validate(reviewCoCurricularSchema),
  cocurricularController.reviewDocument
);

// ==========================================================
// GET SINGLE CO-CURRICULAR DOCUMENT
// ==========================================================

router.get(
  "/:studentId/cocurricular/:documentId",
  validate(getCoCurricularDocumentSchema),
  cocurricularController.getDocumentById
);

// ==========================================================
// GET ALL CO-CURRICULAR DOCUMENTS
// ==========================================================

router.get(
  "/:studentId/cocurricular",
  validate(getCoCurricularDocumentsSchema),
  cocurricularController.getDocuments
);

export default router;
