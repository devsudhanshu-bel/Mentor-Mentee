import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const InternshipsOverview = ({ internships = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleViewAll = () => {
    if (id) {
      navigate(`/mentor/students/${id}/internships`);
    }
  };

  const internship = Array.isArray(internships)
    ? internships[0]
    : null;

  const duration =
    internship?.startDate && internship?.endDate
      ? `${formatDate(internship.startDate)} – ${formatDate(internship.endDate)}`
      : internship?.startDate
        ? `Started ${formatDate(internship.startDate)}`
        : "Duration not available";

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Internships
        </h3>

        <button
          type="button"
          onClick={handleViewAll}
          className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* ================= Internship Card ================= */}
      {internship ? (
        <div className="flex flex-1 gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
            <Building2
              size={18}
              className="text-emerald-600"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-[13px] font-semibold text-slate-800">
              {internship.companyName || "Company not specified"}
            </h4>

            <p className="mt-1 text-[11px] text-slate-600">
              {internship.role ||
                internship.internshipTitle ||
                "Role not specified"}
            </p>

            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
              <CalendarDays size={12} />
              <span>{duration}</span>
            </div>

            {internship.status && (
              <span className="mt-2 inline-block rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">
                {internship.status.replaceAll("_", " ")}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5">
          <p className="text-center text-xs text-slate-500">
            No internships have been recorded yet.
          </p>
        </div>
      )}

      {/* ================= Footer ================= */}
      <button
        type="button"
        onClick={handleViewAll}
        className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
      >
        View Internship Details
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default InternshipsOverview;