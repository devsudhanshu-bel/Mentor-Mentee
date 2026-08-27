import React from "react";

const AssignmentFooter = ({
  selectedStudents,
  selectedMentor,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {selectedStudents.length} Student
          {selectedStudents.length !== 1 && "s"} Selected
        </p>

        <p className="text-xs text-slate-500">
          {selectedMentor
            ? "Mentor selected. Ready to assign."
            : "Select a mentor to continue."}
        </p>
      </div>

      <button
        disabled={
          selectedStudents.length === 0 ||
          selectedMentor === null
        }
        className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
          selectedStudents.length === 0 ||
          selectedMentor === null
            ? "cursor-not-allowed bg-slate-300 text-slate-500"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Assign Students
      </button>
    </div>
  );
};

export default AssignmentFooter;