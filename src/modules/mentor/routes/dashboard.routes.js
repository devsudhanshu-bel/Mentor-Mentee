
import express from "express";
import DashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

// ==========================================================
// DASHBOARD BANNER
// GET /api/mentor/dashboard/banner
// ==========================================================

router.get("/banner", DashboardController.getBanner);

// ==========================================================
// DASHBOARD OVERVIEW
// GET /api/mentor/dashboard/overview
// ==========================================================

router.get("/overview", DashboardController.getOverview);

export default router;
