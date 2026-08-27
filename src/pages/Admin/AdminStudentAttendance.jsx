import React from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AdminBackButton from "../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../components/Admin/Students/Header/AdminStudentTabs";

import StudentInfoCard from "../../components/Mentors/Students/Attendence/StudentInfoCard";

import OverallAttendance from "../../components/Mentors/Students/Attendence/OverallAttendance";
import AttendanceStatistics from "../../components/Mentors/Students/Attendence/AttendanceStatistics";
import AttendanceCategory from "../../components/Mentors/Students/Attendence/AttendanceCategory";

import SubjectAttendanceTable from "../../components/Mentors/Students/Attendence/SubjectAttendanceTable";
import AttendanceCalendar from "../../components/Mentors/Students/Attendence/AttendanceCalendar";
import AttendanceTrend from "../../components/Mentors/Students/Attendence/AttendanceTrend";
import MentorObservations from "../../components/Mentors/Students/Attendence/MentorObservations";
import AttendanceAlerts from "../../components/Mentors/Students/Attendence/AttendanceAlerts";

const AdminStudentAttendance = () => {
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

          {/* ==========================================================
                                FIRST ROW
          ========================================================== */}

          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* ================= Student Profile ================= */}

            <StudentInfoCard />

            {/* ================= Right Section ================= */}

            <div className="flex flex-col gap-2">
              {/* Student Navigation */}

              <AdminStudentTabs />

              {/* KPI Cards */}

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <OverallAttendance />
                </div>

                <div className="col-span-4">
                  <AttendanceStatistics />
                </div>

                <div className="col-span-4">
                  <AttendanceCategory />
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================================
                              SECOND ROW
          ========================================================== */}

          <div className="mt-2 grid grid-cols-13 gap-2">
            <div className="col-span-8">
              <SubjectAttendanceTable />
            </div>

            <div className="col-span-5">
              <AttendanceCalendar />
            </div>
          </div>

          {/* ==========================================================
                               THIRD ROW
          ========================================================== */}

          <div className="mt-2 grid grid-cols-12 gap-2">
            {/* Attendance Trend */}

            <div className="col-span-7">
              <AttendanceTrend />
            </div>

            {/* Mentor Observations */}

            <div className="col-span-3">
              <MentorObservations />
            </div>

            {/* Alerts & Insights */}

            <div className="col-span-2">
              <AttendanceAlerts />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudentAttendance;