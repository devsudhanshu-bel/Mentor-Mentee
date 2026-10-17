
import asyncHandler from "../../../../utils/asyncHandler.js";
import ApiResponse from "../../../../utils/ApiResponse.js";
import DashboardService from "../services/dashboard.service.js";

class DashboardController {
  getOverview = asyncHandler(async (req, res) => {
    const data = await DashboardService.getOverview(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Student dashboard fetched successfully",
        data,
      ),
    );
  });
}

export default new DashboardController();
