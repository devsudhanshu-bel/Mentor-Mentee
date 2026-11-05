import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MentorPagination = ({ total = 0, currentPage = 1, totalPages = 1, onPageChange }) => {
  const start = total === 0 ? 0 : (currentPage - 1) * 10 + 1;
  const end = Math.min(currentPage * 10, total);

  return (
    <div className="flex min-w-0 flex-col gap-2 border-t border-slate-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
      <p className="text-[11px] text-slate-500">
        Showing {start}-{end} of {total} mentor{total !== 1 ? "s" : ""} · 10 per page
      </p>
      <div className="flex items-center justify-end gap-1">
        <button type="button" onClick={() => onPageChange?.(Math.max(1, currentPage - 1))} disabled={currentPage <= 1} aria-label="Previous mentor page" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
          <ChevronLeft size={15} />
        </button>
        <span className="min-w-8 rounded-lg bg-blue-600 px-2 py-2 text-center text-xs font-semibold text-white">{currentPage} / {totalPages}</span>
        <button type="button" onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages} aria-label="Next mentor page" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default MentorPagination;
