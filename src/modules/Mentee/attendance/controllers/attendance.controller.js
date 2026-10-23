import {
  getSemesterAttendance,
  saveSemesterAttendance,
  importAttendancePdfForStudent,
  clearSemesterSubjects,
} from "../services/attendance.service.js";

/* ==========================================================
   GET SEMESTER ATTENDANCE
========================================================== */

export const getAttendance = async (req, res, next) => {
  try {
    const semester = Number(req.params.semester);
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error("Authenticated user not found.");
      error.statusCode = 401;
      throw error;
    }

    const data = await getSemesterAttendance(userId, semester);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================================
   SAVE SEMESTER ATTENDANCE
========================================================== */

export const saveAttendance = async (req, res, next) => {
  try {
    const semester = Number(req.params.semester);
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error("Authenticated user not found.");
      error.statusCode = 401;
      throw error;
    }

    const { subjects } = req.body ?? {};

    if (!Array.isArray(subjects)) {
      const error = new Error("Subjects must be provided as an array.");
      error.statusCode = 400;
      throw error;
    }

    const data = await saveSemesterAttendance(userId, semester, subjects);

    return res.status(200).json({
      success: true,
      message: "Attendance saved successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================================
   IMPORT ATTENDANCE PDF
   The server derives the student from the authenticated user.
========================================================== */

export const importAttendancePdf = async (req, res, next) => {
  try {
    const semester = Number(req.params.semester);
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error("Authenticated user not found.");
      error.statusCode = 401;
      throw error;
    }

    if (!req.file?.buffer) {
      const error = new Error("Please select an attendance PDF to upload.");
      error.statusCode = 400;
      throw error;
    }

    const data = await importAttendancePdfForStudent(
      userId,
      semester,
      req.file.buffer,
    );

    return res.status(200).json({
      success: true,
      message: "Attendance PDF verified and parsed successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================================
   CLEAR SUBJECTS FOR A SELECTED SEMESTER
   Only the authenticated student's selected semester is cleared.
========================================================== */

export const clearSubjects = async (req, res, next) => {
  try {
    const semester = Number(req.params.semester);
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error("Authenticated user not found.");
      error.statusCode = 401;
      throw error;
    }

    if (!Number.isInteger(semester) || semester < 1 || semester > 8) {
      const error = new Error("Semester must be a number between 1 and 8.");
      error.statusCode = 400;
      throw error;
    }

    const data = await clearSemesterSubjects(userId, semester);

    return res.status(200).json({
      success: true,
      message: `Subjects for Semester ${semester} have been cleared successfully.`,
      data,
    });
  } catch (error) {
    next(error);
  }
};
