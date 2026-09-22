import React from "react";

import { Search, SlidersHorizontal, Download } from "lucide-react";

const MentorTableFilters = ({
  search,
  setSearch,
  departmentId,
  setDepartmentId,
  status,
  setStatus,
  workload,
  setWorkload,
  departments = [],
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-12 items-end gap-3">
        {/* ==================================================
            SEARCH
            ================================================== */}

        <div className="col-span-12 xl:col-span-4">
          <label className="mb-1 block text-[11px] font-medium text-slate-500">
            Search
          </label>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search mentor..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-[13px] outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ==================================================
            DEPARTMENT
            ================================================== */}

        <div className="col-span-12 sm:col-span-4 xl:col-span-2">
          <label className="mb-1 block text-[11px] font-medium text-slate-500">
            Department
          </label>

          <select
            value={departmentId}
            onChange={(event) => setDepartmentId(event.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500"
          >
            <option value="">All Departments</option>

            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {/* ==================================================
            STATUS
            ================================================== */}

        <div className="col-span-12 sm:col-span-4 xl:col-span-2">
          <label className="mb-1 block text-[11px] font-medium text-slate-500">
            Status
          </label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500"
          >
            <option value="">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* ==================================================
            WORKLOAD
            ================================================== */}

        <div className="col-span-12 sm:col-span-4 xl:col-span-2">
          <label className="mb-1 block text-[11px] font-medium text-slate-500">
            Workload
          </label>

          <select
            value={workload}
            onChange={(event) => setWorkload(event.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500"
          >
            <option value="">All</option>

            <option value="High">High</option>

            <option value="Medium">Medium</option>

            <option value="Low">Low</option>
          </select>
        </div>

        {/* ==================================================
            FILTERS BUTTON
            ================================================== */}

        <div className="col-span-12 sm:col-span-6 xl:col-span-1">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-blue-200 text-[12px] font-semibold text-blue-600 hover:bg-blue-50"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {/* ==================================================
            EXPORT
            ================================================== */}

        <div className="col-span-12 sm:col-span-6 xl:col-span-1">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorTableFilters;
