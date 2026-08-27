import ContactService from "../services/contact.service.js";

import ApiResponse from "../../../../../utils/ApiResponse.js";
import asyncHandler from "../../../../../utils/asyncHandler.js";

class ContactController {
  /**
   * Create Contact Details
   */
  create = asyncHandler(async (req, res) => {
    const contact = await ContactService.create(
      req.user.id,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Contact details created successfully",
        contact
      )
    );
  });

  /**
   * Get Contact Details
   */
  get = asyncHandler(async (req, res) => {
    const contact = await ContactService.get(
      req.user.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        contact
          ? "Contact details fetched successfully"
          : "Contact details not found",
        contact
      )
    );
  });

  /**
   * Update Contact Details
   */
  update = asyncHandler(async (req, res) => {
    const contact = await ContactService.update(
      req.user.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Contact details updated successfully",
        contact
      )
    );
  });
}

export default new ContactController();