
import express from "express";
import mentorAttendanceController from "../controllers/attendance.controller.js";

// Import the same authentication middleware used by your
// existing mentor academics routes if this router needs it.

const router = express.Router();

router.get(
  "/:studentId/attendance",
  mentorAttendanceController.getAttendance,
);

export default router;
