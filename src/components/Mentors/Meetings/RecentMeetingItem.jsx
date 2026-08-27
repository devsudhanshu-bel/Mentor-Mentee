import React from "react";
import { Clock } from "lucide-react";

import MeetingDateBadge from "./MeetingDateBadge";

const RecentMeetingItem = ({ meeting, onView }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:shadow-sm">
      {/* Left */}
      <div className="flex flex-1 items-start gap-3">
        <MeetingDateBadge
          month={meeting.month}
          date={meeting.date}
          day={meeting.day}
        />

        {/* Meeting Details */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-semibold text-slate-800">
            {meeting.title}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <Clock size={11} />
            <span>{meeting.time}</span>
          </div>
        </div>

        {/* Discussion */}
        <div className="hidden w-[180px] xl:block">
          <p className="text-[12px] font-semibold text-slate-700">
            Discussed:
          </p>

          <p className="mt-1 text-[11px] leading-4 text-slate-500">
            {meeting.notes}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="ml-4 flex-shrink-0">
        <button
          onClick={() => onView(meeting)}
          className="cursor-pointer rounded-lg border border-blue-300 px-3 py-1.5 text-[12px] font-medium text-blue-600 transition hover:bg-blue-50"
        >
          View Notes
        </button>
      </div>
    </div>
  );
};

export default RecentMeetingItem;