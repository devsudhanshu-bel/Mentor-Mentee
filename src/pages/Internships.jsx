
import React, { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import InternshipStats from "../components/Internships/InternshipStats";
import ActionRequired from "../components/Internships/ActionRequired";
import CurrentInternship from "../components/Internships/CurrentInternship";
import RequiredDocuments from "../components/Internships/RequiredDocuments";
import InternshipHistory from "../components/Internships/InternshipHistory";
import NewInternshipModal from "../components/Internships/NewInternshipModal";
import InternshipDetailsModal from "../components/Internships/InternshipDetailsModal";

import internshipService from "../services/internshipService";

const Internships = () => {
  const [dashboard, setDashboard] = useState({
    internships: [],
    current: [],
    history: [],
    pendingVerifications: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const loadInternships = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await internshipService.getMine();

      if (response?.success === false) {
        throw new Error(
          response.message || "Failed to fetch internships."
        );
      }

      const payload = response?.data ?? response;

      const internships = Array.isArray(payload?.internships)
        ? payload.internships
        : [];

      const current = Array.isArray(payload?.current)
        ? payload.current
        : [];

      const history = Array.isArray(payload?.history)
        ? payload.history
        : [];

      const pendingVerifications = Array.isArray(
        payload?.pendingVerifications
      )
        ? payload.pendingVerifications
        : [];

      setDashboard({
        internships,
        current,
        history,
        pendingVerifications,
      });

      // Keep an open details modal synchronized with refreshed API data.
      setSelectedInternship((previous) => {
        if (!previous) return null;

        return (
          internships.find((item) => item.id === previous.id) ||
          previous
        );
      });
    } catch (err) {
      setError(err.message || "Unable to load internships.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInternships();
  }, [loadInternships]);

  const handleCreated = async () => {
    setShowNewModal(false);
    await loadInternships();
  };

  const currentInternship =
    dashboard.current[0] ||
    dashboard.internships.find(
      (item) =>
        item.status === "ONGOING" ||
        item.status === "PENDING_INITIAL_VERIFICATION" ||
        item.status === "PENDING_COMPLETION_VERIFICATION"
    ) ||
    null;

  const openInternship = (internship) => {
    setSelectedInternship(internship);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-[290px] flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 space-y-5 px-4 py-5 lg:px-6">
          {/* Page header */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#142970]">
                Internships
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your internship experience and track your journey.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={loadInternships}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <button
                type="button"
                onClick={() => setShowNewModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <Plus size={18} />
                New Internship
              </button>
            </div>
          </section>

          {/* API error */}
          {error && (
            <section
              role="alert"
              className="flex flex-col justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <h2 className="font-semibold text-red-800">
                  Could not load internships
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={loadInternships}
                className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                Try again
              </button>
            </section>
          )}

          {loading && dashboard.internships.length === 0 ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* Internship statistics */}
              <InternshipStats
                internships={dashboard.internships}
              />

              {/* Items requiring student action */}
              <ActionRequired
                internships={dashboard.internships}
                onUpload={openInternship}
                onRefresh={loadInternships}
              />

              {/* Current internship and required documents */}
              <section className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
                <div className="min-w-0">
                  <CurrentInternship
                    internship={currentInternship}
                    onView={openInternship}
                  />
                </div>

                <div className="min-w-0">
                  <RequiredDocuments
                    internship={currentInternship}
                  />
                </div>
              </section>

              {/* Internship history */}
              <InternshipHistory
                internships={dashboard.history}
                allInternships={dashboard.internships}
                onView={openInternship}
              />
            </>
          )}
        </main>
      </div>

      {/* Create internship */}
      {showNewModal && (
        <NewInternshipModal
          onClose={() => setShowNewModal(false)}
          onCreated={handleCreated}
        />
      )}

      {/* Internship details and document workflow */}
      {selectedInternship && (
        <InternshipDetailsModal
          internship={selectedInternship}
          onClose={() => setSelectedInternship(null)}
          onRefresh={loadInternships}
        />
      )}
    </div>
  );
};

function DashboardSkeleton() {
  return (
    <div
      className="space-y-5"
      aria-label="Loading internships"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl bg-white" />
        <div className="h-80 animate-pulse rounded-2xl bg-white" />
      </div>

      <div className="h-64 animate-pulse rounded-2xl bg-white" />
    </div>
  );
}

export default Internships;
