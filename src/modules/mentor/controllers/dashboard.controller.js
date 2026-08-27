import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

import dashboardService from "../services/dashboard.service.js";

class DashboardController {
  /**
   * Dashboard Banner
   */
  getBanner = asyncHandler(async (req, res) => {
    const banner =
      await dashboardService.getBanner(req.user.id);

    return res.json(
      new ApiResponse(
        200,
        "Dashboard banner fetched successfully",
        banner
      )
    );
  });
}

export default new DashboardController();