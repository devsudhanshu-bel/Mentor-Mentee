import React from "react";
import {
  Users,
  GraduationCap,
 UserCheck,
  UserX,
  CalendarCheck2,
  CalendarClock,
  TrendingUp,
  Target,
} from "lucide-react";

import StatCard from "./StatCard";

const stats = [
  {
    title: "Total Mentors",
    value: "32",
    subtitle: "Across all departments",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Students",
    value: "642",
    subtitle: "Registered students",
    icon: GraduationCap,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Assigned Students",
    value: "628",
    subtitle: "Under mentors",
    icon: UserCheck,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Unassigned Students",
    value: "14",
    subtitle: "Need assignment",
    icon: UserX,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Meetings Conducted",
    value: "784",
    subtitle: "Academic year",
    icon: CalendarCheck2,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    title: "Upcoming Meetings",
    value: "28",
    subtitle: "Next 7 days",
    icon: CalendarClock,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    title: "Average Attendance",
    value: "91%",
    subtitle: "Across students",
    icon: TrendingUp,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Active Goals",
    value: "384",
    subtitle: "In progress",
    icon: Target,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const KPICards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          {...item}
        />
      ))}
    </section>
  );
};

export default KPICards;