import { Router } from "express";

import {
  getMentorDetails,
  getMentorAssignedStudents,
  getMentorMeetings,
} from "../controllers/mentorDetails.controller.js";

const router = Router();

// GET /api/admin/mentors/:mentorId
router.get("/mentors/:mentorId", getMentorDetails);

// GET /api/admin/mentors/:mentorId/students
router.get(
  "/mentors/:mentorId/students",
  getMentorAssignedStudents
);

// GET /api/admin/mentors/:mentorId/meetings
router.get(
  "/mentors/:mentorId/meetings",
  getMentorMeetings
);

export default router;