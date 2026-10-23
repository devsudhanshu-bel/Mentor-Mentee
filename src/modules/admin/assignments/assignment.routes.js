import multer from "multer";
import express from "express";

import AssignmentController from "./assignment.controller.js";
import transferRoutes from "./transfer/transfer.routes.js";

const router = express.Router();

const uploadPdf = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    if (isPdf) {
      return cb(null, true);
    }

    cb(new Error("Please upload a PDF file."));
  },
});

// ============================================================
// TRANSFER REQUESTS
// ============================================================

router.use("/transfers", transferRoutes);

// ============================================================
// ASSIGNMENT CONTEXT
// GET /api/admin/assignments/context
// ============================================================

router.get("/context", AssignmentController.getAssignmentContext);

// ============================================================
// BULK ASSIGN FROM PDF
// POST /api/admin/assignments/bulk-pdf
// ============================================================

router.post(
  "/bulk-pdf",
  uploadPdf.single("studentListPdf"),
  AssignmentController.bulkAssignFromPdf,
);

// ============================================================
// CREATE ASSIGNMENTS
// POST /api/admin/assignments
// ============================================================

router.post("/", AssignmentController.assignStudents);

// ============================================================
// GET ALL ACTIVE ASSIGNMENTS
// GET /api/admin/assignments
// ============================================================

router.get("/", AssignmentController.getAllAssignments);

// ============================================================
// REMOVE ASSIGNMENT
// DELETE /api/admin/assignments/:assignmentId
// ============================================================

router.delete("/:assignmentId", AssignmentController.removeAssignment);

export default router;
