import React from "react";

const CertificateStatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-3">
        {/* Icon */}

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon
            size={20}
            className={iconColor}
            strokeWidth={2}
          />
        </div>

        {/* Content */}

        <div>
          <p className="text-[10px] font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-0.5 text-[18px] font-bold leading-none text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-[10px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateStatCard;