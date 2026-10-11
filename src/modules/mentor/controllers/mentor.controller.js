import MentorService from "../services/mentor.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class MentorController {
  /* ==========================================================
     GET MY MENTOR

     Existing student-facing functionality.
     This MUST be preserved.
  ========================================================== */

  getMyMentor = asyncHandler(async (req, res) => {
    const data = await MentorService.getMyMentor(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data.assigned
            ? "Mentor details fetched successfully"
            : "No mentor is currently assigned",
          data,
        ),
      );
  });

  /* ==========================================================
     GET MENTOR PROFILE
  ========================================================== */

  getProfile = asyncHandler(async (req, res) => {
    const profile = await MentorService.getProfile(req.user.id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Profile fetched successfully", profile));
  });

  /* ==========================================================
     GET MENTORING OVERVIEW
  ========================================================== */

  getOverview = asyncHandler(async (req, res) => {
    const overview = await MentorService.getOverview(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Mentoring overview fetched successfully",
          overview,
        ),
      );
  });

  /* ==========================================================
     CREATE MENTOR PROFILE
  ========================================================== */

  createProfile = asyncHandler(async (req, res) => {
    const profile = await MentorService.createProfile(req.user.id, req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "Profile created successfully", profile));
  });

  /* ==========================================================
     UPDATE MENTOR PROFILE
  ========================================================== */

  updateProfile = asyncHandler(async (req, res) => {
    const profile = await MentorService.updateProfile(req.user.id, req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, "Profile updated successfully", profile));
  });
}

export default new MentorController();
