import AdminService from "../services/admin.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class AdminController {
  /**
   * Create a new Mentor
   * POST /api/admin/mentors
   */
  createMentor = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const mentor = await AdminService.createMentor({
      name,
      password,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Mentor created successfully",
        mentor
      )
    );
  });
}

export default new AdminController();