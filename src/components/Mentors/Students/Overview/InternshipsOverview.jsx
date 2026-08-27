import React from "react";
import {
  Building2,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const internship = {
  company: "TechNova Solutions",
  role: "Web Development Intern",
  duration: "Jan 2025 – Mar 2025",
};

const InternshipsOverview = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Internships
        </h3>

        <button className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* ================= Internship Card ================= */}
      <div className="flex flex-1 gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
          <Building2
            size={18}
            className="text-emerald-600"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-[13px] font-semibold text-slate-800">
            {internship.company}
          </h4>

          <p className="mt-1 text-[11px] text-slate-600">
            {internship.role}
          </p>

          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
            <CalendarDays size={12} />
            <span>{internship.duration}</span>
          </div>
        </div>
      </div>

      {/* ================= Footer ================= */}
      <button className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
        View Internship Details
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default InternshipsOverview;