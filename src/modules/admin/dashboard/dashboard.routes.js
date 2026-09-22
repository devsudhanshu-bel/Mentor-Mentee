import express from "express";

import DashboardController from "./dashboard.controller.js";

const router = express.Router();

/* ==========================================================
   ADMIN DASHBOARD OVERVIEW
========================================================== */

router.get("/overview", DashboardController.getOverview);

/* ==========================================================
   ADMIN DASHBOARD BANNER
========================================================== */

router.get("/banner", DashboardController.getBanner);

export default router;
