import { useState } from "react";

import {
  X,
  ShieldCheck,
  RotateCcw,
  FileText,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

import api from "../../../../api/axios";

// ==========================================================
// RESOLVE FILE URL
// ==========================================================

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) return null;

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  if (fileUrl.startsWith("/api/")) {
    return fileUrl.replace(/^\/api/, "");
  }

  return fileUrl.startsWith("/")
    ? fileUrl
    : `/${fileUrl}`;
};

// ==========================================================
// EXTRA CURRICULAR VERIFICATION MODAL
// ==========================================================

const ExtraCurricularVerificationModal = (props) => {
  const { activity } = props;

  if (!activity) return null;

  const activityKey =
    activity.id ??
    activity.fileUrl ??
    activity.documentName ??
    activity.title ??
    "activity";

  return (
    <ExtraCurricularVerificationModalContent
      key={activityKey}
      {...props}
    />
  );
};

// ==========================================================
// MODAL CONTENT
// ==========================================================

const ExtraCurricularVerificationModalContent = ({
  activity,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [remark, setRemark] = useState(
    activity.mentorRemark || ""
  );

  const [error, setError] = useState("");
  const [submittingStatus, setSubmittingStatus] = useState(null);
  const [isOpening, setIsOpening] = useState(false);

  const isBusy = isSubmitting || submittingStatus !== null;

  const fileUrl = activity.fileUrl || activity.fileURL || "";

  // ==========================================================
  // OPEN SUPPORTING EVIDENCE - AUTHENTICATED
  // ==========================================================

  const handleOpenDocument = async () => {
    if (!fileUrl || isOpening) return;

    const newWindow = window.open("about:blank", "_blank");

    if (!newWindow) {
      setError(
        "Your browser blocked the new tab. Please allow pop-ups and try again."
      );
      return;
    }

    newWindow.opener = null;

    try {
      setIsOpening(true);
      setError("");

      const response = await api.get(resolveFileUrl(fileUrl), {
        responseType: "blob",
      });

      const objectUrl = window.URL.createObjectURL(response.data);

      newWindow.location.href = objectUrl;

      window.setTimeout(() => {
        window.URL.revokeObjectURL(objectUrl);
      }, 60000);

    } catch (openError) {
      console.error(
        "Failed to open Extra-Curricular evidence:",
        openError
      );

      newWindow.close();

      const status = openError.response?.status;

      if (status === 401 || status === 403) {
        setError(
          "You are not authorized to access this document. Please log in again if your session has expired."
        );
      } else if (status === 404) {
        setError("The requested document could not be found.");
      } else {
        setError("Unable to open the document. Please try again.");
      }

    } finally {
      setIsOpening(false);
    }
  };

  // ==========================================================
  // SUBMIT REVIEW
  // ==========================================================

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

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleClose = () => {
    if (!isBusy) {
      onClose();
    }
  };

  // ==========================================================
  // ACTIVITY INFORMATION
  // ==========================================================

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

  // ==========================================================
  // RENDER
  // ==========================================================

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
                <button
                  type="button"
                  onClick={handleOpenDocument}
                  disabled={isOpening}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isOpening ? (
                    <LoaderCircle
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <ExternalLink size={14} />
                  )}

                  {isOpening
                    ? "Opening evidence..."
                    : "Open supporting evidence"}
                </button>
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