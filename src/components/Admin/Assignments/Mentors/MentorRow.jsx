import React from "react";
import { Check } from "lucide-react";

import MentorCapacityBar from "./MentorCapacityBar";

const MentorRow = ({
  mentor,
  selectedMentor,
  setSelectedMentor,
}) => {
  return (
    <tr
      onClick={() => setSelectedMentor(mentor.id)}
      className={`cursor-pointer border-b border-slate-100 transition hover:bg-slate-50 ${
        selectedMentor === mentor.id
          ? "bg-blue-50"
          : ""
      }`}
    >
      {/* ================= Mentor ================= */}

      <td className="w-[55%] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {mentor.name
              .replace("Dr. ", "")
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              {mentor.name}
            </p>

            <p className="text-[11px] text-slate-500">
              {mentor.department}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Capacity ================= */}

      <td className="w-[25%] px-6 py-4">
        <MentorCapacityBar
          assigned={mentor.assigned}
          capacity={mentor.capacity}
        />
      </td>

      {/* ================= Action ================= */}

      <td className="w-[20%] px-6 py-4 text-center">
        <button
          className={`inline-flex min-w-[95px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold transition ${
            selectedMentor === mentor.id
              ? "bg-blue-600 text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          {selectedMentor === mentor.id && (
            <Check size={14} />
          )}

          {selectedMentor === mentor.id
            ? "Selected"
            : "Select"}
        </button>
      </td>
    </tr>
  );
};

export default MentorRow;