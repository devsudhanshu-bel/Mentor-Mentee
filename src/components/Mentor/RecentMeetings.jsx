import React from "react";
import {
  Clock3,
  FileText,
} from "lucide-react";

const meetings = [
  {
    month: "MAY",
    day: "10",
    title: "Progress Review Meeting",
    time: "1:00 PM - 2:00 PM",
    topic: "Mid semester performance, Assignment updates",
  },
  {
    month: "APR",
    day: "26",
    title: "Project Discussion",
    time: "11:30 AM - 12:30 PM",
    topic: "Project idea, Problem statement finalization",
  },
  {
    month: "APR",
    day: "12",
    title: "Career Guidance Session",
    time: "2:00 PM - 3:00 PM",
    topic: "Higher studies, Career roadmap",
  },
  {
    month: "MAR",
    day: "28",
    title: "Initial Meeting",
    time: "10:30 AM - 11:30 AM",
    topic: "Introduction, Goals and expectations",
  },
];

const RecentMeetings = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-blue-600">
          Recent Meetings
        </h3>

        <button className="text-[12px] font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      {/* Meeting List */}
      <div className="space-y-2">
        {meetings.map((meeting, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg p-3 flex items-center justify-between hover:bg-slate-50 transition"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              {/* Date */}
              <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-semibold text-slate-500">
                  {meeting.month}
                </span>

                <span className="text-[16px] font-bold text-[#142970] leading-none">
                  {meeting.day}
                </span>
              </div>

              {/* Meeting Info */}
              <div className="min-w-[220px]">
                <h4 className="text-[13px] font-semibold text-[#142970]">
                  {meeting.title}
                </h4>

                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                  <Clock3 size={12} />
                  {meeting.time}
                </div>
              </div>

              {/* Discussion */}
              <div className="hidden lg:block">
                <p className="text-[12px] font-semibold text-slate-600">
                  Discussed about:
                </p>

                <p className="text-[11px] text-slate-500 mt-1">
                  {meeting.topic}
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="flex items-center gap-2 border border-blue-500 text-blue-600 rounded-lg px-4 py-2 text-[12px] font-medium hover:bg-blue-50 transition">
              <FileText size={14} />
              View Notes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMeetings;