import React from "react";

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
}) => {
  return (
    <div
      className="
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        px-2.5
        py-3
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
        sm:px-4
      "
    >
      <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-2">
        {/* Icon */}

        <div
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            sm:h-10
            sm:w-10
            sm:rounded-xl
            ${iconBg}
          `}
        >
          <Icon
            size={18}
            className={iconColor}
            strokeWidth={2}
          />
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <p className="break-words text-[10px] font-medium leading-tight text-slate-500 sm:text-[11px]">
            {title}
          </p>

          <h2 className="mt-1 break-words text-xl font-bold leading-none text-slate-900 sm:mt-0.5 sm:text-2xl">
            {value}
          </h2>

          <p className="mt-1 break-words text-[10px] leading-snug text-slate-400 sm:text-[11px]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
