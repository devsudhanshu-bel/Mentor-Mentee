import React from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MentorTableRow = ({ mentor }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* ================= Mentor ================= */}

      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="h-9 w-9 rounded-full border border-slate-200 object-cover"
          />

          <div>
            <h3 className="text-[13px] font-semibold text-slate-800">
              {mentor.name}
            </h3>

            <p className="text-[10px] text-slate-500">
              {mentor.email}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Department ================= */}

      <td className="px-5 py-3">
        <span className="text-[12px] text-slate-700">
          {mentor.department}
        </span>
      </td>

      {/* ================= Designation ================= */}

      <td className="px-5 py-3">
        <span className="text-[12px] text-slate-700">
          {mentor.designation}
        </span>
      </td>

      {/* ================= Students ================= */}

      <td className="px-5 py-3">
        <span className="text-[12px] font-semibold text-slate-800">
          {mentor.studentsAssigned}
        </span>

        <span className="text-[11px] text-slate-400">
          {" "}
          / {mentor.totalStudents}
        </span>
      </td>

      {/* ================= Meetings ================= */}

      <td className="px-5 py-3">
        <span className="text-[12px] font-semibold text-slate-700">
          {mentor.meetings}
        </span>
      </td>

      {/* ================= Attendance ================= */}

      <td className="w-[180px] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${mentor.attendance}%`,
              }}
            />
          </div>

          <span className="w-9 text-right text-[11px] font-semibold text-slate-600">
            {mentor.attendance}%
          </span>
        </div>
      </td>

      {/* ================= Status ================= */}

      <td className="px-5 py-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ${
            mentor.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : mentor.status === "Busy"
              ? "bg-orange-100 text-orange-700"
              : mentor.status === "On Leave"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {mentor.status}
        </span>
      </td>

      {/* ================= Actions ================= */}

      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/mentor/${mentor.id}`)}
            className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Eye size={13} />
            View
          </button>

          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MentorTableRow;