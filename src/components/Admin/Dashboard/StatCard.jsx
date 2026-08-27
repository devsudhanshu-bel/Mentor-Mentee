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
        bg-white
        border
        border-slate-200
        rounded-xl
        px-4
        py-3
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      <div className="flex items-center gap-2">
        {/* Icon */}

        <div
          className={`
            h-10
            w-10
            rounded-xl
            flex
            items-center
            justify-center
            ${iconBg}
          `}
        >
          <Icon
            size={20}
            className={iconColor}
            strokeWidth={2}
          />
        </div>

        {/* Content */}

        <div className="flex-1">
          <p className="text-[11px] font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-0.5 text-2xl font-bold leading-none text-slate-900">
            {value}
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;