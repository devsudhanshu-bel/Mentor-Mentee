import React from "react";
import {
  Search,
  SlidersHorizontal,
  Download,
} from "lucide-react";

const MentorTableFilters = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="grid grid-cols-12 gap-3 items-end">
        {/* ================= Search ================= */}

        <div className="col-span-12 xl:col-span-4">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Search
          </label>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search mentor..."
              className="w-full h-10 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-[13px] outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ================= Department ================= */}

        <div className="col-span-12 sm:col-span-4 xl:col-span-2">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Department
          </label>

          <select className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500">
            <option>All Departments</option>
            <option>CSE</option>
            <option>ISE</option>
            <option>ECE</option>
            <option>AIML</option>
          </select>
        </div>

        {/* ================= Status ================= */}

        <div className="col-span-12 sm:col-span-4 xl:col-span-2">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Status
          </label>

          <select className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Busy</option>
            <option>Inactive</option>
            <option>On Leave</option>
          </select>
        </div>

        {/* ================= Workload ================= */}

        <div className="col-span-12 sm:col-span-4 xl:col-span-2">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Workload
          </label>

          <select className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500">
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* ================= Buttons ================= */}

        <div className="col-span-12 xl:col-span-2 flex gap-2">
          <button className="flex-1 h-10 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 text-[13px] font-medium">
            <SlidersHorizontal size={15} />
            Filters
          </button>

          <button className="h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2 text-[13px] font-medium text-slate-700">
            <Download size={15} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorTableFilters;