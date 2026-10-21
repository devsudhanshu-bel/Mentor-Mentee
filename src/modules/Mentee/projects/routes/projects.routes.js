import express from "express";
import StudentProjectsController from "../controllers/projects.controller.js";
import projectSubmissionUpload from "../middleware/projectSubmissionUpload.js";

const router = express.Router();
router.get("/unread-count", StudentProjectsController.getUnreadCount);
router.get("/", StudentProjectsController.listMyProjects);
router.post("/:projectId/submission", projectSubmissionUpload.single("file"), StudentProjectsController.submitProject);
router.get("/:projectId/messages", StudentProjectsController.getMessages);
router.post("/:projectId/messages", StudentProjectsController.sendMessage);

export default router;
