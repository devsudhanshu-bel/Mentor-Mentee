import React from "react";

import MentorSidebar from "../../components/layouts/MentorSidebar";
import MentorHeader from "../../components/layouts/MentorHeader";

import WelcomeBanner from "../../components/Mentors/Dashboard/WelcomeBanner";
import KPICards from "../../components/Mentors/Dashboard/KPICards";
import TodaysSchedule from "../../components/Mentors/Dashboard/TodaysSchedule";
import UpcomingDeadlines from "../../components/Mentors/Dashboard/UpcomingDeadlines";
import QuickActions from "../../components/Mentors/Dashboard/QuickActions";
import MentoringAttendancePanel from "../../components/Mentors/Dashboard/MentoringAttendancePanel";
import MentorAnnouncementsCard from "../../components/Mentors/Dashboard/MentorAnnouncementsCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div className="ml-0 min-h-screen w-full min-w-0 lg:ml-[290px]">
        {/* Header */}
        <MentorHeader />

        {/* Dashboard Content */}
        <main className="w-full min-w-0 space-y-3 p-3 sm:space-y-4 sm:p-4 md:p-5 lg:space-y-5 lg:p-6">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* KPI Cards */}
          <KPICards />

          {/* Today's Schedule & Upcoming Deadlines */}
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-2">
            <TodaysSchedule />
            <UpcomingDeadlines />
          </div>

          {/* Recent announcements card; no separate announcements page or sidebar item. */}
          <MentorAnnouncementsCard />

          {/* Mentoring attendance is embedded in this existing dashboard. */}
          <MentoringAttendancePanel />

          {/* Quick Actions */}
          <QuickActions />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
