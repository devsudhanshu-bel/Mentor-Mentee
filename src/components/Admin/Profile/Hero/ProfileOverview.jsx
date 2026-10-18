import React from "react";
import {
  Users,
  GraduationCap,
  CalendarDays,
  Target,
} from "lucide-react";

import OverviewStatCard from "./OverviewStatCard";

const ProfileOverview = ({
  stats = {},
  loading = false,
}) => {
  const overviewStats = [
    {
      key: "mentors",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      value: stats.mentors ?? 0,
      title: "Mentors",
      subtitle: "Under Supervision",
    },
    {
      key: "students",
      icon: GraduationCap,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      value: stats.students ?? 0,
      title: "Students",
      subtitle: "Under Mentors",
    },
    {
      key: "meetings",
      icon: CalendarDays,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      value: stats.meetings ?? 0,
      title: "Meetings",
      subtitle: "Completed Across All Mentors",
    },
    {
      key: "attendance",
      icon: Target,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      value:
        stats.attendance == null
          ? "—"
          : `${stats.attendance}%`,
      title: "Avg. Attendance",
      subtitle: "Across All Students",
    },
  ];

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <Users size={19} className="text-blue-600" />

        <h2 className="text-base font-semibold text-slate-900">
          Profile Overview
        </h2>
      </div>

      {/* Four Overview Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {overviewStats.map((stat) => (
          <OverviewStatCard
            key={stat.key}
            icon={stat.icon}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
            value={stat.value}
            title={stat.title}
            subtitle={stat.subtitle}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileOverview;