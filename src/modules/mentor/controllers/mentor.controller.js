import MentorService from "../services/mentor.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";

import asyncHandler from "../../../utils/asyncHandler.js";

class MentorController {
  /* ==========================================================
     GET PROFILE
  ========================================================== */

  getProfile = asyncHandler(
    async (req, res) => {
      const profile =
        await MentorService.getProfile(
          req.user.id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Profile fetched successfully",
            profile
          )
        );
    }
  );

  /* ==========================================================
     GET OVERVIEW
  ========================================================== */

  getOverview = asyncHandler(
    async (req, res) => {
      const overview =
        await MentorService.getOverview(
          req.user.id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Mentoring overview fetched successfully",
            overview
          )
        );
    }
  );

  /* ==========================================================
     CREATE PROFILE
  ========================================================== */

  createProfile = asyncHandler(
    async (req, res) => {
      const profile =
        await MentorService.createProfile(
          req.user.id,
          req.body
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Profile created successfully",
            profile
          )
        );
    }
  );

  /* ==========================================================
     UPDATE PROFILE
  ========================================================== */

  updateProfile = asyncHandler(
    async (req, res) => {
      const profile =
        await MentorService.updateProfile(
          req.user.id,
          req.body
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Profile updated successfully",
            profile
          )
        );
    }
  );
}

export default new MentorController();