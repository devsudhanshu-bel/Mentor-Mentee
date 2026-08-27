import React from "react";
import { LayoutGrid, List } from "lucide-react";

const StudentGridHeader = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="flex items-center gap-1">
        <span className="text-[13px] text-slate-600">
          Total Students:
        </span>

        <span className="text-[13px] font-semibold text-blue-600">
          24
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-slate-500">
            Sort By
          </span>

          <select className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-[12px] outline-none focus:border-blue-600">
            <option>Name (A - Z)</option>
            <option>Name (Z - A)</option>
            <option>Attendance</option>
            <option>CGPA</option>
            <option>Last Meeting</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex overflow-hidden rounded-lg border border-slate-300 bg-white">
          <button className="flex h-9 w-9 items-center justify-center bg-blue-600 text-white">
            <LayoutGrid size={16} />
          </button>

          <button className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-slate-100">
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentGridHeader;