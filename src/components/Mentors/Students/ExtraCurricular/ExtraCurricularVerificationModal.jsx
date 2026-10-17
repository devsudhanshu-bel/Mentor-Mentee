
import React, { useEffect, useState } from "react";
import {
  X,
  ShieldCheck,
  RotateCcw,
  FileText,
  ExternalLink,
} from "lucide-react";

const ExtraCurricularVerificationModal = ({
  activity,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [submittingStatus, setSubmittingStatus] = useState(null);

  useEffect(() => {
    setRemark(activity?.mentorRemark || "");
    setError("");
    setSubmittingStatus(null);
  }, [activity]);

  if (!activity) return null;

  const isBusy = isSubmitting || submittingStatus !== null;

  const handleSubmit = async (status) => {
    if (isBusy) return;

    setError("");

    if (status === "CORRECTIONS_REQUESTED" && !remark.trim()) {
      setError(
        "Please provide a remark explaining the required corrections."
      );
      return;
    }

    setSubmittingStatus(status);

    try {
      await onSubmit({
        id: activity.id,
        status,
        remark: remark.trim(),
      });
    } catch (submitError) {
      setError(
        submitError?.message || "Unable to submit the review."
      );
    } finally {
      setSubmittingStatus(null);
    }
  };

  const handleClose = () => {
    if (!isBusy) {
      onClose();
    }
  };

  const currentStatus = (
    activity.status ||
    activity.researchReviewStatus ||
    "NOT_REVIEWED"
  ).replaceAll("_", " ");

  const activityTitle =
    activity.title ||
    activity.documentName ||
    "Untitled Activity";

  const fileName =
    activity.fileName ||
    activity.documentName ||
    "Activity document";

  const fileUrl = activity.fileUrl || activity.fileURL || "";

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="extra-curricular-review-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <h2
              id="extra-curricular-review-title"
              className="text-lg font-semibold text-slate-900"
            >
              Review Extra Curricular Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Verify the submitted activity or request corrections.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            aria-label="Close review"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* ACTIVITY DETAILS AND REMARK */}
        <div className="space-y-5 p-5">
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <FileText
              size={22}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div className="min-w-0 flex-1">
              <h3 className="break-words font-medium text-slate-900">
                {activityTitle}
              </h3>

              <p className="mt-1 break-words text-sm text-slate-500">
                {fileName}
              </p>

              {activity.description && (
                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
                  {activity.description}
                </p>
              )}

              {activity.category && (
                <span className="mt-2 inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-medium text-blue-700">
                  {activity.category === "EXTRA_CURRICULAR"
                    ? "Extra Curricular Activities"
                    : activity.category}
                </span>
              )}

              <p className="mt-2 text-xs text-slate-500">
                Current status: {currentStatus}
              </p>

              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink size={14} />
                  Open supporting evidence
                </a>
              )}
            </div>
          </div>

          {/* MENTOR REMARKS */}
          <div>
            <label
              htmlFor="extra-curricular-mentor-remark"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Mentor remarks
            </label>

            <textarea
              id="extra-curricular-mentor-remark"
              value={remark}
              onChange={(event) => {
                setRemark(event.target.value);
                setError("");
              }}
              rows={4}
              maxLength={2000}
              disabled={isBusy}
              placeholder="Add feedback or explain the corrections required..."
              className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {remark.length}/2000 characters
            </p>

            {error && (
              <p
                role="alert"
                className="mt-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}
          </div>

          <p className="text-xs leading-5 text-slate-500">
            Verify only after reviewing the submitted activity and
            its supporting evidence. Request corrections when the
            student needs to update the submission.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("CORRECTIONS_REQUESTED")}
            disabled={isBusy}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-200 px-4 py-2.5 text-sm font-medium text-orange-700 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={16} />

            {submittingStatus === "CORRECTIONS_REQUESTED"
              ? "Requesting..."
              : "Request Corrections"}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("VERIFIED")}
            disabled={isBusy}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShieldCheck size={16} />

            {submittingStatus === "VERIFIED"
              ? "Verifying..."
              : "Verify Activity"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExtraCurricularVerificationModal;
