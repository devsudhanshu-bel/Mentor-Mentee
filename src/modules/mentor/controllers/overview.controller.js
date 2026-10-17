import asyncHandler from "../../../utils/asyncHandler.js";
import OverviewService from "../services/overview.service.js";

const getStudentOverview = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  // The authentication middleware should populate req.user.
  const userAccountId = req.user?.id;

  if (!userAccountId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const data = await OverviewService.getStudentOverview(
    userAccountId,
    studentId,
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