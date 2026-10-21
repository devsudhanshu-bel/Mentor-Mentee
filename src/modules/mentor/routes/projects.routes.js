import express from "express";
import ProjectsController from "../controllers/projects.controller.js";
const router = express.Router();
router.get("/students/:studentId", ProjectsController.listStudentProjects);
router.post("/students/:studentId", ProjectsController.createProject);
router.patch("/:projectId/status", ProjectsController.updateStatus);
router.get("/:projectId/messages", ProjectsController.getMessages);
router.post("/:projectId/messages", ProjectsController.sendMessage);
export default router;
