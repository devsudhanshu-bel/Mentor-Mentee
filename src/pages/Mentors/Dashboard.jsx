import React from "react";

import MentorSidebar from "../../components/layouts/MentorSidebar";
import MentorHeader from "../../components/layouts/MentorHeader";

import WelcomeBanner from "../../components/Mentors/Dashboard/WelcomeBanner";
import KPICards from "../../components/Mentors/Dashboard/KPICards";
import TodaysSchedule from "../../components/Mentors/Dashboard/TodaysSchedule";
import StudentsRequiringAttention from "../../components/Mentors/Dashboard/StudentsRequiringAttention";
import RecentActivities from "../../components/Mentors/Dashboard/RecentActivities";
import PendingActions from "../../components/Mentors/Dashboard/PendingActions";
import QuickActions from "../../components/Mentors/Dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen">
        {/* Header */}
        <MentorHeader />

        {/* Dashboard Content */}
        <main className="space-y-2 p-6">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* KPI Cards */}
          <KPICards />

          {/* Today's Schedule & Students Requiring Attention */}
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            <TodaysSchedule />
            <StudentsRequiringAttention />
          </div>

          {/* Recent Activities & Pending Actions */}
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            <RecentActivities />
            <PendingActions />
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;