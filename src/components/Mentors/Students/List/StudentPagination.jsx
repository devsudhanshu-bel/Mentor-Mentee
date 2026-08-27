import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StudentPagination = () => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <p className="text-[12px] text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">1</span> to{" "}
        <span className="font-semibold text-slate-700">8</span> of{" "}
        <span className="font-semibold text-blue-600">24</span> students
      </p>

      {/* Center */}
      <div className="flex items-center justify-center gap-1">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition hover:bg-slate-100">
          <ChevronLeft size={15} />
        </button>

        <button className="h-8 w-8 rounded-lg bg-blue-600 text-[12px] font-semibold text-white">
          1
        </button>

        <button className="h-8 w-8 rounded-lg border border-slate-300 text-[12px] font-medium text-slate-600 transition hover:bg-slate-100">
          2
        </button>

        <button className="h-8 w-8 rounded-lg border border-slate-300 text-[12px] font-medium text-slate-600 transition hover:bg-slate-100">
          3
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition hover:bg-slate-100">
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-slate-500">
          Rows per page
        </span>

        <select className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] outline-none focus:border-blue-600">
          <option>8</option>
          <option>12</option>
          <option>16</option>
          <option>24</option>
        </select>
      </div>
    </div>
  );
};

export default StudentPagination;