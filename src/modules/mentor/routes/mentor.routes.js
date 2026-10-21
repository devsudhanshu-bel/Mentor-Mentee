import express from "express";

import MentorController from "../controllers/mentor.controller.js";

import ProfilePictureController, {
  mentorAvatarUpload,
} from "../controllers/profile-picture.controller.js";

import dashboardRoutes from "./dashboard.routes.js";
import internshipsRoutes from "./internships.routes.js";
import meetingsRoutes from "./meetings.routes.js";
import projectsRoutes from "./projects.routes.js";

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
   MENTOR INTERNSHIPS
========================================================== */

router.use("/internships", internshipsRoutes);

/* ==========================================================
   MENTOR MEETINGS
========================================================== */

router.use("/meetings", meetingsRoutes);

/* ==========================================================
   MENTOR PROJECTS
========================================================== */

router.use("/projects", projectsRoutes);

/* ==========================================================
   MENTOR PROFILE PICTURE
========================================================== */

// Upload or replace mentor profile picture.
// POST /api/mentor/profile/picture
router.post(
  "/profile/picture",
  mentorAvatarUpload,
  ProfilePictureController.upload
);

// Remove mentor profile picture.
// DELETE /api/mentor/profile/picture
router.delete(
  "/profile/picture",
  ProfilePictureController.remove
);

/* ==========================================================
   MENTOR PROFILE completed... //
========================================================== */

// Fetch mentor profile.
router.get(
  "/profile",
  MentorController.getProfile
);

// Create mentor profile.
router.post(
  "/profile",
  MentorController.createProfile
);

// Update mentor profile.
router.put(
  "/profile",
  MentorController.updateProfile
);

/* ==========================================================
   MENTORING OVERVIEW comepleted ... //
========================================================== */

router.get(
  "/overview",
  MentorController.getOverview
);

export default router;