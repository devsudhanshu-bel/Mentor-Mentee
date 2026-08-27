import React from "react";

const ResearchStatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        {/* ================= Left ================= */}

        <div className="flex-1">
          <p className="text-[11px] font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            {subtitle}
          </p>
        </div>

        {/* ================= Icon ================= */}

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon
            size={22}
            className={iconColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ResearchStatCard;