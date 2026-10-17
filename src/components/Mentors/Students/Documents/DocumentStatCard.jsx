import React from "react";

const DocumentStatCard = ({
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  title,
  value = 0,
  subtitle,
}) => {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      {Icon && (
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon
            size={18}
            className={iconColor}
            strokeWidth={2}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        <span className="text-[10px] font-medium leading-4 text-slate-500">
          {title}
        </span>

        <span className="mt-0.5 text-base font-bold leading-5 text-slate-800">
          {value}
        </span>

        {subtitle && (
          <span className="mt-1 text-[9px] leading-3 text-slate-500">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default DocumentStatCard;