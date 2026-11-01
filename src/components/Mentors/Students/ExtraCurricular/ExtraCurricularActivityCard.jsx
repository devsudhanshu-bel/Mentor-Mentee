import { useState } from "react";

import {
  Eye,
  ClipboardCheck,
  FileText,
  CalendarDays,
  HardDrive,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

import api from "../../../../api/axios";

// ==========================================================
// REVIEW STATUS
// ==========================================================

const STATUS_STYLES = {
  VERIFIED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CORRECTIONS_REQUESTED: "bg-rose-50 text-rose-700 ring-rose-200",
  NOT_REVIEWED: "bg-amber-50 text-amber-700 ring-amber-200",
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
};

const STATUS_LABELS = {
  VERIFIED: "Verified",
  CORRECTIONS_REQUESTED: "Corrections Requested",
  NOT_REVIEWED: "Pending Review",
  PENDING: "Pending Review",
};

// ==========================================================
// FORMAT DATE
// ==========================================================

const formatDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ==========================================================
// FORMAT FILE SIZE
// Database fileSize is stored in bytes.
// ==========================================================

const formatSize = (bytes) => {
  if (bytes === null || bytes === undefined || bytes === "") {
    return "Size unavailable";
  }

  const size = Number(bytes);

  if (!Number.isFinite(size) || size < 0) {
    return "Size unavailable";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

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
// EXTRA CURRICULAR ACTIVITY CARD
// ==========================================================

const ExtraCurricularActivityCard = ({
  activity,
  onView,
  onReview,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  if (!activity) return null;

  const status =
    activity.status ||
    activity.researchReviewStatus ||
    "NOT_REVIEWED";

  const statusClass =
    STATUS_STYLES[status] ||
    "bg-slate-100 text-slate-700 ring-slate-200";

  const title =
    activity.title ||
    activity.documentName ||
    "Untitled Activity";

  const fileUrl = activity.fileUrl || "";

  // The document's database category is EXTRA_CURRICULAR.
  // Do not mistake the description for the category.
  const category =
    activity.category === "EXTRA_CURRICULAR"
      ? "Extra Curricular"
      : activity.activityType ||
        (activity.category &&
        activity.category !== "EXTRA_CURRICULAR"
          ? activity.category
          : "Extra Curricular");

  const description = activity.description || "";

  const uploadedAt =
    activity.uploadedAt ||
    activity.submittedAt ||
    null;

  const fileSize = activity.fileSize ?? null;

  const mentorRemark = activity.mentorRemark || "";

  // ==========================================================
  // OPEN DOCUMENT - AUTHENTICATED
  // ==========================================================

  const handleOpenDocument = async () => {
    if (!fileUrl || isOpening) return;

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

      const response = await api.get(resolveFileUrl(fileUrl), {
        responseType: "blob",
      });

      objectUrl = window.URL.createObjectURL(response.data);

      newWindow.location.href = objectUrl;

      window.setTimeout(() => {
        window.URL.revokeObjectURL(objectUrl);
      }, 60000);

    } catch (error) {
      console.error(
        "Failed to open Extra-Curricular document:",
        error
      );

      newWindow.close();

      const responseStatus = error.response?.status;

      if (responseStatus === 401 || responseStatus === 403) {
        alert(
          "You are not authorized to access this document. Please log in again if your session has expired."
        );
      } else if (responseStatus === 404) {
        alert("The requested document could not be found.");
      } else {
        alert("Unable to open the document. Please try again.");
      }

    } finally {
      setIsOpening(false);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">

      {/* ACTIVITY HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex min-w-0 gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <FileText
              size={21}
              className="text-blue-600"
            />
          </div>

          <div className="min-w-0">

            <h3 className="break-words text-sm font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {category}
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${statusClass}`}
            >
              {STATUS_LABELS[status] ||
                status.replaceAll("_", " ")}
            </span>

          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex shrink-0 gap-2">

          <button
            type="button"
            onClick={() => onView?.(activity)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Eye size={14} />
            View
          </button>

          <button
            type="button"
            onClick={() => onReview?.(activity)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            <ClipboardCheck size={14} />
            Review
          </button>

        </div>
      </div>

      {/* DESCRIPTION */}

      {description && (
        <p className="mt-4 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">
          {description}
        </p>
      )}

      {/* FILE INFORMATION */}

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">

        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={13} />
          Uploaded {formatDate(uploadedAt)}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <HardDrive size={13} />
          {formatSize(fileSize)}
        </span>

        {fileUrl && (
          <button
            type="button"
            onClick={handleOpenDocument}
            disabled={isOpening}
            className="inline-flex items-center gap-1 text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isOpening ? (
              <LoaderCircle
                size={13}
                className="animate-spin"
              />
            ) : (
              <ExternalLink size={13} />
            )}

            {isOpening ? "Opening..." : "Open file"}
          </button>
        )}

      </div>

      {/* MENTOR REMARK */}

      {mentorRemark && (
        <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3">

          <p className="text-[11px] font-semibold text-slate-700">
            Mentor remark
          </p>

          <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">
            {mentorRemark}
          </p>

        </div>
      )}

    </article>
  );
};

export default ExtraCurricularActivityCard;