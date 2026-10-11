
import express from "express";

import mentorAcademicsController from "../controllers/academics.controller.js";

const router = express.Router();

/* ==========================================================
   MENTOR STUDENT ACADEMICS — READ ONLY
========================================================== */

// GET /api/mentor/students/:studentId/academics
router.get(
  "/:studentId/academics",
  mentorAcademicsController.getProfile,
);

// GET /api/mentor/students/:studentId/academics/semester/:semesterNumber
router.get(
  "/:studentId/academics/semester/:semesterNumber",
  mentorAcademicsController.getSemester,
);

// GET /api/mentor/students/:studentId/academics/backlogs
router.get(
  "/:studentId/academics/backlogs",
  mentorAcademicsController.getBacklogs,
);

export default router;
