import React from "react";

import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Eye,
  Download,
  Trash2,
  CalendarDays,
  MessageSquare,
  BadgeCheck,
  Clock3,
  RotateCcw,
  Pencil,
} from "lucide-react";

// ==========================================================
// REVIEW STATUS CONFIGURATION
// ==========================================================

const STATUS_CONFIG = {
  NOT_REVIEWED: {
    label: "Pending Review",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  PENDING: {
    label: "Pending Review",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  PENDING_REVIEW: {
    label: "Pending Review",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  UNDER_REVIEW: {
    label: "Under Review",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Clock3,
  },
  SUBMITTED: {
    label: "Pending Review",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  VERIFIED: {
    label: "Verified",
    className: "border-green-200 bg-green-50 text-green-700",
    icon: BadgeCheck,
  },
  APPROVED: {
    label: "Verified",
    className: "border-green-200 bg-green-50 text-green-700",
    icon: BadgeCheck,
  },
  CORRECTIONS_REQUESTED: {
    label: "Corrections Requested",
    className: "border-orange-200 bg-orange-50 text-orange-700",
    icon: RotateCcw,
  },
  REJECTED: {
    label: "Not Approved",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: RotateCcw,
  },
  DRAFT: {
    label: "Draft",
    className: "border-slate-200 bg-slate-50 text-slate-600",
    icon: FileText,
  },
};

// ==========================================================
// STATUS HELPERS
// ==========================================================

const normalizeStatusValue = (value) =>
  String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getCoCurricularStatus = (activity) => {
  const rawStatus =
    activity?.coCurricularReviewStatus ??
    activity?.coCurricularStatus ??
    activity?.researchReviewStatus ??
    activity?.reviewStatus ??
    activity?.verificationStatus ??
    activity?.approvalStatus ??
    activity?.status;

  const normalized = normalizeStatusValue(rawStatus);

  // Explicit correction flags take precedence over a generic pending
  // status, but never override an approved/verified record.
  const correctionRequested =
    activity?.correctionsRequested === true ||
    activity?.requiresCorrection === true ||
    activity?.correctionRequired === true;

  if (
    correctionRequested &&
    !["VERIFIED", "APPROVED"].includes(normalized)
  ) {
    return "CORRECTIONS_REQUESTED";
  }

  return STATUS_CONFIG[normalized] ? normalized : "NOT_REVIEWED";
};

const getStatusConfig = (activity) =>
  STATUS_CONFIG[getCoCurricularStatus(activity)];

const isApproved = (activity) =>
  ["VERIFIED", "APPROVED"].includes(
    getCoCurricularStatus(activity)
  );

const canResubmit = (activity) =>
  ["CORRECTIONS_REQUESTED", "REJECTED"].includes(
    getCoCurricularStatus(activity)
  );

// ==========================================================
// COMPONENT
// ==========================================================

const CoCurricularActivityCard = ({
  activity,
  onView,
  onDownload,
  onDelete,
  onEdit,
  onResubmit,
  deleting = false,
}) => {
  if (!activity) return null;

  const currentStatus = getCoCurricularStatus(activity);
  const status = STATUS_CONFIG[currentStatus];
  const StatusIcon = status.icon;

  const approved = isApproved(activity);
  const editable = canResubmit(activity);

  // ========================================================
  // DOCUMENT DETAILS
  // ========================================================

  const documentName =
    activity.documentName ??
    activity.fileName ??
    activity.title ??
    "Untitled Activity";

  const description = activity.description ?? "";

  const mentorRemark =
    activity.mentorRemark ??
    activity.reviewRemark ??
    activity.reviewComments ??
    activity.feedback ??
    "";

  const submittedDate =
    activity.submittedAt ??
    activity.uploadedAt ??
    activity.createdAt;

  const reviewedDate =
    activity.reviewedAt ??
    activity.verifiedAt ??
    activity.approvedAt;

  // ========================================================
  // FILE EXTENSION
  // ========================================================

  const getFileExtension = () => {
    const originalFileName =
      activity.originalFileName ??
      activity.fileName ??
      activity.documentName ??
      "";

    const fileType = String(activity.fileType ?? "")
      .toLowerCase()
      .trim();

    if (fileType.includes("/")) {
      const subtype = fileType.split("/").pop();

      if (subtype === "pdf") return "pdf";
      if (subtype.includes("word")) return "docx";
      if (subtype.includes("presentation")) return "pptx";
      if (subtype.includes("spreadsheet")) return "xlsx";
      if (subtype.includes("jpeg")) return "jpg";
      if (subtype.includes("png")) return "png";
    }

    if (fileType) {
      return fileType.replace(/^\./, "");
    }

    const parts = originalFileName.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "";
  };

  const fileExtension = getFileExtension();

  const renderFileIcon = () => {
    if (fileExtension === "pdf") {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <FileText size={18} className="text-red-500" />
        </div>
      );
    }

    if (["doc", "docx"].includes(fileExtension)) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <FileText size={18} className="text-blue-500" />
        </div>
      );
    }

    if (["ppt", "pptx"].includes(fileExtension)) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
          <Presentation size={18} className="text-orange-500" />
        </div>
      );
    }

    if (["xls", "xlsx"].includes(fileExtension)) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
          <FileSpreadsheet size={18} className="text-green-500" />
        </div>
      );
    }

    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <FileText size={18} className="text-slate-500" />
      </div>
    );
  };

  // ========================================================
  // FORMATTERS
  // ========================================================

  const formatDate = (value) => {
    if (!value) return "Unknown date";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatFileSize = (value) => {
    if (
      value == null ||
      value === "" ||
      !Number.isFinite(Number(value)) ||
      Number(value) < 0
    ) {
      return "";
    }

    const bytes = Number(value);

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const fileSize = formatFileSize(activity.fileSize);

  // ========================================================
  // ACTIONS
  // ========================================================

  const handleView = () => {
    if (!activity.id) {
      alert("This activity does not have a valid ID.");
      return;
    }

    onView?.(activity);
  };

  const handleDownload = () => {
    if (!activity.id) {
      alert("This activity does not have a valid ID.");
      return;
    }

    onDownload?.(activity);
  };

  const handleEdit = () => {
    if (!activity.id) {
      alert("This activity does not have a valid ID.");
      return;
    }

    if (!editable) return;

    if (typeof onEdit !== "function") {
      alert("The edit action is not connected to the Co-Curricular page.");
      return;
    }

    onEdit(activity);
  };

  const handleResubmit = () => {
    if (!activity.id) {
      alert("This activity does not have a valid ID.");
      return;
    }

    if (!editable) return;

    if (typeof onResubmit !== "function") {
      alert("The resubmit action is not connected to the Co-Curricular page.");
      return;
    }

    onResubmit(activity);
  };

  const handleDelete = () => {
    if (!activity.id) {
      alert("This activity does not have a valid ID.");
      return;
    }

    if (approved || deleting) return;

    onDelete?.(activity);
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <article className="rounded-xl border border-slate-200 bg-white px-4 py-4 transition hover:border-blue-200 hover:shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* DOCUMENT DETAILS */}

        <div className="flex min-w-0 flex-1 items-start gap-3">
          {renderFileIcon()}

          <div className="min-w-0 flex-1">
            <h3
              className="break-words text-sm font-semibold text-slate-800"
              title={documentName}
            >
              {documentName}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Co-Curricular Activity
            </p>

            {description && (
              <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-600">
                {description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} />
                Submitted {formatDate(submittedDate)}
              </span>

              {fileSize && <span>{fileSize}</span>}
            </div>
          </div>
        </div>

        {/* STATUS AND ACTIONS */}

        <div className="flex shrink-0 flex-wrap items-center gap-2 xl:justify-end">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
          >
            <StatusIcon size={14} />
            {status.label}
          </span>

          <button
            type="button"
            onClick={handleView}
            title="View document"
            aria-label={`View ${documentName}`}
            className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="Download document"
            aria-label={`Download ${documentName}`}
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Download size={17} />
          </button>

          {/* EDIT / REPLACE AND RESUBMIT */}

          {editable && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-100"
              >
                <Pencil size={15} />
                Edit / Replace
              </button>

              <button
                type="button"
                onClick={handleResubmit}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <RotateCcw size={15} />
                Resubmit
              </button>
            </>
          )}

          {/* DELETE */}

          {!approved && (
            <button
              type="button"
              disabled={deleting}
              onClick={handleDelete}
              title="Delete activity"
              aria-label={`Delete ${documentName}`}
              className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={17} />
            </button>
          )}
        </div>
      </div>

      {/* MENTOR FEEDBACK */}

      {(mentorRemark || reviewedDate) && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <MessageSquare size={14} />
            Mentor Feedback
          </p>

          {mentorRemark && (
            <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
              {mentorRemark}
            </p>
          )}

          {reviewedDate && (
            <p className="mt-2 text-xs text-slate-400">
              Reviewed on {formatDate(reviewedDate)}
            </p>
          )}
        </div>
      )}

      {/* CORRECTION INSTRUCTIONS */}

      {editable && (
        <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50/70 px-3 py-2">
          <p className="text-xs leading-5 text-orange-800">
            Please review your mentor&apos;s feedback, update your document,
            and resubmit it for review.
          </p>
        </div>
      )}
    </article>
  );
};

export default CoCurricularActivityCard;