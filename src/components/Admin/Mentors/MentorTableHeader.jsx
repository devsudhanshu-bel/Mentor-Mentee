import React from "react";

const MentorTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        <th className="w-[30%] px-5 py-3">Mentor</th>

        <th className="w-[20%] px-5 py-3">Department</th>

        <th className="w-[15%] px-5 py-3">Designation</th>

        <th className="w-[15%] px-5 py-3">Capacity</th>

        <th className="w-[10%] px-5 py-3">Available</th>

        <th className="w-[10%] px-5 py-3 text-center">Action</th>
      </tr>
    </thead>
  );
};

export default MentorTableHeader;
