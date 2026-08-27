import React from "react";

const ProgressBar = ({
  label,
  value,
  color = "bg-blue-600",
}) => {
  return (
    <div className="space-y-1.5">
      {/* Label & Percentage */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-slate-700">
          {label}
        </p>

        <span className="text-[11px] font-semibold text-slate-500">
          {value}%
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;