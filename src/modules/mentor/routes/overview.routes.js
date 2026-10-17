import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

import OverviewController from "../controllers/overview.controller.js";

const router = Router();

router.use(authenticate);
router.use(authorize("MENTOR"));

// GET /api/mentor/students/:studentId/overview
router.get(
  "/:studentId/overview",
  OverviewController.getStudentOverview,
);

export default router;