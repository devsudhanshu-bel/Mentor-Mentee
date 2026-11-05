import React from "react";
import { AlertTriangle, Clock, X } from "lucide-react";

const EndMeetingModal = ({
  open,
  meeting,
  duration,
  loading = false,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  const studentName =
    meeting?.students?.fullName ??
    meeting?.student?.fullName ??
    meeting?.studentName ??
    "the student";

  return (
    <>
      <div
        className="fixed inset-0 z-[10010] bg-slate-950/50 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      <div className="fixed inset-0 z-[10011] flex items-center justify-center overflow-y-auto p-2.5 sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="end-meeting-title"
          className="my-auto w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:rounded-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 sm:h-11 sm:w-11">
                <AlertTriangle size={19} className="sm:h-[22px] sm:w-[22px]" />
              </div>

              <div className="min-w-0">
                <h2
                  id="end-meeting-title"
                  className="text-base font-bold text-slate-900 sm:text-lg"
                >
                  End this meeting?
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Review before completing the meeting.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              aria-label="Close confirmation"
              className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
            >
              <X size={19} />
            </button>
          </div>

          <div className="space-y-3 px-4 py-4 sm:space-y-4 sm:px-6 sm:py-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                Student
              </p>
              <p className="mt-1 break-words text-sm font-semibold text-slate-900 sm:text-base">
                {studentName}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 sm:mt-4">
                <span className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                  <Clock size={15} className="shrink-0 sm:h-4 sm:w-4" />
                  Session duration
                </span>
                <span className="font-mono text-xs font-bold text-slate-900 sm:text-sm">
                  {duration || "00:00:00"}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 sm:px-4">
              <p className="break-words text-xs leading-5 text-amber-800 sm:text-sm">
                Unsaved meeting notes will be saved before the meeting is
                completed. Make sure your discussion points and feedback are
                recorded.
              </p>
            </div>

            <p className="text-xs leading-5 text-slate-600 sm:text-sm">
              Once completed, the meeting status will be updated. Continue
              only if you have finished the session.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-sm"
            >
              Continue Meeting
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-sm"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Ending Meeting...
                </>
              ) : (
                "Confirm End Meeting"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndMeetingModal;
