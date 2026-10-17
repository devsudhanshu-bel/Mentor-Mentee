import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

import profileRoutes from "./profile/profile.routes.js";
import documentRoutes from "../documents/routes/document.routes.js";
import academicRoutes from "../academics/routes/academic.routes.js";
import attendanceRoutes from "../attendance/routes/attendance.routes.js";
import mentorRoutes from "../mentor/routes/mentor.routes.js";
import internshipRoutes from "../internships/routes/internship.routes.js";
import meetingsRoutes from "../mentor/routes/meetings.routes.js";
import dashboardRoutes from "../dashboard/routes/dashboard.routes.js";

const router = express.Router();

/* ==========================================================
   ALL MENTEE ROUTES
========================================================== */

router.use(authenticate);
router.use(authorize("STUDENT"));

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
   STUDENT MEETINGS
   GET /api/mentee/meetings
   GET /api/mentee/meetings/:meetingId
========================================================== */

router.use("/meetings", meetingsRoutes);

export default router;