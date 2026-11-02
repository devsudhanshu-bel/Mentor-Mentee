
import React from "react";
import {
  Lightbulb,
  Trophy,
  FileCheck,
} from "lucide-react";

const AwardsTips = () => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb
          size={16}
          className="shrink-0 text-amber-500"
        />

        <h2 className="text-base font-semibold text-slate-800">
          Tips
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex min-w-0 items-start gap-3">
          <Trophy
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />

          <p className="min-w-0 break-words text-xs leading-5 text-slate-600">
            Highlight achievements that showcase your skills and leadership.
          </p>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <Trophy
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />

          <p className="min-w-0 break-words text-xs leading-5 text-slate-600">
            Include awards from academic, co-curricular and extracurricular activities.
          </p>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <FileCheck
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />

          <p className="min-w-0 break-words text-xs leading-5 text-slate-600">
            Upload supporting documents or certificates for validation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AwardsTips;
