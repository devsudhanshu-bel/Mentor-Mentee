import express from "express";

import PersonalController from "../controllers/personal.controller.js";

const router = express.Router();

/* ==========================================================
   Personal Profile
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

export default router;