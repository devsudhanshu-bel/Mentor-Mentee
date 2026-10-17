import React from "react";
import { Clock3, CalendarDays, Video, MapPin } from "lucide-react";

const formatTime = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusDetails = (status) => {
  switch (String(status ?? "").toUpperCase()) {
    case "IN_PROGRESS":
      return {
        label: "LIVE",
        className: "bg-emerald-100 text-emerald-700",
      };

    case "COMPLETED":
      return {
        label: "COMPLETED",
        className: "bg-blue-100 text-blue-700",
      };

    case "CANCELLED":
      return {
        label: "CANCELLED",
        className: "bg-red-100 text-red-700",
      };

    case "NO_SHOW":
      return {
        label: "NO SHOW",
        className: "bg-amber-100 text-amber-700",
      };

    case "SCHEDULED":
      return {
        label: "SCHEDULED",
        className: "bg-indigo-100 text-indigo-700",
      };

    default:
      return {
        label: status || "MEETING",
        className: "bg-slate-100 text-slate-600",
      };
  }
};

const WorkspaceHeader = ({
  meeting,
  duration = "00:00:00",
  onSaveMeeting,
  onEndMeeting,
  saving = false,
  ending = false,
}) => {
  const status = String(meeting?.status ?? "").toUpperCase();
  const statusDetails = getStatusDetails(status);

  const startTime =
    meeting?.startedAt ??
    meeting?.started_at ??
    meeting?.actualStartTime ??
    meeting?.actual_start_time ??
    null;

  const scheduledTime =
    meeting?.scheduledAt ??
    meeting?.scheduled_at ??
    meeting?.startTime ??
    meeting?.start_time ??
    meeting?.scheduledStart ??
    meeting?.scheduled_start ??
    null;

  const meetingTime = startTime || scheduledTime;
  const isInProgress = status === "IN_PROGRESS";

  const isTerminal = [
    "COMPLETED",
    "CANCELLED",
    "CANCELED",
    "NO_SHOW",
  ].includes(status);

  const meetingMode = String(
    meeting?.meetingType ??
      meeting?.meeting_type ??
      meeting?.mode ??
      ""
  ).toUpperCase();

  const meetingLocation =
    meeting?.meetingLink ??
    meeting?.meeting_link ??
    meeting?.location ??
    meeting?.venue ??
    null;

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Meeting details */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="max-w-full break-words text-lg font-bold text-slate-800">
            {meeting?.title || "Mentorship Meeting"}
          </h2>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusDetails.className}`}
          >
            {statusDetails.label}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-500">
          {meetingTime && (
            <span className="flex items-center gap-1.5">
              {startTime ? (
                <>
                  <Clock3 size={14} />
                  Started {formatTime(startTime)}
                </>
              ) : (
                <>
                  <CalendarDays size={14} />
                  Scheduled {formatTime(meetingTime)}
                </>
              )}
            </span>
          )}

          {isInProgress && (
            <span className="flex items-center gap-2">
              <Clock3 size={14} />
              <strong className="text-slate-700">
                {duration}
              </strong>
            </span>
          )}

          {meetingMode && (
            <span className="flex items-center gap-1.5">
              {meetingMode.includes("ONLINE") ||
              meetingMode.includes("VIRTUAL") ? (
                <Video size={14} />
              ) : (
                <MapPin size={14} />
              )}
              {meetingMode.replaceAll("_", " ")}
            </span>
          )}

          {meetingLocation &&
            !/^https?:\/\//i.test(String(meetingLocation)) && (
              <span className="max-w-xs truncate">
                {meetingLocation}
              </span>
            )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSaveMeeting}
          disabled={saving || ending || isTerminal}
          className="rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        >
          {saving ? "Saving..." : "Save Meeting"}
        </button>

        <button
          type="button"
          onClick={onEndMeeting}
          disabled={saving || ending || isTerminal}
          className="rounded-lg border border-red-300 px-4 py-2 text-[13px] font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        >
          {ending
            ? "Ending..."
            : isTerminal
              ? "Meeting Ended"
              : "End Meeting"}
        </button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;