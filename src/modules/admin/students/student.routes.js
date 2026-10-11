import express from "express";
import multer from "multer";

import StudentController from "./student.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

// ==========================================================
// MULTER CONFIGURATION
// ==========================================================
//
// Files are kept in memory because we immediately pass the
// PDF buffer to pdf-parse. Nothing is permanently stored on
// the server.
// ==========================================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    // Maximum PDF size: 10 MB
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      const error = new Error("Only PDF files are allowed");

      error.statusCode = 400;

      return cb(error);
    }

    cb(null, true);
  },
});

// ==========================================================
// IMPORT STUDENTS
// ==========================================================
//
// POST
// /api/admin/students/import
//
// Multipart form-data:
//
// file          → PDF
// departmentId  → Department UUID
//
// Only ADMIN users are allowed.
// ==========================================================

router.post(
  "/import",

  authenticate,

  authorize("ADMIN"),

  upload.single("file"),

  StudentController.importStudents,
);

export default router;
