import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StudentPagination = ({ students = [], pageSize = 8, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalStudents = students.length;

  const totalPages = Math.max(1, Math.ceil(totalStudents / pageSize));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const visibleStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return students.slice(startIndex, startIndex + pageSize);
  }, [students, currentPage, pageSize]);

  const start = totalStudents === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const end = Math.min(currentPage * pageSize, totalStudents);

  useEffect(() => {
    onPageChange?.(visibleStudents, currentPage);
  }, [visibleStudents, currentPage, onPageChange]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}

      <p className="text-xs text-slate-500">
        Showing <span className="font-semibold text-slate-700">{start}</span> to{" "}
        <span className="font-semibold text-slate-700">{end}</span> of{" "}
        <span className="font-semibold text-slate-700">{totalStudents}</span>{" "}
        students
      </p>

      {/* Right */}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={15} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-3 text-xs font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default StudentPagination;
