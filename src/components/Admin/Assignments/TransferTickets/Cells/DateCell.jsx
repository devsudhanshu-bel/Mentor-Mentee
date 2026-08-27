import React from "react";
import { CalendarDays } from "lucide-react";

const DateCell = ({ createdOn }) => {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <CalendarDays
        size={13}
        className="flex-shrink-0 text-slate-400"
      />

      <div>
        <p className="text-xs font-semibold leading-4 text-slate-900">
          {createdOn.date}
        </p>

        <p className="text-[10px] leading-4 text-slate-500">
          {createdOn.time}
        </p>
      </div>
    </div>
  );
};

export default DateCell;