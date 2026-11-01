import express from "express";

import ProjectsController from "../controllers/projects.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

// Protect every mentor project endpoint.
router.use(authenticate, authorize("MENTOR"));

// Student projects
router.get(
  "/students/:studentId",
  ProjectsController.listStudentProjects
);

router.post(
  "/students/:studentId",
  ProjectsController.createProject
);

// Project status
router.patch(
  "/:projectId/status",
  ProjectsController.updateStatus
);

// Project messages
router.get(
  "/:projectId/messages",
  ProjectsController.getMessages
);

router.post(
  "/:projectId/messages",
  ProjectsController.sendMessage
);

export default router;