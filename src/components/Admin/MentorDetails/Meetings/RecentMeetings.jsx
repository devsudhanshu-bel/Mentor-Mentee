import React, { useMemo, useState } from "react";

import {
  CalendarClock,
  Clock3,
  MapPin,
  Video,
  Users,
  Search,
  Eye,
  Pencil,
  RefreshCw,
  Copy,
  XCircle,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  Calendar,
  AlertCircle,
  History,
  Repeat2,
  SkipForward,
  PauseCircle,
  Trash2,
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

const getStatus = (meeting) =>
  String(meeting?.status ?? "UNKNOWN")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getTitle = (meeting) =>
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

const getMode = (meeting) =>
  meeting?.meetingType ??
  meeting?.meetingMode ??
  meeting?.mode ??
  meeting?.type ??
  "Not specified";

const getLocation = (meeting) =>
  meeting?.location ??
  meeting?.venue ??
  meeting?.meetingLink ??
  meeting?.meetingUrl ??
  null;

const getStatusLabel = (status) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getStatusStyle = (status) => {
  switch (status) {
    case "COMPLETED":
    case "CONDUCTED":
    case "FINISHED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "CANCELLED":
    case "CANCELED":
      return "border-red-200 bg-red-50 text-red-700";

    case "SKIPPED":
    case "MISSED":
    case "NO_SHOW":
    case "REJECTED":
    case "DECLINED":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "SCHEDULED":
    case "CONFIRMED":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "IN_PROGRESS":
      return "border-purple-200 bg-purple-50 text-purple-700";

    default:
      return "border-gray-200 bg-gray-50 text-gray-600";
  }
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
  if (!date) return null;

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

const isRecurringMeeting = (meeting) =>
  Boolean(
    meeting?.isRecurring ||
      meeting?.recurring ||
      meeting?.recurrence ||
      meeting?.seriesId ||
      meeting?.recurringMeetingId
  );

const isUrl = (value) => /^https?:\/\//i.test(String(value ?? ""));

const getLocalDateKey = (date) => {
  if (!date || Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const matchesStatusFilter = (status, filter) => {
  if (filter === "ALL") return true;

  if (filter === "COMPLETED") {
    return ["COMPLETED", "CONDUCTED", "FINISHED"].includes(status);
  }

  if (filter === "CANCELLED") {
    return ["CANCELLED", "CANCELED"].includes(status);
  }

  if (filter === "MISSED") {
    return [
      "SKIPPED",
      "MISSED",
      "NO_SHOW",
      "REJECTED",
      "DECLINED",
    ].includes(status);
  }

  return true;
};

const getSearchableText = (meeting) =>
  [
    getTitle(meeting),
    getStudentName(meeting),
    meeting?.description,
    meeting?.mentorName,
    meeting?.teacherName,
    meeting?.meetingNotes,
    meeting?.remarks,
    getStatus(meeting),
    getMode(meeting),
    meeting?.venue,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

// ==========================================================
// STATUS BADGE
// ==========================================================

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusStyle(
      status
    )}`}
  >
    {getStatusLabel(status)}
  </span>
);

// ==========================================================
// EMPTY STATE
// ==========================================================

const EmptyState = ({ search, filter, onRefresh }) => (
  <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
      <History size={29} className="text-gray-500" />
    </div>

    <h3 className="text-base font-bold text-gray-900">
      {search || filter !== "ALL"
        ? "No Matching Meetings"
        : "No Meeting History Yet"}
    </h3>

    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
      {search || filter !== "ALL"
        ? "Try changing your search, date, or status filter to find a meeting."
        : "Completed and past meetings will appear here when meeting records are available."}
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
// DETAIL ROW
// ==========================================================

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 shrink-0 text-gray-400">{icon}</div>

    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words whitespace-pre-wrap text-sm font-medium text-gray-800">
        {value || "Not specified"}
      </p>
    </div>
  </div>
);

// ==========================================================
// MEETING DETAILS MODAL
// ==========================================================

const MeetingDetailsModal = ({ meeting, onClose }) => {
  if (!meeting) return null;

  const start = getMeetingDate(meeting);
  const studentName = getStudentName(meeting);
  const location = getLocation(meeting);
  const mode = getMode(meeting);
  const status = getStatus(meeting);

  const isOnline =
    String(mode).toLowerCase().includes("online") ||
    String(mode).toLowerCase().includes("virtual");

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="recent-meeting-details-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <CalendarClock size={21} className="text-blue-600" />
            </div>

            <div>
              <h3
                id="recent-meeting-details-title"
                className="text-lg font-bold text-gray-900"
              >
                Meeting Details
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Review the meeting record.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close meeting details"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <StatusBadge status={status} />

            <h4 className="mt-3 text-lg font-bold text-gray-900">
              {getTitle(meeting)}
            </h4>

            {meeting?.description && (
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                {meeting.description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <DetailRow
              icon={<CalendarDays size={17} />}
              label="Date"
              value={formatDate(start)}
            />

            <DetailRow
              icon={<Clock3 size={17} />}
              label="Time"
              value={formatTimeRange(meeting)}
            />

            {studentName && (
              <DetailRow
                icon={<Users size={17} />}
                label="Student"
                value={studentName}
              />
            )}

            <DetailRow
              icon={isOnline ? <Video size={17} /> : <MapPin size={17} />}
              label="Meeting mode"
              value={String(mode)}
            />

            {location && (
              <DetailRow
                icon={<MapPin size={17} />}
                label={isUrl(location) ? "Meeting link" : "Location"}
                value={String(location)}
              />
            )}

            {(meeting?.mentorName || meeting?.teacherName) && (
              <DetailRow
                icon={<Users size={17} />}
                label="Mentor"
                value={meeting.mentorName ?? meeting.teacherName}
              />
            )}

            {meeting?.meetingNotes && (
              <DetailRow
                icon={<History size={17} />}
                label="Meeting notes"
                value={meeting.meetingNotes}
              />
            )}

            {meeting?.remarks && (
              <DetailRow
                icon={<AlertCircle size={17} />}
                label="Remarks"
                value={meeting.remarks}
              />
            )}

            {meeting?.createdAt && (
              <DetailRow
                icon={<CalendarClock size={17} />}
                label="Record created"
                value={formatDate(new Date(meeting.createdAt))}
              />
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================================
// RECENT MEETING CARD
// ==========================================================

const RecentMeetingCard = ({
  meeting,
  onViewDetails,
  onEditMeeting,
  onRescheduleMeeting,
  onDuplicateMeeting,
  onCancelMeeting,
  onEditSeries,
  onSkipOccurrence,
  onPauseSeries,
  onDeleteSeries,
}) => {
  const [actionsExpanded, setActionsExpanded] = useState(false);

  const start = getMeetingDate(meeting);
  const status = getStatus(meeting);
  const studentName = getStudentName(meeting);
  const mode = getMode(meeting);
  const location = getLocation(meeting);
  const recurring = isRecurringMeeting(meeting);

  const isOnline =
    String(mode).toLowerCase().includes("online") ||
    String(mode).toLowerCase().includes("virtual");

  const showPrimaryActions = [
    onViewDetails,
    onEditMeeting,
    onRescheduleMeeting,
    onDuplicateMeeting,
    onCancelMeeting,
  ].some(Boolean);

  const showSeriesActions =
    recurring &&
    [
      onEditSeries,
      onSkipOccurrence,
      onPauseSeries,
      onDeleteSeries,
    ].some(Boolean);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Date block */}
        <div className="flex shrink-0 items-center gap-3 sm:w-[82px] sm:flex-col sm:items-center sm:justify-center sm:rounded-xl sm:bg-gray-50 sm:px-3 sm:py-4">
          <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gray-100 text-gray-700 sm:h-auto sm:w-auto sm:bg-transparent">
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

          <div className="sm:text-center">
            <p className="text-sm font-semibold text-gray-800 sm:text-xs">
              {start
                ? start.toLocaleDateString("en-IN", {
                    weekday: "short",
                  })
                : "Date unavailable"}
            </p>

            <p className="mt-1 text-xs text-gray-500 sm:hidden">
              {formatDate(start)}
            </p>
          </div>
        </div>

        {/* Meeting content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />

            {recurring && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-700">
                <Repeat2 size={12} />
                Recurring
              </span>
            )}
          </div>

          <h3 className="mt-3 break-words text-base font-bold text-gray-900">
            {getTitle(meeting)}
          </h3>

          {meeting?.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
              {meeting.description}
            </p>
          )}

          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
            <div className="flex min-w-0 items-center gap-2">
              <Clock3 size={15} className="shrink-0 text-gray-400" />
              <span>{formatTimeRange(meeting)}</span>
            </div>

            {studentName && (
              <div className="flex min-w-0 items-center gap-2">
                <Users size={15} className="shrink-0 text-gray-400" />
                <span className="truncate">{studentName}</span>
              </div>
            )}

            <div className="flex min-w-0 items-center gap-2">
              {isOnline ? (
                <Video size={15} className="shrink-0 text-gray-400" />
              ) : (
                <MapPin size={15} className="shrink-0 text-gray-400" />
              )}

              <span className="truncate">
                {mode}
                {location && !isUrl(location) && ` · ${location}`}
              </span>
            </div>
          </div>

          {/* Primary actions */}
          {showPrimaryActions && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
              {onViewDetails && (
                <button
                  type="button"
                  onClick={() => onViewDetails(meeting)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Eye size={14} />
                  Details
                </button>
              )}

              {onEditMeeting && (
                <button
                  type="button"
                  onClick={() => onEditMeeting(meeting)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  <Pencil size={13} />
                  Edit
                </button>
              )}

              {onRescheduleMeeting && (
                <button
                  type="button"
                  onClick={() => onRescheduleMeeting(meeting)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <CalendarClock size={14} />
                  Reschedule
                </button>
              )}

              {onDuplicateMeeting && (
                <button
                  type="button"
                  onClick={() => onDuplicateMeeting(meeting)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Copy size={13} />
                  Duplicate
                </button>
              )}

              {onCancelMeeting &&
                ![
                  "COMPLETED",
                  "CONDUCTED",
                  "FINISHED",
                  "CANCELLED",
                  "CANCELED",
                  "SKIPPED",
                  "MISSED",
                  "NO_SHOW",
                ].includes(status) && (
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
          )}

          {/* Recurring series actions */}
          {showSeriesActions && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() =>
                  setActionsExpanded((value) => !value)
                }
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-purple-700 transition hover:bg-purple-50"
                aria-expanded={actionsExpanded}
              >
                <Repeat2 size={14} />
                Series actions
                {actionsExpanded ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>

              {actionsExpanded && (
                <div className="mt-2 flex flex-wrap gap-2 rounded-xl border border-purple-100 bg-purple-50/50 p-3">
                  {onEditSeries && (
                    <button
                      type="button"
                      onClick={() => onEditSeries(meeting)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Pencil size={13} />
                      Edit Series
                    </button>
                  )}

                  {onSkipOccurrence && (
                    <button
                      type="button"
                      onClick={() => onSkipOccurrence(meeting)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <SkipForward size={13} />
                      Skip Occurrence
                    </button>
                  )}

                  {onPauseSeries && (
                    <button
                      type="button"
                      onClick={() => onPauseSeries(meeting)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <PauseCircle size={13} />
                      Pause Series
                    </button>
                  )}

                  {onDeleteSeries && (
                    <button
                      type="button"
                      onClick={() => onDeleteSeries(meeting)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                      Delete Series
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {meeting?.meetingNotes && (
            <p className="mt-3 rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-600">
              <span className="font-bold text-gray-700">Notes: </span>
              {meeting.meetingNotes}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

// ==========================================================
// VIEW ALL MEETINGS MODAL
// ==========================================================

const AllMeetingsModal = ({
  meetings,
  onClose,
  onViewDetails,
  onEditMeeting,
  onRescheduleMeeting,
  onDuplicateMeeting,
  onCancelMeeting,
  onEditSeries,
  onSkipOccurrence,
  onPauseSeries,
  onDeleteSeries,
}) => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filteredMeetings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return meetings.filter((meeting) => {
      const status = getStatus(meeting);
      const date = getMeetingDate(meeting);

      const matchesDate =
        !selectedDate ||
        (date && getLocalDateKey(date) === selectedDate);

      const matchesFilter = matchesStatusFilter(
        status,
        selectedFilter
      );

      const matchesSearch =
        !query || getSearchableText(meeting).includes(query);

      return matchesDate && matchesFilter && matchesSearch;
    });
  }, [meetings, search, selectedDate, selectedFilter]);

  const resetFilters = () => {
    setSearch("");
    setSelectedDate("");
    setSelectedFilter("ALL");
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="all-meetings-title"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-200 bg-white p-5">
          <div>
            <h2
              id="all-meetings-title"
              className="text-lg font-bold text-slate-900"
            >
              All Recent Meetings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search, filter by status, or select a particular date.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close all meetings"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </header>

        <div className="space-y-4 overflow-y-auto p-4 sm:p-5">
          {/* Search and calendar */}
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
                aria-label="Search all meetings"
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
                onChange={(event) =>
                  setSelectedDate(event.target.value)
                }
                aria-label="Filter meetings by date"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              ["ALL", "All"],
              ["COMPLETED", "Completed"],
              ["CANCELLED", "Cancelled"],
              ["MISSED", "Missed / Skipped"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedFilter(value)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  selectedFilter === value
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            ))}

            {(search || selectedDate || selectedFilter !== "ALL") && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto text-xs font-semibold text-blue-700 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing {filteredMeetings.length} of {meetings.length} meetings
            </p>

            {selectedDate && (
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                Date: {selectedDate}
              </span>
            )}
          </div>

          {filteredMeetings.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white">
              <EmptyState
                search={search || selectedDate}
                filter={selectedFilter}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMeetings.map((meeting, index) => (
                <RecentMeetingCard
                  key={
                    meeting?.id ??
                    meeting?.meetingId ??
                    `${getMeetingDate(meeting)?.getTime() ?? "meeting"}-${index}`
                  }
                  meeting={meeting}
                  onViewDetails={onViewDetails}
                  onEditMeeting={onEditMeeting}
                  onRescheduleMeeting={onRescheduleMeeting}
                  onDuplicateMeeting={onDuplicateMeeting}
                  onCancelMeeting={onCancelMeeting}
                  onEditSeries={onEditSeries}
                  onSkipOccurrence={onSkipOccurrence}
                  onPauseSeries={onPauseSeries}
                  onDeleteSeries={onDeleteSeries}
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
// RECENT MEETINGS
// Summary cards intentionally removed.
// Main section displays only 3 meetings.
// ==========================================================

const RecentMeetings = ({
  meetings = [],
  loading = false,
  error = "",
  onRefresh,
  onStartMeeting,
  onViewDetails,
  onEditMeeting,
  onRescheduleMeeting,
  onDuplicateMeeting,
  onCancelMeeting,
  onEditSeries,
  onSkipOccurrence,
  onPauseSeries,
  onDeleteSeries,
}) => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [showAllMeetings, setShowAllMeetings] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const historyMeetings = useMemo(() => {
    if (!Array.isArray(meetings)) return [];

    const now = new Date();

    return meetings
      .filter((meeting) => {
        const date = getMeetingDate(meeting);
        const status = getStatus(meeting);

        return (
          (isTerminalStatus(status) || (date && date < now)) &&
          status !== "IN_PROGRESS"
        );
      })
      .sort((a, b) => {
        const first = getMeetingDate(a)?.getTime() ?? 0;
        const second = getMeetingDate(b)?.getTime() ?? 0;

        return second - first;
      });
  }, [meetings]);

  const filteredMeetings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return historyMeetings.filter((meeting) => {
      const status = getStatus(meeting);

      return (
        matchesStatusFilter(status, selectedFilter) &&
        (!query || getSearchableText(meeting).includes(query))
      );
    });
  }, [historyMeetings, search, selectedFilter]);

  const counts = useMemo(
    () => ({
      all: historyMeetings.length,

      completed: historyMeetings.filter((meeting) =>
        ["COMPLETED", "CONDUCTED", "FINISHED"].includes(
          getStatus(meeting)
        )
      ).length,

      cancelled: historyMeetings.filter((meeting) =>
        ["CANCELLED", "CANCELED"].includes(getStatus(meeting))
      ).length,

      missed: historyMeetings.filter((meeting) =>
        [
          "SKIPPED",
          "MISSED",
          "NO_SHOW",
          "REJECTED",
          "DECLINED",
        ].includes(getStatus(meeting))
      ).length,
    }),
    [historyMeetings]
  );

  const displayedMeetings = filteredMeetings.slice(0, 3);

  const filterOptions = [
    { value: "ALL", label: "All", count: counts.all },
    {
      value: "COMPLETED",
      label: "Completed",
      count: counts.completed,
    },
    {
      value: "CANCELLED",
      label: "Cancelled",
      count: counts.cancelled,
    },
    {
      value: "MISSED",
      label: "Missed / Skipped",
      count: counts.missed,
    },
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleViewDetails = (meeting) => {
    if (onViewDetails) {
      onViewDetails(meeting);
    } else {
      setSelectedMeeting(meeting);
    }
  };

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
            <History size={21} className="text-gray-700" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Meetings
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              Review previous meetings and manage their records.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700">
            <History size={15} className="text-gray-500" />
            {counts.all} records
          </span>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
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

      {/* Main search and status filters */}
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              handleSearchChange(event.target.value)
            }
            placeholder="Search by meeting title, student, status..."
            aria-label="Search recent meetings"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const active = selectedFilter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFilterChange(option.value)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}

                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
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
              Unable to load meeting history
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

      {/* Loading */}
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
      ) : error ? null : displayedMeetings.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white">
          <EmptyState
            search={search}
            filter={selectedFilter}
            onRefresh={onRefresh}
          />
        </div>
      ) : (
        <div className="space-y-3">
          {displayedMeetings.map((meeting, index) => (
            <RecentMeetingCard
              key={
                meeting?.id ??
                meeting?.meetingId ??
                `${getMeetingDate(meeting)?.getTime() ?? "meeting"}-${index}`
              }
              meeting={meeting}
              onViewDetails={handleViewDetails}
              onEditMeeting={onEditMeeting}
              onRescheduleMeeting={onRescheduleMeeting}
              onDuplicateMeeting={onDuplicateMeeting}
              onCancelMeeting={onCancelMeeting}
              onEditSeries={onEditSeries}
              onSkipOccurrence={onSkipOccurrence}
              onPauseSeries={onPauseSeries}
              onDeleteSeries={onDeleteSeries}
            />
          ))}

          <div className="flex flex-col items-center gap-3 pt-2">
            <p className="text-xs text-gray-400">
              Showing {displayedMeetings.length} of{" "}
              {filteredMeetings.length} matching meetings
            </p>

            {filteredMeetings.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllMeetings(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                View All Meetings
                <ChevronDown size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* View All modal */}
      {showAllMeetings && (
        <AllMeetingsModal
          meetings={filteredMeetings}
          onClose={() => setShowAllMeetings(false)}
          onViewDetails={handleViewDetails}
          onEditMeeting={onEditMeeting}
          onRescheduleMeeting={onRescheduleMeeting}
          onDuplicateMeeting={onDuplicateMeeting}
          onCancelMeeting={onCancelMeeting}
          onEditSeries={onEditSeries}
          onSkipOccurrence={onSkipOccurrence}
          onPauseSeries={onPauseSeries}
          onDeleteSeries={onDeleteSeries}
        />
      )}

      {/* Built-in details modal when the parent has no handler */}
      {!onViewDetails && selectedMeeting && (
        <MeetingDetailsModal
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}
    </section>
  );
};

export default RecentMeetings;