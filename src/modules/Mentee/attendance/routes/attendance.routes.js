import express from "express";
import multer from "multer";

import {
  getAttendance,
  saveAttendance,
  importAttendancePdf,
  clearSubjects,
} from "../controllers/attendance.controller.js";

const router = express.Router();

/* ==========================================================
   PDF UPLOAD CONFIGURATION
========================================================== */

const uploadPdf = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return callback(new Error("Please upload a PDF file."));
    }

    callback(null, true);
  },
});

/* ==========================================================
   ATTENDANCE ROUTES

   Authentication and student authorization are already
   applied by the parent /api/mentee router.
========================================================== */

/* GET SEMESTER ATTENDANCE
   GET /api/mentee/attendance/semester/:semester
*/
router.get("/semester/:semester", getAttendance);

/* SAVE SEMESTER ATTENDANCE
   POST /api/mentee/attendance/semester/:semester
*/
router.post("/semester/:semester", saveAttendance);

/* CLEAR ALL SUBJECTS FOR THE SELECTED SEMESTER
   DELETE /api/mentee/attendance/semester/:semester/subjects
*/
router.delete("/semester/:semester/subjects", clearSubjects);

/* IMPORT ATTENDANCE PDF
   POST /api/mentee/attendance/import-pdf/:semester
   Multipart field: attendancePdf
*/
router.post(
  "/import-pdf/:semester",
  uploadPdf.single("attendancePdf"),
  importAttendancePdf,
);

export default router;
