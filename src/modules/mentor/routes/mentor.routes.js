import express from "express";

import MentorController from "../controllers/mentor.controller.js";
import dashboardRoutes from "./dashboard.routes.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/* ==========================================================
   All Mentor Routes Require Authentication
========================================================== */

router.use(authenticate);
router.use(authorize("MENTOR"));

/* ==========================================================
   Dashboard Routes
========================================================== */

router.use("/dashboard", dashboardRoutes);

/* ==========================================================
   Mentor Profile
========================================================== */

// Get Logged-in Mentor Profile
router.get("/profile", MentorController.getProfile);

// Create Mentor Profile (Only Once)
router.post("/profile", MentorController.createProfile);

// Update Mentor Profile
router.put("/profile", MentorController.updateProfile);

export default router;