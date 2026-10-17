import React from "react";
import {
  FileText,
  Eye,
  ClipboardCheck,
  CalendarDays,
  ExternalLink,
  MessageSquare,
  HardDrive,
} from "lucide-react";

const statusConfig = {
  NOT_REVIEWED: {
    label: "Pending Review",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  PENDING: {
    label: "Pending Review",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  VERIFIED: {
    label: "Verified",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  CORRECTIONS_REQUESTED: {
    label: "Corrections Requested",
    className: "border-orange-200 bg-orange-50 text-orange-700",
  },
};

const formatDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatFileSize = (bytes) => {
  if (bytes == null || Number.isNaN(Number(bytes))) {
    return null;
  }

  const size = Number(bytes);

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const ResearchDocumentCard = ({
  research,
  onView,
  onReview,
}) => {
  const status =
    statusConfig[research?.status] || statusConfig.NOT_REVIEWED;

  const fileSize = formatFileSize(research?.fileSize);

  const hasFile = Boolean(research?.fileUrl);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-blue-200 hover:shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* DOCUMENT DETAILS */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words font-semibold text-slate-900">
              {research?.title || research?.documentName || "Untitled Research"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {research?.type || research?.category || "Research Document"}
            </p>

            {research?.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">
                {research.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} className="shrink-0" />
                Submitted {formatDate(research?.submittedAt || research?.uploadedAt)}
              </span>

              {research?.fileName && (
                <span className="inline-flex max-w-full items-center gap-1.5 break-all">
                  <FileText size={14} className="shrink-0" />
                  {research.fileName}
                </span>
              )}

              {fileSize && (
                <span className="inline-flex items-center gap-1.5">
                  <HardDrive size={14} className="shrink-0" />
                  {fileSize}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* STATUS AND ACTIONS */}
        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
          >
            {status.label}
          </span>

          <button
            type="button"
            onClick={() => onView?.(research)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <Eye size={16} />
            View
          </button>

          {hasFile && (
            <a
              href={research.fileUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${research.title || "research document"} in a new tab`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <ExternalLink size={15} />
              Open File
            </a>
          )}

          <button
            type="button"
            onClick={() => onReview?.(research)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
          >
            <ClipboardCheck size={16} />
            Review
          </button>
        </div>
      </div>

      {/* MENTOR REMARK */}
      {research?.mentorRemark && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <MessageSquare size={14} />
            Mentor Remark
          </p>

          <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
            {research.mentorRemark}
          </p>

          {research.reviewedAt && (
            <p className="mt-2 text-xs text-slate-400">
              Reviewed on {formatDate(research.reviewedAt)}
            </p>
          )}
        </div>
      )}
    </article>
  );
};

export default ResearchDocumentCard;