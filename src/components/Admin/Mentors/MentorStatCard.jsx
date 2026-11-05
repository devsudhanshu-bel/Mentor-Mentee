import React from "react";

const MentorStatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  bg,
}) => {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2.5 py-3 shadow-sm transition hover:shadow-md sm:gap-3 sm:px-4">
      {/* Icon */}

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${bg}`}
      >
        <Icon
          size={20}
          className={color}
          strokeWidth={2}
        />
      </div>

      {/* Content */}

      <div className="min-w-0 space-y-0.5">
        <p className="break-words text-[10px] font-medium leading-tight text-slate-500 sm:text-[11px]">
          {title}
        </p>

        <h3 className="break-words text-[17px] font-bold leading-none text-slate-800 sm:text-[18px]">
          {value}
        </h3>

        <p className="break-words text-[9px] leading-snug text-slate-400 sm:text-[10px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default MentorStatCard;
