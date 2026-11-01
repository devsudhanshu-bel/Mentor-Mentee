import { useState } from "react";

import {
  FileText,
  Eye,
  MessageSquare,
  CalendarDays,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

import api from "../../../../api/axios";

// ==========================================================
// FORMAT DATE
// ==========================================================

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

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
// STATUS BADGE
// ==========================================================

function StatusBadge({ status }) {
  const statuses = {
    NOT_REVIEWED: {
      label: "Under Review",
      classes: "bg-amber-50 text-amber-700 ring-amber-200",
    },
    PENDING: {
      label: "Under Review",
      classes: "bg-amber-50 text-amber-700 ring-amber-200",
    },
    VERIFIED: {
      label: "Approved",
      classes: "bg-green-50 text-green-700 ring-green-200",
    },
    CORRECTIONS_REQUESTED: {
      label: "Corrections Requested",
      classes: "bg-orange-50 text-orange-700 ring-orange-200",
    },
  };

  const current = statuses[status] || statuses.NOT_REVIEWED;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${current.classes}`}
    >
      {current.label}
    </span>
  );
}

// ==========================================================
// CO-CURRICULAR ACTIVITY CARD
// ==========================================================

const CoCurricularActivityCard = ({
  activity,
  onView,
  onReview,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  // ==========================================================
  // OPEN DOCUMENT - AUTHENTICATED
  // ==========================================================

  const handleOpenDocument = async () => {
    if (!activity?.fileUrl || isOpening) {
      return;
    }

    // Open immediately to avoid popup blocking.
    const newWindow = window.open("about:blank", "_blank");

    if (!newWindow) {
      alert(
        "Your browser blocked the new tab. Please allow pop-ups and try again."
      );

      return;
    }

    newWindow.opener = null;

    let objectUrl = null;

    try {
      setIsOpening(true);

      const fileUrl = resolveFileUrl(activity.fileUrl);

      const response = await api.get(fileUrl, {
        responseType: "blob",
      });

      objectUrl = window.URL.createObjectURL(response.data);

      newWindow.location.href = objectUrl;

      // Revoke after the new tab has had time to load.
      window.setTimeout(() => {
        window.URL.revokeObjectURL(objectUrl);
      }, 60000);

    } catch (error) {
      console.error(
        "Failed to open Co-Curricular document:",
        error
      );

      newWindow.close();

      const status = error.response?.status;

      if (status === 401 || status === 403) {
        alert(
          "You are not authorized to access this document. Please log in again if your session has expired."
        );
      } else if (status === 404) {
        alert("The requested document could not be found.");
      } else {
        alert("Unable to open the document. Please try again.");
      }

    } finally {
      setIsOpening(false);
    }
  };

  // ==========================================================
  // FILE SIZE
  // ==========================================================

  const fileSize = Number(activity.fileSize);

  const formattedFileSize =
    activity.fileSize != null && Number.isFinite(fileSize)
      ? fileSize < 1024
        ? `${fileSize} B`
        : fileSize < 1024 * 1024
          ? `${(fileSize / 1024).toFixed(1)} KB`
          : `${(fileSize / (1024 * 1024)).toFixed(1)} MB`
      : null;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <article className="p-4 transition hover:bg-slate-50 sm:p-5">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

        {/* ==================================================
            ACTIVITY INFORMATION
        ================================================== */}

        <div className="flex min-w-0 flex-1 gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={21} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="break-words font-semibold text-slate-900">
                {activity.title}
              </h3>

              <StatusBadge status={activity.status} />

            </div>

            <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-600">
              {activity.description || "No description provided."}
            </p>

            {/* METADATA */}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                Uploaded {formatDate(activity.uploadedAt)}
              </span>

              {activity.fileType && (
                <span className="rounded-md bg-slate-100 px-2 py-1 font-medium uppercase">
                  {activity.fileType}
                </span>
              )}

              {formattedFileSize && (
                <span>{formattedFileSize}</span>
              )}

            </div>

            {/* MENTOR FEEDBACK */}

            {activity.mentorRemark && (
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">

                <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <MessageSquare size={14} />
                  Mentor feedback
                </p>

                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-600">
                  {activity.mentorRemark}
                </p>

              </div>
            )}

          </div>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">

          {/* OPEN DOCUMENT */}

          {activity.fileUrl && (
            <button
              type="button"
              onClick={handleOpenDocument}
              disabled={isOpening}
              aria-label={`Open file for ${activity.title}`}
              title="Open file in new tab"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isOpening ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <ExternalLink size={17} />
              )}
            </button>
          )}

          {/* VIEW */}

          <button
            type="button"
            onClick={onView}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Eye size={16} />
            View
          </button>

          {/* REVIEW */}

          <button
            type="button"
            onClick={onReview}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <MessageSquare size={16} />
            Review
          </button>

        </div>

      </div>

    </article>
  );
};

export default CoCurricularActivityCard;