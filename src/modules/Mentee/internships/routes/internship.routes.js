
import express from "express";
import { authenticate } from "../../../../middleware/auth.middleware.js";
import { authorize } from "../../../../middleware/role.middleware.js";
import upload from "../../../../middleware/upload.middleware.js";
import InternshipController from "../controllers/internship.controller.js";

const router = express.Router();

// The parent Mentee router already applies these guards.
// Keeping them here also protects this router if mounted independently.
router.use(authenticate);
router.use(authorize("STUDENT"));

// Create and retrieve internships.
router.post("/", InternshipController.createInternship);
router.get("/mine", InternshipController.getMyInternships);
router.get("/:id", InternshipController.getInternshipById);

// Upload or replace a document.
// Form-data field name must be "document".
// Other form-data field: documentType.
router.post(
  "/:id/documents",
  upload.single("document"),
  InternshipController.uploadDocument,
);

// Delete a document before verification submission.
router.delete(
  "/:id/documents/:documentId",
  InternshipController.deleteDocument,
);

// Submit an ongoing internship for completion verification.
router.post(
  "/:id/completion",
  InternshipController.requestCompletion,
);

export default router;
