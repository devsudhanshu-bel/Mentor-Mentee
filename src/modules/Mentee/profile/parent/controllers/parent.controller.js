import ParentService from "../services/parent.service.js";

import ApiResponse from "../../../../../utils/ApiResponse.js";
import asyncHandler from "../../../../../utils/asyncHandler.js";

class ParentController {
  /**
   * Create Parent Details
   */
  create = asyncHandler(async (req, res) => {
    const parent = await ParentService.create(
      req.user.id,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Parent details created successfully",
        parent
      )
    );
  });

  /**
   * Get Parent Details
   */
  get = asyncHandler(async (req, res) => {
    const parent = await ParentService.get(
      req.user.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        parent
          ? "Parent details fetched successfully"
          : "Parent details not found",
        parent
      )
    );
  });

  /**
   * Update Parent Details
   */
  update = asyncHandler(async (req, res) => {
    const parent = await ParentService.update(
      req.user.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Parent details updated successfully",
        parent
      )
    );
  });
}

export default new ParentController();