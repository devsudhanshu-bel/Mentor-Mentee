import React from "react";

const OverviewStatCard = ({
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  value = 0,
  title,
  subtitle,
  loading = false,
}) => {
  return (
    <div className="flex min-h-[200px] h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Icon */}
      <div
        className={`mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        {Icon && <Icon size={21} className={iconColor} />}
      </div>

      {/* Value */}
      {loading ? (
        <div className="h-7 w-16 animate-pulse rounded-md bg-slate-200" />
      ) : (
        <h3 className="text-[22px] font-bold leading-tight text-slate-900">
          {value ?? 0}
        </h3>
      )}

      {/* Title */}
      <p className="mt-3 text-center text-[13px] font-semibold leading-5 text-slate-800">
        {title}
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-1 text-center text-[12px] leading-5 text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default OverviewStatCard;