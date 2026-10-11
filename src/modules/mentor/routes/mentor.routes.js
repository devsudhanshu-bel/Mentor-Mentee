import express from "express";

import MentorController from "../controllers/mentor.controller.js";
import dashboardRoutes from "./dashboard.routes.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/* ==========================================================
   MENTOR AUTHENTICATION
========================================================== */

router.use(authenticate);

/* ==========================================================
   MENTOR AUTHORIZATION
========================================================== */

router.use(authorize("MENTOR"));

/* ==========================================================
   MENTOR DASHBOARD
========================================================== */

router.use("/dashboard", dashboardRoutes);

/* ==========================================================
   MENTOR PROFILE
========================================================== */

router.get("/profile", MentorController.getProfile);

router.post("/profile", MentorController.createProfile);

router.put("/profile", MentorController.updateProfile);

/* ==========================================================
   MENTORING OVERVIEW
========================================================== */

router.get("/overview", MentorController.getOverview);

export default router;
