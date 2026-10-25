import express from "express";
import controller from "../controllers/mentoringAttendance.controller.js";

const router = express.Router();

// Authentication and STUDENT authorization are applied by the parent /api/mentee router.
router.get("/", controller.getStudentMentoringAttendance);

export default router;
