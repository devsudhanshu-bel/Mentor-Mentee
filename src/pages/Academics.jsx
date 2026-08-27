import React from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import AcademicBanner from "../components/Academics/AcademicBanner";
import AcademicInfo from "../components/Academics/AcademicInfo";
import SemesterTable from "../components/Academics/SemesterTable";

import SemesterSummary from "../components/Academics/SemesterSummary";
import GradeDistribution from "../components/Academics/GradeDistribution";
import AttendanceOverview from "../components/Academics/AttendanceOverview";
import PerformanceInsights from "../components/Academics/PerformanceInsights";

import SGPATrend from "../components/Academics/SGPATrend";
import SubjectsChart from "../components/Academics/SubjectsChart";

const Academics = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 px-4 py-4 space-y-5">
          {/* Banner */}
          <AcademicBanner />

          {/* Academic Information */}
          <AcademicInfo />

          {/* ================= Main Layout ================= */}
          <div className="grid grid-cols-12 gap-4 items-start">
            {/* ================= LEFT ================= */}
            <div className="col-span-12 xl:col-span-9 space-y-4">
              {/* Semester Table */}
              <SemesterTable />

              {/* Bottom Charts */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 lg:col-span-6">
                  <SGPATrend />
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <SubjectsChart />
                </div>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="col-span-12 xl:col-span-3 space-y-4">
              <SemesterSummary />

              <GradeDistribution />

              <AttendanceOverview />

              <PerformanceInsights />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Academics;