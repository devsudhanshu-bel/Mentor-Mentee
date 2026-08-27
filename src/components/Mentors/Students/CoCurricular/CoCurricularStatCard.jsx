import React from "react";

const CoCurricularStatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        {/* Icon */}

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon
            size={24}
            className={iconColor}
          />
        </div>

        {/* Content */}

        <div>
          <p className="text-[12px] font-medium text-slate-600">
            {title}
          </p>

          <h2 className="mt-0.5 text-[18px] font-bold leading-none text-slate-900">
            {value}
          </h2>

          <p className="mt-1 text-[11px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoCurricularStatCard;