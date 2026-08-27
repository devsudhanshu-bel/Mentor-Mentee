import React from "react";

const CircularProgress = ({ value = 75, pending = 3 }) => {
  const size = 110;
  const stroke = 7;
  const radius = (size - stroke) / 2;

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  return (
    <div className="relative w-[110px] h-[110px]">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#dbeafe"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1d7ef5"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.6s ease",
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-800 leading-none">
          {pending}
        </span>

        <span className="text-sm text-slate-600 mt-1">
          Pending
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;