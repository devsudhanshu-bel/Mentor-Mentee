import React, { useCallback, useEffect, useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import DashboardBanner from "../components/Dashboard/DashboardBanner";
import KPICards from "../components/Dashboard/KPICards";
import CGPATrend from "../components/Dashboard/CGPATrend";
import AttendanceOverview from "../components/Dashboard/AttendanceOverview";
import UpcomingMeetings from "../components/Dashboard/UpcomingMeetings";
import QuickLinks from "../components/Dashboard/QuickLinks";

import dashboardApi from "../api/dashboard.api";
import AnnouncementCards from "../components/Announcements/AnnouncementCards";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await dashboardApi.getOverview();

      if (!response || typeof response !== "object") {
        throw new Error("The server returned an invalid dashboard response.");
      }

      setDashboardData(response);
    } catch (err) {
      console.error("Failed to load student dashboard:", err);
      setError(err.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const studentName =
    dashboardData?.student?.fullName ??
    dashboardData?.student?.name ??
    "";

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-[290px] min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 px-4 py-4 space-y-4">
          {/* Dashboard loading/error feedback */}
          {error && (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>

              <button
                type="button"
                onClick={fetchDashboard}
                disabled={loading}
                className="w-fit rounded-lg bg-red-100 px-4 py-2 font-semibold hover:bg-red-200 disabled:opacity-50"
              >
                {loading ? "Retrying..." : "Retry"}
              </button>
            </div>
          )}

          {/* Welcome Banner */}
          <DashboardBanner studentName={studentName} />

          {/* KPI Cards */}
          <KPICards
            dashboardData={dashboardData}
            loading={loading}
          />

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 xl:col-span-5">
              <CGPATrend
                dashboardData={dashboardData}
                loading={loading}
              />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <AttendanceOverview
                attendanceData={dashboardData?.attendance}
                loading={loading}
              />
            </div>

            <div className="col-span-12 xl:col-span-3">
              <UpcomingMeetings />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-6 xl:col-span-4">
              <AnnouncementCards compact />
            </div>

            <div className="col-span-12 xl:col-span-8">
              <QuickLinks />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;