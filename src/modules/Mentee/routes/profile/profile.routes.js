import express from "express";

import personalRoutes from "../../profile/personal/routes/personal.routes.js";
import parentRoutes from "../../profile/parent/routes/parent.routes.js";
import contactRoutes from "../../profile/contact/routes/contact.routes.js";

const router = express.Router();

/* ==========================================================
   Personal Profile
========================================================== */

router.use("/personal", personalRoutes);

/* ==========================================================
   Parent Details
========================================================== */

router.use("/parent", parentRoutes);

/* ==========================================================
   Contact Details
========================================================== */

router.use("/contact", contactRoutes);

export default router;