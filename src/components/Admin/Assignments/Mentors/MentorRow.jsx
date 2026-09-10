import React from "react";

import { Eye, MoreHorizontal } from "lucide-react";

import { useNavigate } from "react-router-dom";

const MentorRow = ({ mentor }) => {
  const navigate = useNavigate();

  const attendance = mentor.attendance;

  const initials = (mentor.fullName || "Mentor")
    .replace(/^(Dr\.|Prof\.)\s*/i, "")
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      {/* ==================================================
          MENTOR
          ================================================== */}

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-slate-800">
              {mentor.fullName}
            </p>

            <p className="truncate text-[10px] text-slate-500">
              {mentor.email}
            </p>

            <p className="text-[9px] text-slate-400">{mentor.employeeCode}</p>
          </div>
        </div>
      </td>

      {/* ==================================================
          DEPARTMENT
          ================================================== */}

      <td className="px-5 py-4">
        <span className="text-[12px] text-slate-700">
          {mentor.department?.name || "—"}
        </span>
      </td>

      {/* ==================================================
          DESIGNATION
          ================================================== */}

      <td className="px-5 py-4">
        <span className="text-[12px] text-slate-700">
          {mentor.designation || "—"}
        </span>
      </td>

      {/* ==================================================
          STUDENTS
          ================================================== */}

      <td className="px-5 py-4">
        <span className="text-[12px] font-semibold text-slate-800">
          {mentor.currentMentees}
        </span>

        <span className="text-[11px] text-slate-400">
          {" "}
          / {mentor.maxMentees}
        </span>
      </td>

      {/* ==================================================
          MEETINGS
          ================================================== */}

      <td className="px-5 py-4">
        <span className="text-[12px] text-slate-500">
          {mentor.meetings ?? "—"}
        </span>
      </td>

      {/* ==================================================
          ATTENDANCE
          ================================================== */}

      <td className="min-w-[170px] px-5 py-4">
        {attendance === null || attendance === undefined ? (
          <span className="text-[12px] text-slate-400">—</span>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${Math.min(Math.max(attendance, 0), 100)}%`,
                }}
              />
            </div>

            <span className="w-8 text-right text-[11px] font-semibold text-slate-600">
              {attendance}%
            </span>
          </div>
        )}
      </td>

      {/* ==================================================
          STATUS
          ================================================== */}

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            mentor.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {mentor.status}
        </span>
      </td>

      {/* ==================================================
          ACTIONS
          ================================================== */}

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/admin/mentor/${mentor.id}`)}
            className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-700 hover:bg-blue-100"
          >
            <Eye size={13} />
            View
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MentorRow;
