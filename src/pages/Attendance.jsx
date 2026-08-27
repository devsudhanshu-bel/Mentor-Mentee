import React from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import AttendanceBanner from "../components/Attendance/AttendanceBanner";
import AttendanceOverview from "../components/Attendance/AttendanceOverview";
import AttendanceStatistics from "../components/Attendance/AttendanceStatistics";
import AttendanceCategory from "../components/Attendance/AttendanceCategory";
import SubjectAttendance from "../components/Attendance/SubjectAttendance";
import AttendanceCalendar from "../components/Attendance/AttendanceCalendar";
import AttendanceTrend from "../components/Attendance/AttendanceTrend";
import AttendanceNote from "../components/Attendance/AttendanceNote";
import NeedHelp from "../components/Attendance/NeedHelp";

const Attendance = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Attendance Content */}
        <main className="flex-1 px-4 py-4 space-y-4">
          {/* Attendance Banner */}
          <AttendanceBanner />

          {/* Section Heading */}
          <div>
            <h1 className="text-[28px] font-bold text-[#142970]">
              Attendance Overview
            </h1>

            <p className="text-[13px] text-slate-500">
              Track your overall and subject-wise attendance
            </p>
          </div>

          {/* ================= First Row ================= */}
          <div className="grid grid-cols-12 gap-2">
            {/* Overall Attendance */}
            <div className="col-span-12 lg:col-span-4">
              <AttendanceOverview />
            </div>

            {/* Attendance Statistics */}
            <div className="col-span-12 lg:col-span-4">
              <AttendanceStatistics />
            </div>

            {/* Attendance by Category */}
            <div className="col-span-12 lg:col-span-4">
              <AttendanceCategory />
            </div>
          </div>

          {/* ================= Second Row ================= */}
          <div className="grid grid-cols-12 gap-2">
            {/* Subject-wise Attendance */}
            <div className="col-span-12 lg:col-span-7">
              <SubjectAttendance />
            </div>

            {/* Attendance Calendar */}
            <div className="col-span-12 lg:col-span-5 flex">
              <AttendanceCalendar />
            </div>
          </div>

          {/* ================= Third Row ================= */}
          <div className="grid grid-cols-12 gap-2">
            {/* Attendance Trend */}
            <div className="col-span-12 lg:col-span-8">
              <AttendanceTrend />
            </div>

            {/* Note */}
            <div className="col-span-12 lg:col-span-2">
              <AttendanceNote />
            </div>

            {/* Need Help */}
            <div className="col-span-12 lg:col-span-2">
              <NeedHelp />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;