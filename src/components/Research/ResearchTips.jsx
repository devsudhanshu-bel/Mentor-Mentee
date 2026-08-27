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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb
          size={16}
          className="text-slate-600"
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
            className="flex items-start gap-2"
          >
            <Check
              size={14}
              className="text-emerald-500 mt-0.5 flex-shrink-0"
              strokeWidth={3}
            />

            <p className="text-xs text-slate-600 leading-5">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchTips;