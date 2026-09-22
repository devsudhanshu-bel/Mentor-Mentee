import React, { useEffect, useState } from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import DashboardBanner from "../../components/Admin/Dashboard/DashboardBanner";
import KPICards from "../../components/Admin/Dashboard/KPICards";
import StudentsPerMentor from "../../components/Admin/Dashboard/StudentsPerMentor";
import MentorWorkloadOverview from "../../components/Admin/Dashboard/MentorWorkloadOverview";

import { getAdminDashboardOverview } from "../../api/dashboard.api";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboardOverview();

        if (mounted) {
          setDashboard(data);
        }
      } catch (err) {
        console.error("Failed to load admin dashboard:", err);

        if (mounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load dashboard.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const kpis = dashboard?.kpis || {};

  const mentors = dashboard?.mentorWorkload || [];

  const unsupportedMetrics = dashboard?.unsupportedMetrics || {
    meetings: false,
    goals: false,
  };

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

          {/* ================= Error ================= */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ================= KPI Cards ================= */}

          {loading ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-[88px] rounded-xl bg-white border border-slate-200 animate-pulse"
                />
              ))}
            </section>
          ) : (
            <KPICards kpis={kpis} unsupportedMetrics={unsupportedMetrics} />
          )}

          {/* ================= Analytics Section ================= */}

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* ================= Students Per Mentor ================= */}

            <div className="xl:col-span-4">
              {loading ? (
                <div className="h-[420px] rounded-3xl bg-white border border-slate-200 animate-pulse" />
              ) : (
                <StudentsPerMentor mentors={mentors} />
              )}
            </div>

            {/* ================= Mentor Workload ================= */}

            <div className="xl:col-span-8">
              {loading ? (
                <div className="h-[420px] rounded-3xl bg-white border border-slate-200 animate-pulse" />
              ) : (
                <MentorWorkloadOverview mentors={mentors} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
