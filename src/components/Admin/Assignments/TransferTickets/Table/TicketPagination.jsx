import React from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const TicketPagination = ({ total }) => {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
      <p className="text-sm text-slate-600">
        Showing{" "}
        <span className="font-semibold text-slate-900">
          {total}
        </span>{" "}
        tickets
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white">
          1
        </button>

        <button
          disabled
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TicketPagination;