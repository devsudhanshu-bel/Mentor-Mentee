import express from "express";

import AdminController from "../controllers/admin.controller.js";

import profileRoutes from "../profile/profile.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";
import assignmentRoutes from "../assignments/assignment.routes.js";
import studentRoutes from "../students/student.routes.js";
import termChangeRoutes from "../term-change/termChange.routes.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN SECURITY
|--------------------------------------------------------------------------
|
| Every Admin route is authenticated here.
|
| ADMIN       → HOD/Admin user
| SYSTEM_ADMIN → System administrator
|
|--------------------------------------------------------------------------
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
| TERM CHANGE
|--------------------------------------------------------------------------
*/

router.use("/term-change", termChangeRoutes);

export default router;
