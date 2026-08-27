import React from "react";
import { ShieldCheck } from "lucide-react";

const SemesterSummary = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck
          size={16}
          className="text-[#0B63F6]"
          strokeWidth={2}
        />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Semester Summary
        </h3>
      </div>

      {/* SGPA */}
      <div className="mb-4">
        <p className="text-[10px] text-slate-500 uppercase">
          SGPA
        </p>

        <div className="flex items-end gap-1 mt-0.5">
          <span className="text-[18px] font-bold leading-none text-[#0B63F6]">
            8.78
          </span>

          <span className="text-[11px] text-slate-500 mb-[2px]">
            / 10
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-[11px]">
        <div className="flex justify-between">
          <span className="text-slate-500">Total Credits</span>
          <span className="font-semibold text-[#0B3B8F]">28</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Credits Earned</span>
          <span className="font-semibold text-[#0B3B8F]">28</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Credits Registered</span>
          <span className="font-semibold text-[#0B3B8F]">28</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Backlogs</span>
          <span className="font-semibold text-[#0B3B8F]">0</span>
        </div>
      </div>
    </div>
  );
};

export default SemesterSummary;