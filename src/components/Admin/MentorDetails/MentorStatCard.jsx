import React from "react";

const MentorStatCard = ({
  icon: Icon,
  value,
  subtitle,
  description,
  color,
  bg,
  border = true,
}) => {
  return (
    <div
      className={`flex h-full items-center gap-3 px-6 py-5 ${
        border ? "border-r border-slate-200" : ""
      }`}
    >
      {/* Icon */}

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${bg}`}
      >
        <Icon
          size={20}
          className={color}
          strokeWidth={2}
        />
      </div>

      {/* Content */}

      <div className="min-w-0 space-y-0.5">
        <h3 className="whitespace-nowrap text-[18px] font-bold leading-none text-slate-900">
          {value}
        </h3>

        <p className="text-[12px] font-semibold text-slate-700">
          {subtitle}
        </p>

        <p className="text-[11px] text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MentorStatCard;