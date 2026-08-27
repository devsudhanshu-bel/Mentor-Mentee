import React, { useState } from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import MentorDetailsHeader from "../../components/Admin/MentorDetails/MentorDetailsHeader";
import MentorProfileCard from "../../components/Admin/MentorDetails/MentorProfileCard";
import MentorStats from "../../components/Admin/MentorDetails/MentorStats";
import MentorTabs from "../../components/Admin/MentorDetails/MentorTabs";

import StudentsTab from "../../components/Admin/MentorDetails/Students/StudentsTab";

const MentorDetails = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main Content ================= */}

      <div className="ml-[290px] flex min-h-screen flex-col">
        {/* ================= Header ================= */}

        <AdminHeader />

        {/* ================= Page Content ================= */}

        <main className="flex-1 space-y-5 px-6 py-5">
          {/* ================= Page Header ================= */}

          <MentorDetailsHeader />

          {/* ================= Mentor Profile + Statistics ================= */}

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
            {/* Left Profile */}

            <div className="xl:col-span-4">
              <MentorProfileCard />
            </div>

            {/* Right Statistics */}

            <div className="xl:col-span-8">
              <MentorStats />
            </div>
          </div>

          {/* ================= Tabs ================= */}

          <MentorTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* ================= Tab Content ================= */}

          {activeTab === "overview" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
              Overview content coming soon...
            </div>
          )}

          {activeTab === "students" && <StudentsTab />}

          {activeTab === "meetings" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
              Meetings module coming soon...
            </div>
          )}

          {activeTab === "reports" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
              Reports module coming soon...
            </div>
          )}

          {activeTab === "documents" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
              Documents module coming soon...
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MentorDetails;