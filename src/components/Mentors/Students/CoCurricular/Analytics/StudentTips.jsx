import React from "react";
import { Check } from "lucide-react";

const tips = [
  "Upload clear and valid proof of participation.",
  "Include your role and key contributions.",
  "Participate regularly and build a diverse portfolio.",
  "Quality over quantity — focus on meaningful involvement.",
];

const StudentTips = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <h3 className="text-[14px] font-semibold text-slate-800">
        Tips for Students
      </h3>

      {/* Tips */}

      <div className="mt-5 space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-50">
              <Check
                size={12}
                className="text-green-600"
                strokeWidth={3}
              />
            </div>

            <p className="flex-1 text-[11px] leading-5 text-slate-600">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTips;