
import React from "react";

const SummaryCard = ({
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  title = "Summary",
  value = 0,
  subtitle = "",
}) => {
  const displayValue =
    value === null || value === undefined || value === ""
      ? 0
      : value;

  return (
    <div
      className="
        flex min-w-0 items-center gap-3
        rounded-xl border border-slate-200 bg-white
        px-3 py-4
        transition-all duration-200
        hover:border-blue-200 hover:shadow-sm
      "
    >
      {/* Icon */}
      <div
        className={`
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-full ${iconBg}
        `}
      >
        {Icon ? (
          <Icon
            size={19}
            strokeWidth={2}
            className={iconColor}
            aria-hidden="true"
          />
        ) : (
          <span className={`text-sm font-bold ${iconColor}`}>
            #
          </span>
        )}
      </div>

      {/* Summary information */}
      <div className="min-w-0 flex-1">
        <p
          className="truncate text-[11px] font-medium leading-4 text-slate-500"
          title={title}
        >
          {title}
        </p>

        <p
          className="mt-1 break-words text-2xl font-bold leading-tight tabular-nums text-slate-900"
          aria-label={`${title}: ${displayValue}`}
        >
          {displayValue}
        </p>

        {subtitle && (
          <p
            className="mt-1 break-words text-[10px] leading-4 text-slate-400"
            title={subtitle}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
