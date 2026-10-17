import React, { useMemo, useState } from "react";
import {
  Clock3,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  X,
  Star,
  MessageSquare,
} from "lucide-react";

/* =========================================================
   COMMON HELPERS
========================================================= */

const getText = (value) => {
  if (typeof value === "string") return value.trim();

  if (typeof value === "number") return String(value);

  if (value && typeof value === "object") {
    return String(
      value.content ??
        value.text ??
        value.notes ??
        value.remarks ??
        value.description ??
        ""
    ).trim();
  }

  return "";
};

const getMeetingDate = (meeting) => {
  const value =
    meeting?.startAt ??
    meeting?.startTime ??
    meeting?.scheduledAt ??
    meeting?.scheduledStart ??
    meeting?.start_time ??
    meeting?.date ??
    meeting?.rawMeeting?.startAt ??
    meeting?.rawMeeting?.startTime ??
    null;

  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (date) => ({
  month: date
    .toLocaleString("en-IN", { month: "short" })
    .toUpperCase(),
  day: String(date.getDate()).padStart(2, "0"),
});

const formatTime = (date) =>
  date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const getTimeRange = (meeting, startDate) => {
  const endValue =
    meeting?.endAt ??
    meeting?.endTime ??
    meeting?.scheduledEnd ??
    meeting?.end_time ??
    meeting?.rawMeeting?.endAt ??
    meeting?.rawMeeting?.endTime;

  const endDate = endValue ? new Date(endValue) : null;

  if (endDate && !Number.isNaN(endDate.getTime())) {
    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  }

  return formatTime(startDate);
};

/* =========================================================
   MEETING NOTES
========================================================= */

const getNotes = (meeting) => {
  const candidates = [
    meeting?.mentor_meeting_notes,
    meeting?.mentorMeetingNotes,
    meeting?.notes,
    meeting?.meetingNotes,
    meeting?.rawMeeting?.mentor_meeting_notes,
    meeting?.rawMeeting?.mentorMeetingNotes,
    meeting?.rawMeeting?.notes,
    meeting?.rawMeeting?.meetingNotes,
  ];

  for (const notes of candidates) {
    if (Array.isArray(notes)) {
      const content = notes
        .map((note) => getText(note))
        .filter(Boolean)
        .join("\n\n");

      if (content) return content;
      continue;
    }

    const text = getText(notes);

    if (text) return text;
  }

  return "";
};

/* =========================================================
   DISCUSSION TOPIC
========================================================= */

const getTopic = (meeting) => {
  const directTopic =
    getText(meeting?.agenda) ||
    getText(meeting?.description) ||
    getText(meeting?.rawMeeting?.agenda) ||
    getText(meeting?.rawMeeting?.description);

  if (directTopic) return directTopic;

  const points =
    meeting?.mentor_meeting_discussion_points ??
    meeting?.discussionPoints ??
    meeting?.discussion_points ??
    meeting?.rawMeeting?.mentor_meeting_discussion_points ??
    meeting?.rawMeeting?.discussionPoints ??
    [];

  if (Array.isArray(points)) {
    const content = points
      .map((point) => getText(point))
      .filter(Boolean)
      .join(", ");

    if (content) return content;
  }

  return "No discussion details added";
};

/* =========================================================
   MEETING STATUS
========================================================= */

const getStatus = (status) => {
  const normalized = String(status || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  if (normalized === "COMPLETED") return "Completed";
  if (normalized === "IN_PROGRESS") return "In progress";
  if (normalized === "NO_SHOW") return "Missed";

  if (["CANCELLED", "CANCELED"].includes(normalized)) {
    return "Cancelled";
  }

  if (normalized === "SCHEDULED") return "Scheduled";

  return status || "Past meeting";
};

/* =========================================================
   MENTOR FEEDBACK HELPERS
========================================================= */

// Supports Prisma relation names and common API aliases.
// Also handles a wrapped meeting or an array of feedback records.
const getMeetingFeedback = (meeting) => {
  if (!meeting || typeof meeting !== "object") return null;

  const raw = meeting.rawMeeting;

  const candidates = [
    meeting.mentor_meeting_feedback,
    meeting.mentorMeetingFeedback,
    meeting.mentor_feedback,
    meeting.mentorFeedback,
    meeting.mentor_meeting_feedbacks,
    meeting.mentorMeetingFeedbacks,
    meeting.feedback,

    raw?.mentor_meeting_feedback,
    raw?.mentorMeetingFeedback,
    raw?.mentor_feedback,
    raw?.mentorFeedback,
    raw?.mentor_meeting_feedbacks,
    raw?.mentorMeetingFeedbacks,
    raw?.feedback,

    meeting.summary?.mentor_meeting_feedback,
    meeting.summary?.mentorMeetingFeedback,
    meeting.summary?.feedback,

    raw?.summary?.mentor_meeting_feedback,
    raw?.summary?.mentorMeetingFeedback,
    raw?.summary?.feedback,
  ];

  for (const value of candidates) {
    if (Array.isArray(value)) {
      const record = value.find(
        (item) => item && typeof item === "object"
      );

      if (record) return record;

      continue;
    }

    if (value && typeof value === "object") {
      return value;
    }
  }

  // Handle a response that places rating fields directly on
  // the meeting rather than inside a feedback relation.
  const directRating =
    meeting.rating ??
    meeting.mentorRating ??
    meeting.mentor_rating ??
    raw?.rating ??
    raw?.mentorRating ??
    raw?.mentor_rating;

  if (
    directRating !== undefined &&
    directRating !== null &&
    directRating !== ""
  ) {
    return {
      rating: directRating,
      feedback:
        meeting.mentorFeedbackText ??
        meeting.mentor_feedback_text ??
        raw?.mentorFeedbackText ??
        raw?.mentor_feedback_text ??
        "",
    };
  }

  return null;
};

const getValidRating = (feedback) => {
  if (!feedback) return null;

  const value = feedback.rating;

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const rating = Number(value);

  return Number.isInteger(rating) && rating >= 1 && rating <= 5
    ? rating
    : null;
};

const getFeedbackComments = (meeting, feedback) => {
  const candidates = [
    feedback?.feedback,
    feedback?.comments,
    feedback?.comment,
    feedback?.remarks,
    feedback?.feedbackText,
    feedback?.feedback_text,

    meeting?.mentorRemarks,
    meeting?.mentor_remarks,
    meeting?.mentorFeedbackText,
    meeting?.mentor_feedback_text,

    meeting?.rawMeeting?.mentorRemarks,
    meeting?.rawMeeting?.mentor_remarks,
    meeting?.rawMeeting?.mentorFeedbackText,
    meeting?.rawMeeting?.mentor_feedback_text,
  ];

  for (const candidate of candidates) {
    const text = getText(candidate);

    if (text) return text;
  }

  return "";
};

/* =========================================================
   MENTOR RATING DISPLAY
========================================================= */

const MentorRating = ({ meeting }) => {
  const feedback = getMeetingFeedback(meeting);

  const rating = getValidRating(feedback);

  const comments = getFeedbackComments(meeting, feedback);

  // Don't show an empty rating block if the meeting has no feedback.
  if (!feedback) return null;

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      {/* Saved star rating */}
      <div
        className="flex flex-wrap items-center gap-1"
        role="img"
        aria-label={
          rating !== null
            ? `Mentor rating: ${rating} out of 5 stars`
            : "No mentor rating submitted"
        }
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            strokeWidth={1.8}
            className={
              rating !== null && star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
            aria-hidden="true"
          />
        ))}

        <span className="ml-1 text-[11px] font-semibold text-slate-700">
          {rating !== null ? `${rating}/5` : "Not rated"}
        </span>
      </div>

      {/* Saved mentor comments */}
      {comments && (
        <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-5 text-slate-500">
          <MessageSquare
            size={12}
            className="mt-1 shrink-0 text-slate-400"
            aria-hidden="true"
          />

          <span className="whitespace-pre-wrap break-words">
            {comments}
          </span>
        </p>
      )}
    </div>
  );
};

/* =========================================================
   RECENT MEETINGS
========================================================= */

const RecentMeetings = ({
  meetings = [],
  loading = false,
  error = "",
  onRefresh,
}) => {
  const [expandedMeetingId, setExpandedMeetingId] = useState(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  const recentMeetings = useMemo(() => {
    const now = Date.now();

    const list = Array.isArray(meetings) ? meetings : [];

    return list
      .map((meeting, index) => {
        const rawMeeting = meeting?.rawMeeting ?? meeting;
        const date = getMeetingDate(meeting);

        // Preserve feedback from the original meeting object.
        const feedback =
          meeting?.mentor_meeting_feedback ??
          meeting?.mentorMeetingFeedback ??
          meeting?.mentor_feedback ??
          meeting?.mentorFeedback ??
          meeting?.feedback ??
          rawMeeting?.mentor_meeting_feedback ??
          rawMeeting?.mentorMeetingFeedback ??
          rawMeeting?.mentor_feedback ??
          rawMeeting?.mentorFeedback ??
          rawMeeting?.feedback ??
          null;

        return {
          ...meeting,
          rawMeeting,
          mentor_meeting_feedback: feedback,
          _date: date,
          _key:
            meeting?.id ??
            meeting?.meetingId ??
            meeting?.meeting_id ??
            rawMeeting?.id ??
            `${date?.getTime() ?? "meeting"}-${index}`,
        };
      })
      .filter((meeting) => {
        if (!meeting._date) return false;

        const status = String(meeting.status || "")
          .trim()
          .toUpperCase()
          .replace(/[\s-]+/g, "_");

        // Future meetings belong in Upcoming Meetings.
        if (meeting._date.getTime() > now) return false;

        // Cancelled meetings are excluded.
        if (["CANCELLED", "CANCELED"].includes(status)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b._date.getTime() - a._date.getTime());
  }, [meetings]);

  const visibleMeetings = recentMeetings.slice(0, 3);
  const hasMoreMeetings = recentMeetings.length > 3;

  /* =======================================================
     MEETING ITEM
  ======================================================= */

  const renderMeeting = (meeting) => {
    const date = meeting._date;
    const { month, day } = formatDate(date);

    const notes = getNotes(meeting);
    const isExpanded = expandedMeetingId === meeting._key;

    const mentorValue =
      meeting.teachers ??
      meeting.mentor ??
      meeting.rawMeeting?.teachers ??
      meeting.rawMeeting?.mentor;

    const mentor = Array.isArray(mentorValue)
      ? mentorValue[0]
      : mentorValue;

    const mentorName =
      mentor?.fullName ??
      mentor?.name ??
      meeting.mentorName ??
      meeting.mentor_name ??
      meeting.rawMeeting?.mentorName ??
      meeting.rawMeeting?.mentor_name ??
      "";

    return (
      <div
        key={meeting._key}
        className="rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Date and meeting information */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
              <span className="text-[9px] font-semibold text-slate-500">
                {month}
              </span>

              <span className="text-[16px] font-bold leading-none text-[#142970]">
                {day}
              </span>
            </div>

            <div className="min-w-0">
              <h4 className="break-words text-[13px] font-semibold text-[#142970]">
                {meeting.title || "Mentoring Meeting"}
              </h4>

              <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                <Clock3 size={12} />
                <span>{getTimeRange(meeting, date)}</span>
              </div>

              {mentorName && (
                <p className="mt-1 text-[11px] text-slate-500">
                  Mentor: {mentorName}
                </p>
              )}

              <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                {getStatus(meeting.status)}
              </span>
            </div>
          </div>

          {/* Expandable notes action */}
          <button
            type="button"
            disabled={!notes}
            onClick={() =>
              setExpandedMeetingId(
                isExpanded ? null : meeting._key
              )
            }
            title={
              notes
                ? "View meeting notes"
                : "No meeting notes available"
            }
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-500 px-3 py-2 text-[12px] font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
          >
            <FileText size={14} />
            View Notes

            {notes &&
              (isExpanded ? (
                <ChevronUp size={13} />
              ) : (
                <ChevronDown size={13} />
              ))}
          </button>
        </div>

        {/* Discussion topic */}
        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="text-[11px] font-semibold text-slate-600">
            Discussed about
          </p>

          <p className="mt-1 break-words text-[11px] text-slate-500">
            {getTopic(meeting)}
          </p>
        </div>

        {/* Expanded notes */}
        {isExpanded && notes && (
          <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
            <p className="mb-2 text-xs font-semibold text-[#142970]">
              Meeting Notes
            </p>

            <p className="whitespace-pre-wrap break-words text-xs text-slate-600">
              {notes}
            </p>
          </div>
        )}

        {/* Saved mentor rating and feedback */}
        <MentorRating meeting={meeting} />
      </div>
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <div className="h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-blue-600">
              Recent Meetings
            </h3>

            <p className="mt-1 text-[11px] text-slate-500">
              Your previous mentoring sessions
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasMoreMeetings && !loading && !error && (
              <button
                type="button"
                onClick={() => setIsViewAllOpen(true)}
                className="px-2 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline sm:text-[12px]"
              >
                View All ({recentMeetings.length})
              </button>
            )}

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                title="Refresh meetings"
                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-8 text-slate-500">
            <RefreshCw size={22} className="mb-2 animate-spin" />
            <p className="text-sm">Loading recent meetings...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="mt-3 text-sm font-semibold text-red-700 hover:underline"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && recentMeetings.length === 0 && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
              <CalendarDays size={22} className="text-slate-400" />
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No recent meetings
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your previous mentoring sessions will appear here.
            </p>
          </div>
        )}

        {/* Latest three meetings */}
        {!loading && !error && recentMeetings.length > 0 && (
          <div className="space-y-2">
            {visibleMeetings.map(renderMeeting)}
          </div>
        )}

        {/* Bottom View All */}
        {!loading && !error && hasMoreMeetings && (
          <div className="mt-3 flex justify-center border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => setIsViewAllOpen(true)}
              className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              View all recent meetings

              <span className="ml-1 font-normal text-slate-400">
                ({recentMeetings.length})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* View All modal */}
      {isViewAllOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsViewAllOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="recent-meetings-modal-title"
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
              <div>
                <h2
                  id="recent-meetings-modal-title"
                  className="text-base font-bold text-[#142970] sm:text-lg"
                >
                  All Recent Meetings
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {recentMeetings.length} previous{" "}
                  {recentMeetings.length === 1 ? "meeting" : "meetings"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsViewAllOpen(false)}
                aria-label="Close recent meetings"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* All meetings */}
            <div className="space-y-3 overflow-y-auto p-4 sm:p-5">
              {recentMeetings.map(renderMeeting)}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] text-slate-500">
                Showing all available recent meetings
              </p>

              <button
                type="button"
                onClick={() => setIsViewAllOpen(false)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentMeetings;