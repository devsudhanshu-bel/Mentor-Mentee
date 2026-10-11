import DashboardService from "../services/dashboard.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class DashboardController {
  /* ==========================================================
     GET ADMIN DASHBOARD OVERVIEW
  ========================================================== */

  getOverview = asyncHandler(async (req, res) => {
    const overview = await DashboardService.getOverview(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Admin dashboard data fetched successfully",
          overview,
        ),
      );
  });

  /* ==========================================================
     GET ADMIN DASHBOARD BANNER
  ========================================================== */

  getBanner = asyncHandler(async (req, res) => {
    const banner = await DashboardService.getBanner(req.user.id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Dashboard banner fetched successfully", banner),
      );
  });
}

export default new DashboardController();
