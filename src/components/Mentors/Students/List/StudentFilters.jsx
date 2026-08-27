import React from "react";
import {
  Search,
  RotateCcw,
} from "lucide-react";

const StudentFilters = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* Search */}
        <div className="relative lg:col-span-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by student name or registration number..."
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Department */}
        <div className="lg:col-span-2">
          <select className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Department</option>
            <option>BCA</option>
            <option>BSc CS</option>
            <option>BCom</option>
          </select>
        </div>

        {/* Semester */}
        <div className="lg:col-span-2">
          <select className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Semester</option>
            <option>I</option>
            <option>II</option>
            <option>III</option>
            <option>IV</option>
            <option>V</option>
            <option>VI</option>
          </select>
        </div>

        {/* Attendance */}
        <div className="lg:col-span-2">
          <select className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Attendance</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Needs Attention</option>
          </select>
        </div>

        {/* Reset */}
        <div className="lg:col-span-2">
          <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-blue-600 text-[13px] font-medium text-blue-600 transition hover:bg-blue-50">
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentFilters;