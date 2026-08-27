import React from "react";

const OverviewStatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  title,
  subtitle,
}) => {
  return (
    <div className="flex h-[170px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
      {/* Icon */}
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon size={18} className={iconColor} />
      </div>

      {/* Value */}
      <h3 className="text-[18px] font-bold leading-none text-slate-900">
        {value}
      </h3>

      {/* Title */}
      <p className="mt-3 text-center text-[12px] font-semibold text-slate-800">
        {title}
      </p>

      {/* Subtitle */}
      <p className="mt-1 text-center text-[12px] leading-5 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
};

export default OverviewStatCard;