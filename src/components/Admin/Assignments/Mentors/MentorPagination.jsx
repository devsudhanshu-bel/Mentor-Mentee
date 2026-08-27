import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MentorPagination = ({ total }) => {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      <p className="text-[11px] text-slate-500">
        Showing {total} mentor{total !== 1 ? "s" : ""}
      </p>

      <div className="flex items-center gap-1">
        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
          <ChevronLeft size={14} />
        </button>

        <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white">
          1
        </button>

        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default MentorPagination;