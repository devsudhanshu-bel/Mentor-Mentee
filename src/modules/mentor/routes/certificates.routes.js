import { Router } from "express";

import certificatesController from "../controllers/certificates.controller.js";

import validate from "../../../middleware/validate.middleware.js";

import {
  getCertificatesDocumentsSchema,
  getCertificatesDashboardSchema,
  getCertificateDocumentSchema,
  reviewCertificateSchema,
} from "../validators/certificates.validation.js";

const router = Router();

// ==========================================================
// GET CERTIFICATES DASHBOARD
// ==========================================================

router.get(
  "/:studentId/certificates/dashboard",
  validate(getCertificatesDashboardSchema),
  certificatesController.getDashboard
);

// ==========================================================
// REVIEW CERTIFICATE
// Keep this route before the generic document-ID route.
// ==========================================================

router.patch(
  "/:studentId/certificates/:documentId/review",
  validate(reviewCertificateSchema),
  certificatesController.reviewDocument
);

// ==========================================================
// GET SINGLE CERTIFICATE
// ==========================================================

router.get(
  "/:studentId/certificates/:documentId",
  validate(getCertificateDocumentSchema),
  certificatesController.getDocumentById
);

// ==========================================================
// GET ALL CERTIFICATES
// ==========================================================

router.get(
  "/:studentId/certificates",
  validate(getCertificatesDocumentsSchema),
  certificatesController.getDocuments
);

export default router;