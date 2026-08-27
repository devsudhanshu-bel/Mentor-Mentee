import React from "react";
import { Lightbulb, Check } from "lucide-react";

const tips = [
  "Include certificates or proof of participation.",
  "Provide a brief description of your role.",
  "Add date, event name, and organizer details.",
  "Approved activities will be visible to your mentor.",
];

const CoCurricularTips = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">

        <Lightbulb
          size={16}
          className="text-slate-600"
        />

        <h2 className="text-base font-semibold text-slate-800">
          Tips
        </h2>

      </div>

      {/* Tips */}
      <div className="space-y-3">

        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-2"
          >
            <Check
              size={14}
              className="text-emerald-500 mt-0.5 flex-shrink-0"
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

export default CoCurricularTips;