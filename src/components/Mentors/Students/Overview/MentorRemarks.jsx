import React from "react";
import { User } from "lucide-react";

const MentorRemarks = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm h-[320px]">
      {/* ================= Header ================= */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Mentor Remarks
        </h3>

        <button className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* ================= Latest Remark ================= */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-[11px] leading-5 text-slate-700">
          Aarav shows excellent academic performance and consistent
          improvement. He is proactive and actively participates in
          discussions.
        </p>
      </div>

      {/* ================= Footer ================= */}
      <div className="mt-3">
        <p className="text-[10px] text-slate-500">
          Last updated: 10 May 2025
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
              <User size={14} className="text-slate-600" />
            </div>

            <span className="text-[11px] font-medium text-slate-700">
              Dr. Arjun Mehta
            </span>
          </div>

          <button className="rounded-md border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-medium text-orange-600 transition hover:bg-orange-100">
            Add Remark
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorRemarks;