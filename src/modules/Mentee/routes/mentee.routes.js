import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

import profileRoutes from "./profile/profile.routes.js";
import documentRoutes from "../documents/routes/document.routes.js";
import academicRoutes from "../academics/routes/academic.routes.js";
import attendanceRoutes from "../attendance/routes/attendance.routes.js";
import mentorRoutes from "../mentor/routes/mentor.routes.js";

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

export default router;