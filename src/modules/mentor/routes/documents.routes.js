import { Router } from "express";

import documentsController from "../controllers/documents.controller.js";

import validate from "../../../middleware/validate.middleware.js";

import {
  getDocumentsSchema,
  getDocumentsDashboardSchema,
  getDocumentByIdSchema,
} from "../validators/documents.validation.js";

const router = Router();

// ==========================================================
// GET DOCUMENT DASHBOARD
// ==========================================================

router.get(
  "/:studentId/documents/dashboard",
  validate(getDocumentsDashboardSchema),
  documentsController.getDashboard
);

// ==========================================================
// GET SINGLE DOCUMENT
// ==========================================================

router.get(
  "/:studentId/documents/:documentId",
  validate(getDocumentByIdSchema),
  documentsController.getDocumentById
);

// ==========================================================
// GET ALL DOCUMENTS ACROSS ALL CATEGORIES
// ==========================================================

router.get(
  "/:studentId/documents",
  validate(getDocumentsSchema),
  documentsController.getDocuments
);

export default router;