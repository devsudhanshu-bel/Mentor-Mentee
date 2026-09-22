import React from "react";

import { Eye, MoreHorizontal } from "lucide-react";

import { useNavigate } from "react-router-dom";

const StudentTableRow = ({ student }) => {
  const navigate = useNavigate();

  const name = student.name || "Unknown Student";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const attendance =
    typeof student.attendance === "number" ? `${student.attendance}%` : "—";

  const cgpa =
    typeof student.currentCGPA === "number"
      ? student.currentCGPA.toFixed(2)
      : "—";

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-4 py-3">
        <span className="text-xs font-medium text-slate-700">
          {student.registerNumber}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-700">
            {initials}
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-800">{name}</p>

            <p className="text-[11px] text-slate-500">
              {student.email || "No email"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <span className="text-xs text-slate-700">
          {student.semester || "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
          {student.section || "—"}
        </span>
      </td>

      <td className="px-4 py-3 text-center">
        <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
          {attendance}
        </span>
      </td>

      <td className="px-4 py-3 text-center">
        <span className="text-xs font-semibold text-slate-800">{cgpa}</span>
      </td>

      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
            student.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {student.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/admin/student/${student.id}`)}
            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
            title="View Student"
          >
            <Eye size={15} />
          </button>

          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
            title="More Actions"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentTableRow;
