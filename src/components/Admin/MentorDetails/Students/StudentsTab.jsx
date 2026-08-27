import React from "react";

import StudentHierarchy from "./StudentHierarchy";
import StudentFilters from "./StudentFilters";
import StudentTable from "./StudentTable";

const StudentsTab = () => {
  return (
    <div className="space-y-4">
      {/* ================= Section Header ================= */}

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Assigned Students
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Students currently assigned to this mentor.
        </p>
      </div>

      {/* ================= Main Content ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          {/* ================= Student Hierarchy ================= */}

          <div className="xl:col-span-3">
            <StudentHierarchy />
          </div>

          {/* ================= Right Section ================= */}

          <div className="space-y-4 xl:col-span-9">
            {/* Filters */}

            <StudentFilters />

            {/* Students Table (includes pagination) */}

            <StudentTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;