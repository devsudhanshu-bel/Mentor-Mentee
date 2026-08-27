import React from "react";
import {
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentTableRow = ({
  student,
  mentorId,
}) => {
  const navigate = useNavigate();

  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleView = () => {
    navigate(
      `/admin/mentor/${mentorId}/student/${student.id}/overview`
    );
  };

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* ================= Roll No ================= */}

      <td className="px-4 py-3">
        <span className="text-xs font-medium text-slate-700">
          {student.rollNo}
        </span>
      </td>

      {/* ================= Student ================= */}

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-700">
            {initials}
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-800">
              {student.name}
            </p>

            <p className="text-[11px] text-slate-500">
              {student.email}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Year ================= */}

      <td className="px-4 py-3">
        <span className="text-xs text-slate-700">
          {student.year}
        </span>
      </td>

      {/* ================= Section ================= */}

      <td className="px-4 py-3">
        <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
          {student.section}
        </span>
      </td>

      {/* ================= Attendance ================= */}

      <td className="px-4 py-3 text-center">
        <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
          {student.attendance}
        </span>
      </td>

      {/* ================= CGPA ================= */}

      <td className="px-4 py-3 text-center">
        <span className="text-xs font-semibold text-slate-800">
          {student.cgpa}
        </span>
      </td>

      {/* ================= Status ================= */}

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

      {/* ================= Actions ================= */}

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleView}
            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
            title="View Student"
          >
            <Eye size={15} />
          </button>

          <button
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