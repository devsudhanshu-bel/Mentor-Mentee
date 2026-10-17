
import React, { useEffect, useMemo } from "react";

import {
  X,
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
  ClipboardList,
  CalendarCheck2,
  Video,
} from "lucide-react";

// =========================================================
// HELPERS
// =========================================================

const firstValue = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );

const unwrapMeeting = (value) => {
  let result = value;

  for (let i = 0; i < 4; i += 1) {
    if (
      result &&
      !Array.isArray(result) &&
      typeof result === "object" &&
      Object.prototype.hasOwnProperty.call(result, "data")
    ) {
      result = result.data;
    } else {
      break;
    }
  }

  return result;
};

const getStartAt = (meeting) =>
  firstValue(
    meeting?.startAt,
    meeting?.startTime,
    meeting?.scheduledAt,
    meeting?.scheduledStart,
    meeting?.start_time,
    null
  );

const getEndAt = (meeting) =>
  firstValue(
    meeting?.endAt,
    meeting?.endTime,
    meeting?.scheduledEnd,
    meeting?.end_time,
    null
  );

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value) => {
  const date = parseDate(value);

  if (!date) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  const date = parseDate(value);

  if (!date) return "";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getMeetingType = (meeting) => {
  const type = firstValue(
    meeting?.meetingType,
    meeting?.type,
    "REGULAR"
  );

  return String(type)
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getMeetingMode = (meeting) =>
  String(meeting?.mode ?? "").trim().toUpperCase();

const formatVenue = (meeting) => {
  const mode = getMeetingMode(meeting);

  if (mode === "ONLINE") {
    return firstValue(
      meeting?.meetingLink,
      meeting?.venue,
      "Online meeting"
    );
  }

  return firstValue(
    meeting?.venue,
    meeting?.location,
    "Location not specified"
  );
};

// =========================================================
// COMPONENT
// =========================================================

const MeetingScheduledSuccessModal = ({
  open,
  onClose,
  meeting = null,
}) => {
  const actualMeeting = useMemo(
    () => unwrapMeeting(meeting),
    [meeting]
  );

  const startAt = getStartAt(actualMeeting);
  const endAt = getEndAt(actualMeeting);

  const meetingTitle = firstValue(
    actualMeeting?.title,
    "Mentorship Meeting"
  );

  const meetingDate = formatDate(startAt);

  const startTime = formatTime(startAt);
  const endTime = formatTime(endAt);

  const meetingTime = startTime
    ? `${startTime}${endTime ? ` - ${endTime}` : ""}`
    : "Time unavailable";

  const meetingVenue = formatVenue(actualMeeting);
  const meetingType = getMeetingType(actualMeeting);
  const isOnline = getMeetingMode(actualMeeting) === "ONLINE";

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="meeting-success-title"
        className="fixed left-1/2 top-1/2 z-[9999] flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-end px-5 pt-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close success dialog"
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-6">
          {/* Success message */}
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2
                size={42}
                className="text-emerald-600"
              />
            </div>

            <h2
              id="meeting-success-title"
              className="mt-4 text-center text-[22px] font-semibold text-slate-800"
            >
              Meeting Scheduled!
            </h2>

            <p className="mt-2 text-center text-[13px] text-slate-500">
              Your meeting has been scheduled successfully.
            </p>
          </div>

          {/* Meeting details */}
          <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {/* Title */}
            <div className="flex items-start gap-3">
              <ClipboardList
                size={17}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Title
                </p>

                <p className="mt-1 break-words text-sm font-medium text-slate-700">
                  {meetingTitle}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <CalendarDays
                size={17}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Date
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {meetingDate}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock3
                size={17}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Time
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {meetingTime}
                </p>
              </div>
            </div>

            {/* Venue or meeting link */}
            <div className="flex items-start gap-3">
              {isOnline ? (
                <Video
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
              ) : (
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
              )}

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {isOnline ? "Meeting Link" : "Venue"}
                </p>

                {isOnline && actualMeeting?.meetingLink ? (
                  <a
                    href={actualMeeting.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all text-sm font-medium text-blue-600 underline"
                  >
                    {actualMeeting.meetingLink}
                  </a>
                ) : (
                  <p className="mt-1 break-words text-sm font-medium text-slate-700">
                    {meetingVenue}
                  </p>
                )}
              </div>
            </div>

            {/* Meeting type */}
            <div className="flex items-start gap-3">
              <CalendarCheck2
                size={17}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Type
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {meetingType}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Close
          </button>
        </footer>
      </section>
    </>
  );
};

export default MeetingScheduledSuccessModal;
