import React, { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

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

const AcademicInfo = () => {
  const [activeSemester, setActiveSemester] = useState("Semester V");

  return (
    <div className="space-y-4">
      {/* Heading Row */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#082B73]">
            Academic Information
          </h2>

          <p className="mt-1 text-[13px] text-slate-500">
            View your academic performance and course details
          </p>
        </div>

        {/* Academic Year */}
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm hover:border-blue-500 transition">
          <CalendarDays
            size={18}
            className="text-[#0B63F6]"
          />

          <span className="text-[14px] font-medium text-slate-700">
            2024 - 2025 (Odd)
          </span>

          <ChevronDown
            size={16}
            className="text-slate-500"
          />
        </button>
      </div>

      {/* Semester Tabs */}
      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">
        {semesters.map((semester) => (
          <button
            key={semester}
            onClick={() => setActiveSemester(semester)}
            className={`flex-1 py-3 text-[13px] font-medium transition-all duration-200 cursor-pointer
              ${
                activeSemester === semester
                  ? "bg-[#0B63F6] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }
              ${
                semester !== semesters[semesters.length - 1]
                  ? "border-r border-slate-200"
                  : ""
              }`}
          >
            {semester}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AcademicInfo;