import React from "react";

import {
  User,
  CalendarDays,
  Clock3,
  Video,
  MapPin,
  FileText,
  MessageCircle,
  Star,
  Save,
  CheckCircle2,
  Circle,
  LoaderCircle,
} from "lucide-react";

// =========================================================
// HELPERS
// =========================================================

const formatDate = (value) => {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getMeetingDate = (meeting) =>
  meeting?.scheduledAt ??
  meeting?.scheduled_at ??
  meeting?.scheduledStart ??
  meeting?.scheduled_start ??
  meeting?.startAt ??
  meeting?.start_at ??
  meeting?.startTime ??
  meeting?.start_time ??
  meeting?.startDateTime ??
  meeting?.start_date_time ??
  meeting?.scheduledDate ??
  meeting?.scheduled_date ??
  meeting?.date ??
  null;

const getStudentName = (meeting) =>
  meeting?.students?.fullName ??
  meeting?.students?.name ??
  meeting?.student?.name ??
  meeting?.student?.fullName ??
  meeting?.studentName ??
  meeting?.student_name ??
  meeting?.mentee?.name ??
  meeting?.menteeName ??
  "Student details unavailable";

const getStudentRegistration = (meeting) =>
  meeting?.students?.registerNumber ??
  meeting?.students?.registrationNumber ??
  meeting?.students?.registration_number ??
  meeting?.student?.registrationNumber ??
  meeting?.student?.registration_number ??
  meeting?.student?.rollNumber ??
  meeting?.student?.roll_number ??
  meeting?.registrationNumber ??
  meeting?.registration_number ??
  meeting?.student?.regNo ??
  "";

const getMeetingMode = (meeting) =>
  meeting?.meetingType ??
  meeting?.meeting_type ??
  meeting?.mode ??
  meeting?.type ??
  "Not specified";

const getMeetingLocation = (meeting) =>
  meeting?.meetingLink ??
  meeting?.meeting_link ??
  meeting?.location ??
  meeting?.venue ??
  null;

const isHttpUrl = (value) =>
  /^https?:\/\//i.test(String(value ?? ""));

// =========================================================
// WORKSPACE RIGHT PANEL
// =========================================================

const WorkspaceRightPanel = ({
  meeting,
  duration,
  notes = "",
  discussionPoints = [],
  rating,
  feedback,
  saveNotes,
  onEndMeeting,
  saving = false,
  ending = false,
  dirtyNotes = false,
}) => {
  const status = String(meeting?.status ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  const isTerminal = [
    "COMPLETED",
    "CANCELLED",
    "CANCELED",
    "NO_SHOW",
  ].includes(status);

  const meetingMode = String(getMeetingMode(meeting))
    .replace(/_/g, " ");

  const meetingLocation = getMeetingLocation(meeting);
  const scheduledDate = getMeetingDate(meeting);

  const studentName = getStudentName(meeting);
  const registrationNumber = getStudentRegistration(meeting);

  const noteCount = String(notes ?? "").length;
  const discussionCount = discussionPoints.length;

  const hasNotes = noteCount > 0;
  const hasDiscussion = discussionCount > 0;

  const hasFeedback =
    Number(rating) > 0 ||
    Boolean(String(feedback ?? "").trim());

  const statusLabel = {
    SCHEDULED: "Scheduled",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    CANCELED: "Cancelled",
    NO_SHOW: "No show",
  }[status] ?? (status || "Unknown");

  const statusClass = {
    SCHEDULED: "bg-indigo-100 text-indigo-700",
    IN_PROGRESS: "bg-emerald-100 text-emerald-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    CANCELLED: "bg-red-100 text-red-700",
    CANCELED: "bg-red-100 text-red-700",
    NO_SHOW: "bg-amber-100 text-amber-700",
  }[status] ?? "bg-slate-100 text-slate-600";

  return (
    <aside className="overflow-y-auto border-l border-slate-200 bg-slate-50 p-4">
      {/* Student Information */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <User size={20} className="text-blue-600" />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-[15px] font-semibold text-slate-800">
              {studentName}
            </h3>

            {registrationNumber && (
              <p className="mt-1 text-xs text-slate-500">
                {registrationNumber}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Meeting Information */}
      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-[15px] font-semibold text-slate-700">
          Meeting Information
        </h3>

        <div className="space-y-4">
          <InfoRow
            icon={<CalendarDays size={18} />}
            label="Scheduled"
            value={
              scheduledDate
                ? formatDate(scheduledDate)
                : "Schedule unavailable"
            }
          />

          <InfoRow
            icon={<Clock3 size={18} />}
            label="Duration"
            value={duration || "00:00:00"}
          />

          <InfoRow
            icon={<Video size={18} />}
            label="Mode"
            value={meetingMode}
          />

          {meetingLocation && (
            <InfoRow
              icon={<MapPin size={18} />}
              label={
                isHttpUrl(meetingLocation)
                  ? "Meeting link"
                  : "Location"
              }
              value={meetingLocation}
              isLink={isHttpUrl(meetingLocation)}
            />
          )}
        </div>
      </section>

      {/* Workspace Overview */}
      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-[15px] font-semibold text-slate-700">
          Workspace Overview
        </h3>

        <ProgressRow
          icon={<FileText size={18} />}
          title="Meeting notes"
          value={`${noteCount} characters`}
          complete={hasNotes}
        />

        <ProgressRow
          icon={<MessageCircle size={18} />}
          title="Discussion points"
          value={discussionCount}
          complete={hasDiscussion}
        />

        <ProgressRow
          icon={<Star size={18} />}
          title="Mentor feedback"
          value={hasFeedback ? "Added" : "Not added"}
          complete={hasFeedback}
        />

        <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">
          Overview indicators reflect the current workspace data.
          They do not represent a calculated meeting-completion
          percentage.
        </p>
      </section>

      {/* Meeting Status */}
      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Meeting Status
        </h3>

        <div className="mt-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
          >
            {statusLabel}
          </span>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          {status === "IN_PROGRESS"
            ? "Keep your notes updated. Save your work before ending the meeting."
            : status === "SCHEDULED"
              ? "This meeting has not been started yet."
              : status === "COMPLETED"
                ? "This meeting has been completed."
                : status === "CANCELLED" || status === "CANCELED"
                  ? "This meeting has been cancelled."
                  : status === "NO_SHOW"
                    ? "This meeting was marked as a no-show."
                    : "Meeting status will be shown here when available."}
        </p>
      </section>

      {/* Workspace Actions */}
      <div className="mt-5 space-y-2.5">
        <button
          type="button"
          onClick={saveNotes}
          disabled={saving || ending || isTerminal}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <LoaderCircle
              size={17}
              className="animate-spin"
            />
          ) : (
            <Save size={17} />
          )}

          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={onEndMeeting}
          disabled={saving || ending || isTerminal}
          className="flex w-full items-center justify-center rounded-xl border border-red-300 bg-white px-4 py-3 text-[13px] font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ending
            ? "Ending Meeting..."
            : isTerminal
              ? "Meeting Ended"
              : "End Meeting"}
        </button>
      </div>
    </aside>
  );
};

// =========================================================
// INFORMATION ROW
// =========================================================

function InfoRow({ icon, label, value, isLink = false }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wide text-slate-500">
          {label}
        </p>

        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-[13px] font-medium text-blue-600 hover:underline"
          >
            Open meeting link
          </a>
        ) : (
          <p className="mt-1 break-words text-[13px] font-medium text-slate-700">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

// =========================================================
// WORKSPACE PROGRESS ROW
// =========================================================

function ProgressRow({ icon, title, value, complete }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 last:mb-0">
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-slate-400">
          {icon}
        </span>

        <span className="text-[13px] text-slate-600">
          {title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span className="text-xs font-semibold text-slate-700">
          {value}
        </span>

        {complete ? (
          <CheckCircle2
            size={14}
            className="text-emerald-600"
          />
        ) : (
          <Circle
            size={14}
            className="text-slate-300"
          />
        )}
      </div>
    </div>
  );
}

export default WorkspaceRightPanel;