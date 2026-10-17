
import React from "react";

const CoCurricularStatCard = ({
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  title,
  value = 0,
  subtitle,
}) => {
  return (
    <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        {Icon && (
          <div className={`shrink-0 rounded-xl p-3 ${iconBg}`}>
            <Icon size={21} className={iconColor} />
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-slate-500">
          {subtitle}
        </p>
      )}
    </article>
  );
};

export default CoCurricularStatCard;
