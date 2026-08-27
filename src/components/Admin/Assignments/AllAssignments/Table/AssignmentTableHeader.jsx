import React from "react";

const AssignmentTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <th className="w-[6%] px-6 py-4">
          #
        </th>

        <th className="w-[34%] px-6 py-4">
          Mentor
        </th>

        <th className="w-[34%] px-6 py-4">
          Mentee
        </th>

        <th className="w-[20%] px-6 py-4">
          Assigned On
        </th>

        <th className="w-[6%] px-6 py-4 text-center">
        </th>
      </tr>
    </thead>
  );
};

export default AssignmentTableHeader;