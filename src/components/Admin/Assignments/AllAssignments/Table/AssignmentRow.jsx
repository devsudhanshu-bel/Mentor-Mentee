import React from "react";
import {
  CalendarDays,
  MoreVertical,
} from "lucide-react";

const AssignmentRow = ({
  assignment,
  index,
}) => {
  const mentorInitials = assignment.mentor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  const menteeInitials = assignment.mentee.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* ================= Serial No ================= */}

      <td className="px-6 py-4 text-sm font-semibold text-slate-500">
        {index + 1}
      </td>

      {/* ================= Mentor ================= */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {mentorInitials}
          </div>

          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              {assignment.mentor.name}
            </p>

            <p className="text-[11px] text-slate-500">
              {assignment.mentor.department}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Mentee ================= */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
            {menteeInitials}
          </div>

          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              {assignment.mentee.name}
            </p>

            <p className="text-[11px] text-slate-500">
              {assignment.mentee.usn} • {assignment.mentee.year}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Assigned On ================= */}

      <td className="px-6 py-4">
        <div className="flex items-start gap-2">
          <CalendarDays
            size={15}
            className="mt-0.5 text-slate-400"
          />

          <div>
            <p className="text-[13px] font-medium text-slate-700">
              {assignment.assignedOn.date}
            </p>

            <p className="text-[11px] text-slate-500">
              {assignment.assignedOn.time}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Actions ================= */}

      <td className="px-6 py-4 text-center">
        <button className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100">
          <MoreVertical size={18} />
        </button>
      </td>
    </tr>
  );
};

export default AssignmentRow;