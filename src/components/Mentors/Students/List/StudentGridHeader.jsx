import React from "react";

const StudentGridHeader = ({
  totalStudents = 0,
  sortBy = "name-asc",
  onSortChange,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

      {/* ======================================================
          TOTAL STUDENTS
      ====================================================== */}

      <div className="flex items-center gap-1">
        <span className="text-[13px] text-slate-600">
          Total Students:
        </span>

        <span className="text-[13px] font-semibold text-blue-600">
          {totalStudents}
        </span>
      </div>

      {/* ======================================================
          SORT
      ====================================================== */}

      <div className="flex items-center gap-2">
        <span className="text-[12px] text-slate-500">
          Sort By
        </span>

        <select
          value={sortBy}
          onChange={(event) =>
            onSortChange?.(event.target.value)
          }
          className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-[12px] text-slate-700 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        >
          <option value="name-asc">
            Name (A - Z)
          </option>

          <option value="name-desc">
            Name (Z - A)
          </option>

          <option value="cgpa-high">
            CGPA (High - Low)
          </option>

          <option value="cgpa-low">
            CGPA (Low - High)
          </option>

          <option value="assigned-newest">
            Recently Assigned
          </option>

          <option value="assigned-oldest">
            Oldest Assignment
          </option>
        </select>
      </div>
    </div>
  );
};

export default StudentGridHeader;