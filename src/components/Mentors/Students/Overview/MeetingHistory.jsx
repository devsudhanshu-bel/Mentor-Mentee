import React from "react";
import {
  CalendarDays,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const meetings = [
  {
    id: 1,
    date: "10 May 2025",
    title: "Monthly Progress Review",
    remarks: "Discussed academic improvement and internship preparation.",
  },
  {
    id: 2,
    date: "12 Apr 2025",
    title: "Attendance Discussion",
    remarks: "Reviewed attendance shortage and improvement plan.",
  },
  {
    id: 3,
    date: "08 Mar 2025",
    title: "Career Guidance",
    remarks: "Provided roadmap for placements and certifications.",
  },
];

const MeetingHistory = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Meeting History
        </h3>

        <button className="text-[11px] font-medium text-blue-600 hover:text-blue-700 transition">
          View All
        </button>
      </div>

      {/* ================= Meetings ================= */}
      <div className="flex-1 space-y-3">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="rounded-lg border border-slate-100 p-3"
          >
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <CalendarDays size={12} />
              <span>{meeting.date}</span>
            </div>

            <h4 className="mt-2 text-[12px] font-semibold text-slate-800">
              {meeting.title}
            </h4>

            <div className="mt-2 flex gap-2">
              <MessageSquare
                size={13}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <p className="text-[10px] leading-5 text-slate-600">
                {meeting.remarks}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Footer ================= */}
      <button className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 transition">
        View Complete History
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default MeetingHistory;