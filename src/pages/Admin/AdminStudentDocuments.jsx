import React from "react";
import {
  FileText,
  FolderOpen,
  CalendarDays,
  Files,
} from "lucide-react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AdminBackButton from "../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../components/Admin/Students/Header/AdminStudentTabs";

import StudentProfileSidebar from "../../components/Mentors/Students/Sidebar/StudentProfileSidebar";

import DocumentStatCard from "../../components/Mentors/Students/Documents/DocumentStatCard";
import StudentDocumentsTable from "../../components/Mentors/Students/Documents/DocumentsTable/StudentDocumentsTable";
import MentorNote from "../../components/Mentors/Students/Documents/MentorNote";

const AdminStudentDocuments = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main ================= */}

      <div className="ml-[290px] min-h-screen">
        {/* ================= Header ================= */}

        <AdminHeader />

        {/* ================= Content ================= */}

        <main className="p-6">
          {/* ================= Top Header ================= */}

          <div className="mb-4">
            <AdminBackButton />
          </div>

          {/* ================= Dashboard Layout ================= */}

          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* ================= Left Sidebar ================= */}

            <div className="flex flex-col gap-2">
              <StudentProfileSidebar />
            </div>

            {/* ================= Right Content ================= */}

            <div className="flex flex-col gap-2">
              {/* ================= Student Tabs ================= */}

              <AdminStudentTabs />

              {/* ================= KPI Cards ================= */}

              <div className="grid grid-cols-4 gap-2">
                <DocumentStatCard
                  icon={FileText}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Total Documents"
                  value="27"
                  subtitle="All documents uploaded"
                />

                <DocumentStatCard
                  icon={FolderOpen}
                  iconBg="bg-green-100"
                  iconColor="text-green-600"
                  title="Total Categories"
                  value="8"
                  subtitle="Different categories"
                />

                <DocumentStatCard
                  icon={CalendarDays}
                  iconBg="bg-orange-100"
                  iconColor="text-orange-600"
                  title="Recently Added"
                  value="5"
                  subtitle="In the last 7 days"
                />

                <DocumentStatCard
                  icon={Files}
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                  title="Total Files"
                  value="27"
                  subtitle="Across all categories"
                />
              </div>

              {/* ================= Student Documents ================= */}

              <StudentDocumentsTable />

              {/* ================= Mentor Note ================= */}

              <MentorNote />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudentDocuments;