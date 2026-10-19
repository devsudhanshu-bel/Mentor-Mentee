
import express from "express";

import AdminController from "../controllers/admin.controller.js";

import profileRoutes from "../profile/profile.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";
import assignmentRoutes from "../assignments/assignment.routes.js";
import studentRoutes from "../students/student.routes.js";
import termChangeRoutes from "../term-change/termChange.routes.js";
import overviewRoutes from "../overview/overview.routes.js";
import announcementsRoutes from "../announcements/announcements.routes.js";

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

// Institution-wide student directory with active mentor assignment.
router.get("/students/directory", AdminController.getStudentDirectory);

router.get("/mentors/:mentorId", AdminController.getMentorDetails);

router.post("/mentors", AdminController.createMentor);

/*
|--------------------------------------------------------------------------
| ADMIN PROFILE
|--------------------------------------------------------------------------
| GET    /api/admin/profile
| POST   /api/admin/profile
| PUT    /api/admin/profile
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
| ANNOUNCEMENTS
|--------------------------------------------------------------------------
| GET    /api/admin/announcements
| POST   /api/admin/announcements
| GET    /api/admin/announcements/:id
| PATCH  /api/admin/announcements/:id/archive
*/

router.use("/announcements", announcementsRoutes);

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
