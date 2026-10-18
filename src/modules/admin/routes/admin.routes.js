
import express from "express";

import AdminController from "../controllers/admin.controller.js";

import profileRoutes from "../profile/profile.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";
import assignmentRoutes from "../assignments/assignment.routes.js";
import studentRoutes from "../students/student.routes.js";
import termChangeRoutes from "../term-change/termChange.routes.js";
import overviewRoutes from "../overview/overview.routes.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN SECURITY
|--------------------------------------------------------------------------
| All routes below require authentication and an authorized Admin role.
*/

router.use(authenticate);
router.use(authorize("ADMIN", "SYSTEM_ADMIN"));

/*
|--------------------------------------------------------------------------
| MENTOR MANAGEMENT
|--------------------------------------------------------------------------
*/

router.get("/mentors", AdminController.getMentors);

router.get("/mentors/:mentorId", AdminController.getMentorDetails);

router.post("/mentors", AdminController.createMentor);

/*
|--------------------------------------------------------------------------
| ADMIN PROFILE
|--------------------------------------------------------------------------
| GET    /api/admin/profile  - Fetch the logged-in Admin's profile
| POST   /api/admin/profile  - Create the profile
| PUT    /api/admin/profile  - Update the profile
*/

router.use("/profile", profileRoutes);

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

router.use("/dashboard", dashboardRoutes);

/*
|--------------------------------------------------------------------------
| ASSIGNMENTS
|--------------------------------------------------------------------------
*/

router.use("/assignments", assignmentRoutes);

/*
|--------------------------------------------------------------------------
| STUDENTS
|--------------------------------------------------------------------------
*/

router.use("/students", studentRoutes);

/*
|--------------------------------------------------------------------------
| STUDENT OVERVIEW
|--------------------------------------------------------------------------
*/

router.use("/overview", overviewRoutes);

/*
|--------------------------------------------------------------------------
| TERM CHANGE
|--------------------------------------------------------------------------
*/

router.use("/term-change", termChangeRoutes);

export default router;
