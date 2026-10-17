import React, { useEffect, useState } from "react";
import {
  X,
  ShieldCheck,
  RotateCcw,
  FileText,
} from "lucide-react";

const AwardsAchievementsVerificationModal = ({
  achievement,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setRemark(achievement?.mentorRemark || "");
    setError("");
  }, [achievement]);

  if (!achievement) return null;

  const handleSubmit = async (status) => {
    setError("");

    if (
      status === "CORRECTIONS_REQUESTED" &&
      !remark.trim()
    ) {
      setError(
        "Please provide a remark explaining the required corrections."
      );
      return;
    }

    try {
      await onSubmit({
        id: achievement.id,
        status,
        remark: remark.trim(),
      });
    } catch (submitError) {
      setError(
        submitError.message || "Unable to submit the review."
      );
    }
  };

  const currentStatus = (
    achievement.status || "NOT_REVIEWED"
  ).replaceAll("_", " ");

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="awards-review-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div>
            <h2
              id="awards-review-title"
              className="text-lg font-semibold text-slate-900"
            >
              Review Award & Achievement
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Verify the submitted achievement or request corrections.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close review"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* ACHIEVEMENT DETAILS AND REMARK */}
        <div className="space-y-5 p-5">
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <FileText
              size={22}
              className="mt-0.5 shrink-0 text-purple-600"
            />

            <div className="min-w-0">
              <h3 className="break-words font-medium text-slate-900">
                {achievement.title ||
                  achievement.documentName ||
                  "Untitled Achievement"}
              </h3>

              <p className="mt-1 break-words text-sm text-slate-500">
                {achievement.fileName ||
                  achievement.documentName ||
                  "Achievement document"}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Current status: {currentStatus}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="awards-mentor-remark"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Mentor remarks
            </label>

            <textarea
              id="awards-mentor-remark"
              value={remark}
              onChange={(event) => {
                setRemark(event.target.value);
                setError("");
              }}
              rows={4}
              maxLength={2000}
              disabled={isSubmitting}
              placeholder="Add feedback or explain the corrections required..."
              className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 disabled:bg-slate-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {remark.length}/2000 characters
            </p>

            {error && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <p className="text-xs leading-5 text-slate-500">
            Verify the achievement after reviewing its supporting
            document. Request corrections when the student needs
            to update the submission. A remark is mandatory when
            requesting corrections.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("CORRECTIONS_REQUESTED")}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-200 px-4 py-2.5 text-sm font-medium text-orange-700 hover:bg-orange-50 disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Request Corrections
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("VERIFIED")}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
          >
            <ShieldCheck size={16} />
            {isSubmitting ? "Submitting..." : "Verify Achievement"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AwardsAchievementsVerificationModal;