import React from "react";

const SummaryCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-all duration-300 hover:shadow-sm">
      {/* Icon */}
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon
          size={18}
          strokeWidth={2}
          className={iconColor}
        />
      </div>

      {/* Content */}
      <div>
        <p className="text-[11px] font-medium leading-4 text-slate-500">
          {title}
        </p>

        <h3 className="mt-1 text-[22px] font-bold leading-none text-slate-900">
          {value}
        </h3>

        <p className="mt-1 text-[10px] text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;