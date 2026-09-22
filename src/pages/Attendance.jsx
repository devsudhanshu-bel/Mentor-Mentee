import React, { useEffect, useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import AttendanceBanner from "../components/Attendance/AttendanceBanner";
import AttendanceOverview from "../components/Attendance/AttendanceOverview";
import AttendanceStatistics from "../components/Attendance/AttendanceStatistics";
import AttendanceCategory from "../components/Attendance/AttendanceCategory";
import SubjectAttendance from "../components/Attendance/SubjectAttendance";
import AttendanceEntryModal from "../components/Attendance/AttendanceEntryModal";

import {
  getSemesterAttendance,
  saveSemesterAttendance,
} from "../api/attendance.api";

/* ==========================================================
   ATTENDANCE PAGE
========================================================== */

const Attendance = () => {
  /* ========================================================
     STATE
  ======================================================== */

  const [selectedSemester, setSelectedSemester] = useState(null);

  const [attendanceData, setAttendanceData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [initializing, setInitializing] = useState(true);

  const [error, setError] = useState("");

  const [showEntryModal, setShowEntryModal] = useState(false);

  /* ========================================================
     SEMESTER PARSER
  ======================================================== */

  const getCurrentSemester = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return 1;
      }

      const user = JSON.parse(storedUser);

      const values = [
        user?.semester,
        user?.currentSemester,
        user?.semesterNumber,
      ];

      const romanMap = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
        V: 5,
        VI: 6,
        VII: 7,
        VIII: 8,
      };

      for (const value of values) {
        if (value === null || value === undefined) {
          continue;
        }

        const stringValue = String(value).trim();

        /* ----------------------------------------------
           Numeric semester
        ---------------------------------------------- */

        const numericMatch = stringValue.match(/\d+/);

        if (numericMatch) {
          const number = Number(numericMatch[0]);

          if (number >= 1 && number <= 8) {
            return number;
          }
        }

        /* ----------------------------------------------
           Roman semester
        ---------------------------------------------- */

        const normalized = stringValue
          .toUpperCase()
          .replace("SEMESTER", "")
          .trim();

        if (romanMap[normalized]) {
          return romanMap[normalized];
        }
      }

      return 1;
    } catch (err) {
      console.error("Failed to determine current semester:", err);

      return 1;
    }
  };

  /* ========================================================
     LOAD ATTENDANCE
  ======================================================== */

  const loadAttendance = async (semester, shouldOpenModal = true) => {
    try {
      setLoading(true);

      setError("");

      const response = await getSemesterAttendance(semester);

      const data = response?.data || null;

      /*
       * Only replace existing UI data
       * after a successful request.
       */

      setAttendanceData(data);

      /*
       * Automatically open the entry
       * modal when the semester has
       * no attendance yet.
       */

      if (shouldOpenModal && data && data.hasAttendance === false) {
        setShowEntryModal(true);
      } else {
        setShowEntryModal(false);
      }

      return data;
    } catch (err) {
      console.error("Failed to load attendance:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load attendance.",
      );

      setAttendanceData(null);

      setShowEntryModal(false);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ========================================================
     INITIAL LOAD
  ======================================================== */

  useEffect(() => {
    let mounted = true;

    const initialiseAttendance = async () => {
      const currentSemester = getCurrentSemester();

      try {
        /*
         * Load the actual backend
         * semester first.
         */

        const data = await loadAttendance(currentSemester, false);

        /*
         * Prefer backend current semester
         * when it is available.
         */

        const backendSemester = Number(data?.currentSemester);

        const resolvedSemester =
          Number.isInteger(backendSemester) &&
          backendSemester >= 1 &&
          backendSemester <= 8
            ? backendSemester
            : currentSemester;

        if (mounted) {
          setSelectedSemester(resolvedSemester);
        }
      } catch (err) {
        /*
         * Even when the API fails,
         * preserve the locally resolved
         * semester for the error UI.
         */

        if (mounted) {
          setSelectedSemester(currentSemester);
        }
      } finally {
        if (mounted) {
          setInitializing(false);
        }
      }
    };

    initialiseAttendance();

    return () => {
      mounted = false;
    };
  }, []);

  /* ========================================================
     SEMESTER CHANGE
  ======================================================== */

  const handleSemesterChange = async (semester) => {
    const number = Number(semester);

    if (!Number.isInteger(number) || number < 1 || number > 8) {
      return;
    }

    /*
     * Remove old semester data
     * immediately so that stale
     * data isn't displayed while
     * the new semester loads.
     */

    setAttendanceData(null);

    setSelectedSemester(number);

    await loadAttendance(number, true);
  };

  /* ========================================================
     SAVE ATTENDANCE
  ======================================================== */

  const handleSaveAttendance = async (subjects) => {
    try {
      setError("");

      const response = await saveSemesterAttendance(selectedSemester, subjects);

      /*
       * Show returned data immediately.
       */

      setAttendanceData(response?.data || null);

      setShowEntryModal(false);

      /*
       * Re-fetch from database.
       *
       * This makes the displayed data
       * the actual persisted data.
       */

      await loadAttendance(selectedSemester, false);
    } catch (err) {
      console.error("Failed to save attendance:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to save attendance.",
      );

      throw err;
    }
  };

  /* ========================================================
     INITIAL PAGE LOADING
  ======================================================== */

  if (initializing || selectedSemester === null) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Sidebar />

        <div className="ml-[290px] min-h-screen">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <div className="mb-2 text-sm font-medium text-slate-600">
                Loading attendance...
              </div>

              <div className="text-xs text-slate-400">Please wait</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================
     MAIN PAGE
  ======================================================== */

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-[290px] flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 space-y-4 px-4 py-4">
          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-[12px]
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* ==================================================
              BANNER
          ================================================== */}

          <AttendanceBanner
            selectedSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
            attendanceData={attendanceData}
          />

          {/* ==================================================
              PAGE TITLE
          ================================================== */}

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

          {/* ==================================================
              OVERVIEW CARDS
          ================================================== */}

          <div className="grid grid-cols-12 gap-2">
            {/* Overall */}

            <div className="col-span-12 lg:col-span-4">
              <AttendanceOverview
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>

            {/* Statistics */}

            <div className="col-span-12 lg:col-span-4">
              <AttendanceStatistics
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>

            {/* Category */}

            <div className="col-span-12 lg:col-span-4">
              <AttendanceCategory
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
              />
            </div>
          </div>

          {/* ==================================================
              SUBJECT ATTENDANCE
          ================================================== */}

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 w-full">
              <SubjectAttendance
                selectedSemester={selectedSemester}
                attendanceData={attendanceData}
                onEdit={() => {
                  setShowEntryModal(true);
                }}
              />
            </div>
          </div>
        </main>
      </div>

      {/* ======================================================
          ENTRY MODAL
      ====================================================== */}

      {showEntryModal && (
        <AttendanceEntryModal
          semester={selectedSemester}
          onClose={() => setShowEntryModal(false)}
          onSave={handleSaveAttendance}
        />
      )}

      {/* ======================================================
          SEMESTER LOADING INDICATOR
      ====================================================== */}

      {loading && !initializing && (
        <div
          className="
              fixed
              bottom-5
              right-5
              z-[90]
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-[12px]
              text-slate-500
              shadow-lg
            "
        >
          Loading Semester {selectedSemester}...
        </div>
      )}
    </div>
  );
};

export default Attendance;
