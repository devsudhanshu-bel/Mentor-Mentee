
import React from "react";
import { Lightbulb, Check } from "lucide-react";

const tips = [
  "Make sure your file is in PDF, DOCX, or PPTX format.",
  "Include all necessary details and references.",
  "Keep your research work organized and professional.",
  "Published works will be visible to your mentor.",
];

const ResearchTips = () => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb
          size={17}
          className="shrink-0 text-slate-600"
          strokeWidth={2}
        />

        <h2 className="text-base font-semibold text-slate-800">
          Tips
        </h2>
      </div>

      {/* Tips List */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex min-w-0 items-start gap-2.5"
          >
            <Check
              size={14}
              className="mt-1 shrink-0 text-emerald-500"
              strokeWidth={3}
            />

            <p className="min-w-0 break-words text-xs leading-5 text-slate-600 sm:text-sm">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchTips;
