import React from "react";
import { ArrowRight } from "lucide-react";

const AssignButton = ({
  selectedStudents,
  selectedMentor,
  onAssign,
}) => {
  const disabled =
    selectedStudents.length === 0 ||
    selectedMentor === null;

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onAssign}
        disabled={disabled}
        className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-all ${
          disabled
            ? "cursor-not-allowed bg-slate-200 text-slate-400"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default AssignButton;