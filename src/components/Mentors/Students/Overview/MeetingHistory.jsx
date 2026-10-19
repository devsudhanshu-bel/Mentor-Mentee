
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  MessageSquare,
  ChevronRight,
  X,
  Clock3,
  Video,
  History,
  RefreshCw,
} from "lucide-react";

import meetingsService from "../../../../services/meetingsService";
import api from "../../../../api/axios";
import { useLocation } from "react-router-dom";

// =========================================================
// RESPONSE HELPERS
// =========================================================

const unwrapResponse = (response) => {
  let result = response;

  // Support the API response:
  // { success: true, data: [...] }
  for (let i = 0; i < 3; i += 1) {
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

const getMeetingDate = (meeting) =>
  meeting?.startAt ??
  meeting?.startTime ??
  meeting?.scheduledAt ??
  meeting?.scheduledStart ??
  meeting?.start_time ??
  meeting?.createdAt ??
  meeting?.created_at ??
  null;

const getMeetingTitle = (meeting) =>
  meeting?.title ??
  meeting?.meetingTitle ??
  meeting?.subject ??
  "Mentor Meeting";

const getMeetingNotes = (meeting) => {
  const notes =
    meeting?.mentor_meeting_notes ??
    meeting?.mentorMeetingNotes ??
    meeting?.notes ??
    meeting?.meetingNotes ??
    meeting?.meeting_notes ??
    meeting?.workspace?.notes ??
    null;

  // Prisma may return a single related notes record.
  if (notes && !Array.isArray(notes) && typeof notes === "object") {
    const content =
      notes.content ??
      notes.text ??
      notes.body ??
      notes.notes ??
      "";

    return typeof content === "string" ? content.trim() : "";
  }

  // Also tolerate an array-shaped notes relation.
  if (Array.isArray(notes)) {
    return notes
      .map((note) =>
        typeof note === "string"
          ? note
          : note?.content ?? note?.text ?? note?.body ?? ""
      )
      .filter(Boolean)
      .join("\n")
      .trim();
  }

  if (typeof notes === "string") {
    return notes.trim();
  }

  // Agenda is a meeting description, not saved notes.
  // Use it only as a fallback when notes are unavailable.
  return typeof meeting?.agenda === "string"
    ? meeting.agenda.trim()
    : "";
};

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getStatusStyles = (status) => {
  switch (normalizeStatus(status)) {
    case "COMPLETED":
      return "bg-emerald-50 text-emerald-700";

    case "IN_PROGRESS":
      return "bg-blue-50 text-blue-700";

    case "CANCELLED":
      return "bg-red-50 text-red-700";

    case "NO_SHOW":
      return "bg-orange-50 text-orange-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

const formatMeetingDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatMeetingTime = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getMeetingId = (meeting) =>
  meeting?.id ??
  meeting?.meetingId ??
  meeting?.meeting_id ??
  null;

// =========================================================
// MEETING HISTORY MODAL
// =========================================================

const MeetingHistoryModal = ({
  open,
  meetings,
  onClose,
  studentName,
  isLoading,
  error,
  onRetry,
}) => {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="meeting-history-modal-title"
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <History size={21} />
            </div>

            <div>
              <h2
                id="meeting-history-modal-title"
                className="text-lg font-semibold text-slate-900"
              >
                Meeting History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {studentName
                  ? `Meeting records for ${studentName}`
                  : "Complete meeting records for this student"}
              </p>

              {!isLoading && !error && (
                <p className="mt-1 text-xs text-slate-400">
                  {meetings.length}{" "}
                  {meetings.length === 1 ? "meeting" : "meetings"}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close meeting history"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {isLoading ? (
            <div
              role="status"
              className="flex flex-col items-center justify-center py-12 text-sm text-slate-500"
            >
              <span className="mb-3 h-7 w-7 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              Loading meeting history...
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={onRetry}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          ) : meetings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays size={28} className="text-slate-300" />

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No meeting history yet
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                No meeting records were found for this student.
              </p>
            </div>
          ) : (
            meetings.map((meeting, index) => {
              const date = getMeetingDate(meeting);
              const notes = getMeetingNotes(meeting);
              const status = normalizeStatus(meeting?.status);
              const meetingId =
                getMeetingId(meeting) ?? `${date ?? "meeting"}-${index}`;

              return (
                <article
                  key={meetingId}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={14} />
                      <span>{formatMeetingDate(date)}</span>

                      {formatMeetingTime(date) && (
                        <>
                          <span className="text-slate-300">•</span>
                          <Clock3 size={13} />
                          <span>{formatMeetingTime(date)}</span>
                        </>
                      )}
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusStyles(status)}`}
                    >
                      {status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-800">
                    {getMeetingTitle(meeting)}
                  </h3>

                  {notes ? (
                    <div className="mt-2 flex items-start gap-2">
                      <MessageSquare
                        size={14}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <p className="whitespace-pre-wrap text-xs leading-5 text-slate-600">
                        {notes}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs italic text-slate-400">
                      No saved notes for this meeting.
                    </p>
                  )}

                  {meeting?.mode && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                      <Video size={13} />
                      {String(meeting.mode).replace(/_/g, " ")}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

// =========================================================
// MEETING HISTORY CARD
// =========================================================

const MeetingHistory = ({
  studentId,
  studentName = "",
  meetings: suppliedMeetings,
  isLoading: suppliedLoading,
  error: suppliedError = "",
  onRetry: suppliedRetry,
}) => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin/overview/students/") ||
    location.pathname.startsWith("/admin/mentor/");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [fetchedMeetings, setFetchedMeetings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchStudentMeetings = useCallback(async () => {
    if (!studentId) {
      setFetchedMeetings([]);
      setFetchError("");
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    setFetchError("");

    try {
      const response = isAdminRoute
        ? await api.get(`/admin/student-profile/${encodeURIComponent(studentId)}/meetings`)
        : await meetingsService.getMeetings({ studentId });

      const records = unwrapResponse(response);

      if (!Array.isArray(records)) {
        throw new Error(
          "The meetings API returned an unexpected response."
        );
      }

      setFetchedMeetings(records);
    } catch (error) {
      setFetchedMeetings([]);
      setFetchError(
        error?.message || "Unable to load meeting history."
      );
    } finally {
      setIsFetching(false);
    }
  }, [studentId, isAdminRoute]);

  useEffect(() => {
    fetchStudentMeetings();
  }, [fetchStudentMeetings]);

  // Use supplied records if the parent already manages this data.
  const hasSuppliedMeetings = Array.isArray(suppliedMeetings);
  const sourceMeetings = hasSuppliedMeetings
    ? suppliedMeetings
    : fetchedMeetings;

  const isLoading = suppliedLoading ?? isFetching;
  const error = suppliedError || fetchError;
  const retry = suppliedRetry ?? fetchStudentMeetings;

  // The backend already filters by studentId.
  // Keep a defensive client-side check as well.
  const sortedMeetings = useMemo(() => {
    if (!Array.isArray(sourceMeetings)) return [];

    const studentMeetings = studentId
      ? sourceMeetings.filter((meeting) => {
          const meetingStudentId =
            meeting?.studentId ??
            meeting?.students?.id ??
            meeting?.student?.id;

          return (
            meetingStudentId == null ||
            String(meetingStudentId) === String(studentId)
          );
        })
      : [];

    return [...studentMeetings].sort((a, b) => {
      const dateA = getMeetingDate(a);
      const dateB = getMeetingDate(b);

      const timeA = dateA ? new Date(dateA).getTime() : 0;
      const timeB = dateB ? new Date(dateB).getTime() : 0;

      return timeB - timeA;
    });
  }, [sourceMeetings, studentId]);

  const recentMeetings = sortedMeetings.slice(0, 3);

  const openHistory = () => setIsHistoryOpen(true);
  const closeHistory = () => setIsHistoryOpen(false);

  return (
    <>
      <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-[14px] font-semibold text-slate-800">
            Meeting History
          </h3>

          <button
            type="button"
            onClick={openHistory}
            className="shrink-0 text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
          >
            View All
          </button>
        </div>

        {!studentId ? (
          <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
            <CalendarDays size={26} className="text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-700">
              Select a student
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Select a student to view their meeting history.
            </p>
          </div>
        ) : isLoading ? (
          <div
            role="status"
            className="flex flex-1 flex-col items-center justify-center py-8 text-sm text-slate-500"
          >
            <span className="mb-3 h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            Loading meeting history...
          </div>
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={retry}
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <RefreshCw size={13} />
              Try again
            </button>
          </div>
        ) : recentMeetings.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
            <CalendarDays size={26} className="text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-700">
              No meetings yet
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              No meeting records were found for this student.
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-3">
            {recentMeetings.map((meeting, index) => {
              const date = getMeetingDate(meeting);
              const notes = getMeetingNotes(meeting);
              const meetingId =
                getMeetingId(meeting) ?? `${date ?? "meeting"}-${index}`;

              return (
                <article
                  key={meetingId}
                  className="rounded-lg border border-slate-100 p-3"
                >
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <CalendarDays size={12} />
                    <span>{formatMeetingDate(date)}</span>
                  </div>

                  <h4 className="mt-2 text-[12px] font-semibold text-slate-800">
                    {getMeetingTitle(meeting)}
                  </h4>

                  <div className="mt-2 flex gap-2">
                    <MessageSquare
                      size={13}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <p className="line-clamp-3 text-[10px] leading-5 text-slate-600">
                      {notes || "No saved notes for this meeting."}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <button
          type="button"
          onClick={openHistory}
          className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
        >
          View Complete History
          <ChevronRight size={14} />
        </button>
      </div>

      <MeetingHistoryModal
        open={isHistoryOpen}
        meetings={sortedMeetings}
        studentName={studentName}
        onClose={closeHistory}
        isLoading={isLoading}
        error={error}
        onRetry={retry}
      />
    </>
  );
};

export default MeetingHistory;
