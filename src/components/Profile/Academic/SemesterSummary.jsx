import React from "react";
import {
  Award,
  BookOpen,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const SemesterSummary = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 h-full">

      {/* Header */}

      <div className="flex items-center gap-2 mb-4">

        <Award
          size={17}
          className="text-blue-600"
        />

        <h3 className="text-base font-semibold text-slate-800">
          Semester Summary
        </h3>

      </div>

      {/* SGPA */}

      <div className="text-center border-b border-slate-100 pb-4">

        <p className="text-[11px] uppercase tracking-wide text-slate-500">
          Semester GPA
        </p>

        <h1 className="text-4xl font-bold text-blue-600 mt-2">
          8.78
        </h1>

        <p className="text-[12px] text-slate-500 mt-1">
          Excellent Performance
        </p>

      </div>

      {/* Statistics */}

      <div className="space-y-4 mt-5">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <BookOpen
              size={15}
              className="text-blue-600"
            />

            <span className="text-[13px] text-slate-600">
              Total Credits
            </span>

          </div>

          <span className="text-[13px] font-semibold">
            28
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <GraduationCap
              size={15}
              className="text-green-600"
            />

            <span className="text-[13px] text-slate-600">
              Credits Earned
            </span>

          </div>

          <span className="text-[13px] font-semibold">
            28
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <TrendingUp
              size={15}
              className="text-orange-500"
            />

            <span className="text-[13px] text-slate-600">
              Class Rank
            </span>

          </div>

          <span className="text-[13px] font-semibold">
            12 / 186
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-[13px] text-slate-600">
            Attendance
          </span>

          <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-medium">
            93%
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-[13px] text-slate-600">
            Backlogs
          </span>

          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-medium">
            None
          </span>

        </div>

      </div>

    </div>
  );
};

export default SemesterSummary;