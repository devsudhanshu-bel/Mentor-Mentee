import { Router } from "express";

import documentController from "../controllers/document.controller.js";

import upload from "../../../../middleware/upload.middleware.js";
import validate from "../../../../middleware/validate.middleware.js";

import {
  uploadDocumentSchema,
  updateDocumentSchema,
  getDocumentSchema,
  deleteDocumentSchema,
} from "../validations/document.validation.js";

const router = Router();

router.post(
  "/",
  upload.single("document"),
  validate(uploadDocumentSchema),
  documentController.uploadDocument
);

router.get(
  "/dashboard",
  documentController.getDashboard
);

router.get(
  "/:documentId",
  validate(getDocumentSchema),
  documentController.getDocumentById
);

router.put(
  "/:documentId",
  upload.single("document"),
  validate(updateDocumentSchema),
  documentController.updateDocument
);

router.delete(
  "/:documentId",
  validate(deleteDocumentSchema),
  documentController.deleteDocument
);

export default router;