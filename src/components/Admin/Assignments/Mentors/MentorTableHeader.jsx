import React from "react";

const MentorTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {/* Mentor */}
        <th className="w-[55%] px-6 py-4">
          Mentor
        </th>

        {/* Capacity */}
        <th className="w-[25%] px-6 py-4">
          Capacity
        </th>

        {/* Action */}
        <th className="w-[20%] px-6 py-4 text-center">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default MentorTableHeader;