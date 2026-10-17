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

      <div className="fixed inset-0 z-[10011] flex items-center justify-center overflow-y-auto p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="end-meeting-title"
          className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertTriangle size={22} />
              </div>

              <div>
                <h2
                  id="end-meeting-title"
                  className="text-lg font-bold text-slate-900"
                >
                  End this meeting?
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review before completing the meeting.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              aria-label="Close confirmation"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={19} />
            </button>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Student
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {studentName}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} />
                  Session duration
                </span>
                <span className="font-mono text-sm font-bold text-slate-900">
                  {duration || "00:00:00"}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm leading-5 text-amber-800">
                Unsaved meeting notes will be saved before the meeting is
                completed. Make sure your discussion points and feedback are
                recorded.
              </p>
            </div>

            <p className="text-sm leading-5 text-slate-600">
              Once completed, the meeting status will be updated. Continue
              only if you have finished the session.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue Meeting
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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