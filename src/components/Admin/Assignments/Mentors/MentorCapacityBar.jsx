import React from "react";

const MentorCapacityBar = ({ assigned = 0, capacity = 0 }) => {
  const safeAssigned = Number(assigned) || 0;

  const safeCapacity = Number(capacity) || 0;

  const percentage =
    safeCapacity > 0 ? Math.min((safeAssigned / safeCapacity) * 100, 100) : 0;

  const color =
    percentage >= 100
      ? "bg-red-500"
      : percentage >= 80
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div className="w-full max-w-[160px]">
      <div className="mb-1 flex items-center justify-between text-[10px]">
        <span className="font-medium text-slate-600">
          {safeAssigned}/{safeCapacity}
        </span>

        <span className="font-semibold text-slate-500">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default MentorCapacityBar;
