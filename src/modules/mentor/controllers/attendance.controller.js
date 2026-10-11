
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import mentorAttendanceService from "../services/attendance.service.js";

class MentorAttendanceController {
  getAttendance = asyncHandler(async (req, res) => {
    const mentorUserId = req.user?.id;
    const { studentId } = req.params;
    const semester = Number(req.query.semester);

    // Validate authenticated mentor
    if (!mentorUserId) {
      return res.status(401).json(
        new ApiResponse(401, "Authentication required", null),
      );
    }

    // Validate student ID
    if (!studentId) {
      return res.status(400).json(
        new ApiResponse(400, "Student ID is required", null),
      );
    }

    // Validate semester
    if (
      !Number.isInteger(semester) ||
      semester < 1 ||
      semester > 8
    ) {
      return res.status(400).json(
        new ApiResponse(
          400,
          "Semester must be between 1 and 8",
          null,
        ),
      );
    }

    // Fetch attendance through the service
    const data =
      await mentorAttendanceService.getStudentSemesterAttendance({
        mentorUserId,
        studentId,
        semester,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Student attendance fetched successfully",
        data,
      ),
    );
  });
}

export default new MentorAttendanceController();
