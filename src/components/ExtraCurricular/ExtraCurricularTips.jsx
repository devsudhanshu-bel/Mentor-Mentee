
import React from "react";
import { Lightbulb, Check } from "lucide-react";

const tips = [
  "Include a brief description of your activity.",
  "Add duration, role, and key highlights.",
  "Upload certificates or proof of participation.",
  "Approved activities will be visible to your mentor.",
];

const ExtraCurricularTips = () => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      <div className="mb-4 flex items-center gap-2">
        <Lightbulb
          size={16}
          className="shrink-0 text-slate-600"
        />

        <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
          Tips
        </h2>
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex min-w-0 items-start gap-2"
          >
            <Check
              size={14}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <p className="min-w-0 break-words text-xs leading-5 text-slate-600">
              {tip}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExtraCurricularTips;
