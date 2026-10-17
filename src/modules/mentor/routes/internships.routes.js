
import express from "express";
import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";
import InternshipsController from "../controllers/internships.controller.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("MENTOR"));

// Review queues
router.get("/initial", InternshipsController.getInitialQueue);
router.get("/completion", InternshipsController.getCompletionQueue);

// Student internships — keep before /:id routes
router.get(
  "/student/:studentId",
  InternshipsController.getStudentInternships
);

// Individual internship and review history
router.get("/:id/reviews", InternshipsController.getReviewHistory);
router.get("/:id", InternshipsController.getInternshipDetails);

// Mentor decisions
router.patch("/:id/initial-review", InternshipsController.reviewInitial);
router.patch("/:id/completion-review", InternshipsController.reviewCompletion);

export default router;
