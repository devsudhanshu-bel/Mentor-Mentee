import AdminProfileService from "../services/profile.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class AdminProfileController {
  /**
   * GET /api/admin/profile
   */
  getProfile = asyncHandler(async (req, res) => {
    const profile = await AdminProfileService.getProfile(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile fetched successfully",
        profile
      )
    );
  });

  /**
   * POST /api/admin/profile
   */
  createProfile = asyncHandler(async (req, res) => {
    const profile = await AdminProfileService.createProfile(
      req.user.id,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Profile created successfully",
        profile
      )
    );
  });

  /**
   * PUT /api/admin/profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const profile = await AdminProfileService.updateProfile(
      req.user.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile updated successfully",
        profile
      )
    );
  });
}

export default new AdminProfileController();