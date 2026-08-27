import React from "react";
import { Plus } from "lucide-react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import MentorKPICards from "../../components/Admin/Mentors/MentorKPICards";
import MentorTableFilters from "../../components/Admin/Mentors/MentorTableFilters";
import MentorTable from "../../components/Admin/Mentors/MentorTable";

const Mentors = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}
      <AdminSidebar />

      {/* ================= Main Content ================= */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* ================= Header ================= */}
        <AdminHeader />

        {/* ================= Page Content ================= */}
        <main className="flex-1 px-6 py-5 space-y-5">
          {/* ================= Page Header ================= */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-slate-900">
                Mentors
              </h1>

              <p className="text-sm text-slate-500">
                View and manage all mentors across the institution.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <Plus size={18} />
              <span>Add Mentor</span>
            </button>
          </div>

          {/* ================= KPI Cards ================= */}
          <MentorKPICards />

          {/* ================= Filters ================= */}
          <MentorTableFilters />

          {/* ================= Mentor Table ================= */}
          <MentorTable />
        </main>
      </div>
    </div>
  );
};

export default Mentors;