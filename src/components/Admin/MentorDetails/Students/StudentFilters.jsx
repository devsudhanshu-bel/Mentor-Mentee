import React from "react";
import {
  Search,
  Download,
} from "lucide-react";

const StudentFilters = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* ================= Left ================= */}

        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Search */}

          <div className="relative min-w-[240px] flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search student..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Academic Year */}

          <select className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500">
            <option>Academic Year</option>
            <option>2025-26</option>
            <option>2024-25</option>
          </select>

          {/* Year */}

          <select className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500">
            <option>Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          {/* Section */}

          <select className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500">
            <option>Section</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        {/* ================= Right ================= */}

        <button className="flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
          <Download size={14} />

          Export
        </button>
      </div>
    </div>
  );
};

export default StudentFilters;