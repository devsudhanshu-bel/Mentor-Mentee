import React from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AdminBackButton from "../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../components/Admin/Students/Header/AdminStudentTabs";

import StudentProfileSidebar from "../../components/Mentors/Students/Sidebar/StudentProfileSidebar";

import AcademicKPICards from "../../components/Mentors/Students/Academics/AcademicKPICards";
import CGPATrend from "../../components/Mentors/Students/Academics/CGPATrend";
import GradeDistribution from "../../components/Mentors/Students/Academics/GradeDistribution";
import SubjectTypePerformance from "../../components/Mentors/Students/Academics/SubjectTypePerformance";
import SemesterCourseTable from "../../components/Mentors/Students/Academics/SemesterCourseTable";
import AcademicAlerts from "../../components/Mentors/Students/Academics/AcademicAlerts";

const AdminStudentAcademics = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}
      <AdminSidebar />

      {/* ================= Main Content ================= */}
      <div className="ml-[290px] min-h-screen">
        <AdminHeader />

        <main className="p-6">
          {/* ================= Header ================= */}
          <div className="mb-4">
            <AdminBackButton />
          </div>

          {/* ================= Dashboard ================= */}
          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* ================= Left Column ================= */}
            <div className="flex flex-col gap-2">
              <StudentProfileSidebar />
            </div>

            {/* ================= Right Column ================= */}
            <div className="flex flex-col gap-2">
              {/* Tabs */}
              <AdminStudentTabs />

              {/* KPI Cards */}
              <AcademicKPICards />

              {/* ================= Analytics ================= */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">
                  <CGPATrend />
                </div>

                <div className="col-span-3">
                  <GradeDistribution />
                </div>

                <div className="col-span-4">
                  <SubjectTypePerformance />
                </div>
              </div>

              {/* ================= Semester Details ================= */}
              <div className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-9">
                  <SemesterCourseTable />
                </div>

                <div className="col-span-3">
                  <AcademicAlerts />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudentAcademics;