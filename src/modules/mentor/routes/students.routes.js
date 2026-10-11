import express from "express";

import StudentsController from "../controllers/students.controller.js";

const router = express.Router();

/* ==========================================================
   MENTOR STUDENTS
========================================================== */

router.get("/", StudentsController.getMyStudents);

export default router;
