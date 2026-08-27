import React from "react";
import { Clock3, MapPin } from "lucide-react";

const meetings = [
  {
    month: "MAY",
    day: "16",
    title: "Mentor Meeting",
    time: "11:00 AM - 12:00 PM",
    location: "Room 405, Block IV",
    status: "Upcoming",
  },
  {
    month: "MAY",
    day: "28",
    title: "Career Guidance Session",
    time: "02:00 PM - 03:00 PM",
    location: "Seminar Hall 2",
    status: "Upcoming",
  },
  {
    month: "JUN",
    day: "05",
    title: "Project Review",
    time: "10:30 AM - 12:00 PM",
    location: "Lab 3, Block V",
    status: "Upcoming",
  },
];

const UpcomingMeetings = () => {
  return (
    <div className="bg-white rounded-[22px] border border-gray-200 shadow-sm p-3 h-[300px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[16px] font-bold text-slate-900">
          Upcoming Meetings
        </h2>

        <button className="text-[11px] font-semibold text-[#1677FF] hover:underline">
          View Calendar
        </button>
      </div>

      {/* Meeting List */}
      <div className="flex flex-col flex-1 justify-between">
        {meetings.map((meeting, index) => (
          <div
            key={index}
            className={`flex justify-between items-start py-2 ${
              index !== meetings.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            {/* Left Side */}
            <div className="flex gap-2.5">
              {/* Date */}
              <div className="w-10 h-12 rounded-lg border border-blue-200 bg-blue-50 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold tracking-wide text-[#1677FF] leading-none">
                  {meeting.month}
                </span>

                <span className="text-[15px] font-bold text-slate-900 leading-none mt-1">
                  {meeting.day}
                </span>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-[12px] font-semibold text-slate-900 leading-5">
                  {meeting.title}
                </h3>

                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                  <Clock3 size={10} strokeWidth={2} />
                  <span>{meeting.time}</span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                  <MapPin size={10} strokeWidth={2} />
                  <span>{meeting.location}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1677FF] text-[9px] font-semibold whitespace-nowrap">
              {meeting.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeetings;