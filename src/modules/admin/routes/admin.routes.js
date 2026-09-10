import express from "express";

import AdminController from "../controllers/admin.controller.js";

import profileRoutes from "../profile/profile.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";
import assignmentRoutes from "../assignments/assignment.routes.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

// ==========================================================
// ADMIN SECURITY
// ==========================================================

router.use(authenticate);

router.use(authorize("ADMIN"));

// ==========================================================
// MENTOR MANAGEMENT
// ==========================================================

// ----------------------------------------------------------
// Get all mentors
// ----------------------------------------------------------

router.get("/mentors", AdminController.getMentors);

// ----------------------------------------------------------
// Create mentor
// ----------------------------------------------------------

router.post("/mentors", AdminController.createMentor);

// ==========================================================
// ADMIN PROFILE
// ==========================================================

router.use("/profile", profileRoutes);

// ==========================================================
// DASHBOARD
// ==========================================================

router.use("/dashboard", dashboardRoutes);

// ==========================================================
// ASSIGNMENTS
// ==========================================================

router.use("/assignments", assignmentRoutes);

export default router;
