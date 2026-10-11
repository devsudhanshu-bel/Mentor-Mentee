import React from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentTableRow = ({ student }) => {
  const navigate = useNavigate();

  const name = student.fullName ?? student.name ?? "Unknown Student";

  const registerNumber =
    student.registerNumber ?? student.admissionNumber ?? "—";

  const email = student.email || "No email";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const semester =
    student.semesterNumber ??
    student.student_enrollments?.[0]?.semesterNumber ??
    student.semester ??
    "—";

  const section =
    student.section ??
    student.sectionName ??
    student.sectionCode ??
    student.student_enrollments?.[0]?.section ??
    "—";

  const attendance =
    typeof student.attendance === "number"
      ? `${student.attendance}%`
      : typeof student.attendancePercentage === "number"
        ? `${student.attendancePercentage}%`
        : "—";

  const rawCgpa = student.currentCGPA ?? student.cgpa;

  const cgpa =
    rawCgpa !== null &&
    rawCgpa !== undefined &&
    rawCgpa !== "" &&
    Number.isFinite(Number(rawCgpa))
      ? Number(rawCgpa).toFixed(2)
      : "—";

  const rawStatus = String(student.status ?? "").toUpperCase();

  const isActive = ["ACTIVE", "ENROLLED"].includes(rawStatus);

  const statusLabel = rawStatus
    ? rawStatus.charAt(0) + rawStatus.slice(1).toLowerCase()
    : "Unknown";

  const studentId = student.id ?? student.studentId;

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-4 py-3">
        <span className="text-xs font-medium text-slate-700">
          {registerNumber}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-700">
            {initials || "ST"}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800">{name}</p>

            <p className="text-[11px] text-slate-500">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <span className="text-xs text-slate-700">{semester}</span>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
          {section}
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
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {statusLabel}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (studentId) {
                navigate(`/admin/student/${studentId}`);
              }
            }}
            disabled={!studentId}
            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
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
