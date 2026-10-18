
import AdminProfileService from "../services/profile.service.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class AdminProfileController {
  /*
  |--------------------------------------------------------------------------
  | GET ADMIN PROFILE
  |--------------------------------------------------------------------------
  | GET /api/admin/profile
  */

  getProfile = asyncHandler(async (req, res) => {
    const result = await AdminProfileService.getProfile(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin profile fetched successfully.",
        {
          profileExists: result.profileExists,
          profile: result.profile,
        },
      ),
    );
  });

  /*
  |--------------------------------------------------------------------------
  | CREATE ADMIN PROFILE
  |--------------------------------------------------------------------------
  | POST /api/admin/profile
  */

  createProfile = asyncHandler(async (req, res) => {
    const result = await AdminProfileService.createProfile(
      req.user.id,
      req.body,
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Admin profile created successfully.",
        {
          profileExists: result.profileExists,
          profile: result.profile,
        },
      ),
    );
  });

  /*
  |--------------------------------------------------------------------------
  | UPDATE ADMIN PROFILE
  |--------------------------------------------------------------------------
  | PUT /api/admin/profile
  */

  updateProfile = asyncHandler(async (req, res) => {
    const result = await AdminProfileService.updateProfile(
      req.user.id,
      req.body,
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin profile updated successfully.",
        {
          profileExists: result.profileExists,
          profile: result.profile,
        },
      ),
    );
  });
}

export default new AdminProfileController();
