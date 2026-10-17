import React from "react";

const ResearchStatCard = ({
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  title = "Statistic",
  value = 0,
  subtitle = "",
  isLoading = false,
}) => {
  return (
    <article
      aria-label={`${title}: ${isLoading ? "Loading" : value}`}
      className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* ICON */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBg}`}
        aria-hidden="true"
      >
        {Icon && <Icon size={21} className={iconColor} />}
      </div>

      {/* STATISTIC DETAILS */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-slate-500">
          {title}
        </p>

        {isLoading ? (
          <div
            className="mt-2 h-7 w-12 animate-pulse rounded-md bg-slate-100"
            aria-label="Loading statistic"
          />
        ) : (
          <p className="mt-1 text-2xl font-bold leading-none tabular-nums text-slate-900">
            {value ?? 0}
          </p>
        )}

        {subtitle && (
          <p className="mt-1 truncate text-xs text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </article>
  );
};

export default ResearchStatCard;