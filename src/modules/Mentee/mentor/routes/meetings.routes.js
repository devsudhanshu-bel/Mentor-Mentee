import express from "express";
import MeetingsController from "../../../mentor/controllers/meetings.controller.js";

const router = express.Router();

// GET /api/mentee/meetings
router.get("/", MeetingsController.listStudentMeetings);

// GET /api/mentee/meetings/:meetingId
router.get("/:meetingId", MeetingsController.getStudentMeeting);

export default router;