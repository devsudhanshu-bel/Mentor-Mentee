import React from "react";
import {
  Search,
  Filter,
} from "lucide-react";

import ResearchRow from "./ResearchRow";

const researchData = [
  {
    id: 1,
    title:
      "Artificial Intelligence Based Student Performance Prediction",
    guide: "Guide : Dr. John David",
    type: "Research Paper",
    date: "20 Apr 2025",
    status: "Published",
  },
  {
    id: 2,
    title:
      "Blockchain Based Academic Certificate Verification",
    guide: "Guide : Dr. Sarah Wilson",
    type: "Project",
    date: "12 Feb 2025",
    status: "Under Review",
  },
];

const ResearchWorks = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm h-[465px]">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-[16px] font-semibold text-slate-800">
            Research Works
          </h2>

          <p className="mt-1 text-[12px] text-slate-500">
            View all submitted research papers and projects.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
          {researchData.length} Records
        </span>
      </div>

      {/* ================= Toolbar ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        {/* Search */}

        <div className="relative w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search research..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-[12px] outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Filter */}

        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50">
          <Filter size={15} />

          Filter
        </button>
      </div>

      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Research Title
              </th>

              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Submitted
              </th>

              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {researchData.map((item) => (
              <ResearchRow
                key={item.id}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex items-center justify-between border-t border-slate-100 p-5">
        <p className="text-[12px] text-slate-500">
          Showing {researchData.length} of {researchData.length} research works.
        </p>

        <button className="rounded-xl bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-blue-700">
          View All
        </button>
      </div>
    </div>
  );
};

export default ResearchWorks;