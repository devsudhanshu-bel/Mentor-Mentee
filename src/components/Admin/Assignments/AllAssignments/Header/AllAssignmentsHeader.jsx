import React from "react";

import { ClipboardList } from "lucide-react";

const AllAssignmentsHeader = ({
  total,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ClipboardList size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            All Assignments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing {total} mentor–mentee assignments
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllAssignmentsHeader;