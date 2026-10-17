import express from "express";
import MeetingsController from "../controllers/meetings.controller.js";

const router = express.Router();

// ==========================================================
// RECURRING MEETINGS
// Register static paths before /:meetingId.
// ==========================================================

router.post(
  "/recurring",
  MeetingsController.createRecurringSeries
);

router.get(
  "/recurring",
  MeetingsController.listRecurringSeries
);

router.patch(
  "/recurring/:seriesId/cancel",
  MeetingsController.cancelRecurringSeries
);

// ==========================================================
// ASSIGNED STUDENTS
// GET /students
// ==========================================================

router.get(
  "/students",
  MeetingsController.listAssignedStudents
);

// ==========================================================
// MEETING SCHEDULING AND LISTING
// ==========================================================

// Schedule a meeting.
router.post(
  "/",
  MeetingsController.createMeeting
);

// List meetings belonging to the authenticated mentor.
router.get(
  "/",
  MeetingsController.listMentorMeetings
);

// ==========================================================
// MEETING LIFECYCLE
// Register specific suffixes before the generic PATCH route.
// ==========================================================

// Start a scheduled meeting.
router.patch(
  "/:meetingId/start",
  MeetingsController.startMeeting
);

// Complete an in-progress meeting.
router.patch(
  "/:meetingId/complete",
  MeetingsController.completeMeeting
);

// Mark a meeting as no-show.
router.patch(
  "/:meetingId/no-show",
  MeetingsController.markNoShow
);

// Cancel a meeting.
router.patch(
  "/:meetingId/cancel",
  MeetingsController.cancelMeeting
);

// ==========================================================
// MEETING WORKSPACE — NOTES
// ==========================================================

router.put(
  "/:meetingId/notes",
  MeetingsController.saveNotes
);

// ==========================================================
// MEETING WORKSPACE — DISCUSSION POINTS
// ==========================================================

router.post(
  "/:meetingId/discussion-points",
  MeetingsController.addDiscussionPoint
);

router.patch(
  "/:meetingId/discussion-points/:pointId",
  MeetingsController.updateDiscussionPoint
);

router.delete(
  "/:meetingId/discussion-points/:pointId",
  MeetingsController.deleteDiscussionPoint
);

// ==========================================================
// MEETING WORKSPACE — FEEDBACK
// ==========================================================

router.put(
  "/:meetingId/feedback",
  MeetingsController.saveFeedback
);

// ==========================================================
// FOLLOW-UP MEETINGS
// ==========================================================

router.post(
  "/:meetingId/follow-ups",
  MeetingsController.scheduleFollowUp
);

// ==========================================================
// MEETING UPDATE / RESCHEDULE
// Keep this after the specific PATCH endpoints above.
// ==========================================================

router.patch(
  "/:meetingId",
  MeetingsController.updateMeeting
);

// ==========================================================
// MEETING DETAILS — MENTOR
// ==========================================================

router.get(
  "/:meetingId",
  MeetingsController.getMentorMeeting
);

// ==========================================================
// STUDENT MEETING HANDLERS
//
// These handlers must be registered in the STUDENT router,
// not exposed through the mentor-authorized router.
//
// The student router should delegate to these controller
// methods using its own authenticate + authorize("STUDENT")
// middleware.
// ==========================================================

// List meetings for the authenticated student.
export const listStudentMeetings =
  MeetingsController.listStudentMeetings;

// Get a meeting belonging to the authenticated student.
export const getStudentMeeting =
  MeetingsController.getStudentMeeting;

export default router;