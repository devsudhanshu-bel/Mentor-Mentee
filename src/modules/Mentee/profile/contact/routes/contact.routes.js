import express from "express";

import ContactController from "../controllers/contact.controller.js";

const router = express.Router();

/* ==========================================================
   Contact Details
========================================================== */

// Create Contact Details
router.post("/", ContactController.create);

// Get Contact Details
router.get("/", ContactController.get);

// Update Contact Details
router.put("/", ContactController.update);

export default router;