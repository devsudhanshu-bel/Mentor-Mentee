import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FileText,
  ChevronRight,
  FlaskConical,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getResearchStatus = (item) => {
  const status = item.researchReviewStatus;

  if (!status || status === "NOT_REVIEWED") {
    return "Submitted";
  }

  if (status === "PENDING") {
    return "Under Review";
  }

  if (status === "APPROVED") {
    return "Approved";
  }

  if (status === "REJECTED") {
    return "Rejected";
  }

  return status.replaceAll("_", " ");
};

const getStatusColor = (status) => {
  switch (status) {
    case "Submitted":
    case "Approved":
      return "text-emerald-600";

    case "Under Review":
      return "text-amber-600";

    case "Rejected":
      return "text-red-600";

    default:
      return "text-slate-600";
  }
};

const ResearchOverview = ({ research = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleViewAll = () => {
    if (id) {
      navigate(`/mentor/students/${id}/research`);
    }
  };

  const researchWorks = Array.isArray(research)
    ? research.slice(0, 3)
    : [];

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Research Works
        </h3>

        <button
          type="button"
          onClick={handleViewAll}
          className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* ================= Research List ================= */}
      <div className="flex-1 space-y-3">
        {researchWorks.length > 0 ? (
          researchWorks.map((item) => {
            const status = getResearchStatus(item);
            const statusColor = getStatusColor(status);

            return (
              <div
                key={item.id}
                className="flex gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <FileText
                    size={16}
                    className="text-blue-600"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[12px] font-semibold text-slate-800">
                    {item.documentName || "Untitled Research"}
                  </h4>

                  <div className="mt-1 flex items-center gap-1">
                    <FlaskConical
                      size={11}
                      className={statusColor}
                    />

                    <span
                      className={`text-[10px] font-medium ${statusColor}`}
                    >
                      {status}
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {formatDate(item.uploadedAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex min-h-24 items-center justify-center">
            <p className="text-center text-xs text-slate-500">
              No research documents available.
            </p>
          </div>
        )}
      </div>

      {/* ================= Footer ================= */}
      <button
        type="button"
        onClick={handleViewAll}
        className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
      >
        View Research Details
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default ResearchOverview;