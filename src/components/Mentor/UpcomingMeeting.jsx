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

    return meetings
      .filter((meeting) => {
        const dateValue = getMeetingDate(meeting);
        const date = dateValue ? new Date(dateValue).getTime() : NaN;
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
      )[0] ?? null;
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
      console.error("Unable to refresh upcoming meeting:", refreshError);
    } finally {
      setRefreshing(false);
    }
  };

  // --------------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------------

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
        <div className="flex items-center gap-2 mb-5">
          <CalendarDays size={16} className="text-blue-600" />
          <h3 className="text-[14px] font-semibold text-blue-600">
            Upcoming Meeting
          </h3>
        </div>

        <div className="animate-pulse flex gap-4">
          <div className="w-20 h-24 rounded-xl bg-slate-100 flex-shrink-0" />

          <div className="flex-1 space-y-3">
            <div className="h-3 bg-slate-100 rounded w-2/3" />
            <div className="h-5 bg-slate-100 rounded w-4/5" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
            <div className="h-3 bg-slate-100 rounded w-3/4" />
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
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays size={16} className="text-blue-600" />
          <h3 className="text-[14px] font-semibold text-blue-600">
            Upcoming Meeting
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-6">
          <AlertCircle size={28} className="text-red-500 mb-2" />

          <p className="text-sm text-slate-700">
            Unable to load your upcoming meeting.
          </p>

          <p className="text-xs text-slate-500 mt-1">{error}</p>

          {onRefresh && (
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50"
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
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-600" />

            <h3 className="text-[14px] font-semibold text-blue-600">
              Upcoming Meeting
            </h3>
          </div>

          {onRefresh && (
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              aria-label="Refresh upcoming meetings"
              title="Refresh"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <CalendarDays size={24} className="text-blue-500" />
          </div>

          <h4 className="text-sm font-semibold text-slate-700">
            No upcoming meetings
          </h4>

          <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
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
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-blue-600" />

          <h3 className="text-[14px] font-semibold text-blue-600">
            Upcoming Meeting
          </h3>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="Refresh upcoming meetings"
            title="Refresh"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        )}
      </div>

      {/* Meeting Details */}
      <div className="flex gap-4">
        {/* Calendar */}
        <div className="w-20 h-24 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-semibold text-blue-600 uppercase">
            {dateParts?.month ?? "TBD"}
          </span>

          <span className="text-[18px] font-bold text-[#142970] mt-1">
            {dateParts?.day ?? "--"}
          </span>

          <span className="text-[11px] text-slate-500 mt-1 uppercase">
            {dateParts?.weekday ?? "---"}
          </span>
        </div>

        {/* Right Side */}
        <div className="flex-1 min-w-0">
          {/* Time + Meeting Mode */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600">
              <Clock3 size={13} />
              {formatMeetingTime(upcomingMeeting)}
            </span>

            {mode && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                {mode === "Online" ? (
                  <Video size={11} />
                ) : (
                  <MapPinned size={11} />
                )}
                {mode}
              </span>
            )}
          </div>

          {/* Meeting Title */}
          <h2 className="text-[16px] font-semibold text-[#142970] mt-2 break-words">
            {title}
          </h2>

          {mentorName && (
            <p className="text-[12px] text-slate-500 mt-1">
              With {mentorName}
            </p>
          )}

          {/* Date */}
          {dateParts && (
            <p className="text-[11px] text-slate-500 mt-2">
              {dateParts.fullDate}
            </p>
          )}

          {/* Location */}
          {location && (
            <div className="flex items-start gap-2 mt-2 text-[12px] text-slate-500">
              {mode === "Online" ? (
                <Video size={14} className="flex-shrink-0 mt-0.5" />
              ) : (
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
              )}

              {String(location).startsWith("http") ? (
                <a
                  href={location}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  Join meeting
                </a>
              ) : (
                <span className="break-words">{location}</span>
              )}
            </div>
          )}

          {/* Status */}
          <div className="mt-3">
            <span className="inline-flex px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium">
              {status.replaceAll("_", " ")}
            </span>
          </div>

          {/* Agenda */}
          <div className="mt-5">
            <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 mb-2">
              <ClipboardList size={13} />
              Agenda
            </p>

            {agendaItems.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-[12px] text-slate-600">
                {agendaItems.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[12px] text-slate-400">
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