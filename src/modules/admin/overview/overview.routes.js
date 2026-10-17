import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

import OverviewController from "./overview.controller.js";

const router = Router();

// ==========================================================
// ADMIN STUDENT OVERVIEW
// GET /api/admin/overview/students/:studentId
// ==========================================================

router.get(
  "/students/:studentId",
  authenticate,
  authorize("ADMIN", "SYSTEM_ADMIN"),
  OverviewController.getStudentOverview,
);

export default router;