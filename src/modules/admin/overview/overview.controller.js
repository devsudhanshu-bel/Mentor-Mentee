import asyncHandler from "../../../utils/asyncHandler.js";
import OverviewService from "./overview.service.js";

// ==========================================================
// GET STUDENT OVERVIEW
// GET /api/admin/overview/students/:studentId
// ==========================================================

const getStudentOverview = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const userAccountId = req.user?.id;
  const role = req.user?.role;

  if (!userAccountId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!studentId) {
    return res.status(400).json({
      success: false,
      message: "Student ID is required",
    });
  }

  if (!["ADMIN", "SYSTEM_ADMIN"].includes(role)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to view this student overview",
    });
  }

  // Pass the authenticated role to the service.
  const data = await OverviewService.getStudentOverview(
    userAccountId,
    studentId,
    role,
  );

  return res.status(200).json({
    success: true,
    message: "Student overview retrieved successfully",
    data,
  });
});

export default {
  getStudentOverview,
};