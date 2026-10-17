
import express from "express";
import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";
import StudentReportController from "../controllers/studentReport.controller.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("MENTOR"));

router.get(
  "/:studentId/report",
  StudentReportController.download,
);

export default router;
