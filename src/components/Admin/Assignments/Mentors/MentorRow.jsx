import React from "react";

import { Eye, MoreHorizontal } from "lucide-react";

import { useNavigate } from "react-router-dom";

import MentorCapacityBar from "./MentorCapacityBar";

const MentorRow = ({ mentor, selectedMentor, setSelectedMentor }) => {
  const navigate = useNavigate();

  const isSelected = selectedMentor === mentor.id;

  const assigned = Number(mentor.currentMentees) || 0;

  const capacity = Number(mentor.maxMentees) || 0;

  const available =
    mentor.availableSlots !== undefined
      ? Number(mentor.availableSlots)
      : Math.max(capacity - assigned, 0);

  const initials = (mentor.fullName || "Mentor")
    .replace(/^(Dr\.|Prof\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSelect = () => {
    setSelectedMentor(mentor.id);
  };

  return (
    <tr
      onClick={handleSelect}
      className={`
        cursor-pointer
        border-b
        border-slate-100
        transition
        hover:bg-slate-50
        ${isSelected ? "bg-blue-50" : "bg-white"}
      `}
    >
      {/* ==================================================
          MENTOR
      ================================================== */}

      <td className="px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}

          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-xs
              font-bold
              ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700"
              }
            `}
          >
            {initials}
          </div>

          {/* Information */}

          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-slate-800">
              {mentor.fullName || "Unnamed Mentor"}
            </p>

            <p className="truncate text-[10px] text-slate-500">
              {mentor.email || "No email"}
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">
              {mentor.employeeCode || "No employee code"}
            </p>
          </div>
        </div>
      </td>

      {/* ==================================================
          DEPARTMENT
      ================================================== */}

      <td className="px-5 py-4">
        <span className="block max-w-[180px] text-[12px] leading-5 text-slate-700">
          {mentor.department?.name || "—"}
        </span>

        {mentor.department?.code && (
          <span className="text-[10px] text-slate-400">
            {mentor.department.code}
          </span>
        )}
      </td>

      {/* ==================================================
          DESIGNATION
      ================================================== */}

      <td className="px-5 py-4">
        <span className="text-[12px] leading-5 text-slate-700">
          {mentor.designation || "Faculty Mentor"}
        </span>
      </td>

      {/* ==================================================
          CAPACITY
      ================================================== */}

      <td className="min-w-[150px] px-5 py-4">
        <MentorCapacityBar assigned={assigned} capacity={capacity} />
      </td>

      {/* ==================================================
          AVAILABLE SLOTS
      ================================================== */}

      <td className="px-5 py-4">
        <span
          className={`
            inline-flex
            min-w-[34px]
            items-center
            justify-center
            rounded-md
            px-2
            py-1
            text-[11px]
            font-semibold
            ${
              available > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }
          `}
        >
          {available}
        </span>
      </td>

      {/* ==================================================
          ACTION
      ================================================== */}

      <td className="px-5 py-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-center gap-2">
          {/* Select */}

          <button
            type="button"
            onClick={handleSelect}
            disabled={available <= 0}
            className={`
              rounded-lg
              px-3
              py-1.5
              text-[11px]
              font-semibold
              transition
              ${
                available <= 0
                  ? "cursor-not-allowed bg-slate-100 text-slate-400"
                  : isSelected
                    ? "bg-blue-600 text-white"
                    : "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              }
            `}
          >
            {isSelected ? "Selected" : available > 0 ? "Select" : "Full"}
          </button>

          {/* View */}

          <button
            type="button"
            onClick={() => navigate(`/admin/mentor/${mentor.id}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100"
            title="View Mentor"
          >
            <Eye size={14} />
          </button>

          {/* More */}

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100"
            title="More Actions"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MentorRow;
