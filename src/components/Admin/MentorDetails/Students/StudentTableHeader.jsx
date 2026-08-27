import React from "react";

const StudentTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200">
        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Roll No
        </th>

        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Student
        </th>

        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Year
        </th>

        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Section
        </th>

        <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Attendance
        </th>

        <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          CGPA
        </th>

        <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Status
        </th>

        <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default StudentTableHeader;