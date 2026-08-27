import React, { useState } from "react";

import RecentMeetingItem from "./RecentMeetingItem";
import MeetingSummaryModal from "./MeetingSummaryModal";

const meetings = [
  {
    month: "MAY",
    date: "10",
    day: "SAT",
    title: "Progress Review Meeting",
    time: "1:00 PM - 2:00 PM",
    notes: "Mid semester performance, Assignment updates",

    student: {
      name: "Sudhanshu Sharma",
      registrationNumber: "22BCS001",
      department: "Computer Science & Engineering",
      year: "3rd Year • Semester 6",
      email: "sudhanshu@example.com",
      phone: "+91 9876543210",
      mentor: "Dr. Arjun Mehta",
    },

    summary: {
      outcome: "Good",
      participation: 5,
      preparedness: 4,
      communication: 5,
      overallRating: 5,
      followUpRequired: true,
      nextMeeting: "07 Jun 2026 • 11:00 AM",
    },
  },

  {
    month: "APR",
    date: "26",
    day: "SAT",
    title: "Project Discussion",
    time: "11:30 AM - 12:30 PM",
    notes: "Project idea, Problem statement finalization",

    student: {
      name: "Sudhanshu Sharma",
      registrationNumber: "22BCS001",
      department: "Computer Science & Engineering",
      year: "3rd Year • Semester 6",
      email: "sudhanshu@example.com",
      phone: "+91 9876543210",
      mentor: "Dr. Arjun Mehta",
    },

    summary: {
      outcome: "Excellent",
      participation: 5,
      preparedness: 5,
      communication: 5,
      overallRating: 5,
      followUpRequired: false,
      nextMeeting: "Not Scheduled",
    },
  },

  {
    month: "APR",
    date: "12",
    day: "SAT",
    title: "Career Guidance Session",
    time: "2:00 PM - 3:00 PM",
    notes: "Higher studies, Career roadmap",

    student: {
      name: "Sudhanshu Sharma",
      registrationNumber: "22BCS001",
      department: "Computer Science & Engineering",
      year: "3rd Year • Semester 6",
      email: "sudhanshu@example.com",
      phone: "+91 9876543210",
      mentor: "Dr. Arjun Mehta",
    },

    summary: {
      outcome: "Very Good",
      participation: 4,
      preparedness: 4,
      communication: 5,
      overallRating: 4,
      followUpRequired: true,
      nextMeeting: "20 Jul 2026 • 2:00 PM",
    },
  },

  {
    month: "MAR",
    date: "28",
    day: "SAT",
    title: "Initial Meeting",
    time: "10:30 AM - 11:30 AM",
    notes: "Introduction, Goals and expectations",

    student: {
      name: "Sudhanshu Sharma",
      registrationNumber: "22BCS001",
      department: "Computer Science & Engineering",
      year: "3rd Year • Semester 6",
      email: "sudhanshu@example.com",
      phone: "+91 9876543210",
      mentor: "Dr. Arjun Mehta",
    },

    summary: {
      outcome: "Good",
      participation: 4,
      preparedness: 4,
      communication: 4,
      overallRating: 4,
      followUpRequired: true,
      nextMeeting: "10 Apr 2026 • 10:30 AM",
    },
  },
];

const RecentMeetings = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openSummary, setOpenSummary] = useState(false);

  const handleOpenSummary = (meeting) => {
    setSelectedMeeting(meeting);
    setOpenSummary(true);
  };

  const handleCloseSummary = () => {
    setOpenSummary(false);
    setSelectedMeeting(null);
  };

  return (
    <>
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-slate-800">
            Recent Meetings
          </h2>

          <button className="cursor-pointer text-[12px] font-semibold text-blue-600 transition hover:text-blue-700">
            View All
          </button>
        </div>

        {/* List */}
        <div className="space-y-2.5">
          {meetings.map((meeting, index) => (
            <RecentMeetingItem
              key={index}
              meeting={meeting}
              onView={handleOpenSummary}
            />
          ))}
        </div>
      </div>

      <MeetingSummaryModal
        open={openSummary}
        onClose={handleCloseSummary}
        meeting={selectedMeeting}
      />
    </>
  );
};

export default RecentMeetings;