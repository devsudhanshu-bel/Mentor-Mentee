
import React, { useMemo, useState } from "react";
import {
  Clock3,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  X,
  UserRound,
} from "lucide-react";

const getMeetingDate = (meeting) => {
  const value =
    meeting.startAt ??
    meeting.startTime ??
    meeting.scheduledAt ??
    meeting.date;

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
  const endValue = meeting.endAt ?? meeting.endTime;
  const endDate = endValue ? new Date(endValue) : null;

  if (endDate && !Number.isNaN(endDate.getTime())) {
    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  }

  return formatTime(startDate);
};

const getNotes = (meeting) => {
  const notes = meeting.mentor_meeting_notes ?? meeting.notes;

  if (Array.isArray(notes)) {
    return notes
      .map((note) => note?.content)
      .filter(Boolean)
      .join("\n\n");
  }

  if (typeof notes === "string") return notes;

  return notes?.content ?? "";
};

const getTopic = (meeting) =>
  meeting.agenda ||
  meeting.description ||
  meeting.mentor_meeting_discussion_points
    ?.map((point) => point.content)
    .filter(Boolean)
    .join(", ") ||
  "No discussion details added";

const getStatus = (status) => {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "COMPLETED") return "Completed";
  if (normalized === "IN_PROGRESS") return "In progress";
  if (normalized === "NO_SHOW") return "Missed";
  if (normalized === "CANCELLED" || normalized === "CANCELED") {
    return "Cancelled";
  }

  return status || "Past meeting";
};

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
        const date = getMeetingDate(meeting);

        return {
          ...meeting,
          _date: date,
          _key:
            meeting.id ??
            meeting.meetingId ??
            `${date?.getTime()}-${index}`,
        };
      })
      .filter((meeting) => {
        if (!meeting._date) return false;

        const status = String(meeting.status || "").toUpperCase();

        // Future meetings belong in Upcoming Meetings.
        if (meeting._date.getTime() > now) return false;

        // Exclude cancelled meetings.
        if (["CANCELLED", "CANCELED"].includes(status)) return false;

        return true;
      })
      .sort((a, b) => b._date.getTime() - a._date.getTime());
  }, [meetings]);

  const visibleMeetings = recentMeetings.slice(0, 3);
  const hasMoreMeetings = recentMeetings.length > 3;

  const renderMeeting = (meeting) => {
    const date = meeting._date;
    const { month, day } = formatDate(date);
    const notes = getNotes(meeting);
    const isExpanded = expandedMeetingId === meeting._key;

    const mentorName =
      meeting.teachers?.fullName ||
      meeting.mentor?.fullName ||
      meeting.mentorName;

    return (
      <div
        key={meeting._key}
        className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Date and meeting information */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-semibold text-slate-500">
                {month}
              </span>
              <span className="text-[16px] font-bold text-[#142970] leading-none">
                {day}
              </span>
            </div>

            <div className="min-w-0">
              <h4 className="text-[13px] font-semibold text-[#142970] break-words">
                {meeting.title || "Mentoring Meeting"}
              </h4>

              <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                <Clock3 size={12} />
                <span>{getTimeRange(meeting, date)}</span>
              </div>

              {mentorName && (
                <p className="text-[11px] text-slate-500 mt-1">
                  Mentor: {mentorName}
                </p>
              )}

              <span className="inline-flex mt-2 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                {getStatus(meeting.status)}
              </span>
            </div>
          </div>

          {/* Notes action */}
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
            className="flex-shrink-0 flex items-center justify-center gap-2 border border-blue-500 text-blue-600 rounded-lg px-3 py-2 text-[12px] font-medium hover:bg-blue-50 transition disabled:border-slate-200 disabled:text-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed"
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

        {/* Agenda */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-600">
            Discussed about
          </p>
          <p className="text-[11px] text-slate-500 mt-1 break-words">
            {getTopic(meeting)}
          </p>
        </div>

        {/* Expandable notes */}
        {isExpanded && notes && (
          <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
            <p className="text-xs font-semibold text-[#142970] mb-2">
              Meeting Notes
            </p>
            <p className="text-xs text-slate-600 whitespace-pre-wrap break-words">
              {notes}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-semibold text-blue-600">
              Recent Meetings
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Your previous mentoring sessions
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasMoreMeetings && !loading && !error && (
              <button
                type="button"
                onClick={() => setIsViewAllOpen(true)}
                className="text-[11px] sm:text-[12px] font-semibold text-blue-600 hover:text-blue-800 hover:underline px-2 py-1"
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
                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 disabled:opacity-50 transition"
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
          <div className="py-8 flex flex-col items-center text-slate-500">
            <RefreshCw size={22} className="animate-spin mb-2" />
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
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
              <CalendarDays size={22} className="text-slate-400" />
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No recent meetings
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Your previous mentoring sessions will appear here.
            </p>
          </div>
        )}

        {/* Only the latest three meetings */}
        {!loading && !error && recentMeetings.length > 0 && (
          <div className="space-y-2">
            {visibleMeetings.map(renderMeeting)}
          </div>
        )}

        {/* Bottom View All */}
        {!loading && !error && hasMoreMeetings && (
          <div className="flex justify-center mt-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsViewAllOpen(true)}
              className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              View all recent meetings
              <span className="ml-1 text-slate-400 font-normal">
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
            className="bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between gap-4 p-5 border-b border-slate-200">
              <div>
                <h2
                  id="recent-meetings-modal-title"
                  className="text-base sm:text-lg font-bold text-[#142970]"
                >
                  All Recent Meetings
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {recentMeetings.length} previous{" "}
                  {recentMeetings.length === 1 ? "meeting" : "meetings"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsViewAllOpen(false)}
                aria-label="Close recent meetings"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal meeting list */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
              {recentMeetings.map(renderMeeting)}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between gap-3 p-4 border-t border-slate-200 bg-slate-50">
              <p className="text-[11px] text-slate-500">
                Showing all available recent meetings
              </p>

              <button
                type="button"
                onClick={() => setIsViewAllOpen(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
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
