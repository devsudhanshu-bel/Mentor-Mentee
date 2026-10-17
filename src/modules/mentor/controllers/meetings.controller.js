import MeetingsService from "../services/meetings.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiError from "../../../utils/ApiError.js";

/**
 * Standard success response.
 */
const sendSuccess = (res, message, data, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

/**
 * Validate required route parameters.
 */
const requireParam = (value, name) => {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    throw new ApiError(400, `${name} is required`);
  }
};

/**
 * Validate request body fields that must be non-empty strings.
 */
const requireString = (value, name) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new ApiError(400, `${name} is required`);
  }
};

const MeetingsController = {
  // =======================================================
  // ASSIGNED STUDENTS
  // GET /students
  // =======================================================
  listAssignedStudents: asyncHandler(async (req, res) => {
    const students = await MeetingsService.listAssignedStudents(
      req.user
    );

    return sendSuccess(
      res,
      "Assigned students retrieved successfully",
      students
    );
  }),

  // =======================================================
  // CREATE MEETING
  // POST /
  // =======================================================
  createMeeting: asyncHandler(async (req, res) => {
    const meeting = await MeetingsService.createMeeting(
      req.user,
      req.body ?? {}
    );

    return sendSuccess(
      res,
      "Meeting scheduled successfully",
      meeting,
      201
    );
  }),

  // =======================================================
  // LIST MENTOR MEETINGS
  // GET /
  // =======================================================
  listMentorMeetings: asyncHandler(async (req, res) => {
    const meetings = await MeetingsService.listMentorMeetings(
      req.user,
      req.query
    );

    return sendSuccess(
      res,
      "Meetings retrieved successfully",
      meetings
    );
  }),

  // =======================================================
  // GET SINGLE MENTOR MEETING
  // GET /:meetingId
  // =======================================================
  getMentorMeeting: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.getMentorMeeting(
      req.user,
      req.params.meetingId
    );

    return sendSuccess(
      res,
      "Meeting retrieved successfully",
      meeting
    );
  }),

  // =======================================================
  // UPDATE / RESCHEDULE MEETING
  // PATCH /:meetingId
  // =======================================================
  updateMeeting: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.updateMeeting(
      req.user,
      req.params.meetingId,
      req.body ?? {}
    );

    return sendSuccess(
      res,
      "Meeting updated successfully",
      meeting
    );
  }),

  // =======================================================
  // CANCEL MEETING
  // PATCH /:meetingId/cancel
  // =======================================================
  cancelMeeting: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.cancelMeeting(
      req.user,
      req.params.meetingId
    );

    return sendSuccess(
      res,
      "Meeting cancelled successfully",
      meeting
    );
  }),

  // =======================================================
  // START MEETING
  // PATCH /:meetingId/start
  // =======================================================
  startMeeting: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.changeMeetingStatus(
      req.user,
      req.params.meetingId,
      "IN_PROGRESS"
    );

    return sendSuccess(
      res,
      "Meeting started successfully",
      meeting
    );
  }),

  // =======================================================
  // COMPLETE MEETING
  // PATCH /:meetingId/complete
  // =======================================================
  completeMeeting: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.changeMeetingStatus(
      req.user,
      req.params.meetingId,
      "COMPLETED"
    );

    return sendSuccess(
      res,
      "Meeting completed successfully",
      meeting
    );
  }),

  // =======================================================
  // MARK MEETING AS NO-SHOW
  // PATCH /:meetingId/no-show
  // =======================================================
  markNoShow: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.changeMeetingStatus(
      req.user,
      req.params.meetingId,
      "NO_SHOW"
    );

    return sendSuccess(
      res,
      "Meeting marked as no-show",
      meeting
    );
  }),

  // =======================================================
  // SAVE MEETING NOTES
  // PUT /:meetingId/notes
  // =======================================================
  saveNotes: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const content = req.body?.content;

    if (typeof content !== "string") {
      throw new ApiError(
        400,
        "Notes content must be a string"
      );
    }

    const notes = await MeetingsService.saveNotes(
      req.user,
      req.params.meetingId,
      content
    );

    return sendSuccess(
      res,
      "Meeting notes saved successfully",
      notes
    );
  }),

  // =======================================================
  // ADD DISCUSSION POINT
  // POST /:meetingId/discussion-points
  // =======================================================
  addDiscussionPoint: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");
    requireString(req.body?.content, "Discussion point content");

    const point = await MeetingsService.addDiscussionPoint(
      req.user,
      req.params.meetingId,
      req.body.content
    );

    return sendSuccess(
      res,
      "Discussion point added successfully",
      point,
      201
    );
  }),

  // =======================================================
  // UPDATE DISCUSSION POINT
  // PATCH /:meetingId/discussion-points/:pointId
  // =======================================================
  updateDiscussionPoint: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");
    requireParam(req.params.pointId, "pointId");
    requireString(req.body?.content, "Discussion point content");

    const point = await MeetingsService.updateDiscussionPoint(
      req.user,
      req.params.meetingId,
      req.params.pointId,
      req.body.content
    );

    return sendSuccess(
      res,
      "Discussion point updated successfully",
      point
    );
  }),

  // =======================================================
  // DELETE DISCUSSION POINT
  // DELETE /:meetingId/discussion-points/:pointId
  // =======================================================
  deleteDiscussionPoint: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");
    requireParam(req.params.pointId, "pointId");

    const result = await MeetingsService.deleteDiscussionPoint(
      req.user,
      req.params.meetingId,
      req.params.pointId
    );

    return sendSuccess(
      res,
      "Discussion point deleted successfully",
      result
    );
  }),

  // =======================================================
  // SAVE MENTOR FEEDBACK
  // PUT /:meetingId/feedback
  // =======================================================
  saveFeedback: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    if (!req.body || typeof req.body !== "object") {
      throw new ApiError(400, "Feedback payload is required");
    }

    const feedback = await MeetingsService.saveFeedback(
      req.user,
      req.params.meetingId,
      req.body
    );

    return sendSuccess(
      res,
      "Mentor feedback saved successfully",
      feedback
    );
  }),

  // =======================================================
  // SCHEDULE FOLLOW-UP MEETING
  // POST /:meetingId/follow-ups
  // =======================================================
  scheduleFollowUp: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.scheduleFollowUp(
      req.user,
      req.params.meetingId,
      req.body ?? {}
    );

    return sendSuccess(
      res,
      "Follow-up meeting scheduled successfully",
      meeting,
      201
    );
  }),

  // =======================================================
  // CREATE RECURRING MEETING SERIES
  // POST /recurring
  // =======================================================
  createRecurringSeries: asyncHandler(async (req, res) => {
    const result = await MeetingsService.createRecurringSeries(
      req.user,
      req.body ?? {}
    );

    return sendSuccess(
      res,
      "Recurring meetings created successfully",
      result,
      201
    );
  }),

  // =======================================================
  // LIST RECURRING MEETING SERIES
  // GET /recurring
  // =======================================================
  listRecurringSeries: asyncHandler(async (req, res) => {
    const series = await MeetingsService.listRecurringSeries(
      req.user
    );

    return sendSuccess(
      res,
      "Recurring meeting series retrieved successfully",
      series
    );
  }),

  // =======================================================
  // CANCEL RECURRING MEETING SERIES
  // PATCH /recurring/:seriesId/cancel
  // =======================================================
  cancelRecurringSeries: asyncHandler(async (req, res) => {
    requireParam(req.params.seriesId, "seriesId");

    const result = await MeetingsService.cancelRecurringSeries(
      req.user,
      req.params.seriesId
    );

    return sendSuccess(
      res,
      "Recurring series cancelled successfully",
      result
    );
  }),

  // =======================================================
  // LIST STUDENT MEETINGS
  // GET /student
  // =======================================================
  listStudentMeetings: asyncHandler(async (req, res) => {
    const meetings = await MeetingsService.listStudentMeetings(
      req.user,
      req.query
    );

    return sendSuccess(
      res,
      "Student meetings retrieved successfully",
      meetings
    );
  }),

  // =======================================================
  // GET SINGLE STUDENT MEETING
  // GET /student/:meetingId
  // =======================================================
  getStudentMeeting: asyncHandler(async (req, res) => {
    requireParam(req.params.meetingId, "meetingId");

    const meeting = await MeetingsService.getStudentMeeting(
      req.user,
      req.params.meetingId
    );

    return sendSuccess(
      res,
      "Student meeting retrieved successfully",
      meeting
    );
  }),
};

export default MeetingsController;