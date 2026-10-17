import React from "react";
import {
  Clock,
  MapPin,
  Video,
  Users,
  FileText,
  Star,
  MessageSquare,
} from "lucide-react";

import MeetingDateBadge from "./MeetingDateBadge";

/* =========================================================
   HELPERS
========================================================= */

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getStatusLabel = (status) => {
  const normalized = normalizeStatus(status);

  const labels = {
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    CANCELED: "Cancelled",
    NO_SHOW: "No Show",
    IN_PROGRESS: "In Progress",
    SCHEDULED: "Scheduled",
  };

  return labels[normalized] || normalized.replace(/_/g, " ");
};

const getStatusClasses = (status) => {
  const normalized = normalizeStatus(status);

  if (normalized === "COMPLETED") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (
    normalized === "CANCELLED" ||
    normalized === "CANCELED" ||
    normalized === "NO_SHOW"
  ) {
    return "bg-red-50 text-red-700";
  }

  if (normalized === "IN_PROGRESS") {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-slate-100 text-slate-600";
};

/**
 * Safely extracts text from strings, numbers,
 * or objects returned by the backend.
 */
const getText = (value) => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    return String(
      value.content ??
        value.text ??
        value.notes ??
        value.description ??
        value.remarks ??
        ""
    ).trim();
  }

  return "";
};

/**
 * Handles common variations in meeting mode values.
 */
const normalizeMode = (meeting) => {
  const rawMode =
    meeting?.mode ??
    meeting?.meetingMode ??
    meeting?.rawMeeting?.mode ??
    meeting?.rawMeeting?.meetingMode ??
    "";

  const normalized = String(rawMode)
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  if (
    normalized === "ONLINE" ||
    normalized === "VIRTUAL" ||
    normalized === "VIDEO_CALL"
  ) {
    return "ONLINE";
  }

  if (
    normalized === "IN_PERSON" ||
    normalized === "OFFLINE" ||
    normalized === "FACE_TO_FACE"
  ) {
    return "IN_PERSON";
  }

  return normalized;
};

/**
 * Reads student information from normalized frontend data
 * or the original backend response.
 */
const getStudentName = (meeting) => {
  const student = meeting?.student;
  const rawStudent =
    meeting?.rawMeeting?.student ??
    meeting?.rawMeeting?.students;

  const candidates = [
    typeof student === "string" ? student : null,
    student?.name,
    student?.fullName,
    student?.user?.name,
    student?.user?.fullName,
    rawStudent?.name,
    rawStudent?.fullName,
    rawStudent?.user?.name,
    rawStudent?.user?.fullName,
    meeting?.studentName,
    meeting?.rawMeeting?.studentName,
  ];

  return (
    candidates.find(
      (value) =>
        typeof value === "string" && value.trim().length > 0
    )?.trim() || ""
  );
};

/**
 * Reads meeting notes and discussion points from common
 * backend response shapes.
 */
const getMeetingNotes = (meeting) => {
  const candidates = [
    meeting?.notes,
    meeting?.meetingNotes,
    meeting?.mentor_meeting_notes,
    meeting?.rawMeeting?.notes,
    meeting?.rawMeeting?.meetingNotes,
    meeting?.rawMeeting?.mentor_meeting_notes,
  ];

  for (const candidate of candidates) {
    const text = getText(candidate);

    if (text) {
      return text;
    }
  }

  const discussionPoints =
    meeting?.discussionPoints ??
    meeting?.discussion_points ??
    meeting?.mentor_meeting_discussion_points ??
    meeting?.rawMeeting?.discussionPoints ??
    meeting?.rawMeeting?.mentor_meeting_discussion_points ??
    [];

  if (Array.isArray(discussionPoints)) {
    const formattedPoints = discussionPoints
      .map((point) => {
        if (typeof point === "string") {
          return point.trim();
        }

        return String(
          point?.content ??
            point?.text ??
            point?.title ??
            point?.description ??
            ""
        ).trim();
      })
      .filter(Boolean);

    if (formattedPoints.length > 0) {
      return formattedPoints.join(" • ");
    }
  }

  return "";
};

/**
 * Finds a meaningful meeting location.
 */
const getMeetingLocation = (meeting, mode) => {
  const candidates =
    mode === "ONLINE"
      ? [
          meeting?.meetingLink,
          meeting?.location,
          meeting?.venue,
          meeting?.rawMeeting?.meetingLink,
          meeting?.rawMeeting?.location,
          meeting?.rawMeeting?.venue,
        ]
      : [
          meeting?.location,
          meeting?.venue,
          meeting?.rawMeeting?.location,
          meeting?.rawMeeting?.venue,
          meeting?.meetingLink,
          meeting?.rawMeeting?.meetingLink,
        ];

  for (const candidate of candidates) {
    const text = getText(candidate);

    if (text) {
      return text;
    }
  }

  return "";
};

/**
 * Reads the saved feedback relation from the meeting.
 */
const getMeetingFeedback = (meeting) => {
  const value =
    meeting?.mentor_meeting_feedback ??
    meeting?.mentorMeetingFeedback ??
    meeting?.mentor_feedback ??
    meeting?.mentorFeedback ??
    meeting?.feedback ??
    meeting?.rawMeeting?.mentor_meeting_feedback ??
    meeting?.rawMeeting?.mentorMeetingFeedback ??
    meeting?.rawMeeting?.mentor_feedback ??
    meeting?.rawMeeting?.mentorFeedback ??
    meeting?.rawMeeting?.feedback ??
    null;

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value && typeof value === "object" ? value : null;
};

/**
 * Accepts only valid integer ratings between 1 and 5.
 */
const getValidRating = (feedback) => {
  if (
    !feedback ||
    feedback.rating === null ||
    feedback.rating === undefined ||
    feedback.rating === ""
  ) {
    return null;
  }

  const rating = Number(feedback.rating);

  return Number.isInteger(rating) && rating >= 1 && rating <= 5
    ? rating
    : null;
};

/* =========================================================
   MEETING RATING
========================================================= */

const MeetingRating = ({ meeting }) => {
  const feedback = getMeetingFeedback(meeting);
  const rating = getValidRating(feedback);

  const feedbackText = getText(
    feedback?.feedback ??
      feedback?.comments ??
      feedback?.remarks ??
      feedback?.comment ??
      ""
  );

  // Keep the meeting row compact when no feedback exists.
  if (!feedback) {
    return null;
  }

  return (
    <div className="mt-2 space-y-1.5">
      {/* Stars */}
      <div
        className="flex flex-wrap items-center gap-1"
        role="img"
        aria-label={
          rating !== null
            ? `Mentor rating: ${rating} out of 5 stars`
            : "No valid mentor rating"
        }
      >
        <Star
          size={12}
          className="mr-0.5 text-amber-500"
          aria-hidden="true"
        />

        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            strokeWidth={1.8}
            className={
              rating !== null && star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
            aria-hidden="true"
          />
        ))}

        <span className="ml-1 text-[11px] font-semibold text-slate-600">
          {rating !== null ? `${rating}/5` : "Not rated"}
        </span>
      </div>

      {/* Written feedback */}
      {feedbackText && (
        <p className="flex items-start gap-1.5 text-[11px] leading-4 text-slate-500">
          <MessageSquare
            size={12}
            className="mt-0.5 shrink-0 text-slate-400"
            aria-hidden="true"
          />

          <span className="line-clamp-2 break-words">
            {feedbackText}
          </span>
        </p>
      )}
    </div>
  );
};

/* =========================================================
   RECENT MEETING ITEM
========================================================= */

const RecentMeetingItem = ({
  meeting,
  onView = () => {},
}) => {
  if (!meeting) return null;

  const status = normalizeStatus(meeting.status);
  const mode = normalizeMode(meeting);

  const location = getMeetingLocation(meeting, mode);
  const notes = getMeetingNotes(meeting);
  const hasNotes = Boolean(notes);

  const meetingType =
    getText(meeting.type) ||
    getText(meeting.meetingType) ||
    getText(meeting.rawMeeting?.type) ||
    getText(meeting.rawMeeting?.meetingType) ||
    (mode === "ONLINE"
      ? "Online"
      : mode === "IN_PERSON"
        ? "In Person"
        : "Meeting");

  const studentName = getStudentName(meeting);

  const title =
    getText(meeting.title) || "Mentorship Meeting";

  const time =
    getText(meeting.time) || "Time not available";

  const handleView = () => {
    onView(meeting);
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
      {/* LEFT: DATE AND MEETING DETAILS */}
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <MeetingDateBadge
          month={meeting.month}
          date={meeting.date}
          day={meeting.day}
        />

        <div className="min-w-0 flex-1">
          {/* Meeting Title */}
          <h3 className="break-words text-[14px] font-semibold text-slate-800">
            {title}
          </h3>

          {/* Time and Meeting Type */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock size={11} className="shrink-0" />
              <span>{time}</span>
            </span>

            <span className="inline-flex items-center gap-1">
              {mode === "ONLINE" ? (
                <Video size={11} className="shrink-0" />
              ) : (
                <Users size={11} className="shrink-0" />
              )}

              <span>{meetingType}</span>
            </span>
          </div>

          {/* Student Name */}
          {studentName && (
            <p className="mt-1 truncate text-[11px] text-slate-500">
              Student: {studentName}
            </p>
          )}

          {/* Meeting Location */}
          {location && (
            <p className="mt-1 flex min-w-0 items-center gap-1 text-[11px] text-slate-500">
              {mode === "ONLINE" ? (
                <Video size={11} className="shrink-0" />
              ) : (
                <MapPin size={11} className="shrink-0" />
              )}

              <span
                className="truncate"
                title={location}
              >
                {location}
              </span>
            </p>
          )}

          {/* Meeting Status */}
          <div className="mt-2">
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusClasses(status)}`}
            >
              {getStatusLabel(status)}
            </span>
          </div>

          {/* Saved Rating and Feedback */}
          <MeetingRating meeting={meeting} />
        </div>

        {/* MEETING NOTES */}
        <div className="hidden w-[180px] shrink-0 xl:block">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700">
            <FileText
              size={13}
              className="text-slate-500"
              aria-hidden="true"
            />
            Meeting Notes
          </p>

          <p
            className="mt-1 line-clamp-3 break-words text-[11px] leading-4 text-slate-500"
            title={hasNotes ? notes : undefined}
          >
            {hasNotes
              ? notes
              : "No notes available yet."}
          </p>
        </div>
      </div>

      {/* VIEW NOTES BUTTON */}
      <div className="ml-1 shrink-0">
        <button
          type="button"
          onClick={handleView}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-300 px-3 py-1.5 text-[12px] font-medium text-blue-600 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label={`View notes for ${title}`}
        >
          <FileText size={13} aria-hidden="true" />
          <span>View Notes</span>
        </button>
      </div>
    </div>
  );
};

export default RecentMeetingItem;