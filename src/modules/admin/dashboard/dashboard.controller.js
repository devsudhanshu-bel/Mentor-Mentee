import DashboardService from "../services/dashboard.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

class DashboardController {
  /* ==========================================================
     GET ADMIN DASHBOARD OVERVIEW
     GET /api/admin/dashboard/overview
  ========================================================== */

  getOverview = asyncHandler(async (req, res) => {
    const overview = await DashboardService.getOverview(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin dashboard data fetched successfully.",
        overview
      )
    );
  });

  /* ==========================================================
     GET ADMIN PROFILE OVERVIEW STATISTICS
     GET /api/admin/dashboard/profile-overview
  ========================================================== */

  getProfileOverview = asyncHandler(async (req, res) => {
    const stats = await DashboardService.getProfileOverview(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin profile overview fetched successfully.",
        stats
      )
    );
  });

  /* ==========================================================
     GET ADMIN DASHBOARD BANNER
     GET /api/admin/dashboard/banner
  ========================================================== */

  getBanner = asyncHandler(async (req, res) => {
    const banner = await DashboardService.getBanner(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin dashboard banner fetched successfully.",
        banner
      )
    );
  });
}

export default new DashboardController();