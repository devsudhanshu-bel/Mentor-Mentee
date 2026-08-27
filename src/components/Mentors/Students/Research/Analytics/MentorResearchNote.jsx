import React from "react";
import {
  NotebookPen,
  CalendarDays,
  UserRound,
  PencilLine,
} from "lucide-react";

const MentorResearchNote = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800">
            Mentor Remarks
          </h2>

          <p className="mt-1 text-[12px] text-slate-500">
            Latest research evaluation and observations.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
          <NotebookPen
            size={20}
            className="text-amber-600"
          />
        </div>
      </div>

      {/* ================= Details ================= */}

      <div className="space-y-4 p-5">
        {/* Mentor */}

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
            <UserRound
              size={18}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="text-[12px] font-semibold text-slate-800">
              Dr. Rahul Sharma
            </p>

            <p className="text-[11px] text-slate-500">
              Faculty Mentor
            </p>
          </div>
        </div>

        {/* Date */}

        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
          <CalendarDays
            size={15}
            className="text-slate-500"
          />

          <span className="text-[11px] text-slate-600">
            Last Updated • 20 April 2025
          </span>
        </div>

        {/* Remark */}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <PencilLine
              size={15}
              className="text-slate-500"
            />

            <span className="text-[12px] font-semibold text-slate-700">
              Remarks
            </span>
          </div>

          <p className="text-[12px] leading-6 text-slate-600">
            The student has demonstrated excellent analytical
            skills throughout the research process. Literature
            review is comprehensive and the proposed methodology
            is well structured. Minor revisions have been suggested
            before the final journal submission.
          </p>
        </div>

        {/* Recommendation */}

        <div className="rounded-xl border border-green-200 bg-green-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-green-700">
            Recommendation
          </p>

          <p className="mt-1 text-[12px] leading-5 text-green-800">
            Ready for final submission after incorporating reviewer
            feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorResearchNote;