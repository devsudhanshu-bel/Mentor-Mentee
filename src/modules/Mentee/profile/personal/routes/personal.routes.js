
import express from "express";

import PersonalController from "../controllers/personal.controller.js";

import ProfilePictureController, {
  avatarUpload,
} from "../../../controllers/profile-picture.controller.js";

const router = express.Router();

/* ==========================================================
   PERSONAL PROFILE
========================================================== */

// Create Personal Profile
router.post(
  "/",
  PersonalController.create
);

// Get Personal Profile
router.get(
  "/",
  PersonalController.get
);

// Update Personal Profile
router.put(
  "/",
  PersonalController.update
);

/* ==========================================================
   PROFILE PICTURE
========================================================== */

// Upload or Replace Profile Picture
router.post(
  "/picture",
  avatarUpload,
  ProfilePictureController.upload
);

// Remove Profile Picture
router.delete(
  "/picture",
  ProfilePictureController.remove
);

export default router;
