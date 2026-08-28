import express from "express";
import academicController from "../controllers/academic.controller.js";

const router = express.Router();

router.get("/", academicController.getProfile);
router.get("/semester/:semesterNumber", academicController.getSemester);
router.post("/semester", academicController.saveSemester);

export default router;
