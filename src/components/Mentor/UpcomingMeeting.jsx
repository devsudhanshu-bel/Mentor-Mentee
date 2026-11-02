
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Clock3,
  RefreshCw,
  Video,
  MapPinned,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

// ==========================================================
// HELPERS
// ==========================================================

const getMeetingDate = (meeting) =>
  meeting?.startAt ??
  meeting?.startTime ??
  meeting?.scheduledAt ??
  meeting?.date ??
  null;

const getMeetingEndDate = (meeting) =>
  meeting?.endAt ??
  meeting?.endTime ??
  meeting?.endsAt ??
  null;

const getMeetingStatus = (meeting) =>
  String(meeting?.status ?? "SCHEDULED").toUpperCase();

const isTerminalStatus = (status) =>
  ["COMPLETED", "CANCELLED", "CANCELED", "NO_SHOW"].includes(status);

const getMeetingTitle = (meeting) =>
  meeting?.title ??
  meeting?.meetingTitle ??
  meeting?.topic ??
  meeting?.purpose ??
  "Mentor Meeting";

const getMeetingLocation = (meeting) =>
  meeting?.location ??
  meeting?.venue ??
  meeting?.room ??
  meeting?.meetingLink ??
  meeting?.onlineLink ??
  "";

const getMeetingMode = (meeting) => {
  const mode = String(
    meeting?.meetingMode ??
      meeting?.mode ??
      meeting?.meetingType ??
      meeting?.type ??
      ""
  ).toUpperCase();

  if (
    mode.includes("ONLINE") ||
    mode.includes("VIRTUAL") ||
    mode.includes("VIDEO")
  ) {
    return "Online";
  }

  if (
    mode.includes("IN_PERSON") ||
    mode.includes("IN-PERSON") ||
    mode.includes("OFFLINE")
  ) {
    return "In Person";
  }

  return mode ? mode.replaceAll("_", " ") : "";
};

const getAgendaItems = (meeting) => {
  const rawAgenda =
    meeting?.agenda ??
    meeting?.discussionPoints ??
    meeting?.discussion_points ??
    meeting?.description ??
    meeting?.notes ??
    [];

  if (Array.isArray(rawAgenda)) {
    return rawAgenda
      .map((item) => {
        if (typeof item === "string") return item;

        return (
          item?.content ??
          item?.title ??
          item?.description ??
          ""
        );
      })
      .filter(Boolean);
  }

  if (typeof rawAgenda === "string") {
    return rawAgenda
      .split(/\r?\n/)
      .map((item) => item.replace(/^[\s•*-]+/, "").trim())
      .filter(Boolean);
  }

  return [];
};

const getMentorName = (meeting) => {
  const mentor =
    meeting?.teachers ??
    meeting?.teacher ??
    meeting?.mentor ??
    meeting?.mentorProfile ??
    meeting?.mentorAssignment?.teachers ??
    meeting?.mentor_assignment?.teachers;

  if (typeof mentor === "string") return mentor;

  if (!mentor) return "";

  const profile = mentor?.teacher_profiles ?? mentor?.profile ?? {};

  return (
    mentor?.fullName ??
    mentor?.name ??
    profile?.fullName ??
    [mentor?.firstName, mentor?.lastName].filter(Boolean).join(" ") ??
    ""
  );
};

const formatDateParts = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return null;

  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    fullDate: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
};

const formatTime = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatMeetingTime = (meeting) => {
  const startValue = getMeetingDate(meeting);
  const endValue = getMeetingEndDate(meeting);

  const start = formatTime(startValue);
  const end = formatTime(endValue);

  if (start && end) return `${start} - ${end}`;
  if (start) return start;

  return "Time not specified";
};

// ==========================================================
// COMPONENT
// ==========================================================

const UpcomingMeeting = ({
  meetings = [],
  loading = false,
  error = "",
  onRefresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // --------------------------------------------------------
  // FIND THE NEXT UPCOMING MEETING
  // --------------------------------------------------------

  const upcomingMeeting = useMemo(() => {
    if (!Array.isArray(meetings)) return null;

    const now = Date.now();

    return (
      meetings
        .filter((meeting) => {
          const dateValue = getMeetingDate(meeting);
          const date = dateValue
            ? new Date(dateValue).getTime()
            : NaN;

          const status = getMeetingStatus(meeting);

          return (
            Number.isFinite(date) &&
            date >= now &&
            !isTerminalStatus(status)
          );
        })
        .sort(
          (a, b) =>
            new Date(getMeetingDate(a)).getTime() -
            new Date(getMeetingDate(b)).getTime()
        )[0] ?? null
    );
  }, [meetings]);

  // --------------------------------------------------------
  // NORMALIZED DISPLAY VALUES
  // --------------------------------------------------------

  const dateParts = formatDateParts(
    upcomingMeeting ? getMeetingDate(upcomingMeeting) : null
  );

  const title = upcomingMeeting
    ? getMeetingTitle(upcomingMeeting)
    : "";

  const mentorName = upcomingMeeting
    ? getMentorName(upcomingMeeting)
    : "";

  const location = upcomingMeeting
    ? getMeetingLocation(upcomingMeeting)
    : "";

  const mode = upcomingMeeting
    ? getMeetingMode(upcomingMeeting)
    : "";

  const agendaItems = upcomingMeeting
    ? getAgendaItems(upcomingMeeting)
    : [];

  const status = upcomingMeeting
    ? getMeetingStatus(upcomingMeeting)
    : "";

  // --------------------------------------------------------
  // REFRESH
  // --------------------------------------------------------

  const handleRefresh = async () => {
    if (!onRefresh || refreshing) return;

    try {
      setRefreshing(true);
      await onRefresh();
    } catch (refreshError) {
      console.error(
        "Unable to refresh upcoming meeting:",
        refreshError
      );
    } finally {
      setRefreshing(false);
    }
  };

  // --------------------------------------------------------
  // SHARED HEADER
  // --------------------------------------------------------

  const renderHeader = () => (
    <div className="mb-4 flex min-w-0 items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <CalendarDays
          size={16}
          className="shrink-0 text-blue-600"
        />

        <h3 className="text-[13px] font-semibold text-blue-600 sm:text-[14px]">
          Upcoming Meeting
        </h3>
      </div>

      {onRefresh && (
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing || loading}
          aria-label="Refresh upcoming meetings"
          title="Refresh"
          className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={14}
            className={refreshing ? "animate-spin" : ""}
          />
        </button>
      )}
    </div>
  );

  // --------------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------------

  if (loading) {
    return (
      <div className="h-full w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        {renderHeader()}

        <div className="flex animate-pulse flex-col gap-3 min-[420px]:flex-row min-[420px]:gap-4">
          <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-100 min-[420px]:h-24" />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-3 w-2/3 rounded bg-slate-100" />
            <div className="h-5 w-4/5 rounded bg-slate-100" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
            <div className="h-3 w-3/4 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // ERROR STATE
  // --------------------------------------------------------

  if (error) {
    return (
      <div className="h-full w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        {renderHeader()}

        <div className="flex flex-col items-center justify-center py-6 text-center">
          <AlertCircle
            size={28}
            className="mb-2 text-red-500"
          />

          <p className="text-xs text-slate-700 sm:text-sm">
            Unable to load your upcoming meeting.
          </p>

          <p className="mt-1 max-w-full break-words text-[11px] text-slate-500 sm:text-xs">
            {error}
          </p>

          {onRefresh && (
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
            >
              <RefreshCw
                size={13}
                className={refreshing ? "animate-spin" : ""}
              />
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // EMPTY STATE
  // --------------------------------------------------------

  if (!upcomingMeeting) {
    return (
      <div className="h-full w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:p-4">
        {renderHeader()}

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
            <CalendarDays
              size={24}
              className="text-blue-500"
            />
          </div>

          <h4 className="text-xs font-semibold text-slate-700 sm:text-sm">
            No upcoming meetings
          </h4>

          <p className="mt-1 max-w-[240px] text-[11px] leading-5 text-slate-500 sm:text-xs">
            Your next mentor meeting will appear here once it has been scheduled.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // MEETING CARD
  // --------------------------------------------------------

  return (
    <div className="h-full w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:p-4">
      {renderHeader()}

      {/* MEETING DETAILS */}

      <div className="flex min-w-0 flex-col gap-3 min-[420px]:flex-row min-[420px]:gap-4">
        {/* CALENDAR */}

        <div className="flex h-20 w-full shrink-0 flex-row items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 min-[420px]:h-24 min-[420px]:w-20 min-[420px]:flex-col min-[420px]:gap-0">
          <span className="text-[11px] font-semibold uppercase text-blue-600">
            {dateParts?.month ?? "TBD"}
          </span>

          <span className="text-[20px] font-bold text-[#142970] min-[420px]:mt-1 min-[420px]:text-[18px]">
            {dateParts?.day ?? "--"}
          </span>

          <span className="text-[11px] uppercase text-slate-500 min-[420px]:mt-1">
            {dateParts?.weekday ?? "---"}
          </span>
        </div>

        {/* MEETING INFORMATION */}

        <div className="min-w-0 flex-1">
          {/* TIME AND MODE */}

          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
            <span className="inline-flex min-w-0 items-center gap-1 text-[11px] font-medium text-blue-600 sm:text-[12px]">
              <Clock3 size={13} className="shrink-0" />
              <span className="break-words">
                {formatMeetingTime(upcomingMeeting)}
              </span>
            </span>

            {mode && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                {mode === "Online" ? (
                  <Video size={11} />
                ) : (
                  <MapPinned size={11} />
                )}
                {mode}
              </span>
            )}
          </div>

          {/* TITLE */}

          <h2 className="mt-2 break-words text-[14px] font-semibold leading-5 text-[#142970] sm:text-[16px]">
            {title}
          </h2>

          {mentorName && (
            <p className="mt-1 break-words text-[11px] text-slate-500 sm:text-[12px]">
              With {mentorName}
            </p>
          )}

          {/* DATE */}

          {dateParts && (
            <p className="mt-2 text-[10px] text-slate-500 sm:text-[11px]">
              {dateParts.fullDate}
            </p>
          )}

          {/* LOCATION */}

          {location && (
            <div className="mt-2 flex min-w-0 items-start gap-2 text-[11px] text-slate-500 sm:text-[12px]">
              {mode === "Online" ? (
                <Video
                  size={14}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0"
                />
              )}

              {String(location).startsWith("http") ? (
                <a
                  href={location}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 break-all text-blue-600 hover:underline"
                >
                  Join meeting
                </a>
              ) : (
                <span className="min-w-0 break-words">
                  {location}
                </span>
              )}
            </div>
          )}

          {/* STATUS */}

          <div className="mt-3">
            <span className="inline-flex max-w-full rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">
              {status.replaceAll("_", " ")}
            </span>
          </div>

          {/* AGENDA */}

          <div className="mt-4 sm:mt-5">
            <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 sm:text-[12px]">
              <ClipboardList size={13} />
              Agenda
            </p>

            {agendaItems.length > 0 ? (
              <ul className="list-disc space-y-2 break-words pl-5 text-[11px] leading-5 text-slate-600 sm:text-[12px]">
                {agendaItems.map((item, index) => (
                  <li key={`${index}-${item}`}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-slate-400 sm:text-[12px]">
                No agenda has been added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeeting;
