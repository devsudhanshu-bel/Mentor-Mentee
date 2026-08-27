import React from "react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentProfileSidebar from "../../../components/Mentors/Students/Sidebar/StudentProfileSidebar";

import AcademicKPICards from "../../../components/Mentors/Students/Academics/AcademicKPICards";
import CGPATrend from "../../../components/Mentors/Students/Academics/CGPATrend";
import GradeDistribution from "../../../components/Mentors/Students/Academics/GradeDistribution";
import SubjectTypePerformance from "../../../components/Mentors/Students/Academics/SubjectTypePerformance";
import SemesterCourseTable from "../../../components/Mentors/Students/Academics/SemesterCourseTable";
import AcademicAlerts from "../../../components/Mentors/Students/Academics/AcademicAlerts";

const Academics = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}
      <MentorSidebar />

      {/* ================= Main Content ================= */}
      <div className="ml-[290px] min-h-screen">
        <MentorHeader />

        <main className="p-6">
          {/* ================= Top Actions ================= */}
          <div className="mb-4 flex items-center justify-between">
            <BackButton />
            <ActionButtons />
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
              <StudentTabs />

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

export default Academics;