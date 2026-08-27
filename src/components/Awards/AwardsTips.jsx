import React from "react";
import {
  Lightbulb,
  Trophy,
  FileCheck,
} from "lucide-react";

const AwardsTips = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      <div className="flex items-center gap-2 mb-4">

        <Lightbulb
          size={16}
          className="text-amber-500"
        />

        <h2 className="text-base font-semibold">
          Tips
        </h2>

      </div>

      <div className="space-y-4">

        <div className="flex gap-3">

          <Trophy
            size={15}
            className="text-slate-500 mt-0.5"
          />

          <p className="text-xs text-slate-600">
            Highlight achievements that showcase your skills and leadership.
          </p>

        </div>

        <div className="flex gap-3">

          <Trophy
            size={15}
            className="text-slate-500 mt-0.5"
          />

          <p className="text-xs text-slate-600">
            Include awards from academic, co-curricular and extracurricular activities.
          </p>

        </div>

        <div className="flex gap-3">

          <FileCheck
            size={15}
            className="text-slate-500 mt-0.5"
          />

          <p className="text-xs text-slate-600">
            Upload supporting documents or certificates for validation.
          </p>

        </div>

      </div>

    </div>
  );
};

export default AwardsTips;