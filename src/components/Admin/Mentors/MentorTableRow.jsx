import React from "react";

import { Eye, MoreHorizontal } from "lucide-react";

import { useNavigate } from "react-router-dom";

const MentorTableRow = ({ mentor }) => {
  const navigate = useNavigate();

  // ========================================================
  // NORMALIZE BACKEND DATA
  // ========================================================

  const name = mentor?.fullName || mentor?.name || "Unknown Mentor";

  const email = mentor?.email || "No email";

  const department =
    mentor?.department?.name || mentor?.department || "Not assigned";

  const designation = mentor?.designation || "Not specified";

  const studentsAssigned =
    mentor?.currentMentees ?? mentor?.studentsAssigned ?? 0;

  const totalStudents = mentor?.maxMentees ?? mentor?.totalStudents ?? 0;

  const attendance =
    typeof mentor?.attendance === "number" ? mentor.attendance : null;

  const status = mentor?.status || (mentor?.isActive ? "Active" : "Inactive");

  const workload = mentor?.workload;

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* ==================================================
          MENTOR
      ================================================== */}

      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-blue-50
              text-xs
              font-bold
              text-blue-600
            "
          >
            {name.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div>
            <h3 className="text-[13px] font-semibold text-slate-800">{name}</h3>

            <p className="text-[10px] text-slate-500">{email}</p>
          </div>
        </div>
      </td>

      {/* ==================================================
          DEPARTMENT
      ================================================== */}

      <td className="px-5 py-3">
        <span className="text-[12px] text-slate-700">{department}</span>
      </td>

      {/* ==================================================
          DESIGNATION
      ================================================== */}

      <td className="px-5 py-3">
        <span className="text-[12px] text-slate-700">{designation}</span>
      </td>

      {/* ==================================================
          STUDENTS
      ================================================== */}

      <td className="px-5 py-3">
        <span className="text-[12px] font-semibold text-slate-800">
          {studentsAssigned}
        </span>

        <span className="text-[11px] text-slate-400"> / {totalStudents}</span>
      </td>

      {/* ==================================================
          MEETINGS
      ================================================== */}

      <td className="px-5 py-3">
        <span className="text-[12px] font-semibold text-slate-700">
          {mentor?.meetings ?? "—"}
        </span>
      </td>

      {/* ==================================================
          ATTENDANCE
      ================================================== */}

      <td className="w-[180px] px-5 py-3">
        {attendance === null ? (
          <span className="text-[11px] text-slate-400">—</span>
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${Math.min(Math.max(attendance, 0), 100)}%`,
                }}
              />
            </div>

            <span className="w-9 text-right text-[11px] font-semibold text-slate-600">
              {attendance}%
            </span>
          </div>
        )}
      </td>

      {/* ==================================================
          STATUS
      ================================================== */}

      <td className="px-5 py-3">
        <div className="flex flex-col items-start gap-1">
          <span
            className={`
              inline-flex
              items-center
              rounded-full
              px-2.5
              py-1
              text-[10px]
              font-semibold
              whitespace-nowrap

              ${
                status === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }
            `}
          >
            {status}
          </span>

          {workload && (
            <span className="text-[9px] text-slate-400">
              {workload} workload
            </span>
          )}
        </div>
      </td>

      {/* ==================================================
          ACTIONS
      ================================================== */}

      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          {/* View */}
          <button
            type="button"
            onClick={() => navigate(`/admin/mentor/${mentor.id}`)}
            className="
              flex
              items-center
              gap-1
              rounded-lg
              border
              border-blue-200
              bg-blue-50
              px-3
              py-1.5
              text-[11px]
              font-medium
              text-blue-700
              transition
              hover:bg-blue-100
            "
          >
            <Eye size={13} />
            View
          </button>

          {/* More */}
          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              transition
              hover:bg-slate-100
            "
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MentorTableRow;
