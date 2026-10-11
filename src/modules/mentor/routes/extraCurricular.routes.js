
import { Router } from "express";

import extraCurricularController from "../controllers/extraCurricular.controller.js";

import validate from "../../../middleware/validate.middleware.js";

import {
  getExtraCurricularDocumentsSchema,
  getExtraCurricularDashboardSchema,
  getExtraCurricularDocumentSchema,
  reviewExtraCurricularSchema,
} from "../validators/extraCurricular.validation.js";

const router = Router();

// ==========================================================
// GET EXTRA CURRICULAR DASHBOARD
// ==========================================================

router.get(
  "/:studentId/extra-curricular/dashboard",
  validate(getExtraCurricularDashboardSchema),
  extraCurricularController.getDashboard
);

// ==========================================================
// REVIEW EXTRA CURRICULAR DOCUMENT
// ==========================================================

router.patch(
  "/:studentId/extra-curricular/:documentId/review",
  validate(reviewExtraCurricularSchema),
  extraCurricularController.reviewDocument
);

// ==========================================================
// GET SINGLE EXTRA CURRICULAR DOCUMENT
// ==========================================================

router.get(
  "/:studentId/extra-curricular/:documentId",
  validate(getExtraCurricularDocumentSchema),
  extraCurricularController.getDocumentById
);

// ==========================================================
// GET ALL EXTRA CURRICULAR DOCUMENTS
// ==========================================================

router.get(
  "/:studentId/extra-curricular",
  validate(getExtraCurricularDocumentsSchema),
  extraCurricularController.getDocuments
);

export default router;
