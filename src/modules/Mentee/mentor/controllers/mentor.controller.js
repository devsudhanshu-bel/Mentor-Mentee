import MentorService from "../services/mentor.service.js";

import ApiResponse from "../../../../utils/ApiResponse.js";
import asyncHandler from "../../../../utils/asyncHandler.js";

class MentorController {
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
}

export default new MentorController();
