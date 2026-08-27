import React from "react";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const insights = [
  "Excellent performance! Keep it up.",
  "You have secured A grade in 5 subjects.",
  "Your attendance is above the department average.",
  "No backlogs in this semester.",
];

const PerformanceInsights = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb
          size={16}
          className="text-[#0B63F6]"
          strokeWidth={2}
        />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Performance Insights
        </h3>
      </div>

      {/* Insights */}
      <div className="space-y-2.5">
        {insights.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2"
          >
            <CheckCircle2
              size={13}
              className="text-green-500 mt-[2px] shrink-0"
            />

            <p className="text-[11px] leading-5 text-slate-600">
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-5 flex justify-center">
        <button
          className="
            px-6
            py-2
            text-[12px]
            font-medium
            text-[#0B63F6]
            border
            border-[#0B63F6]
            rounded-lg
            hover:bg-[#0B63F6]
            hover:text-white
            transition-all
            duration-200
          "
        >
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};

export default PerformanceInsights;