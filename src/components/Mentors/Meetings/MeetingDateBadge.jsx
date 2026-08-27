import React from "react";

const MeetingDateBadge = ({ month, date, day }) => {
  return (
    <div className="flex h-[60px] w-[48px] flex-shrink-0 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
      <span className="text-[8px] font-semibold uppercase tracking-wide text-slate-500">
        {month}
      </span>

      <span className="my-[2px] text-[18px] font-bold leading-none text-slate-900">
        {date}
      </span>

      <span className="text-[8px] font-semibold uppercase tracking-wide text-slate-500">
        {day}
      </span>
    </div>
  );
};

export default MeetingDateBadge;