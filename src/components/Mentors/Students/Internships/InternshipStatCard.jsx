import React from "react";

const InternshipStatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="h-[132px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex h-full flex-col">
        {/* ================= Icon ================= */}

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon
            size={18}
            className={iconColor}
          />
        </div>

        {/* ================= Content ================= */}

        <div className="mt-3">
          <h3 className="text-[11px] font-medium leading-4 text-slate-600">
            {title}
          </h3>

          <p className="mt-2 text-[28px] font-bold leading-none text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-[10px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipStatCard;