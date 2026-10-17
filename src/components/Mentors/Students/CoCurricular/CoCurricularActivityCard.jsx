
import React from "react";
import {
  FileText,
  Eye,
  MessageSquare,
  CalendarDays,
  ExternalLink,
} from "lucide-react";

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

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

const CoCurricularActivityCard = ({
  activity,
  onView,
  onReview,
}) => {
  return (
    <article className="p-4 transition hover:bg-slate-50 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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

              {activity.fileSize != null && (
                <span>
                  {Number(activity.fileSize) < 1024
                    ? `${activity.fileSize} B`
                    : `${(Number(activity.fileSize) / 1024).toFixed(1)} KB`}
                </span>
              )}
            </div>

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

        <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
          {activity.fileUrl && (
            <a
              href={activity.fileUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open file for ${activity.title}`}
              title="Open file in new tab"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <ExternalLink size={17} />
            </a>
          )}

          <button
            type="button"
            onClick={onView}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Eye size={16} />
            View
          </button>

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
