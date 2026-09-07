import express from "express";

import AdminController from "../controllers/admin.controller.js";
import profileRoutes from "../profile/profile.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";
import assignmentRoutes from "../assignments/assignment.routes.js";
import termChangeRoutes from "../term-change/termChange.routes.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| All Admin Routes Require Authentication
|--------------------------------------------------------------------------
*/

router.use(authenticate);
router.use(authorize("ADMIN"));

/*
|--------------------------------------------------------------------------
| Mentor Management
|--------------------------------------------------------------------------
*/

router.post("/mentors", AdminController.createMentor);

/*
|--------------------------------------------------------------------------
| Admin Profile
|--------------------------------------------------------------------------
*/

router.use("/profile", profileRoutes);

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.use("/dashboard", dashboardRoutes);

/*
|--------------------------------------------------------------------------
| Student → Mentor Assignments
|--------------------------------------------------------------------------
*/

router.use("/assignments", assignmentRoutes);

/*
|--------------------------------------------------------------------------
| Academic Term Change Requests
|--------------------------------------------------------------------------
|
| GET  /api/admin/term-change/context
| POST /api/admin/term-change/request
|
| HOD/Admin can request a term change.
| Actual term activation happens only after
| Super Admin approval.
|
|--------------------------------------------------------------------------
*/

router.use("/term-change", termChangeRoutes);

export default router;
