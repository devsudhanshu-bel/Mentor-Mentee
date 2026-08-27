import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StudentPagination = () => {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}

      <p className="text-xs text-slate-500">
        Showing <span className="font-semibold text-slate-700">1</span> to{" "}
        <span className="font-semibold text-slate-700">8</span> of{" "}
        <span className="font-semibold text-slate-700">24</span> students
      </p>

      {/* Right */}

      <div className="flex items-center gap-1">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100">
          <ChevronLeft size={15} />
        </button>

        <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white">
          1
        </button>

        <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 transition hover:bg-slate-100">
          2
        </button>

        <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 transition hover:bg-slate-100">
          3
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100">
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default StudentPagination;