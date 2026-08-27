import React from "react";

const MentorCapacityBar = ({
  assigned,
  capacity,
}) => {
  const percentage = (assigned / capacity) * 100;

  const color =
    percentage >= 90
      ? "bg-red-500"
      : percentage >= 70
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-slate-600">
          {assigned}/{capacity}
        </span>

        <span className="font-semibold text-blue-600">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default MentorCapacityBar;