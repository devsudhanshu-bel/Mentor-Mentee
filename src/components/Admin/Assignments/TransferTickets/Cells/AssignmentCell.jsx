import React from "react";

const AssignmentCell = ({ assignment }) => {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold leading-5 text-slate-900">
        {assignment.name}
      </p>

      <p className="truncate text-[11px] leading-4 text-slate-500">
        {assignment.department}
      </p>
    </div>
  );
};

export default AssignmentCell;