import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import MentoringAttendanceService from "../services/mentoringAttendance.service.js";

class MentoringAttendanceController {
  getStudentSummary = asyncHandler(async (req, res) => {
    const data = await MentoringAttendanceService.getStudentSummary(
      req.user,
      req.params.studentId
    );
    return res.status(200).json(
      new ApiResponse(200, "Student mentoring attendance retrieved successfully", data)
    );
  });

  getForDate = asyncHandler(async (req, res) => {
    const data = await MentoringAttendanceService.getForDate(req.user, req.query.date);
    return res.status(200).json(
      new ApiResponse(200, "Mentoring attendance retrieved successfully", data)
    );
  });

  saveForDate = asyncHandler(async (req, res) => {
    const data = await MentoringAttendanceService.saveForDate(req.user, req.body ?? {});
    return res.status(200).json(
      new ApiResponse(200, "Mentoring attendance saved successfully", data)
    );
  });
}

export default new MentoringAttendanceController();
