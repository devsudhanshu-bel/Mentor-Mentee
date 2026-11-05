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

  // --------------------------------------------------
  // FETCH DASHBOARD DATA
  // --------------------------------------------------

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await dashboardApi.getOverview();

      if (!response || typeof response !== "object") {
        throw new Error(
          "The server returned an invalid dashboard response."
        );
      }

      setDashboardData(response);
    } catch (err) {
      console.error("Failed to load student dashboard:", err);

      setError(
        err.message || "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // --------------------------------------------------
  // STUDENT DETAILS
  // --------------------------------------------------

  const studentName =
    dashboardData?.student?.fullName ??
    dashboardData?.student?.name ??
    "";

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
        className="
          flex
          min-h-screen
          min-w-0
          w-full
          flex-col
          ml-0
          lg:ml-[290px]
          lg:w-[calc(100%-290px)]
        "
      >

        {/* HEADER */}

        <div className="sticky top-0 z-40 w-full min-w-0">
          <Header />
        </div>

        {/* DASHBOARD CONTENT */}

        <main
          className="
            min-w-0
            w-full
            flex-1
            space-y-4
            px-3
            py-4
            sm:px-5
            sm:py-5
            lg:px-6
            lg:py-6
            2xl:px-8
          "
        >

          {/* ERROR MESSAGE */}

          {error && (
            <div
              role="alert"
              className="
                flex
                flex-col
                gap-3
                rounded-xl
                border
                border-red-200
                bg-red-50
                p-4
                text-sm
                text-red-700
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p>{error}</p>

              <button
                type="button"
                onClick={fetchDashboard}
                disabled={loading}
                className="
                  w-fit
                  rounded-lg
                  bg-red-100
                  px-4
                  py-2
                  font-semibold
                  transition
                  hover:bg-red-200
                  disabled:opacity-50
                "
              >
                {loading ? "Retrying..." : "Retry"}
              </button>
            </div>
          )}

          {/* WELCOME BANNER */}

          <DashboardBanner studentName={studentName} />

          {/* KPI CARDS */}

          <KPICards
            dashboardData={dashboardData}
            loading={loading}
          />

          {/* ANALYTICS + ANNOUNCEMENTS */}

          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-4
              md:grid-cols-2
              md:gap-4
              xl:grid-cols-12
              xl:gap-5
            "
          >

            {/* CGPA TREND */}

            <div className="col-span-1 min-w-0 xl:col-span-5">
              <CGPATrend
                dashboardData={dashboardData}
                loading={loading}
              />
            </div>

            {/* ATTENDANCE */}

            <div className="col-span-1 min-w-0 xl:col-span-4">
              <AttendanceOverview
                attendanceData={dashboardData?.attendance}
                loading={loading}
              />
            </div>

            {/* UPCOMING MEETINGS */}

            <div className="col-span-1 min-w-0 xl:col-span-3">
              <UpcomingMeetings />
            </div>

            {/* ANNOUNCEMENTS */}

            <div className="col-span-1 min-w-0 xl:col-span-12">
              <AnnouncementCards compact />
            </div>

          </div>

          {/* QUICK LINKS - STANDALONE */}

          <section className="w-full min-w-0">
            <QuickLinks />
          </section>

        </main>

      </div>
    </div>
  );
};

export default Dashboard;
