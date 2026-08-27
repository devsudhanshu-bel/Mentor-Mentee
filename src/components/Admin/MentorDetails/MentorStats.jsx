import React from "react";
import {
  Users,
  CalendarDays,
  TrendingUp,
  Target,
} from "lucide-react";

import MentorStatCard from "./MentorStatCard";

const stats = [
  {
    icon: Users,
    value: "24 / 30",
    subtitle: "Students Assigned",
    description: "80% Capacity",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: CalendarDays,
    value: "18",
    subtitle: "Meetings Conducted",
    description: "This Academic Year",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: TrendingUp,
    value: "92%",
    subtitle: "Average Attendance",
    description: "Across all students",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Target,
    value: "85%",
    subtitle: "Goal Completion",
    description: "Across all students",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const MentorStats = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid h-full grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <MentorStatCard
            key={stat.subtitle}
            {...stat}
            border={index !== stats.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default MentorStats;