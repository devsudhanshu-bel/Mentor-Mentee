import React from "react";

const MentorTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <th className="px-5 py-4">Mentor</th>

        <th className="px-5 py-4">Department</th>

        <th className="px-5 py-4">Designation</th>

        <th className="px-5 py-4">Students Assigned</th>

        <th className="px-5 py-4">Meetings</th>

        <th className="px-5 py-4">Attendance</th>

        <th className="px-5 py-4">Status</th>

        <th className="px-5 py-4">Actions</th>
      </tr>
    </thead>
  );
};

export default MentorTableHeader;
