import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const AssignButton = ({
  selectedStudents,
  selectedMentor,
  onAssign,
  onRemove,
}) => {
  const studentCount = selectedStudents.length;

  const assignDisabled =
    studentCount === 0 || selectedMentor === null;

  const removeDisabled = studentCount === 0;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      {/* ================= Assign Selected ================= */}

      <div className="flex flex-col items-center gap-2">
        <span className="whitespace-nowrap text-[11px] font-semibold text-slate-700">
          Assign Selected
        </span>

        <button
          type="button"
          onClick={onAssign}
          disabled={assignDisabled}
          aria-label="Assign selected students"
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            transition-all
            duration-200
            ${
              assignDisabled
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md"
            }
          `}
        >
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        <span className="whitespace-nowrap text-[11px] font-medium text-slate-500">
          {studentCount}{" "}
          {studentCount === 1 ? "Student" : "Students"}
        </span>
      </div>

      {/* ================= Remove ================= */}

      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onRemove}
          disabled={removeDisabled}
          aria-label="Remove selected students"
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            transition-all
            duration-200
            ${
              removeDisabled
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md"
            }
          `}
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>

        <span className="whitespace-nowrap text-[11px] font-semibold text-slate-700">
          Remove
        </span>

        <span className="whitespace-nowrap text-[11px] font-medium text-slate-500">
          0 Students
        </span>
      </div>
    </div>
  );
};

export default AssignButton;