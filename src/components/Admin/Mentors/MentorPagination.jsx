import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

const MentorPagination = ({
  totalMentors = 0,
  currentPage = 1,
  totalPages = 1,
  rowsPerPage = 8,
  setRowsPerPage,
  setCurrentPage,
}) => {
  const start = totalMentors === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const end = Math.min(currentPage * rowsPerPage, totalMentors);

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[12px] text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {start}–{end}
        </span>{" "}
        of <span className="font-semibold text-slate-700">{totalMentors}</span>{" "}
        mentors
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-slate-500">Rows</span>

          <select
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(Number(event.target.value))}
            className="h-8 rounded-lg border border-slate-200 px-2 text-[12px] outline-none"
          >
            <option value={8}>8</option>

            <option value={10}>10</option>

            <option value={20}>20</option>

            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-8 min-w-8 rounded-lg px-2 text-[12px] font-semibold ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorPagination;
