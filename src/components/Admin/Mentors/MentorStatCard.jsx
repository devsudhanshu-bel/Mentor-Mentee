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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3 hover:shadow-md transition">
      {/* Icon */}

      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center ${bg}`}
      >
        <Icon
          size={22}
          className={color}
          strokeWidth={2}
        />
      </div>

      {/* Content */}

      <div className="space-y-0.5">
        <p className="text-[11px] font-medium text-slate-500">
          {title}
        </p>

        <h3 className="text-[18px] font-bold text-slate-800 leading-none">
          {value}
        </h3>

        <p className="text-[10px] text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default MentorStatCard;