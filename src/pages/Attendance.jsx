import React, { useEffect, useState } from "react";

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

import AttendanceEntryModal from "../components/Attendance/AttendanceEntryModal";

import {
  getSemesterAttendance,
  saveSemesterAttendance,
} from "../services/attendanceApi";

const Attendance = () => {
  /*
  |--------------------------------------------------------------------------
  | SELECTED SEMESTER
  |--------------------------------------------------------------------------
  |
  | Semester VII is the current semester.
  | Therefore it is selected by default.
  |
  */

  const [selectedSemester, setSelectedSemester] = useState(7);

  /*
  |--------------------------------------------------------------------------
  | ATTENDANCE DATA
  |--------------------------------------------------------------------------
  */

  const [attendanceData, setAttendanceData] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | ENTRY MODAL
  |--------------------------------------------------------------------------
  */

  const [showEntryModal, setShowEntryModal] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | LOAD ATTENDANCE
  |--------------------------------------------------------------------------
  */

  const loadAttendance = async (semester, shouldOpenModal = true) => {
    try {
      setLoading(true);
      setError("");

      const response = await getSemesterAttendance(semester);

      const data = response?.data || null;

      setAttendanceData(data);

      /*
      |--------------------------------------------------------------------------
      | FIRST TIME ENTRY
      |--------------------------------------------------------------------------
      |
      | If the selected semester has no attendance,
      | show the subject-entry popup.
      |
      */

      if (shouldOpenModal && data && data.hasAttendance === false) {
        setShowEntryModal(true);
      } else {
        setShowEntryModal(false);
      }
    } catch (err) {
      console.error("Failed to load attendance:", err);

      setError(err?.message || "Unable to load attendance.");

      setAttendanceData(null);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadAttendance(7, true);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | SEMESTER CHANGE
  |--------------------------------------------------------------------------
  */

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);

    loadAttendance(semester, true);
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE ATTENDANCE
  |--------------------------------------------------------------------------
  */

  const handleSaveAttendance = async (subjects) => {
    try {
      setError("");

      const response = await saveSemesterAttendance(selectedSemester, subjects);

      /*
      |--------------------------------------------------------------------------
      | Use backend-calculated data
      |--------------------------------------------------------------------------
      */

      setAttendanceData(response?.data || null);

      /*
      |--------------------------------------------------------------------------
      | Close modal
      |--------------------------------------------------------------------------
      */

      setShowEntryModal(false);
    } catch (err) {
      console.error("Failed to save attendance:", err);

      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================================================================
          SIDEBAR
      ================================================================= */}

      <Sidebar />

      {/* ================================================================
          MAIN CONTENT
      ================================================================= */}

      <div
        className="
          ml-[290px]
          min-h-screen
          flex
          flex-col
        "
      >
        {/* ==============================================================
            HEADER
        ============================================================== */}

        <Header />

        {/* ==============================================================
            CONTENT
        ============================================================== */}

        <main
          className="
            flex-1
            px-4
            py-4
            space-y-4
          "
        >
          {/* ============================================================
              ERROR
          ============================================================ */}

          {error && (
            <div
              className="
                bg-red-50
                border
                border-red-200
                text-red-600
                px-4
                py-3
                rounded-xl
                text-[12px]
              "
            >
              {error}
            </div>
          )}

          {/* ============================================================
              ATTENDANCE BANNER
          ============================================================ */}

          <AttendanceBanner
            selectedSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
            attendanceData={attendanceData}
          />

          {/* ============================================================
              SECTION HEADING
          ============================================================ */}

          <div>
            <h1
              className="
                text-[28px]
                font-bold
                text-[#142970]
              "
            >
              Attendance Overview
            </h1>

            <p
              className="
                text-[13px]
                text-slate-500
              "
            >
              Track your overall and subject-wise attendance
            </p>
          </div>

          {/* ============================================================
              FIRST ROW
          ============================================================ */}

          <div
            className="
              grid
              grid-cols-12
              gap-2
            "
          >
            {/* Overall Attendance */}

            <div
              className="
                col-span-12
                lg:col-span-4
              "
            >
              <AttendanceOverview
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>

            {/* Attendance Statistics */}

            <div
              className="
                col-span-12
                lg:col-span-4
              "
            >
              <AttendanceStatistics
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>

            {/* Attendance Category */}

            <div
              className="
                col-span-12
                lg:col-span-4
              "
            >
              <AttendanceCategory
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>
          </div>

          {/* ============================================================
              SECOND ROW
          ============================================================ */}

          <div
            className="
              grid
              grid-cols-12
              gap-2
            "
          >
            {/* Subject Attendance */}

            <div
              className="
                col-span-12
                lg:col-span-7
              "
            >
              <SubjectAttendance
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>

            {/* Calendar */}

            <div
              className="
                col-span-12
                lg:col-span-5
                flex
              "
            >
              <AttendanceCalendar
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>
          </div>

          {/* ============================================================
              THIRD ROW
          ============================================================ */}

          <div
            className="
              grid
              grid-cols-12
              gap-2
            "
          >
            {/* Attendance Trend */}

            <div
              className="
                col-span-12
                lg:col-span-8
              "
            >
              <AttendanceTrend
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>

            {/* Note */}

            <div
              className="
                col-span-12
                lg:col-span-2
              "
            >
              <AttendanceNote
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>

            {/* Need Help */}

            <div
              className="
                col-span-12
                lg:col-span-2
              "
            >
              <NeedHelp
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>
          </div>
        </main>
      </div>

      {/* ================================================================
          ATTENDANCE ENTRY MODAL
      ================================================================= */}

      {showEntryModal && (
        <AttendanceEntryModal
          semester={selectedSemester}
          onClose={() => setShowEntryModal(false)}
          onSave={handleSaveAttendance}
        />
      )}

      {/* ================================================================
          LOADING INDICATOR
      ================================================================= */}

      {loading && (
        <div
          className="
            fixed
            bottom-5
            right-5
            z-[90]
            bg-white
            border
            border-slate-200
            shadow-lg
            rounded-xl
            px-4
            py-3
            text-[12px]
            text-slate-500
          "
        >
          Loading attendance...
        </div>
      )}
    </div>
  );
};

export default Attendance;
