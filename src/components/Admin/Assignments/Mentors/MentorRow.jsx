import React from "react";
import { Check } from "lucide-react";

import MentorCapacityBar from "./MentorCapacityBar";

const MentorRow = ({ mentor, selectedMentor, setSelectedMentor }) => {
  // ============================================================
  // MENTOR DATA
  // ============================================================

  const name = mentor?.fullName || mentor?.name || "Unknown Mentor";

  // Backend returns:
  //
  // department: {
  //   id,
  //   name,
  //   code
  // }
  //
  // Therefore ALWAYS extract the display string.

  const department =
    typeof mentor?.department === "string"
      ? mentor.department
      : mentor?.department?.name ||
        mentor?.departments?.name ||
        mentor?.departmentName ||
        "Department not available";

  const assigned = Number(
    mentor?.assigned ?? mentor?.assignedCount ?? mentor?.currentMentees ?? 0,
  );

  const capacity = Number(mentor?.capacity ?? mentor?.maxMentees ?? 0);

  // ============================================================
  // INITIALS
  // ============================================================

  const initials = name
    .replace(/^Dr\.\s*/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ============================================================
  // SELECT
  // ============================================================

  const handleSelect = (event) => {
    event.stopPropagation();

    setSelectedMentor(mentor.id);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <tr
      onClick={() => setSelectedMentor(mentor.id)}
      className={`
        cursor-pointer
        border-b
        border-slate-100
        transition
        hover:bg-slate-50
        ${selectedMentor === mentor.id ? "bg-blue-50" : ""}
      `}
    >
      {/* ======================================================
          MENTOR
          ====================================================== */}

      <td className="w-[55%] px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-sm
              font-bold
              text-blue-700
            "
          >
            {initials || "M"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-slate-800">
              {name}
            </p>

            <p className="truncate text-[11px] text-slate-500">{department}</p>
          </div>
        </div>
      </td>

      {/* ======================================================
          CAPACITY
          ====================================================== */}

      <td className="w-[25%] px-6 py-4">
        <MentorCapacityBar assigned={assigned} capacity={capacity} />
      </td>

      {/* ======================================================
          ACTION
          ====================================================== */}

      <td className="w-[20%] px-6 py-4 text-center">
        <button
          type="button"
          onClick={handleSelect}
          className={`
            inline-flex
            min-w-[95px]
            items-center
            justify-center
            gap-2
            rounded-lg
            px-4
            py-2
            text-[12px]
            font-semibold
            transition
            ${
              selectedMentor === mentor.id
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }
          `}
        >
          {selectedMentor === mentor.id && <Check size={14} />}

          {selectedMentor === mentor.id ? "Selected" : "Select"}
        </button>
      </td>
    </tr>
  );
};

export default MentorRow;
