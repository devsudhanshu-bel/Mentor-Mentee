
import React from "react";

import {
  Users,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import MentorStatCard from "./MentorStatCard";

const MentorStats = ({ stats = {} }) => {
  const capacity = stats.maxMentees ?? stats.capacity ?? 0;

  const assigned = stats.studentsAssigned ?? 0;

  const utilization =
    stats.capacityPercentage ?? stats.utilization ?? 0;

  const meetingsConducted =
    stats.meetingsConducted ??
    stats.completedMeetings ??
    stats.totalMeetingsConducted ??
    0;

  const averageAttendance = stats.averageAttendance ?? null;

  const cards = [
    {
      icon: Users,
      value: `${assigned} / ${capacity}`,
      subtitle: "Students Assigned",
      description: `${utilization}% Capacity`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: CalendarDays,
      value: meetingsConducted,
      subtitle: "Meetings Conducted",
      description: "Completed mentor meetings",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: TrendingUp,
      value:
        averageAttendance !== null
          ? `${averageAttendance}%`
          : "—",
      subtitle: "Average Attendance",
      description: "Across assigned students",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid h-full grid-cols-1 sm:grid-cols-3">
        {cards.map((stat, index) => (
          <MentorStatCard
            key={stat.subtitle}
            {...stat}
            border={index !== cards.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default MentorStats;
