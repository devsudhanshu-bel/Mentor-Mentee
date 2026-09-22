import React from "react";

import { Users, CalendarDays, TrendingUp, Target } from "lucide-react";

import MentorStatCard from "./MentorStatCard";

const MentorStats = ({ stats = {} }) => {
  const capacity = stats.capacity || 0;

  const assigned = stats.studentsAssigned || 0;

  const utilization = stats.utilization ?? 0;

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

      value: stats.meetingsConducted ?? "—",

      subtitle: "Meetings Conducted",

      description:
        stats.meetingsConducted !== null
          ? "This Academic Year"
          : "Meeting data unavailable",

      color: "text-emerald-600",

      bg: "bg-emerald-50",
    },

    {
      icon: TrendingUp,

      value:
        stats.averageAttendance !== null &&
        stats.averageAttendance !== undefined
          ? `${stats.averageAttendance}%`
          : "—",

      subtitle: "Average Attendance",

      description: "Across assigned students",

      color: "text-violet-600",

      bg: "bg-violet-50",
    },

    {
      icon: Target,

      value: stats.goalCompletion ?? "—",

      subtitle: "Goal Completion",

      description: "Goal data unavailable",

      color: "text-orange-600",

      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid h-full grid-cols-2 xl:grid-cols-4">
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
