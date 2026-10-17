import React from "react";

const StudentTableRow = ({ student }) => {
  const name = student.name || "Unknown Student";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const attendance =
    typeof student.attendance === "number"
      ? `${student.attendance}%`
      : "—";

  const cgpa =
    typeof student.currentCGPA === "number"
      ? student.currentCGPA.toFixed(2)
      : "—";

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* Register Number */}
      <td className="px-4 py-3">
        <span className="text-xs font-medium text-slate-700">
          {student.registerNumber || "—"}
        </span>
      </td>

      {/* Student Information */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-700">
            {initials || "S"}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800">
              {name}
            </p>

            <p className="text-[11px] text-slate-500">
              {student.email || "No email"}
            </p>
          </div>
        </div>
      </td>

      {/* Semester */}
      <td className="px-4 py-3">
        <span className="text-xs text-slate-700">
          {student.semester || "—"}
        </span>
      </td>

      {/* Section */}
      <td className="px-4 py-3">
        <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
          {student.section || "—"}
        </span>
      </td>

      {/* Attendance */}
      <td className="px-4 py-3 text-center">
        <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
          {attendance}
        </span>
      </td>

      {/* CGPA */}
      <td className="px-4 py-3 text-center">
        <span className="text-xs font-semibold text-slate-800">
          {cgpa}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
            student.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {student.status || "Unknown"}
        </span>
      </td>
    </tr>
  );
};

export default StudentTableRow;