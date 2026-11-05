import React from "react";

const MeetingDateBadge = ({ month, date, day }) => {
  return (
    <div className="flex h-[56px] w-[44px] flex-shrink-0 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 sm:h-[60px] sm:w-[48px]">
      <span className="text-[8px] font-semibold uppercase tracking-wide text-slate-500">
        {month}
      </span>

      <span className="my-[2px] text-[17px] font-bold leading-none text-slate-900 sm:text-[18px]">
        {date}
      </span>

      <span className="text-[8px] font-semibold uppercase tracking-wide text-slate-500">
        {day}
      </span>
    </div>
  );
};

export default MeetingDateBadge;
