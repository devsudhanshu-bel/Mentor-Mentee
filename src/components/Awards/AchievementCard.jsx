import React from "react";

import {
  Trophy,
  Award,
  Star,
  Eye,
  Download,
  Trash2,
  Pencil,
  RotateCcw,
  Clock3,
  CircleCheck,
  AlertCircle,
  FileClock,
} from "lucide-react";

// ==========================================================
// REVIEW STATUS CONFIGURATION
// ==========================================================

const STATUS_CONFIG = {
  NOT_REVIEWED: {
    label: "Pending Review",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock3,
  },
  PENDING: {
    label: "Pending Review",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock3,
  },
  PENDING_REVIEW: {
    label: "Pending Review",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock3,
  },
  UNDER_REVIEW: {
    label: "Under Review",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: FileClock,
  },
  SUBMITTED: {
    label: "Submitted",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: FileClock,
  },
  APPROVED: {
    label: "Approved",
    className: "bg-green-50 text-green-700 border-green-200",
    icon: CircleCheck,
  },
  VERIFIED: {
    label: "Verified",
    className: "bg-green-50 text-green-700 border-green-200",
    icon: CircleCheck,
  },
  CORRECTIONS_REQUESTED: {
    label: "Corrections Requested",
    className: "bg-orange-50 text-orange-700 border-orange-200",
    icon: AlertCircle,
  },
  REJECTED: {
    label: "Changes Required",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: AlertCircle,
  },
  DRAFT: {
    label: "Draft",
    className: "bg-purple-50 text-purple-700 border-purple-200",
    icon: FileClock,
  },
};

// ==========================================================
// HELPERS
// ==========================================================

const getReviewStatus = (achievement) => {
  const status =
    achievement?.achievementReviewStatus ??
    achievement?.awardReviewStatus ??
    achievement?.researchReviewStatus ??
    achievement?.reviewStatus ??
    achievement?.verificationStatus ??
    achievement?.approvalStatus ??
    achievement?.status;

  return typeof status === "string"
    ? status.trim().toUpperCase()
    : "";
};

const getDocumentName = (achievement) =>
  achievement?.documentName ??
  achievement?.fileName ??
  achievement?.title ??
  "Untitled Achievement";

const getMentorFeedback = (achievement) =>
  achievement?.mentorRemark ??
  achievement?.reviewRemark ??
  achievement?.reviewComments ??
  achievement?.feedback ??
  "";

const getAchievementLevel = (achievement) =>
  achievement?.level ??
  achievement?.achievementLevel ??
  "University Level";

const getAchievementType = (achievement) =>
  achievement?.achievementType ??
  achievement?.type ??
  achievement?.awardType ??
  achievement?.documentType ??
  "Award / Achievement";

const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const formatFileSize = (bytes) => {
  if (bytes == null || bytes === "") return "";

  const size = Number(bytes);

  if (!Number.isFinite(size) || size < 0) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

// ==========================================================
// COMPONENT
// ==========================================================

const AchievementCard = ({
  achievement,
  onView,
  onDownload,
  onDelete,
  onEdit,
  onResubmit,
  deleting = false,
}) => {
  if (!achievement) return null;

  const achievementLevel = getAchievementLevel(achievement);
  const achievementType = getAchievementType(achievement);

  const description =
    achievement.description ||
    achievement.organization ||
    achievement.eventName ||
    "Achievement / recognition document";

  const achievementDate = formatDate(
    achievement.achievementDate ||
      achievement.date ||
      achievement.uploadedAt
  );

  // ========================================================
  // FILE EXTENSION
  // ========================================================

  const getFileExtension = () => {
    if (achievement.fileType) {
      return achievement.fileType
        .toLowerCase()
        .replace(".", "")
        .split("/")
        .pop();
    }

    const name = getDocumentName(achievement);
    const parts = name.split(".");

    return parts.length > 1 ? parts.pop().toLowerCase() : "";
  };

  const fileExtension = getFileExtension();

  // ========================================================
  // FILE ICON
  // ========================================================

  const getIcon = () => {
    const baseClass =
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg";

    if (fileExtension === "pdf") {
      return (
        <div className={`${baseClass} bg-red-50`}>
          <Award size={19} className="text-red-500" />
        </div>
      );
    }

    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      return (
        <div className={`${baseClass} bg-purple-50`}>
          <Star size={19} className="text-purple-500" />
        </div>
      );
    }

    if (["doc", "docx"].includes(fileExtension)) {
      return (
        <div className={`${baseClass} bg-blue-50`}>
          <Trophy size={19} className="text-blue-500" />
        </div>
      );
    }

    return (
      <div className={`${baseClass} bg-amber-50`}>
        <Trophy size={19} className="text-amber-500" />
      </div>
    );
  };

  // ========================================================
  // LEVEL BADGE
  // ========================================================

  const badgeColor = {
    "University Level": "bg-blue-50 text-blue-600",
    "Department Level": "bg-slate-100 text-slate-600",
    "National Level": "bg-indigo-50 text-indigo-600",
    "International Level": "bg-purple-50 text-purple-600",
  };

  const levelClass =
    badgeColor[achievementLevel] ||
    "bg-slate-100 text-slate-600";

  // ========================================================
  // REVIEW STATUS
  // ========================================================

  const reviewStatus = getReviewStatus(achievement);
  const statusConfig = STATUS_CONFIG[reviewStatus];

  const isApproved = ["APPROVED", "VERIFIED"].includes(reviewStatus);

  const canResubmit = [
    "CORRECTIONS_REQUESTED",
    "REJECTED",
  ].includes(reviewStatus);

  const mentorFeedback = getMentorFeedback(achievement);

  // ========================================================
  // ACTION HANDLERS
  // ========================================================

  const handleAction = (event, callback) => {
    event.preventDefault();
    event.stopPropagation();

    callback?.(achievement);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (deleting || isApproved) return;

    onDelete?.(achievement);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isApproved) return;

    onEdit?.(achievement);
  };

  const handleResubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canResubmit || isApproved) return;

    if (onResubmit) {
      onResubmit(achievement);
    } else {
      onEdit?.(achievement);
    }
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {/* LEFT: FILE + DETAILS */}

        <div className="flex min-w-0 items-start gap-4">
          {getIcon()}

          <div className="min-w-0 flex-1">
            <h3
              className="max-w-[520px] truncate text-sm font-semibold text-slate-800"
              title={getDocumentName(achievement)}
            >
              {getDocumentName(achievement)}
            </h3>

            <p className="mt-1 max-w-[520px] truncate text-xs text-slate-500">
              {achievementType}

              {achievementDate && (
                <>
                  <span className="mx-1.5">•</span>
                  {achievementDate}
                </>
              )}

              {achievement.fileSize != null && (
                <>
                  <span className="mx-1.5">•</span>
                  {formatFileSize(achievement.fileSize)}
                </>
              )}
            </p>

            {description && (
              <p
                className="mt-1 max-w-[520px] truncate text-xs text-slate-400"
                title={description}
              >
                {description}
              </p>
            )}

            {/* REVIEW STATUS */}

            {statusConfig ? (
              <span
                className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${statusConfig.className}`}
              >
                <statusConfig.icon size={12} />
                {statusConfig.label}
              </span>
            ) : (
              <span className="mt-2 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
                Status unavailable
              </span>
            )}

            {/* MENTOR FEEDBACK */}

            {mentorFeedback && canResubmit && (
              <div className="mt-2 max-w-xl rounded-md border border-orange-200 bg-orange-50 px-3 py-2">
                <p className="text-[10px] font-semibold text-orange-800">
                  Mentor&apos;s Feedback
                </p>

                <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-orange-900">
                  {mentorFeedback}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: LEVEL + ACTIONS */}

        <div className="ml-0 flex shrink-0 flex-wrap items-center gap-2 sm:ml-4 sm:justify-end">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${levelClass}`}
          >
            {achievementLevel.replace(" Level", "")}
          </span>

          {/* VIEW */}

          <button
            type="button"
            onClick={(event) => handleAction(event, onView)}
            title="View achievement"
            aria-label="View achievement"
            className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          {/* DOWNLOAD */}

          <button
            type="button"
            onClick={(event) => handleAction(event, onDownload)}
            title="Download achievement"
            aria-label="Download achievement"
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Download size={17} />
          </button>

          {/* EDIT / REPLACE */}

          {!isApproved && !canResubmit && (
            <button
              type="button"
              onClick={handleEdit}
              title="Edit / Replace"
              aria-label="Edit or replace achievement"
              className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Pencil size={17} />
            </button>
          )}

          {/* RESUBMIT AFTER CORRECTIONS */}

          {canResubmit && (
            <button
              type="button"
              onClick={handleResubmit}
              title="Edit and resubmit"
              aria-label="Edit and resubmit achievement"
              className="flex items-center gap-1 rounded-md bg-orange-50 px-2.5 py-2 text-xs font-medium text-orange-700 transition hover:bg-orange-100"
            >
              <RotateCcw size={14} />
              Resubmit
            </button>
          )}

          {/* DELETE */}

          {!isApproved && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              title="Delete achievement"
              aria-label="Delete achievement"
              className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={17} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;