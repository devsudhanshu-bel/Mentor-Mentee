import express from "express";

import {
  getAttendance,
  saveAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

/* ==========================================================
   ATTENDANCE ROUTES

   IMPORTANT:

   Authentication and STUDENT authorization are already
   applied by:

   /api/mentee
        ↓
   mentee.routes.js

   Therefore we DO NOT repeat authenticate() here.
========================================================== */

/* ==========================================================
   GET SEMESTER ATTENDANCE

   GET
   /api/mentee/attendance/semester/:semester
========================================================== */

router.get("/semester/:semester", getAttendance);

/* ==========================================================
   SAVE SEMESTER ATTENDANCE

   POST
   /api/mentee/attendance/semester/:semester
========================================================== */

router.post("/semester/:semester", saveAttendance);

export default router;
