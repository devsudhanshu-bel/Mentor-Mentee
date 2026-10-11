import { createRequire } from "module";

import StudentService from "./student.service.js";

import asyncHandler from "../../../utils/asyncHandler.js";
import ApiError from "../../../utils/ApiError.js";

// ==========================================================
// PDF-PARSE
// ==========================================================

const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

// ==========================================================
// STUDENT CONTROLLER
// ==========================================================

class StudentController {
  // ========================================================
  // IMPORT STUDENTS FROM PDF
  // ========================================================

  importStudents = asyncHandler(async (req, res) => {
    // ======================================================
    // FILE CHECK
    // ======================================================

    if (!req.file) {
      throw new ApiError(400, "Student PDF file is required");
    }

    // ======================================================
    // PDF VALIDATION
    // ======================================================

    const isPdf =
      req.file.mimetype === "application/pdf" ||
      req.file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      throw new ApiError(400, "Only PDF files are allowed");
    }

    // ======================================================
    // REQUEST DATA
    // ======================================================
    //
    // IMPORTANT:
    // The previous code had:
    //
    // const { departmentId, termId }
    //
    // That typo caused:
    //
    // "termId is required"
    //
    // even though the frontend had a term selected.
    // ======================================================

    const { departmentId, termId } = req.body;

    if (!departmentId) {
      throw new ApiError(400, "Department is required");
    }

    if (!termId) {
      throw new ApiError(400, "Academic term is required");
    }

    // ======================================================
    // PARSE PDF
    // ======================================================

    let parsedPdf;

    try {
      parsedPdf = await pdfParse(req.file.buffer);
    } catch (error) {
      console.error("❌ PDF parsing error:", error);

      throw new ApiError(
        400,
        "Unable to read the uploaded PDF. Please ensure it is a valid text-based PDF.",
      );
    }

    if (!parsedPdf || !parsedPdf.text || !parsedPdf.text.trim()) {
      throw new ApiError(
        400,
        "The uploaded PDF does not contain readable text",
      );
    }

    // ======================================================
    // IMPORT STUDENTS
    // ======================================================

    const result = await StudentService.importStudentsFromPdf({
      pdfText: parsedPdf.text,

      departmentId,

      termId,
    });

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(201).json({
      success: true,

      message: `${result.importedCount} student(s) imported successfully`,

      data: result,
    });
  });
}

// ==========================================================
// EXPORT
// ==========================================================

export default new StudentController();
