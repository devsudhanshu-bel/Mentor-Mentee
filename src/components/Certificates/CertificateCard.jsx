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

  const isVerified = [
    "VERIFIED",
    "APPROVED",
  ].includes(status);

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
        className:
          "bg-green-50 text-green-700 border-green-200",
        icon: CircleCheck,
      }
    : isCorrectionRequested
      ? {
          label:
            status === "REJECTED"
              ? "Rejected"
              : "Corrections Requested",
          className:
            "bg-red-50 text-red-700 border-red-200",
          icon: AlertCircle,
        }
      : isDraft
        ? {
            label: "Draft",
            className:
              "bg-slate-100 text-slate-600 border-slate-200",
            icon: FileText,
          }
        : {
            label: isPending
              ? "Pending Review"
              : "Not Reviewed",
            className:
              "bg-amber-50 text-amber-700 border-amber-200",
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
    if (
      ["jpg", "jpeg", "png", "webp"].includes(
        fileExtension
      )
    ) {
      return (
        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
          <FileImage
            size={18}
            className="text-purple-500"
          />
        </div>
      );
    }

    if (fileExtension === "pdf") {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
          <FileText
            size={18}
            className="text-red-500"
          />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
        <FileText
          size={18}
          className="text-blue-500"
        />
      </div>
    );
  };

  // ==========================================================
  // DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

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
    if (bytes == null || Number(bytes) <= 0) {
      return "";
    }

    const size = Number(bytes);

    if (size < 1024) {
      return `${size} B`;
    }

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

    if (deleting || isVerified) {
      return;
    }

    onDelete?.(certificate);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isVerified) {
      return;
    }

    onEdit?.(certificate);
  };

  const handleResubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isCorrectionRequested || isVerified) {
      return;
    }

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
    <div className="border border-slate-200 rounded-lg px-4 py-3 hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-4">
        {/* LEFT SIDE */}

        <div className="flex items-start gap-3 min-w-0 flex-1">
          {getFileIcon()}

          <div className="min-w-0 flex-1">
            <h3
              className="text-sm font-semibold text-slate-800 truncate max-w-[600px]"
              title={certificate.documentName}
            >
              {certificate.documentName ||
                "Untitled Certificate"}
            </h3>

            {/* CATEGORY + ISSUER */}

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium">
                {certificate.certificateType ||
                  certificate.type ||
                  certificate.documentType ||
                  "Certificate"}
              </span>

              {certificate.issuer && (
                <>
                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="text-xs text-slate-500">
                    {certificate.issuer}
                  </span>
                </>
              )}
            </div>

            {/* DATE + SIZE */}

            <p className="text-xs text-slate-400 mt-1">
              Uploaded{" "}
              {formatDate(certificate.uploadedAt)}

              {certificate.fileSize != null && (
                <>
                  <span className="mx-1.5">•</span>
                  {formatFileSize(certificate.fileSize)}
                </>
              )}
            </p>

            {/* REVIEW STATUS */}

            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-semibold ${statusConfig.className}`}
              >
                <StatusIcon size={12} />
                {statusConfig.label}
              </span>
            </div>

            {/* MENTOR FEEDBACK */}

            {mentorRemark && (
              <div
                className={`mt-3 rounded-md border p-3 ${
                  isCorrectionRequested
                    ? "bg-red-50 border-red-100"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <p className="text-xs font-semibold text-slate-700">
                  Mentor Feedback
                </p>

                <p className="text-xs text-slate-600 mt-1 whitespace-pre-wrap break-words">
                  {mentorRemark}
                </p>
              </div>
            )}

            {/* REVIEW ACTIONS */}

            {!isVerified && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {isCorrectionRequested ? (
                  <button
                    type="button"
                    onClick={handleResubmit}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
                  >
                    <RefreshCw size={13} />
                    Replace & Resubmit
                  </button>
                ) : (
                  onEdit && (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium transition"
                    >
                      <Pencil size={13} />
                      Edit / Replace
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* DOCUMENT ACTIONS */}

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleView}
            title="View certificate"
            aria-label="View certificate"
            className="p-2 rounded-md hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="Download certificate"
            aria-label="Download certificate"
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
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
              className="p-2 rounded-md hover:bg-red-50 text-slate-500 hover:text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
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