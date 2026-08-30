import express from "express";

import {
  getAttendance,
  saveAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

/* ==========================================================
   GET SEMESTER ATTENDANCE
   GET /api/attendance/semester/:semester
========================================================== */

router.get("/semester/:semester", getAttendance);

/* ==========================================================
   SAVE SEMESTER ATTENDANCE
   POST /api/attendance/semester/:semester
========================================================== */

router.post("/semester/:semester", saveAttendance);

export default router;
