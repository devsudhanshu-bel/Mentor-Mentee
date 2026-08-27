import DashboardService from "../services/dashboard.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class DashboardController {
  /**
   * GET /api/admin/dashboard/banner
   */
  getBanner = asyncHandler(async (req, res) => {
    const banner = await DashboardService.getBanner(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Dashboard banner fetched successfully",
        banner
      )
    );
  });
}

export default new DashboardController();