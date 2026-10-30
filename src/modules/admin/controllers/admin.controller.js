import AdminService from "../services/admin.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class AdminController {
  // ==========================================================
  // GET ALL MENTORS
  // ==========================================================

  getMentors = asyncHandler(async (req, res) => {
    const {
      search = "",
      departmentId = "",
      status = "",
      workload = "",
    } = req.query;

    const result = await AdminService.getMentors({
      search,
      departmentId,
      status,
      workload,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Mentors fetched successfully", result));
  });

  // ==========================================================
  // CREATE MENTOR
  // ==========================================================

  createMentor = asyncHandler(async (req, res) => {
    const mentor = await AdminService.createMentor(req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "Mentor created successfully", mentor));
  });

  // ==========================================================
  // GET MENTOR DETAILS
  // ==========================================================

  getMentorDetails = asyncHandler(async (req, res) => {
    const { mentorId } = req.params;

    const result = await AdminService.getMentorDetails(mentorId);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Mentor details fetched successfully", result),
      );
  });
  // GET /api/admin/students/directory
  getStudentDirectory = asyncHandler(async (req, res) => {
    const { search = "", semester = "", sort = "name-asc", mentorId = "" } = req.query;
    const result = await AdminService.getStudentDirectory({ search, semester, sort, mentorId });
    return res.status(200).json(new ApiResponse(200, "Student directory fetched successfully", result));
  });
}

export default new AdminController();
