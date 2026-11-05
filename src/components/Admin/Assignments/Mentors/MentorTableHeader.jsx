import React from "react";

const MentorTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <th className="min-w-[230px] px-5 py-4">Mentor</th>
        <th className="min-w-[150px] px-5 py-4">Department</th>
        <th className="min-w-[130px] px-5 py-4">Designation</th>
        <th className="min-w-[160px] px-5 py-4">Capacity</th>
        <th className="min-w-[110px] px-5 py-4">Available</th>
        <th className="min-w-[190px] px-5 py-4 text-center">Action</th>
      </tr>
    </thead>
  );
};

export default MentorTableHeader;
