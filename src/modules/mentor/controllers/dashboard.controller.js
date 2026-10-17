
import DashboardService from "../services/dashboard.service.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class DashboardController {
  // ==========================================================
  // DASHBOARD BANNER
  // ==========================================================

  getBanner = asyncHandler(async (req, res) => {
    const data = await DashboardService.getBanner(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Dashboard banner fetched successfully",
        data
      )
    );
  });

  // ==========================================================
  // DASHBOARD OVERVIEW
  // ==========================================================

  getOverview = asyncHandler(async (req, res) => {
    const data = await DashboardService.getOverview(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Dashboard overview fetched successfully",
        data
      )
    );
  });
}

export default new DashboardController();
