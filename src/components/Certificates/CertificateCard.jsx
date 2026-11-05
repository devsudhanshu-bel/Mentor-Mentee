import React from "react";

import {
  FileText,
  FileImage,
  Eye,
  Download,
  Trash2,
  Pencil,
  RefreshCw,
  Clock3,
  CircleCheck,
  AlertCircle,
} from "lucide-react";

const CertificateCard = ({
  certificate,
  onView,
  onDownload,
  onDelete,
  onEdit,
  onResubmit,
  deleting = false,
}) => {
  // ==========================================================
  // SAFETY
  // ==========================================================

  if (!certificate) {
    return null;
  }

  // ==========================================================
  // FILE EXTENSION
  // ==========================================================

  const getFileExtension = () => {
    if (certificate.fileType) {
      return certificate.fileType
        .toLowerCase()
        .replace(".", "")
        .split("/")
        .pop();
    }

    if (certificate.documentName) {
      const parts = certificate.documentName.split(".");

      if (parts.length > 1) {
        return parts.pop().toLowerCase();
      }
    }

    return "";
  };

  const fileExtension = getFileExtension();

  // ==========================================================
  // REVIEW STATUS
  // ==========================================================

  const status = String(
    certificate.certificateReviewStatus ??
      certificate.researchReviewStatus ??
      certificate.reviewStatus ??
      certificate.verificationStatus ??
      certificate.approvalStatus ??
      certificate.status ??
      "NOT_REVIEWED"
  )
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  const isVerified = ["VERIFIED", "APPROVED"].includes(status);

  const isCorrectionRequested = [
    "CORRECTIONS_REQUESTED",
    "CORRECTION_REQUESTED",
    "REJECTED",
  ].includes(status);

  const isPending = [
    "NOT_REVIEWED",
    "PENDING",
    "PENDING_REVIEW",
    "UNDER_REVIEW",
    "IN_REVIEW",
    "SUBMITTED",
    "AWAITING_REVIEW",
  ].includes(status);

  const isDraft = status === "DRAFT";

  const statusConfig = isVerified
    ? {
        label: "Verified",
        className: "bg-green-50 text-green-700 border-green-200",
        icon: CircleCheck,
      }
    : isCorrectionRequested
      ? {
          label: status === "REJECTED" ? "Rejected" : "Corrections Requested",
          className: "bg-red-50 text-red-700 border-red-200",
          icon: AlertCircle,
        }
      : isDraft
        ? {
            label: "Draft",
            className: "bg-slate-100 text-slate-600 border-slate-200",
            icon: FileText,
          }
        : {
            label: isPending ? "Pending Review" : "Not Reviewed",
            className: "bg-amber-50 text-amber-700 border-amber-200",
            icon: Clock3,
          };

  const StatusIcon = statusConfig.icon;

  // ==========================================================
  // MENTOR FEEDBACK
  // ==========================================================

  const mentorRemark =
    certificate.mentorRemark ??
    certificate.reviewRemark ??
    certificate.reviewComments ??
    certificate.feedback ??
    "";

  // ==========================================================
  // FILE ICON
  // ==========================================================

  const getFileIcon = () => {
    if (["jpg", "jpeg", "png", "webp"].includes(fileExtension)) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50">
          <FileImage size={18} className="text-purple-500" />
        </div>
      );
    }

    if (fileExtension === "pdf") {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <FileText size={18} className="text-red-500" />
        </div>
      );
    }

    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <FileText size={18} className="text-blue-500" />
      </div>
    );
  };

  // ==========================================================
  // DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown date";
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================================
  // FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {
    if (bytes == null || Number(bytes) <= 0) return "";

    const size = Number(bytes);

    if (size < 1024) return `${size} B`;

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  // ==========================================================
  // ACTION HANDLERS
  // ==========================================================

  const handleView = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onView?.(certificate);
  };

  const handleDownload = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDownload?.(certificate);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (deleting || isVerified) return;

    onDelete?.(certificate);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isVerified) return;

    onEdit?.(certificate);
  };

  const handleResubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isCorrectionRequested || isVerified) return;

    if (onResubmit) {
      onResubmit(certificate);
    } else {
      onEdit?.(certificate);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 transition hover:shadow-sm sm:px-4">

      {/* ======================================================
          CARD HEADER AND CONTENT
      ====================================================== */}

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">

        {/* ====================================================
            LEFT SIDE — FILE INFORMATION
        ==================================================== */}

        <div className="flex min-w-0 flex-1 items-start gap-2.5 sm:gap-3">

          {getFileIcon()}

          <div className="min-w-0 flex-1">

            {/* FILE NAME */}

            <h3
              className="break-words text-sm font-semibold leading-5 text-slate-800 sm:truncate sm:max-w-[600px]"
              title={certificate.documentName}
            >
              {certificate.documentName || "Untitled Certificate"}
            </h3>

            {/* CATEGORY + ISSUER */}

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">

              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                {certificate.certificateType ||
                  certificate.type ||
                  certificate.documentType ||
                  "Certificate"}
              </span>

              {certificate.issuer && (
                <>
                  <span className="hidden text-slate-300 sm:inline">•</span>

                  <span className="break-words text-xs text-slate-500">
                    {certificate.issuer}
                  </span>
                </>
              )}

            </div>

            {/* DATE + SIZE */}

            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-400">
              <span>Uploaded {formatDate(certificate.uploadedAt)}</span>

              {certificate.fileSize != null && (
                <>
                  <span>•</span>
                  <span>{formatFileSize(certificate.fileSize)}</span>
                </>
              )}
            </p>

            {/* REVIEW STATUS */}

            <div className="mt-2">
              <span
                className={`inline-flex max-w-full items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold ${statusConfig.className}`}
              >
                <StatusIcon size={12} className="shrink-0" />
                <span>{statusConfig.label}</span>
              </span>
            </div>

            {/* MENTOR FEEDBACK */}

            {mentorRemark && (
              <div
                className={`mt-3 min-w-0 rounded-md border p-2.5 sm:p-3 ${
                  isCorrectionRequested
                    ? "border-red-100 bg-red-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className="text-xs font-semibold text-slate-700">
                  Mentor Feedback
                </p>

                <p className="mt-1 break-words whitespace-pre-wrap text-xs leading-relaxed text-slate-600">
                  {mentorRemark}
                </p>
              </div>
            )}

            {/* REVIEW ACTIONS */}

            {!isVerified && (
              <div className="mt-3 flex flex-wrap items-center gap-2">

                {isCorrectionRequested ? (
                  <button
                    type="button"
                    onClick={handleResubmit}
                    className="inline-flex min-h-9 max-w-full items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <RefreshCw size={13} className="shrink-0" />
                    <span>Replace & Resubmit</span>
                  </button>
                ) : (
                  onEdit && (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex min-h-9 max-w-full items-center justify-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100 active:scale-[0.98]"
                    >
                      <Pencil size={13} className="shrink-0" />
                      <span>Edit / Replace</span>
                    </button>
                  )
                )}

              </div>
            )}

          </div>
        </div>

        {/* ====================================================
            DOCUMENT ACTIONS
            Mobile: Right aligned below file information
            Desktop: Right aligned beside file information
        ==================================================== */}

        <div className="flex shrink-0 items-center justify-end gap-1 border-t border-slate-100 pt-2 sm:border-0 sm:pt-0">

          <button
            type="button"
            onClick={handleView}
            title="View certificate"
            aria-label="View certificate"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="Download certificate"
            aria-label="Download certificate"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Download size={17} />
          </button>

          {!isVerified && (
            <button
              type="button"
              disabled={deleting}
              onClick={handleDelete}
              title="Delete certificate"
              aria-label="Delete certificate"
              className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={17} />
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default CertificateCard;