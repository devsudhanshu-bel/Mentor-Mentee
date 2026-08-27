import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AssignmentPagination = ({ total }) => {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
      <p className="text-sm text-slate-600">
        Showing <span className="font-semibold">{total}</span> assignments
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        <button className="flex h-9 min-w-[36px] items-center justify-center rounded-lg bg-blue-600 px-3 text-white">
          1
        </button>

        <button
          disabled
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default AssignmentPagination;