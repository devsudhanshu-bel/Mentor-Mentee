
import React, { useMemo, useState } from "react";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CalendarCheck2,
} from "lucide-react";

import MeetingListItem from "./MeetingListItem";

// =========================================================
// CONSTANTS
// =========================================================

const TERMINAL_STATUSES = [
  "COMPLETED",
  "CANCELLED",
  "CANCELED",
  "NO_SHOW",
];

// =========================================================
// HELPERS
// =========================================================

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getMeetingId = (meeting) =>
  meeting?.id ??
  meeting?.meetingId ??
  meeting?.meeting_id ??
  meeting?.rawMeeting?.id ??
  null;

const getMeetingStart = (meeting) =>
  meeting?.startAt ??
  meeting?.startTime ??
  meeting?.scheduledAt ??
  meeting?.scheduledStart ??
  meeting?.start_time ??
  null;

const getMeetingEnd = (meeting) =>
  meeting?.endAt ??
  meeting?.endTime ??
  meeting?.scheduledEnd ??
  meeting?.end_time ??
  null;

const toValidDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const isMeetingUpcoming = (meeting) => {
  const startAt = toValidDate(getMeetingStart(meeting));
  const status = normalizeStatus(meeting?.status);

  return (
    startAt !== null &&
    !TERMINAL_STATUSES.includes(status) &&
    status !== "IN_PROGRESS"
  );
};

// Monday is the first day of the displayed week.
const getWeekStart = (date) => {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  const day = result.getDay();
  const daysSinceMonday = (day + 6) % 7;

  result.setDate(result.getDate() - daysSinceMonday);

  return result;
};

const addDays = (date, numberOfDays) => {
  const result = new Date(date);

  result.setDate(result.getDate() + numberOfDays);

  return result;
};

const isSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const formatDateRange = (start, end) => {
  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${start.toLocaleDateString("en-US", {
      month: "short",
    })} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} – ${end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Unable to refresh meetings.";

const formatMeeting = (meeting) => {
  const startAt = toValidDate(getMeetingStart(meeting));
  const endAt = toValidDate(getMeetingEnd(meeting));

  if (!startAt) return null;

  const dateParts = {
    month: startAt
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(),

    date: String(startAt.getDate()).padStart(2, "0"),

    day: startAt
      .toLocaleString("en-US", { weekday: "short" })
      .toUpperCase(),
  };

  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
  };

  const startTime = startAt.toLocaleTimeString(
    "en-US",
    timeOptions
  );

  const endTime = endAt
    ? endAt.toLocaleTimeString("en-US", timeOptions)
    : null;

  const mode = String(meeting?.mode ?? "").toUpperCase();

  const type =
    mode === "ONLINE"
      ? "Online"
      : mode === "IN_PERSON"
        ? "In Person"
        : meeting?.meetingType ?? "Meeting";

  const location =
    mode === "ONLINE"
      ? meeting?.meetingLink || "Online meeting"
      : meeting?.venue || "Location not specified";

  return {
    ...dateParts,

    time: endTime
      ? `${startTime} - ${endTime}`
      : startTime,

    type,
    title: meeting?.title || "Mentorship Meeting",
    location,

    agenda:
      meeting?.agenda ||
      meeting?.description ||
      "No agenda provided.",

    description: meeting?.description ?? "",
    status: meeting?.status,

    // Preserve the original meeting and identifiers.
    id: meeting?.id ?? meeting?.meetingId ?? null,
    meetingId: getMeetingId(meeting),

    startAt: getMeetingStart(meeting),
    endAt: getMeetingEnd(meeting),

    rawMeeting: meeting,

    studentId:
      meeting?.studentId ??
      meeting?.student?.id ??
      null,

    studentName:
      meeting?.student?.fullName ??
      meeting?.studentName ??
      meeting?.student?.name ??
      "Student",

    student: meeting?.student ?? null,

    meetingType: meeting?.meetingType,
    mode: meeting?.mode,
    priority: meeting?.priority,

    meetingLink: meeting?.meetingLink,
    venue: meeting?.venue,

    seriesId:
      meeting?.seriesId ??
      meeting?.series?.id ??
      null,
  };
};

// =========================================================
// UPCOMING MEETINGS
// =========================================================

const UpcomingMeetings = ({
  meetings: suppliedMeetings = [],

  onStartMeeting = () => {},
  onViewDetails = () => {},
  onEditMeeting = () => {},
  onCancelMeeting = () => {},

  onRefresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Offset 0 = current week, 1 = next week, -1 = previous week.
  const [weekOffset, setWeekOffset] = useState(0);

  const sourceMeetings = Array.isArray(suppliedMeetings)
    ? suppliedMeetings
    : [];

  const today = new Date();

  const currentWeekStart = getWeekStart(today);

  const selectedWeekStart = addDays(
    currentWeekStart,
    weekOffset * 7
  );

  const selectedWeekEnd = addDays(selectedWeekStart, 6);

  // =======================================================
  // FILTER AND SORT
  // =======================================================

  const upcomingMeetings = useMemo(() => {
    const now = new Date();

    return sourceMeetings
      .filter((meeting) => {
        if (!isMeetingUpcoming(meeting)) return false;

        const startAt = toValidDate(getMeetingStart(meeting));

        return startAt >= now;
      })
      .sort((a, b) => {
        const dateA = toValidDate(getMeetingStart(a));
        const dateB = toValidDate(getMeetingStart(b));

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateA.getTime() - dateB.getTime();
      });
  }, [sourceMeetings]);

  // Every generated recurring occurrence is treated as an
  // ordinary meeting record with its own date and meeting ID.
  const selectedWeekMeetings = useMemo(() => {
    const start = new Date(selectedWeekStart);
    start.setHours(0, 0, 0, 0);

    const end = addDays(selectedWeekStart, 7);
    end.setHours(0, 0, 0, 0);

    return upcomingMeetings.filter((meeting) => {
      const startAt = toValidDate(getMeetingStart(meeting));

      return startAt && startAt >= start && startAt < end;
    });
  }, [upcomingMeetings, selectedWeekStart]);

  const displayedMeetings = showAll
    ? selectedWeekMeetings
    : selectedWeekMeetings.slice(0, 4);

  const isCurrentWeek = weekOffset === 0;

  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh = async () => {
    if (!onRefresh || refreshing) return;

    setRefreshing(true);
    setError("");

    try {
      const result = await onRefresh();

      if (result === null || result === false) {
        setError("Unable to refresh meetings. Please try again.");
      }
    } catch (err) {
      console.error(
        "Failed to refresh upcoming meetings:",
        err
      );

      setError(getErrorMessage(err));
    } finally {
      setRefreshing(false);
    }
  };

  // =======================================================
  // WEEK NAVIGATION
  // =======================================================

  const handlePreviousWeek = () => {
    setWeekOffset((current) => current - 1);
    setShowAll(false);
    setError("");
  };

  const handleNextWeek = () => {
    setWeekOffset((current) => current + 1);
    setShowAll(false);
    setError("");
  };

  const handleCurrentWeek = () => {
    setWeekOffset(0);
    setShowAll(false);
    setError("");
  };

  // =======================================================
  // ACTION HANDLERS
  // =======================================================

  const handleMeetingAction = (callback, meeting) => {
    if (typeof callback !== "function") return;

    callback(meeting?.rawMeeting ?? meeting);
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays
            size={18}
            className="shrink-0 text-blue-600"
          />

          <h2 className="text-[16px] font-semibold text-slate-800">
            Upcoming Meetings
          </h2>

          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
            {selectedWeekMeetings.length}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing || !onRefresh}
          aria-label="Refresh upcoming meetings"
          title="Refresh meetings"
          className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={refreshing ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Selected week */}
      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handlePreviousWeek}
            aria-label="Show previous week"
            title="Previous week"
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="min-w-0 flex-1 text-center">
            <p className="text-[13px] font-semibold text-slate-800">
              {isCurrentWeek ? "This Week" : "Selected Week"}
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              {formatDateRange(
                selectedWeekStart,
                selectedWeekEnd
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleNextWeek}
            aria-label="Show next week"
            title="Next week"
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ChevronRight size={17} />
          </button>
        </div>

        {!isCurrentWeek && (
          <button
            type="button"
            onClick={handleCurrentWeek}
            className="mt-2 flex w-full items-center justify-center gap-1.5 text-[11px] font-semibold text-blue-600 transition hover:text-blue-700"
          >
            <CalendarCheck2 size={13} />
            Return to This Week
          </button>
        )}
      </div>

      {/* Refresh error */}
      {error && (
        <div
          role="alert"
          className="mb-3 rounded-xl border border-red-100 bg-red-50 p-3"
        >
          <p className="text-sm text-red-700">{error}</p>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || !onRefresh}
            className="mt-2 text-sm font-semibold text-red-700 underline disabled:opacity-50"
          >
            Try again
          </button>
        </div>
      )}

      {/* Meeting list */}
      {!error && selectedWeekMeetings.length > 0 && (
        <div className="space-y-2.5">
          {displayedMeetings.map((meeting, index) => {
            const formattedMeeting = formatMeeting(meeting);

            if (!formattedMeeting) return null;

            const meetingId = getMeetingId(meeting);

            return (
              <MeetingListItem
                key={
                  meetingId ??
                  `${getMeetingStart(meeting)}-${index}`
                }
                meeting={formattedMeeting}
                onStartMeeting={(item) =>
                  handleMeetingAction(
                    onStartMeeting,
                    item ?? formattedMeeting
                  )
                }
                onViewDetails={(item) =>
                  handleMeetingAction(
                    onViewDetails,
                    item ?? formattedMeeting
                  )
                }
                onEditMeeting={(item) =>
                  handleMeetingAction(
                    onEditMeeting,
                    item ?? formattedMeeting
                  )
                }
                onCancelMeeting={(item) =>
                  handleMeetingAction(
                    onCancelMeeting,
                    item ?? formattedMeeting
                  )
                }
              />
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!error && selectedWeekMeetings.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
          <CalendarDays
            size={30}
            className="mb-3 text-slate-300"
          />

          <p className="text-sm font-semibold text-slate-700">
            No upcoming meetings this week
          </p>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
            Meetings scheduled for this week will appear here.
            Use the arrows above to view another week.
          </p>

          {!isCurrentWeek && (
            <button
              type="button"
              onClick={handleCurrentWeek}
              className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Return to This Week
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      {!error && selectedWeekMeetings.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 text-[12px] font-semibold text-blue-600 transition hover:text-blue-700"
        >
          {showAll
            ? "Show Less"
            : `View All ${selectedWeekMeetings.length} Meetings`}

          <ChevronRight
            size={14}
            className={showAll ? "rotate-90" : ""}
          />
        </button>
      )}
    </div>
  );
};

export default UpcomingMeetings;
