import PersonalService from "../services/personal.service.js";

import ApiResponse from "../../../../../utils/ApiResponse.js";

import asyncHandler from "../../../../../utils/asyncHandler.js";

class PersonalController {
  /**
   * Create Personal Profile
   */
  create = asyncHandler(async (req, res) => {
    const profile = await PersonalService.create(
      req.user.id,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Personal profile created successfully",
        profile
      )
    );
  });

  /**
   * Get Personal Profile
   */
  get = asyncHandler(async (req, res) => {
    const profile = await PersonalService.get(
      req.user.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        profile
          ? "Personal profile fetched successfully"
          : "Personal profile not found",
        profile
      )
    );
  });

  /**
   * Update Personal Profile
   */
  update = asyncHandler(async (req, res) => {
    const profile = await PersonalService.update(
      req.user.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Personal profile updated successfully",
        profile
      )
    );
  });
}

export default new PersonalController();