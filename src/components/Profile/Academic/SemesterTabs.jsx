import React from "react";

const semesters = [
  "Semester I",
  "Semester II",
  "Semester III",
  "Semester IV",
  "Semester V",
  "Semester VI",
  "Semester VII",
  "Semester VIII",
];

const SemesterTabs = ({
  activeSemester,
  setActiveSemester,
}) => {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-8 gap-2">
        {semesters.map((semester) => {
          const active = activeSemester === semester;

          return (
            <button
              key={semester}
              onClick={() => setActiveSemester(semester)}
              className={`
                h-10
                rounded-lg
                border
                text-[12px]
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 border-blue-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                }
              `}
            >
              {semester}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SemesterTabs;