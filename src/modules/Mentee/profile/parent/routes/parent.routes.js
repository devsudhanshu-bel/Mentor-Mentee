import express from "express";

import ParentController from "../controllers/parent.controller.js";

const router = express.Router();

/* ==========================================================
   Parent Details
========================================================== */

// Create Parent Details
router.post(
  "/",
  ParentController.create
);

// Get Parent Details
router.get(
  "/",
  ParentController.get
);

// Update Parent Details
router.put(
  "/",
  ParentController.update
);

export default router;