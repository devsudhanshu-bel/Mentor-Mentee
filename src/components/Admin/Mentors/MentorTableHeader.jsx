import React from "react";

const MentorTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[10px]">
        <th className="w-[23%] px-2 py-2 sm:px-5 sm:py-3">Mentor</th>

        <th className="w-[17%] px-2 py-2 sm:px-5 sm:py-3">Department</th>

        <th className="w-[13%] px-2 py-2 sm:px-5 sm:py-3">Designation</th>

        <th className="w-[10%] px-2 py-2 sm:px-5 sm:py-3">Capacity</th>

        <th className="w-[9%] px-2 py-2 sm:px-5 sm:py-3">Meetings</th>

        <th className="w-[11%] px-2 py-2 sm:px-5 sm:py-3">Attendance</th>

        <th className="w-[8%] px-2 py-2 sm:px-5 sm:py-3">Status</th>

        <th className="w-[9%] px-2 py-2 text-center sm:px-5 sm:py-3">Action</th>
      </tr>
    </thead>
  );
};

export default MentorTableHeader;
