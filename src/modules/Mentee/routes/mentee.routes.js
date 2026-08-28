import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

import profileRoutes from "./profile/profile.routes.js";
import documentRoutes from "../documents/routes/document.routes.js";
import academicRoutes from "../academics/routes/academic.routes.js";

const router = express.Router();

/* ==========================================================
   All Mentee Routes Require Authentication
========================================================== */

router.use(authenticate);
router.use(authorize("STUDENT"));

/* ==========================================================
   Profile Routes
========================================================== */

router.use("/profile", profileRoutes);

/* ==========================================================
   Documents Routes
========================================================== */

router.use("/documents", documentRoutes);

/* ==========================================================
   Academic Routes
========================================================== */

router.use("/academics", academicRoutes);

export default router;