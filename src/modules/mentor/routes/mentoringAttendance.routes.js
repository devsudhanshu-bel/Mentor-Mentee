import express from "express";
import MentoringAttendanceController from "../controllers/mentoringAttendance.controller.js";

const router = express.Router();

router.get("/students/:studentId/summary", MentoringAttendanceController.getStudentSummary);
router.get("/", MentoringAttendanceController.getForDate);
router.put("/", MentoringAttendanceController.saveForDate);

export default router;
