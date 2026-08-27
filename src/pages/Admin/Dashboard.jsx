import React from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import DashboardBanner from "../../components/Admin/Dashboard/DashboardBanner";
import KPICards from "../../components/Admin/Dashboard/KPICards";
import StudentsPerMentor from "../../components/Admin/Dashboard/StudentsPerMentor";
import MentorWorkloadOverview from "../../components/Admin/Dashboard/MentorWorkloadOverview";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}
      <AdminSidebar />

      {/* ================= Main Content ================= */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* ================= Header ================= */}
        <AdminHeader />

        {/* ================= Dashboard Content ================= */}
        <main className="flex-1 px-6 py-6 space-y-5">
          {/* ================= Welcome Banner ================= */}
          <DashboardBanner />

          {/* ================= KPI Cards ================= */}
          <KPICards />

          {/* ================= Analytics Section ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* ================= Students Per Mentor ================= */}
            <div className="xl:col-span-4">
              <StudentsPerMentor />
            </div>

            {/* ================= Mentor Workload Overview ================= */}
            <div className="xl:col-span-8">
              <MentorWorkloadOverview />
            </div>
          </div>

          {/* ================= Bottom Section ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* Recent Activities */}
            <div className="xl:col-span-4">
              {/* Coming Next */}
            </div>

            {/* Academic Year Summary */}
            <div className="xl:col-span-8">
              {/* Coming Next */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;