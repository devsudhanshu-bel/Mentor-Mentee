import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

import mentorAcademicsService from "../services/academics.service.js";

class MentorAcademicsController {
  /* ========================================================
     GET STUDENT ACADEMIC PROFILE
  ======================================================== */

  getProfile = asyncHandler(async (req, res) => {
    const data = await mentorAcademicsService.getProfile(
      req.user.id,
      req.params.studentId,
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Student academic profile fetched successfully",
        data,
      ),
    );
  });

  /* ========================================================
     GET SELECTED SEMESTER
  ======================================================== */

  getSemester = asyncHandler(async (req, res) => {
    const data = await mentorAcademicsService.getSemester(
      req.user.id,
      req.params.studentId,
      req.params.semesterNumber,
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Student semester details fetched successfully",
        data,
      ),
    );
  });

  /* ========================================================
     GET STUDENT BACKLOGS
  ======================================================== */

  getBacklogs = asyncHandler(async (req, res) => {
    const data = await mentorAcademicsService.getBacklogs(
      req.user.id,
      req.params.studentId,
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Student backlogs fetched successfully",
        data,
      ),
    );
  });
}

export default new MentorAcademicsController();
