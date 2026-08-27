import React from "react";
import { CheckCircle2, Circle, Clock3 } from "lucide-react";

const TimelineItem = ({
  title,
  date,
  description,
  completed = true,
  current = false,
  isLast = false,
}) => {
  return (
    <div className="relative flex gap-4">
      {/* Timeline Indicator */}

      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
            completed
              ? "border-green-500 bg-green-50"
              : current
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-white"
          }`}
        >
          {completed ? (
            <CheckCircle2 size={16} className="text-green-600" />
          ) : current ? (
            <Clock3 size={16} className="text-blue-600" />
          ) : (
            <Circle size={14} className="text-slate-400" />
          )}
        </div>

        {!isLast && (
          <div className="mt-1 h-full w-[2px] flex-1 bg-slate-200" />
        )}
      </div>

      {/* Content */}

      <div className="flex-1 pb-8">
        <h4 className="text-[13px] font-semibold text-slate-800">
          {title}
        </h4>

        <p className="mt-1 text-[11px] text-slate-500">
          {date}
        </p>

        {description && (
          <p className="mt-2 text-[12px] leading-5 text-slate-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;