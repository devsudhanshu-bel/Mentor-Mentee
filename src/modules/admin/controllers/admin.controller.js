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
    const { name, password } = req.body;

    const mentor = await AdminService.createMentor({
      name,
      password,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Mentor created successfully", mentor));
  });
}

export default new AdminController();
