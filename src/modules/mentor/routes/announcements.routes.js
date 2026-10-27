import { Router } from "express";
import MentorAnnouncementsController from "../controllers/announcements.controller.js";

const router = Router();

// GET /api/mentor/announcements
router.get("/", (req, res) =>
  MentorAnnouncementsController.getForMentor(req, res)
);

export default router;
