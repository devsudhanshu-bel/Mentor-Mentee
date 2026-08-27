import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react";

const meetings = [
  {
    time: "10:00",
    period: "AM",
    title: "Mentoring Meeting",
    student: "Aarav Sharma",
    location: "Room 405, Block IV",
    status: "Upcoming",
  },
  {
    time: "11:30",
    period: "AM",
    title: "Project Discussion",
    student: "Diya Nair",
    location: "Lab 3, Block V",
    status: "Upcoming",
  },
  {
    time: "02:00",
    period: "PM",
    title: "Career Guidance",
    student: "Rohan Verma",
    location: "Seminar Hall 2",
    status: "Upcoming",
  },
];

const TodaysSchedule = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-blue-600" />
          <h2 className="text-[16px] font-semibold text-slate-800">
            Today's Schedule
          </h2>
        </div>

        <button className="text-xs font-medium text-blue-600 transition hover:text-blue-700">
          View Calendar
        </button>
      </div>

      {/* Meetings */}
      <div className="space-y-4">
        {meetings.map((meeting, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-none last:pb-0"
          >
            {/* Time */}
            <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50">
              <span className="text-[13px] font-bold text-blue-700">
                {meeting.time}
              </span>

              <span className="text-[10px] font-medium uppercase text-slate-500">
                {meeting.period}
              </span>
            </div>

            {/* Meeting Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-slate-800">
                  {meeting.title}
                </h3>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
                  {meeting.status}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1 text-[12px] text-slate-500">
                <User size={12} />
                {meeting.student}
              </div>

              <div className="mt-1 flex items-center gap-1 text-[12px] text-slate-500">
                <MapPin size={12} />
                {meeting.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="mt-5 flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-700">
        + 1 more meeting today
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default TodaysSchedule;