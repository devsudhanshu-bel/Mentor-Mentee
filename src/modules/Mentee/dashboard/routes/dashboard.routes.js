
import express from "express";
import DashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", DashboardController.getOverview);

export default router;
