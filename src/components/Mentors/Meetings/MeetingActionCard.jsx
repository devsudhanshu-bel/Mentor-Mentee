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
    <div className="flex min-h-[170px] h-auto flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:min-h-[170px] sm:flex-row sm:gap-0 sm:p-5">
      {/* Icon */}
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mr-5 sm:h-14 sm:w-14 ${iconBg}`}
      >
        <Icon
          size={28}
          strokeWidth={2}
          className={iconColor}
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Title */}
        <h3 className="break-words text-[15px] font-semibold text-[#2563EB] sm:text-[16px]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 break-words text-[13px] leading-5 text-slate-500">
          {description}
        </p>

        {/* Action Button */}
        <div className="mt-auto flex justify-end pt-3 sm:pt-0">
          <button
            type="button"
            onClick={onClick}
            className={`w-full cursor-pointer rounded-lg px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-all duration-300 hover:brightness-95 hover:shadow-md active:scale-95 sm:w-auto sm:px-5 ${buttonColor}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingActionCard;
