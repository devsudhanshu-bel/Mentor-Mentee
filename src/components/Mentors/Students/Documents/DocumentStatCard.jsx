import React from "react";

const DocumentStatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      {/* Icon */}

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon
          size={24}
          className={iconColor}
          strokeWidth={2}
        />
      </div>

      {/* Content */}

      <div className="flex flex-col">
        <span className="text-[12px] font-medium text-slate-500">
          {title}
        </span>

        <span className="mt-0.5 text-[18px] font-bold leading-none text-slate-800">
          {value}
        </span>

        <span className="mt-1 text-[11px] text-slate-500">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default DocumentStatCard;