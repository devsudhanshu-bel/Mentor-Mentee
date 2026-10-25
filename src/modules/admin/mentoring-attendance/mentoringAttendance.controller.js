import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import AdminMentoringAttendanceService from "./mentoringAttendance.service.js";

class AdminMentoringAttendanceController {
  getStudentSummary = asyncHandler(async (req, res) => {
    const data = await AdminMentoringAttendanceService.getStudentSummary(req.params.studentId);
    return res.status(200).json(
      new ApiResponse(200, "Student mentoring attendance retrieved successfully", data),
    );
  });
}

export default new AdminMentoringAttendanceController();
