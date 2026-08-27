import React from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import DashboardBanner from "../components/Dashboard/DashboardBanner";
import KPICards from "../components/Dashboard/KPICards";
import CGPATrend from "../components/Dashboard/CGPATrend";
import AttendanceOverview from "../components/Dashboard/AttendanceOverview";
import UpcomingMeetings from "../components/Dashboard/UpcomingMeetings";
import RecentNotifications from "../components/Dashboard/RecentNotifications";
import TasksOverview from "../components/Dashboard/TasksOverview";
import QuickLinks from "../components/Dashboard/QuickLinks";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 px-4 py-4 space-y-4">
          {/* Welcome Banner */}
          <DashboardBanner />

          {/* KPI Cards */}
          <KPICards />

          {/* ================= Row 2 ================= */}
          <div className="grid grid-cols-12 gap-4">
            {/* CGPA Trend */}
            <div className="col-span-12 xl:col-span-5">
              <CGPATrend />
            </div>

            {/* Attendance Overview */}
            <div className="col-span-12 xl:col-span-4">
              <AttendanceOverview />
            </div>

            {/* Upcoming Meetings */}
            <div className="col-span-12 xl:col-span-3">
              <UpcomingMeetings />
            </div>
          </div>

          {/* ================= Row 3 ================= */}
          <div className="grid grid-cols-12 gap-4">
            {/* Recent Notifications */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-4">
              <RecentNotifications />
            </div>

            {/* Tasks Overview */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-4">
              <TasksOverview />
            </div>

            {/* Quick Links */}
            <div className="col-span-12 xl:col-span-4">
              <QuickLinks />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;