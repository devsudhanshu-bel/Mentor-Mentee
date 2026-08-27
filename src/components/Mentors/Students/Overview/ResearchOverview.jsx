import React from "react";
import {
  FileText,
  ChevronRight,
  FlaskConical,
} from "lucide-react";

const researchWorks = [
  {
    id: 1,
    title: "AI in Education",
    status: "Submitted",
    date: "12 Feb 2025",
  },
  {
    id: 2,
    title: "Data Structures Visualization",
    status: "Under Review",
    date: "20 Apr 2025",
  },
];

const statusColor = {
  Submitted: "text-emerald-600",
  "Under Review": "text-amber-600",
};

const ResearchOverview = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Research Works
        </h3>

        <button className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* ================= Research List ================= */}
      <div className="flex-1 space-y-3">
        {researchWorks.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
              <FileText
                size={16}
                className="text-blue-600"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="truncate text-[12px] font-semibold text-slate-800">
                {item.title}
              </h4>

              <div className="mt-1 flex items-center gap-1">
                <FlaskConical
                  size={11}
                  className={statusColor[item.status]}
                />

                <span
                  className={`text-[10px] font-medium ${statusColor[item.status]}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-1 text-[10px] text-slate-500">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Footer ================= */}
      <button className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
        View Research Details
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default ResearchOverview;