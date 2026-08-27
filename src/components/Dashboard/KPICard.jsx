import React from "react";

const KPICard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
}) => {
  const valueClass =
    value.length > 5
      ? "text-[15px]"
      : value.length > 3
      ? "text-[16px]"
      : "text-[18px]";

  return (
    <div
      className="
        bg-white
        border border-slate-200
        rounded-[18px]
        h-[92px]
        px-4
        py-3
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        flex
        flex-col
        justify-between
      "
    >
      {/* Top */}
      <h4 className="text-[11px] font-medium text-slate-600 leading-tight">
        {title}
      </h4>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: iconBg,
          }}
        >
          <Icon
            size={18}
            strokeWidth={2}
            style={{
              color: iconColor,
            }}
          />
        </div>

        <span
          className={`${valueClass} font-bold text-slate-900 leading-none`}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default KPICard;