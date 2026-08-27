import React from "react";
import {
  Users,
  GraduationCap,
  CalendarDays,
  Target,
  TrendingUp,
} from "lucide-react";

import OverviewStatCard from "./OverviewStatCard";

const ProfileOverview = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-3 flex items-center gap-2">
        <Users size={17} className="text-blue-600" />

        <h2 className="text-base font-semibold text-slate-900">
          Profile Overview
        </h2>
      </div>

      {/* ================= Stats ================= */}
      <div className="grid grid-cols-5 gap-3 items-start">
        <OverviewStatCard
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          value="32"
          title="Mentors"
          subtitle="Under Supervision"
        />

        <OverviewStatCard
          icon={GraduationCap}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          value="642"
          title="Students"
          subtitle="Under Mentors"
        />

        <OverviewStatCard
          icon={CalendarDays}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          value="784"
          title="Meetings"
          subtitle="This Academic Year"
        />

        <OverviewStatCard
          icon={Target}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          value="91%"
          title="Avg. Attendance"
          subtitle="Across All Students"
        />

        <OverviewStatCard
          icon={TrendingUp}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          value="85%"
          title="Goal Completion"
          subtitle="Across All Students"
        />
      </div>
    </div>
  );
};

export default ProfileOverview;