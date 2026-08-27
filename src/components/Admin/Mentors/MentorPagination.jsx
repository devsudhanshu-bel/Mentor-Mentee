import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MentorPagination = () => {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      {/* ================= Left ================= */}

      <div className="flex items-center gap-2 text-[12px] text-slate-500">
        <span>Showing</span>

        <span className="font-semibold text-slate-700">
          1–8
        </span>

        <span>of</span>

        <span className="font-semibold text-slate-700">
          32
        </span>

        <span>mentors</span>
      </div>

      {/* ================= Right ================= */}

      <div className="flex items-center gap-4">
        {/* Per Page */}

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-slate-500">
            Rows
          </span>

          <select className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-[12px] font-medium text-slate-700 outline-none focus:border-blue-500">
            <option>8</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>

        {/* Pagination */}

        <div className="flex items-center gap-1">
          <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition">
            <ChevronLeft size={15} />
          </button>

          <button className="h-8 min-w-[32px] rounded-lg bg-blue-600 text-white text-[12px] font-semibold">
            1
          </button>

          <button className="h-8 min-w-[32px] rounded-lg border border-slate-200 text-[12px] font-medium hover:bg-slate-100 transition">
            2
          </button>

          <button className="h-8 min-w-[32px] rounded-lg border border-slate-200 text-[12px] font-medium hover:bg-slate-100 transition">
            3
          </button>

          <button className="h-8 min-w-[32px] rounded-lg border border-slate-200 text-[12px] font-medium hover:bg-slate-100 transition">
            4
          </button>

          <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorPagination;