import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Video,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Eye,
  Pencil,
  XCircle,
  Play,
  RefreshCw,
  CalendarCheck,
  AlertCircle,
  Search,
  Calendar,
  X,
} from "lucide-react";

// ==========================================================
// HELPERS
// ==========================================================

const getMeetingDate = (meeting) => {
  const value =
    meeting?.startAt ??
    meeting?.startTime ??
    meeting?.scheduledAt ??
    meeting?.scheduledStart ??
    meeting?.start_time ??
    meeting?.date ??
    null;

  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getMeetingEndDate = (meeting) => {
  const value =
    meeting?.endAt ??
    meeting?.endTime ??
    meeting?.scheduledEnd ??
    meeting?.end_time ??
    null;

  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getMeetingStatus = (meeting) =>
  String(meeting?.status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getMeetingTitle = (meeting) =>
  meeting?.title ??
  meeting?.topic ??
  meeting?.meetingTitle ??
  meeting?.agenda ??
  "Mentor–Mentee Meeting";

const getStudentName = (meeting) => {
  if (meeting?.studentName) return meeting.studentName;

  if (typeof meeting?.student === "string") {
    return meeting.student;
  }

  return (
    meeting?.student?.fullName ??
    meeting?.student?.name ??
    meeting?.mentee?.fullName ??
    meeting?.mentee?.name ??
    meeting?.students?.[0]?.fullName ??
    meeting?.students?.[0]?.name ??
    null
  );
};

const getMeetingMode = (meeting) =>
  meeting?.meetingType ??
  meeting?.meetingMode ??
  meeting?.mode ??
  meeting?.type ??
  "Not specified";

const getMeetingLocation = (meeting) =>
  meeting?.location ??
  meeting?.meetingLink ??
  meeting?.meetingUrl ??
  meeting?.venue ??
  null;

const isTerminalStatus = (status) =>
  [
    "COMPLETED",
    "CONDUCTED",
    "FINISHED",
    "CANCELLED",
    "CANCELED",
    "REJECTED",
    "DECLINED",
    "SKIPPED",
    "MISSED",
    "NO_SHOW",
  ].includes(status);

const getLocalDateKey = (date) => {
  if (!date || Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  if (!date) return "Time not specified";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatTimeRange = (meeting) => {
  const start = getMeetingDate(meeting);
  const end = getMeetingEndDate(meeting);

  if (!start) return "Time not specified";

  if (end) {
    return `${formatTime(start)} – ${formatTime(end)}`;
  }

  const duration = Number(
    meeting?.durationMinutes ?? meeting?.duration ?? 0
  );

  if (duration > 0 && duration <= 1440) {
    const calculatedEnd = new Date(
      start.getTime() + duration * 60000
    );

    return `${formatTime(start)} – ${formatTime(calculatedEnd)}`;
  }

  return formatTime(start);
};

const getStatusStyles = (status) => {
  switch (status) {
    case "SCHEDULED":
    case "CONFIRMED":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "IN_PROGRESS":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "COMPLETED":
    case "CONDUCTED":
    case "FINISHED":
      return "bg-slate-100 text-slate-700 border-slate-200";

    case "CANCELLED":
    case "CANCELED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const getStatusLabel = (status) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getSearchableText = (meeting) =>
  [
    getMeetingTitle(meeting),
    getStudentName(meeting),
    getMeetingStatus(meeting),
    getMeetingMode(meeting),
    getMeetingLocation(meeting),
    meeting?.description,
    meeting?.mentorName,
    meeting?.teacherName,
    meeting?.agenda,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

// ==========================================================
// EMPTY STATE
// ==========================================================

const EmptyState = ({
  onRefresh,
  search,
  selectedDate,
  title,
  description,
}) => (
  <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
      <CalendarCheck size={30} className="text-blue-600" />
    </div>

    <h3 className="text-base font-bold text-gray-900">
      {title ??
        (search || selectedDate
          ? "No Matching Meetings"
          : "No Upcoming Meetings")}
    </h3>

    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
      {description ??
        (search || selectedDate
          ? "Try changing your search or selected date."
          : "There are no upcoming meetings matching the selected week.")}
    </p>

    {onRefresh && (
      <button
        type="button"
        onClick={onRefresh}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        <RefreshCw size={15} />
        Refresh Meetings
      </button>
    )}
  </div>
);

// ==========================================================
// MEETING LIST ITEM
// ==========================================================

const MeetingListItem = ({
  meeting,
  onStartMeeting,
  onViewDetails,
  onEditMeeting,
  onCancelMeeting,
}) => {
  const start = getMeetingDate(meeting);
  const status = getMeetingStatus(meeting);
  const studentName = getStudentName(meeting);
  const meetingMode = getMeetingMode(meeting);
  const location = getMeetingLocation(meeting);

  const canStart =
    start &&
    !isTerminalStatus(status) &&
    ["SCHEDULED", "CONFIRMED", "IN_PROGRESS"].includes(status);

  const canEdit =
    !isTerminalStatus(status) && status !== "IN_PROGRESS";

  const canCancel =
    !isTerminalStatus(status) && status !== "IN_PROGRESS";

  const isOnline =
    String(meetingMode).toLowerCase().includes("online") ||
    String(meetingMode).toLowerCase().includes("virtual");

  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:border-blue-200 hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Date block */}
        <div className="flex shrink-0 items-center gap-3 sm:w-[76px] sm:flex-col sm:items-center sm:justify-center sm:rounded-xl sm:bg-blue-50 sm:px-3 sm:py-4">
          <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-700 sm:h-auto sm:w-auto sm:bg-transparent">
            {start ? (
              <>
                <span className="text-xs font-bold uppercase">
                  {start.toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </span>

                <span className="text-xl font-extrabold leading-tight">
                  {start.getDate()}
                </span>
              </>
            ) : (
              <CalendarDays size={23} />
            )}
          </div>

          <div className="min-w-0 sm:text-center">
            <p className="text-sm font-semibold text-gray-800 sm:text-xs">
              {start
                ? start.toLocaleDateString("en-IN", {
                    weekday: "short",
                  })
                : "Date pending"}
            </p>

            <p className="mt-1 text-xs text-gray-500 sm:hidden">
              {start ? formatDate(start) : "Date not specified"}
            </p>
          </div>
        </div>

        {/* Meeting details */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusStyles(
                status
              )}`}
            >
              {getStatusLabel(status)}
            </span>

            {(meeting?.isRecurring ||
              meeting?.seriesId ||
              meeting?.recurring) && (
              <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-700">
                Recurring
              </span>
            )}
          </div>

          <h3 className="mt-3 break-words text-base font-bold text-gray-900 transition group-hover:text-blue-700">
            {getMeetingTitle(meeting)}
          </h3>

          {meeting?.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
              {meeting.description}
            </p>
          )}

          <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock3 size={15} className="shrink-0 text-gray-400" />
              <span>{formatTimeRange(meeting)}</span>
            </div>

            {studentName && (
              <div className="flex items-center gap-2">
                <Users size={15} className="shrink-0 text-gray-400" />
                <span className="truncate">{studentName}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              {isOnline ? (
                <Video size={15} className="shrink-0 text-gray-400" />
              ) : (
                <MapPin size={15} className="shrink-0 text-gray-400" />
              )}

              <span className="truncate">
                {meetingMode}
                {location &&
                  !/^https?:\/\//i.test(String(location)) &&
                  ` · ${location}`}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
            {onViewDetails && (
              <button
                type="button"
                onClick={() => onViewDetails(meeting)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Eye size={14} />
                Details
              </button>
            )}

            {canStart && onStartMeeting && (
              <button
                type="button"
                onClick={() => onStartMeeting(meeting)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                <Play size={14} />
                {status === "IN_PROGRESS"
                  ? "Join Meeting"
                  : "Start Meeting"}
              </button>
            )}

            {canEdit && onEditMeeting && (
              <button
                type="button"
                onClick={() => onEditMeeting(meeting)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <Pencil size={13} />
                Edit
              </button>
            )}

            {canCancel && onCancelMeeting && (
              <button
                type="button"
                onClick={() => onCancelMeeting(meeting)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                <XCircle size={14} />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// ==========================================================
// VIEW ALL UPCOMING MEETINGS MODAL
// ==========================================================

const AllUpcomingMeetingsModal = ({
  meetings,
  onClose,
  onStartMeeting,
  onViewDetails,
  onEditMeeting,
  onCancelMeeting,
}) => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredMeetings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return meetings.filter((meeting) => {
      const date = getMeetingDate(meeting);

      const matchesDate =
        !selectedDate ||
        (date && getLocalDateKey(date) === selectedDate);

      const matchesSearch =
        !query || getSearchableText(meeting).includes(query);

      return matchesDate && matchesSearch;
    });
  }, [meetings, search, selectedDate]);

  const clearFilters = () => {
    setSearch("");
    setSelectedDate("");
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="all-upcoming-meetings-title"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white p-5">
          <div>
            <h2
              id="all-upcoming-meetings-title"
              className="text-lg font-bold text-slate-900"
            >
              All Upcoming Meetings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search meetings or select a specific date.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close all upcoming meetings"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </header>

        {/* Filters and meeting list */}
        <div className="space-y-4 overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, student, status..."
                aria-label="Search upcoming meetings"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="relative">
              <Calendar
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                aria-label="Filter meetings by date"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {(search || selectedDate) && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-blue-700 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing {filteredMeetings.length} of {meetings.length} meetings
            </p>

            {selectedDate && (
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {selectedDate}
              </span>
            )}
          </div>

          {filteredMeetings.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white">
              <EmptyState
                search={search}
                selectedDate={selectedDate}
                title="No Matching Meetings"
                description="Try changing your search or selected date."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMeetings.map((meeting, index) => (
                <MeetingListItem
                  key={
                    meeting?.id ??
                    meeting?.meetingId ??
                    `${getMeetingDate(meeting)?.getTime() ?? "meeting"}-${index}`
                  }
                  meeting={meeting}
                  onStartMeeting={onStartMeeting}
                  onViewDetails={onViewDetails}
                  onEditMeeting={onEditMeeting}
                  onCancelMeeting={onCancelMeeting}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="border-t border-slate-200 bg-white p-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
};

// ==========================================================
// UPCOMING MEETINGS
// Main view displays a maximum of 3 meetings.
// View All displays every upcoming meeting supplied by the API.
// ==========================================================

const UpcomingMeetings = ({
  meetings = [],
  loading = false,
  error = "",
  onRefresh,
  onStartMeeting,
  onViewDetails,
  onEditMeeting,
  onCancelMeeting,
}) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [showAllMeetings, setShowAllMeetings] = useState(false);

  // --------------------------------------------------------
  // SELECTED WEEK RANGE
  // --------------------------------------------------------

  const weekRange = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const currentDay = now.getDay();
    const daysSinceMonday = (currentDay + 6) % 7;

    const monday = new Date(now);
    monday.setDate(
      now.getDate() - daysSinceMonday + weekOffset * 7
    );

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return {
      start: monday,
      end: sunday,
    };
  }, [weekOffset]);

  // --------------------------------------------------------
  // ALL UPCOMING MEETINGS
  // --------------------------------------------------------

  const allUpcomingMeetings = useMemo(() => {
    if (!Array.isArray(meetings)) return [];

    const now = new Date();

    return meetings
      .filter((meeting) => {
        const date = getMeetingDate(meeting);
        const status = getMeetingStatus(meeting);

        return (
          date &&
          date >= now &&
          !isTerminalStatus(status) &&
          status !== "IN_PROGRESS"
        );
      })
      .sort(
        (a, b) =>
          getMeetingDate(a).getTime() -
          getMeetingDate(b).getTime()
      );
  }, [meetings]);

  // --------------------------------------------------------
  // MEETINGS FOR THE SELECTED WEEK
  // --------------------------------------------------------

  const weekMeetings = useMemo(() => {
    return allUpcomingMeetings.filter((meeting) => {
      const date = getMeetingDate(meeting);

      return date >= weekRange.start && date <= weekRange.end;
    });
  }, [allUpcomingMeetings, weekRange]);

  // --------------------------------------------------------
  // MAIN VIEW SEARCH AND DATE FILTERS
  // --------------------------------------------------------

  const filteredMeetings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return weekMeetings.filter((meeting) => {
      const date = getMeetingDate(meeting);

      const matchesSearch =
        !query || getSearchableText(meeting).includes(query);

      const matchesDate =
        !selectedDate ||
        (date && getLocalDateKey(date) === selectedDate);

      return matchesSearch && matchesDate;
    });
  }, [weekMeetings, search, selectedDate]);

  const displayedMeetings = filteredMeetings.slice(0, 3);

  // --------------------------------------------------------
  // WEEK LABEL
  // --------------------------------------------------------

  const weekLabel = useMemo(() => {
    const start = weekRange.start;
    const end = weekRange.end;

    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.toLocaleDateString("en-IN", {
        day: "numeric",
      })} – ${end.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`;
    }

    return `${formatDate(start)} – ${formatDate(end)}`;
  }, [weekRange]);

  const isCurrentWeek = weekOffset === 0;

  // --------------------------------------------------------
  // RESET MAIN VIEW FILTERS
  // --------------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setSelectedDate("");
  };

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <CalendarDays size={21} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Upcoming Meetings
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              Review and manage scheduled mentor meetings.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700">
            <CalendarCheck size={16} className="text-blue-600" />
            {allUpcomingMeetings.length} upcoming
          </span>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Week navigation */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Selected week
          </p>

          <p className="mt-1 text-sm font-bold text-gray-900">
            {weekLabel}

            {isCurrentWeek && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
                THIS WEEK
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setWeekOffset((current) => current - 1)
            }
            aria-label="Previous week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            <ChevronLeft size={18} />
          </button>

          {!isCurrentWeek && (
            <button
              type="button"
              onClick={() => setWeekOffset(0)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              This Week
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              setWeekOffset((current) => current + 1)
            }
            aria-label="Next week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main search and date filters */}
      <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, student, status..."
              aria-label="Search this week's meetings"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative">
            <Calendar
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              aria-label="Select a meeting date"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {(search || selectedDate) && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-500">
              {filteredMeetings.length} matching meetings this week
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800">
              Unable to display meetings
            </p>

            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="shrink-0 text-sm font-semibold text-red-700 underline"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* Loading and meeting list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded-xl bg-gray-100" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-24 rounded bg-gray-100" />
                  <div className="h-5 w-2/3 rounded bg-gray-100" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                  <div className="h-3 w-1/3 rounded bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !error && (
        <div className="space-y-3">
          {displayedMeetings.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white">
              <EmptyState
                onRefresh={onRefresh}
                search={search}
                selectedDate={selectedDate}
              />
            </div>
          ) : (
            <>
              {displayedMeetings.map((meeting, index) => (
                <MeetingListItem
                  key={
                    meeting?.id ??
                    meeting?.meetingId ??
                    `${getMeetingDate(meeting)?.getTime() ?? "meeting"}-${index}`
                  }
                  meeting={meeting}
                  onStartMeeting={onStartMeeting}
                  onViewDetails={onViewDetails}
                  onEditMeeting={onEditMeeting}
                  onCancelMeeting={onCancelMeeting}
                />
              ))}

              <p className="text-center text-xs text-gray-400">
                Showing {displayedMeetings.length} of{" "}
                {filteredMeetings.length} meetings for this week
              </p>
            </>
          )}

          {/* Always-visible View All button */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllMeetings(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              View All Meetings
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      )}

      {/* View All modal uses all upcoming meetings, not current week filters */}
      {showAllMeetings && (
        <AllUpcomingMeetingsModal
          meetings={allUpcomingMeetings}
          onClose={() => setShowAllMeetings(false)}
          onStartMeeting={onStartMeeting}
          onViewDetails={onViewDetails}
          onEditMeeting={onEditMeeting}
          onCancelMeeting={onCancelMeeting}
        />
      )}
    </section>
  );
};

export default UpcomingMeetings;