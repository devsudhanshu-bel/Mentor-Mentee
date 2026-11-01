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
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${current.classes}`}
    >
      {current.label}
    </span>
  );
}

// ==========================================================
// AWARDS ACHIEVEMENT CARD
// ==========================================================

const AwardsAchievementCard = ({
  achievement,
  onView,
  onReview,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  // ==========================================================
  // OPEN DOCUMENT - AUTHENTICATED
  // ==========================================================

  const handleOpenDocument = async () => {
    if (!achievement?.fileUrl || isOpening) {
      return;
    }

    // Open immediately to avoid browser popup blocking.
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

      const fileUrl = resolveFileUrl(achievement.fileUrl);

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
        "Failed to open achievement document:",
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

  const formattedFileSize =
    achievement.fileSize != null
      ? Number(achievement.fileSize) < 1024
        ? `${achievement.fileSize} B`
        : Number(achievement.fileSize) < 1024 * 1024
          ? `${(
              Number(achievement.fileSize) / 1024
            ).toFixed(1)} KB`
          : `${(
              Number(achievement.fileSize) /
              (1024 * 1024)
            ).toFixed(1)} MB`
      : null;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <article className="p-3 transition hover:bg-slate-50 sm:p-4">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">

        {/* ==================================================
            ACHIEVEMENT INFORMATION
        ================================================== */}

        <div className="flex min-w-0 flex-1 gap-2.5">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <FileText size={17} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-1.5">

              <h3 className="break-words text-sm font-semibold text-slate-900">
                {achievement.title || "Untitled Achievement"}
              </h3>

              <StatusBadge status={achievement.status} />

            </div>

            <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">
              {achievement.description || "No description provided."}
            </p>

            {/* METADATA */}

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-slate-500">

              <span className="inline-flex items-center gap-1">
                <CalendarDays size={12} />
                Uploaded {formatDate(achievement.uploadedAt)}
              </span>

              {achievement.category && (
                <span className="rounded bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium text-purple-700">
                  {achievement.category === "AWARDS"
                    ? "Award / Achievement"
                    : achievement.category}
                </span>
              )}

              {achievement.fileType && (
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase">
                  {achievement.fileType}
                </span>
              )}

              {formattedFileSize && (
                <span>{formattedFileSize}</span>
              )}

            </div>

            {/* MENTOR FEEDBACK */}

            {achievement.mentorRemark && (
              <div className="mt-2 rounded-md border border-slate-200 bg-white p-2.5">

                <p className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-700">
                  <MessageSquare size={12} />
                  Mentor Feedback
                </p>

                <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-4 text-slate-600">
                  {achievement.mentorRemark}
                </p>

              </div>
            )}

          </div>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="flex shrink-0 flex-wrap gap-1.5 lg:justify-end">

          {/* OPEN DOCUMENT */}

          {achievement.fileUrl && (
            <button
              type="button"
              onClick={handleOpenDocument}
              disabled={isOpening}
              aria-label={`Open file for ${achievement.title}`}
              title="Open file in new tab"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isOpening ? (
                <LoaderCircle
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <ExternalLink size={14} />
              )}
            </button>
          )}

          {/* VIEW */}

          <button
            type="button"
            onClick={() => onView(achievement)}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <Eye size={14} />
            View
          </button>

          {/* REVIEW */}

          {achievement.status !== "VERIFIED" && (
            <button
              type="button"
              onClick={() => onReview(achievement)}
              className="inline-flex items-center gap-1.5 rounded-md bg-purple-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-purple-700"
            >
              <MessageSquare size={14} />
              Review
            </button>
          )}

        </div>

      </div>

    </article>
  );
};

export default AwardsAchievementCard;