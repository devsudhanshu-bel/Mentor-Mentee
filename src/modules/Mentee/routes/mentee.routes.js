import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";
import { studentResponseCache } from "../../../middleware/studentResponseCache.js";

import profileRoutes from "./profile/profile.routes.js";
import documentRoutes from "../documents/routes/document.routes.js";
import academicRoutes from "../academics/routes/academic.routes.js";
import attendanceRoutes from "../attendance/routes/attendance.routes.js";
import mentorRoutes from "../mentor/routes/mentor.routes.js";
import internshipRoutes from "../internships/routes/internship.routes.js";
import meetingsRoutes from "../mentor/routes/meetings.routes.js";
import mentoringAttendanceRoutes from "../mentor/routes/mentoringAttendance.routes.js";
import dashboardRoutes from "../dashboard/routes/dashboard.routes.js";
import projectsRoutes from "../projects/routes/projects.routes.js";

const router = express.Router();

/* ==========================================================
   ALL MENTEE ROUTES
========================================================== */

router.use(authenticate);
router.use(authorize("STUDENT"));

// Short-lived, per-student Upstash cache for read-only JSON responses.
// Any student write invalidates that student's cached responses.
router.use(studentResponseCache);

/* ==========================================================
   PROFILE
========================================================== */

router.use("/profile", profileRoutes);

/* ==========================================================
   DOCUMENTS
========================================================== */

router.use("/documents", documentRoutes);

/* ==========================================================
   ACADEMICS
========================================================== */

router.use("/academics", academicRoutes);

/* ==========================================================
   ATTENDANCE
========================================================== */

router.use("/attendance", attendanceRoutes);

/* ==========================================================
   MENTOR
========================================================== */

router.use("/mentor", mentorRoutes);

/* ==========================================================
   INTERNSHIPS
========================================================== */

router.use("/internships", internshipRoutes);

router.use("/dashboard", dashboardRoutes);

/* ==========================================================
   STUDENT PROJECTS + UNREAD ASSIGNMENT NOTIFICATIONS
========================================================== */

router.use("/projects", projectsRoutes);

/* ==========================================================
   STUDENT MEETINGS
   GET /api/mentee/meetings
   GET /api/mentee/meetings/:meetingId
========================================================== */

router.use("/meetings", meetingsRoutes);

/* STUDENT MENTORING ATTENDANCE SUMMARY */
router.use("/mentoring-attendance", mentoringAttendanceRoutes);

export default router;