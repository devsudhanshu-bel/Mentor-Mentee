
import React from "react";
import {
  Search,
  RotateCcw,
} from "lucide-react";

const StudentFilters = ({
  searchTerm = "",
  semester = "",
  onSearchChange,
  onSemesterChange,
  onReset,
}) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">

        {/* ====================================================
            SEARCH
        ==================================================== */}

        <div className="relative sm:col-span-7 lg:col-span-8">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search by student name or registration number..."
            aria-label="Search students by name or registration number"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* ====================================================
            SEMESTER
        ==================================================== */}

        <div className="sm:col-span-3 lg:col-span-2">
          <select
            value={semester}
            onChange={(event) =>
              onSemesterChange?.(event.target.value)
            }
            aria-label="Filter students by semester"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-[13px] text-slate-700 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Semester</option>
            <option value="1">Semester I</option>
            <option value="2">Semester II</option>
            <option value="3">Semester III</option>
            <option value="4">Semester IV</option>
            <option value="5">Semester V</option>
            <option value="6">Semester VI</option>
            <option value="7">Semester VII</option>
            <option value="8">Semester VIII</option>
          </select>
        </div>

        {/* ====================================================
            RESET
        ==================================================== */}

        <div className="sm:col-span-2">
          <button
            type="button"
            onClick={onReset}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-blue-600 text-[13px] font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

      </div>
    </section>
  );
};

export default StudentFilters;
