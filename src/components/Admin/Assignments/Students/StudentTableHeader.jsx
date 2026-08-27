import React from "react";

const StudentTableHeader = ({
  allSelected,
  onSelectAll,
}) => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <th className="w-10 px-4 py-3">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
          />
        </th>

        <th className="py-3">Student</th>

        <th>USN</th>

        <th>Year</th>

        <th className="pr-4">Status</th>
      </tr>
    </thead>
  );
};

export default StudentTableHeader;