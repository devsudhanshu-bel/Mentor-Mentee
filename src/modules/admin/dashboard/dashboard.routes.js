import express from "express";

import DashboardController from "./dashboard.controller.js";

const router = express.Router();

/* ==========================================================
   ADMIN DASHBOARD OVERVIEW
========================================================== */

router.get("/overview", DashboardController.getOverview);

/* ==========================================================
   ADMIN PROFILE OVERVIEW STATISTICS
========================================================== */

router.get("/profile-overview", DashboardController.getProfileOverview);

/* ==========================================================
   ADMIN DASHBOARD BANNER
========================================================== */

router.get("/banner", DashboardController.getBanner);

export default router;