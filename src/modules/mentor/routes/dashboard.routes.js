import express from "express";

import DashboardController from "../controllers/dashboard.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/* ==========================================================
   AUTHENTICATION
========================================================== */

router.use(authenticate);

/* ==========================================================
   AUTHORIZATION
========================================================== */

router.use(authorize("MENTOR"));

/* ==========================================================
   DASHBOARD
========================================================== */

/* ---------------- Dashboard Banner ---------------- */

router.get(
  "/banner",
  DashboardController.getBanner
);

export default router;