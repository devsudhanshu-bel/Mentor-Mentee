import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StudentPagination = ({
  currentPage = 1,
  totalStudents = 0,
  rowsPerPage = 8,
  onPageChange,
  onRowsPerPageChange,
}) => {
  /* ==========================================================
     CALCULATE PAGINATION
  ========================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(totalStudents / rowsPerPage)
  );

  const startIndex =
    totalStudents === 0
      ? 0
      : (currentPage - 1) * rowsPerPage + 1;

  const endIndex = Math.min(
    currentPage * rowsPerPage,
    totalStudents
  );

  /* ==========================================================
     PAGE CHANGE
  ========================================================== */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange?.(page);
  };

  /* ==========================================================
     ROWS PER PAGE
  ========================================================== */

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(
      event.target.value
    );

    onRowsPerPageChange?.(newRowsPerPage);
  };

  /* ==========================================================
     PAGE NUMBERS
  ========================================================== */

  const pageNumbers = [];

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    pageNumbers.push(page);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* ======================================================
          LEFT — SHOWING
      ====================================================== */}

      <p className="text-[12px] text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {startIndex}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-slate-700">
          {endIndex}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-blue-600">
          {totalStudents}
        </span>{" "}
        students
      </p>

      {/* ======================================================
          CENTER — PAGE CONTROLS
      ====================================================== */}

      <div className="flex items-center justify-center gap-1">

        {/* Previous */}

        <button
          type="button"
          onClick={() =>
            handlePageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
            currentPage === 1
              ? "cursor-not-allowed border-slate-200 text-slate-300"
              : "border-slate-300 text-slate-500 hover:bg-slate-100"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Page Numbers */}

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              handlePageChange(page)
            }
            className={`h-8 w-8 rounded-lg text-[12px] font-medium transition ${
              currentPage === page
                ? "bg-blue-600 font-semibold text-white"
                : "border border-slate-300 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}

        <button
          type="button"
          onClick={() =>
            handlePageChange(currentPage + 1)
          }
          disabled={
            currentPage === totalPages
          }
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
            currentPage === totalPages
              ? "cursor-not-allowed border-slate-200 text-slate-300"
              : "border-slate-300 text-slate-500 hover:bg-slate-100"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* ======================================================
          RIGHT — ROWS PER PAGE
      ====================================================== */}

      <div className="flex items-center gap-2">
        <span className="text-[12px] text-slate-500">
          Rows per page
        </span>

        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] text-slate-700 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        >
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={24}>24</option>
        </select>
      </div>
    </div>
  );
};

export default StudentPagination;