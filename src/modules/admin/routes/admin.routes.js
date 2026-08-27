import express from "express";

import AdminController from "../controllers/admin.controller.js";
import profileRoutes from "../profile/profile.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";

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

// Create Mentor
router.post(
  "/mentors",
  AdminController.createMentor
);

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

export default router;