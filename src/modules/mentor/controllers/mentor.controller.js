import MentorService from "../services/mentor.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class MentorController {
  /**
   * GET /api/mentor/profile
   */
  getProfile = asyncHandler(async (req, res) => {
    const profile = await MentorService.getProfile(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile fetched successfully",
        profile
      )
    );
  });

  /**
   * POST /api/mentor/profile
   */
  createProfile = asyncHandler(async (req, res) => {
    const profile = await MentorService.createProfile(
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
   * PUT /api/mentor/profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const profile = await MentorService.updateProfile(
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

export default new MentorController();