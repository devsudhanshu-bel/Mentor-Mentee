import React from "react";

const MeetingActionCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  iconBg,
  iconColor,
  buttonColor,
  onClick = () => {},
}) => {
  return (
    <div className="flex h-[170px] rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      {/* Icon */}
      <div
        className={`mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon
          size={28}
          strokeWidth={2}
          className={iconColor}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Title */}
        <h3 className="text-[16px] font-semibold text-[#2563EB]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-[13px] leading-5 text-slate-500">
          {description}
        </p>

        {/* Action Button */}
        <div className="mt-auto flex justify-end">
          <button
            type="button"
            onClick={onClick}
            className={`cursor-pointer rounded-lg px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-all duration-300 hover:brightness-95 hover:shadow-md active:scale-95 ${buttonColor}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingActionCard;