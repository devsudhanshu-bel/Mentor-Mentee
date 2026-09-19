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

const formatNumber = (value) => {
  if (value === null || value === undefined) {
    return "—";
  }

  return value.toLocaleString("en-IN");
};

const KPICards = ({ kpis = {}, unsupportedMetrics = {} }) => {
  const stats = [
    {
      title: "Total Mentors",
      value: formatNumber(kpis.totalMentors),
      subtitle: "Active faculty mentors",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      title: "Total Students",
      value: formatNumber(kpis.totalStudents),
      subtitle: "Active students",
      icon: GraduationCap,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },

    {
      title: "Assigned Students",
      value: formatNumber(kpis.assignedStudents),
      subtitle: "Currently under mentors",
      icon: UserCheck,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },

    {
      title: "Unassigned Students",
      value: formatNumber(kpis.unassignedStudents),
      subtitle: "Need mentor assignment",
      icon: UserX,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },

    {
      title: "Meetings Conducted",
      value: unsupportedMetrics.meetings
        ? formatNumber(kpis.meetingsConducted)
        : "—",
      subtitle: unsupportedMetrics.meetings
        ? "Academic year"
        : "Meeting data unavailable",
      icon: CalendarCheck2,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },

    {
      title: "Upcoming Meetings",
      value: unsupportedMetrics.meetings
        ? formatNumber(kpis.upcomingMeetings)
        : "—",
      subtitle: unsupportedMetrics.meetings
        ? "Next 7 days"
        : "Meeting data unavailable",
      icon: CalendarClock,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },

    {
      title: "Average Attendance",
      value:
        kpis.averageAttendance !== null && kpis.averageAttendance !== undefined
          ? `${kpis.averageAttendance}%`
          : "—",
      subtitle: "Across active students",
      icon: TrendingUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },

    {
      title: "Active Goals",
      value: unsupportedMetrics.goals ? formatNumber(kpis.activeGoals) : "—",
      subtitle: unsupportedMetrics.goals
        ? "Currently in progress"
        : "Goal data unavailable",
      icon: Target,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </section>
  );
};

export default KPICards;
