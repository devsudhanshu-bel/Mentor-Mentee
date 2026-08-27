import React from "react";
import { CalendarDays, MapPin } from "lucide-react";

const UpcomingMeeting = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={16} className="text-blue-600" />

        <h3 className="text-[14px] font-semibold text-blue-600">
          Upcoming Meeting
        </h3>
      </div>

      {/* Meeting Details */}
      <div className="flex gap-4">
        {/* Calendar */}
        <div className="w-20 h-24 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-semibold text-blue-600 uppercase">
            MAY
          </span>

          <span className="text-[18px] font-bold text-[#142970] mt-1">
            24
          </span>

          <span className="text-[11px] text-slate-500 mt-1">
            SAT
          </span>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          {/* Time + Badge */}
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-blue-600">
              1:30 PM - 2:30 PM
            </span>

            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
              In Person
            </span>
          </div>

          {/* Meeting Title */}
          <h2 className="text-[16px] font-semibold text-[#142970] mt-2">
            Meeting with Dr. Arjun Sharma
          </h2>

          {/* Location */}
          <div className="flex items-center gap-2 mt-2 text-[12px] text-slate-500">
            <MapPin size={14} />
            Faculty Block 2, Room 304
          </div>

          {/* Agenda */}
          <div className="mt-5">
            <p className="text-[12px] font-semibold text-slate-700 mb-2">
              Agenda:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-[12px] text-slate-600">
              <li>Review of Semester V Progress</li>
              <li>Project Update Discussion</li>
              <li>Career Guidance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeeting;