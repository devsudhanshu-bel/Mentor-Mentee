import express from "express";

import MentorController from "../controllers/mentor.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/* ==========================================================
   AUTHENTICATION
========================================================== */

router.use(authenticate);

/* ==========================================================
   MENTOR ROLE
========================================================== */

router.use(
  authorize("MENTOR")
);

/* ==========================================================
   PROFILE
========================================================== */

router.get(
  "/profile",
  MentorController.getProfile
);

router.post(
  "/profile",
  MentorController.createProfile
);

router.put(
  "/profile",
  MentorController.updateProfile
);

/* ==========================================================
   MENTORING OVERVIEW
========================================================== */

router.get(
  "/overview",
  MentorController.getOverview
);

export default router;