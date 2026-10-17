import React from "react";

const AwardsAchievementsStatCard = ({
  icon: Icon,
  iconBg = "bg-purple-50",
  iconColor = "text-purple-600",
  title,
  value = 0,
  subtitle,
}) => {
  return (
    <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-1.5 text-xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        {Icon && (
          <div className={`shrink-0 rounded-lg p-2 ${iconBg}`}>
            <Icon size={17} className={iconColor} />
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-[10px] leading-4 text-slate-500">
          {subtitle}
        </p>
      )}
    </article>
  );
};

export default AwardsAchievementsStatCard;