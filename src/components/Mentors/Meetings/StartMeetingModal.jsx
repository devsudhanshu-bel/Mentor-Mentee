import React, { useState } from "react";
import {
  X,
  TriangleAlert,
  CalendarDays,
  MapPin,
  LoaderCircle,
  Video,
} from "lucide-react";

import meetingsService from "../../../services/meetingsService";

const getErrorMessage = (error) =>
  error?.message ||
  error?.response?.data?.message ||
  "Unable to start the meeting. Please try again.";

const formatDate = (meeting) => {
  const dateValue =
    meeting?.startAt ??
    meeting?.rawMeeting?.startAt ??
    meeting?.startTime;

  if (dateValue) {
    const date = new Date(dateValue);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  }

  return meeting?.date
    ? `${meeting.date} ${meeting.month ?? ""}`.trim()
    : "Date not specified";
};

const formatTime = (meeting) => {
  if (meeting?.time) {
    return meeting.time;
  }

  const start =
    meeting?.startAt ?? meeting?.rawMeeting?.startAt;

  const end =
    meeting?.endAt ?? meeting?.rawMeeting?.endAt;

  if (!start) {
    return "Time not specified";
  }

  const options = {
    hour: "numeric",
    minute: "2-digit",
  };

  const startTime = new Date(start);

  if (Number.isNaN(startTime.getTime())) {
    return "Time not specified";
  }

  const formattedStart = startTime.toLocaleTimeString(
    "en-IN",
    options
  );

  if (!end) {
    return formattedStart;
  }

  const endTime = new Date(end);

  if (Number.isNaN(endTime.getTime())) {
    return formattedStart;
  }

  return `${formattedStart} - ${endTime.toLocaleTimeString(
    "en-IN",
    options
  )}`;
};

const StartMeetingModal = ({
  open,
  onClose,
  meeting,
  onStartMeeting,
}) => {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");

  if (!open || !meeting) {
    return null;
  }

  const meetingId =
    meeting.id ?? meeting.rawMeeting?.id;

  const status = String(
    meeting.status ??
      meeting.rawMeeting?.status ??
      "SCHEDULED"
  ).toUpperCase();

  const isInProgress = status === "IN_PROGRESS";

  const isTerminal = [
    "COMPLETED",
    "CANCELLED",
    "NO_SHOW",
  ].includes(status);

  const handleStartMeeting = async () => {
    if (isStarting) {
      return;
    }

    if (!meetingId) {
      setError(
        "This meeting has no valid ID. Please refresh the meeting list and try again."
      );
      return;
    }

    if (isTerminal) {
      setError(
        "This meeting is already completed, cancelled, or marked as a no-show."
      );
      return;
    }

    setIsStarting(true);
    setError("");

    try {
      let updatedMeeting = meeting;

      if (!isInProgress) {
        /*
         * The fetch-based service returns the complete JSON:
         * {
         *   success: true,
         *   message: "...",
         *   data: { id, status, ... }
         * }
         */
        const response =
          await meetingsService.startMeeting(meetingId);

        if (response?.success === false) {
          throw new Error(
            response.message || "Unable to start the meeting."
          );
        }

        const payload = response?.data ?? response;

        updatedMeeting =
          payload?.meeting ??
          (payload?.id ? payload : null) ??
          meeting;
      }

      const workspaceMeeting = {
        ...meeting,
        ...updatedMeeting,
        id: meetingId,
        status: isInProgress
          ? "IN_PROGRESS"
          : updatedMeeting?.status ?? "IN_PROGRESS",
      };

      /*
       * Open the workspace only after the API succeeds.
       * The parent is responsible for opening the workspace.
       */
      if (onStartMeeting) {
        await onStartMeeting(workspaceMeeting);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsStarting(false);
    }
  };

  const location =
    meeting.location ??
    meeting.venue ??
    meeting.rawMeeting?.venue ??
    meeting.meetingLink ??
    meeting.rawMeeting?.meetingLink ??
    "Location not specified";

  const mode = String(
    meeting.mode ?? meeting.rawMeeting?.mode ?? ""
  ).toUpperCase();

  const isOnline = mode === "ONLINE";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => {
          if (!isStarting) {
            onClose();
          }
        }}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-meeting-title"
        className="fixed left-1/2 top-1/2 z-[9999] max-h-[92dvh] w-[calc(100%-1rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl sm:max-h-[90vh] sm:w-[calc(100%-2rem)] sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5 sm:py-4">
          <h2
            id="start-meeting-title"
            className="text-base font-semibold text-slate-800 sm:text-[17px]"
          >
            {isInProgress
              ? "Continue Meeting"
              : "Start Meeting"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isStarting}
            aria-label="Close dialog"
            className="shrink-0 rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} className="text-slate-600" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-4 sm:space-y-5 sm:p-5">
          {/* Warning */}
          <div className="flex items-start gap-2.5 rounded-xl border border-orange-200 bg-orange-50 px-3 py-3 sm:gap-3 sm:px-4">
            <div className="mt-0.5 shrink-0 rounded-full bg-orange-100 p-2">
              <TriangleAlert
                size={18}
                className="text-orange-500"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-slate-800">
                {isInProgress
                  ? "This meeting is already in progress"
                  : "You are about to start this meeting"}
              </h3>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                {isInProgress
                  ? "Continue to the workspace to manage meeting notes, discussion points, mentor feedback, and follow-up scheduling."
                  : "Starting this meeting updates its status and opens the Meeting Workspace, where you can manage notes, discussion points, mentor feedback, and follow-up scheduling."}
              </p>
            </div>
          </div>

          {/* Meeting Information */}
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:space-y-4 sm:p-4">
            <div className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[100px_minmax(0,1fr)]">
              <span className="text-[11px] font-medium text-slate-500 sm:text-[12px]">
                Meeting
              </span>

              <p className="break-words text-[12px] font-semibold text-slate-800 sm:text-[13px]">
                {meeting.title || "Mentorship Meeting"}
              </p>
            </div>

            <div className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[100px_minmax(0,1fr)]">
              <span className="text-[11px] font-medium text-slate-500 sm:text-[12px]">
                Date & Time
              </span>

              <div className="flex min-w-0 items-start gap-2 text-[12px] text-slate-700 sm:text-[13px]">
                <CalendarDays
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <span className="break-words">
                  {formatDate(meeting)} · {formatTime(meeting)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[100px_minmax(0,1fr)]">
              <span className="text-[11px] font-medium text-slate-500 sm:text-[12px]">
                Location
              </span>

              <div className="flex min-w-0 items-start gap-2 text-[12px] text-slate-700 sm:text-[13px]">
                {isOnline ? (
                  <Video
                    size={15}
                    className="mt-0.5 shrink-0"
                  />
                ) : (
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0"
                  />
                )}

                <span className="break-words [overflow-wrap:anywhere]">
                  {location}
                </span>
              </div>
            </div>

            {meeting.studentName && (
              <div className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[100px_minmax(0,1fr)]">
                <span className="text-[11px] font-medium text-slate-500 sm:text-[12px]">
                  Student
                </span>

                <p className="break-words text-[12px] text-slate-700 sm:text-[13px]">
                  {meeting.studentName}
                </p>
              </div>
            )}
          </div>

          {/* Workspace Features */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-3 sm:px-4">
            <p className="text-[12px] font-semibold text-slate-700">
              Meeting Workspace Includes
            </p>

            <ul className="mt-3 space-y-1 text-[12px] text-slate-600">
              <li>• Meeting Notes</li>
              <li>• Discussion Points</li>
              <li>• Mentor Feedback</li>
              <li>• Follow-up Scheduling</li>
            </ul>
          </div>

          {/* API Error */}
          {error && (
            <div
              role="alert"
              className="break-words rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700"
            >
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2.5 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isStarting}
            className="w-full rounded-lg border border-slate-300 px-5 py-2.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleStartMeeting}
            disabled={isStarting || isTerminal}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2"
          >
            {isStarting && (
              <LoaderCircle
                size={15}
                className="animate-spin"
              />
            )}

            {isStarting
              ? "Starting..."
              : isInProgress
                ? "Open Workspace"
                : "Start Meeting"}
          </button>
        </div>
      </div>
    </>
  );
};

export default StartMeetingModal;
