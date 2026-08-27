import React from "react";
import { ChevronRight } from "lucide-react";

import MeetingListItem from "./MeetingListItem";

const meetings = [
  {
    month: "MAY",
    date: "24",
    day: "SAT",
    time: "1:30 PM - 2:30 PM",
    type: "In Person",
    title: "Meeting with Dr. Arjun Mehta",
    location: "Faculty Block 2, Room 304",
    agenda:
      "Agenda: Review of Semester IV progress, Project updates and Career guidance.",
  },
  {
    month: "MAY",
    date: "31",
    day: "SAT",
    time: "11:00 AM - 12:00 PM",
    type: "Recurring",
    title: "Weekly Mentorship Meeting",
    location: "Online (Google Meet)",
    agenda: "Occurs every Saturday",
  },
  {
    month: "JUN",
    date: "07",
    day: "SAT",
    time: "11:00 AM - 12:00 PM",
    type: "Recurring",
    title: "Weekly Mentorship Meeting",
    location: "Online (Google Meet)",
    agenda: "Occurs every Saturday",
  },
  {
    month: "JUN",
    date: "14",
    day: "SAT",
    time: "11:00 AM - 12:00 PM",
    type: "Recurring",
    title: "Weekly Mentorship Meeting",
    location: "Online (Google Meet)",
    agenda: "Occurs every Saturday",
  },
];

const UpcomingMeetings = ({
  onStartMeeting = () => {},
}) => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-slate-800">
          Upcoming Meetings
        </h2>

        <button className="flex cursor-pointer items-center gap-1 text-[12px] font-semibold text-blue-600 transition hover:text-blue-700">
          View Calendar
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Meeting List */}
      <div className="space-y-2.5">
        {meetings.map((meeting, index) => (
          <MeetingListItem
            key={index}
            meeting={meeting}
            onStartMeeting={onStartMeeting}
          />
        ))}
      </div>

      {/* Footer */}
      <button className="mt-4 flex w-full cursor-pointer items-center justify-center text-[12px] font-semibold text-blue-600 transition hover:text-blue-700">
        View All Upcoming Meetings
      </button>
    </div>
  );
};

export default UpcomingMeetings;