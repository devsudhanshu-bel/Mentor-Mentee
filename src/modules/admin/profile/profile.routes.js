import express from "express";

import AdminProfileController from "./profile.controller.js";

const router = express.Router();

/* ==========================================================
   Admin Profile
========================================================== */

// Get Logged-in Admin Profile
router.get("/", AdminProfileController.getProfile);

// Create Admin Profile (Only Once)
router.post("/", AdminProfileController.createProfile);

// Update Admin Profile
router.put("/", AdminProfileController.updateProfile);

export default router;