import express from "express";

import DashboardController from "./dashboard.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard Banner
|--------------------------------------------------------------------------
*/

router.get(
  "/banner",
  DashboardController.getBanner
);

export default router;