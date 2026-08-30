import {
  getSemesterAttendance,
  saveSemesterAttendance,
} from "../services/attendance.service.js";

/* ==========================================================
   GET SEMESTER ATTENDANCE
========================================================== */

export const getAttendance = async (req, res, next) => {
  try {
    const semester = Number(req.params.semester);

    const data = await getSemesterAttendance(semester);

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

    const { subjects } = req.body;

    const data = await saveSemesterAttendance(semester, subjects);

    return res.status(200).json({
      success: true,
      message: "Attendance saved successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
