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

      <td className="min-w-[190px] px-2.5 py-3 sm:px-5">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Avatar */}
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-blue-50
              text-xs
              font-bold
              text-blue-600
              sm:h-9
              sm:w-9
            "
          >
            {name.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="min-w-0">
            <h3 className="break-words text-[12px] font-semibold text-slate-800 sm:text-[13px]">{name}</h3>

            <p className="break-all text-[9px] text-slate-500 sm:text-[10px]">{email}</p>
          </div>
        </div>
      </td>

      {/* ==================================================
          DEPARTMENT
      ================================================== */}

      <td className="min-w-[130px] px-2.5 py-3 sm:px-5">
        <span className="break-words text-[11px] text-slate-700 sm:text-[12px]">{department}</span>
      </td>

      {/* ==================================================
          DESIGNATION
      ================================================== */}

      <td className="min-w-[120px] px-2.5 py-3 sm:px-5">
        <span className="break-words text-[11px] text-slate-700 sm:text-[12px]">{designation}</span>
      </td>

      {/* ==================================================
          STUDENTS
      ================================================== */}

      <td className="whitespace-nowrap px-2.5 py-3 sm:px-5">
        <span className="text-[11px] font-semibold text-slate-800 sm:text-[12px]">
          {studentsAssigned}
        </span>

        <span className="text-[10px] text-slate-400 sm:text-[11px]"> / {totalStudents}</span>
      </td>

      {/* ==================================================
          MEETINGS
      ================================================== */}

      <td className="whitespace-nowrap px-2.5 py-3 sm:px-5">
        <span className="text-[11px] font-semibold text-slate-700 sm:text-[12px]">
          {mentor?.meetings ?? "—"}
        </span>
      </td>

      {/* ==================================================
          ATTENDANCE
      ================================================== */}

      <td className="w-[140px] min-w-[120px] px-2.5 py-3 sm:w-[180px] sm:px-5">
        {attendance === null ? (
          <span className="text-[10px] text-slate-400 sm:text-[11px]">—</span>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-1.5 min-w-8 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${Math.min(Math.max(attendance, 0), 100)}%`,
                }}
              />
            </div>

            <span className="w-8 shrink-0 text-right text-[10px] font-semibold text-slate-600 sm:w-9 sm:text-[11px]">
              {attendance}%
            </span>
          </div>
        )}
      </td>

      {/* ==================================================
          STATUS
      ================================================== */}

      <td className="min-w-[95px] px-2.5 py-3 sm:px-5">
        <div className="flex flex-col items-start gap-1">
          <span
            className={`
              inline-flex
              items-center
              whitespace-nowrap
              rounded-full
              px-2
              py-1
              text-[9px]
              font-semibold
              sm:px-2.5
              sm:text-[10px]

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

      <td className="min-w-[115px] px-2.5 py-3 sm:px-5">
        <div className="flex items-center gap-1.5 sm:gap-2">
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
              px-2
              py-1.5
              text-[10px]
              font-medium
              text-blue-700
              transition
              hover:bg-blue-100
              sm:px-3
              sm:text-[11px]
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
              shrink-0
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
