import express from "express";

import StudentsController from "../controllers/students.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

// Authentication
router.use(authenticate);

// Only MENTOR users can access these routes
router.use(authorize("MENTOR"));

// Get currently assigned students for logged-in mentor
router.get("/", StudentsController.getMyStudents);

export default router;