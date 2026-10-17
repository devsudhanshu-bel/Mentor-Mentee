
import React from "react";

const ExtraCurricularStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {value ?? 0}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className={`rounded-lg p-2.5 ${iconBg}`}>
            <Icon size={19} className={iconColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtraCurricularStatCard;
