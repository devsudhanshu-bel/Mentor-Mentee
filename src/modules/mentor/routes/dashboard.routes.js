import express from "express";

import DashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

/* ==========================================================
   DASHBOARD BANNER
========================================================== */

router.get("/banner", DashboardController.getBanner);

export default router;
