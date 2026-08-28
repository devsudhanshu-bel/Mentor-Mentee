import express from "express";
import academicController from "../controllers/academic.controller.js";

const router = express.Router();

// =========================================================
// EXISTING ACADEMIC ROUTES
// =========================================================

router.get("/", academicController.getProfile);

router.get("/semester/:semesterNumber", academicController.getSemester);

router.post("/semester", academicController.saveSemester);

// =========================================================
// BACKLOG ROUTES
// =========================================================

router.get("/backlogs", academicController.getBacklogs);

router.post("/backlogs", academicController.createBacklog);

router.put("/backlogs/:id", academicController.updateBacklog);

router.delete("/backlogs/:id", academicController.deleteBacklog);

router.patch("/backlogs/:id/clear", academicController.clearBacklog);

export default router;
