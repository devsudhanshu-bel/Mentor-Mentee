import React from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AssignmentBanner from "../../components/Admin/Assignments/AssignmentBanner";
import AssignmentFilters from "../../components/Admin/Assignments/AssignmentFilters";
import AssignmentWorkspace from "../../components/Admin/Assignments/AssignmentWorkspace";

const Assignments = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main Content ================= */}

      <div className="ml-[290px] min-h-screen">
        {/* ================= Header ================= */}

        <AdminHeader />

        {/* ================= Page Content ================= */}

        <main className="p-6">
          <div className="mx-auto flex max-w-[1700px] flex-col gap-6">
            {/* ================= Banner ================= */}

            <AssignmentBanner />

            {/* ================= Filters ================= */}

            <AssignmentFilters />

            {/* ================= Assignment Workspace ================= */}

            <AssignmentWorkspace />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assignments;