import React, { useEffect, useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import AcademicBanner from "../components/Academics/AcademicBanner";
import AcademicInfo from "../components/Academics/AcademicInfo";
import SemesterTable from "../components/Academics/SemesterTable";

import AcademicSetupModal from "../components/Academics/AcademicSetupModal";
import SubjectEntryForm from "../components/Academics/SubjectEntryForm";
import SubjectCountStep from "../components/Academics/SubjectCountStep";
import AcademicSuccessModal from "../components/Academics/AcademicSuccessModal";

import SemesterSummary from "../components/Academics/SemesterSummary";
import GradeDistribution from "../components/Academics/GradeDistribution";

import SGPATrend from "../components/Academics/SGPATrend";

import {
  getAcademicOverview,
  getAcademicSemester,
  createAcademicSemester,
} from "../api/academic.api";

const Academics = () => {
  // =========================================================
  // ACADEMIC OVERVIEW
  // =========================================================

  const [academicData, setAcademicData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================================================
  // SELECTED SEMESTER DATA
  // =========================================================

  const [selectedSemesterData, setSelectedSemesterData] = useState(null);

  // =========================================================
  // SETUP MODAL
  // =========================================================

  const [showSetupModal, setShowSetupModal] = useState(false);

  // =========================================================
  // SETUP SEMESTER
  // =========================================================

  const [setupSemester, setSetupSemester] = useState(null);

  // =========================================================
  // SUBJECT COUNT
  // =========================================================

  const [subjectCount, setSubjectCount] = useState(null);

  // =========================================================
  // SUCCESS MODAL
  // =========================================================

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // =========================================================
  // ACTIVE SEMESTER
  // =========================================================

  const [activeSemester, setActiveSemester] = useState(1);

  // =========================================================
  // CURRENT SEMESTER
  // =========================================================

  const currentSemester = Number(
    academicData?.currentSemester ?? academicData?.data?.currentSemester ?? 1,
  );

  // =========================================================
  // SEMESTER RECORDS
  // =========================================================

  const semesterRecords =
    academicData?.semesters || academicData?.data?.semesters || [];

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true);

        setError("");

        const data = await getAcademicOverview();

        console.log("Academic Overview:", data);

        setAcademicData(data);

        // -------------------------------------------------
        // SETUP COMPLETION
        // -------------------------------------------------

        const setupCompleted =
          data?.setupCompleted ?? data?.data?.setupCompleted ?? false;

        // -------------------------------------------------
        // RECORDS
        // -------------------------------------------------

        const records = data?.semesters || data?.data?.semesters || [];

        // -------------------------------------------------
        // COMPLETED PREVIOUS SEMESTERS
        // -------------------------------------------------

        const completedSemesters = records.filter(
          (semester) =>
            semester?.hasRecord === true &&
            Number(semester?.semesterNumber) <
              Number(data?.currentSemester ?? data?.data?.currentSemester ?? 1),
        );

        // -------------------------------------------------
        // LATEST COMPLETED
        // -------------------------------------------------

        if (completedSemesters.length > 0) {
          const latestCompletedSemester = Math.max(
            ...completedSemesters.map((semester) =>
              Number(semester.semesterNumber),
            ),
          );

          setActiveSemester(latestCompletedSemester);
        } else if (
          Number(data?.currentSemester ?? data?.data?.currentSemester ?? 1) > 1
        ) {
          setActiveSemester(
            Number(data?.currentSemester ?? data?.data?.currentSemester ?? 1) -
              1,
          );
        } else {
          setActiveSemester(1);
        }

        // -------------------------------------------------
        // FIRST LOGIN SETUP
        // -------------------------------------------------

        if (!setupCompleted) {
          setShowSetupModal(true);
        }
      } catch (err) {
        console.error("Failed to fetch academic overview:", err);

        setError(
          err?.response?.data?.message ||
            "Failed to load academic information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  // =========================================================
  // FETCH SELECTED SEMESTER
  // =========================================================

  useEffect(() => {
    let cancelled = false;

    const fetchSelectedSemester = async () => {
      if (!activeSemester) {
        return;
      }

      try {
        setSelectedSemesterData(null);

        const data = await getAcademicSemester(activeSemester);

        if (cancelled) {
          return;
        }

        console.log(`Semester ${activeSemester} data:`, data);

        setSelectedSemesterData(data);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.log(`No saved data for Semester ${activeSemester}:`, err);

        setSelectedSemesterData(null);
      }
    };

    fetchSelectedSemester();

    return () => {
      cancelled = true;
    };
  }, [activeSemester]);

  // =========================================================
  // SEMESTER CHANGE
  // =========================================================

  const handleSemesterChange = (semesterNumber, options = {}) => {
    console.log("Semester clicked:", semesterNumber, options);

    // -------------------------------------------------------
    // CURRENT + FUTURE LOCKED
    // -------------------------------------------------------

    if (Number(semesterNumber) >= currentSemester) {
      console.log(`Semester ${semesterNumber} is locked.`);

      return;
    }

    // -------------------------------------------------------
    // SET ACTIVE
    // -------------------------------------------------------

    setActiveSemester(Number(semesterNumber));

    // -------------------------------------------------------
    // ENTRY
    // -------------------------------------------------------

    if (options.mode === "ENTRY") {
      setSetupSemester(Number(semesterNumber));

      setSubjectCount(null);

      setShowSetupModal(false);

      setShowSuccessModal(false);

      return;
    }

    // -------------------------------------------------------
    // VIEW
    // -------------------------------------------------------

    if (options.mode === "VIEW") {
      setSetupSemester(null);

      setSubjectCount(null);

      setShowSuccessModal(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Sidebar />

        <div className="ml-[290px] flex min-h-screen flex-col">
          <Header />

          <main className="flex flex-1 items-center justify-center">
            <div className="rounded-xl bg-white px-6 py-5 shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                Loading academic information...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Sidebar />

        <div className="ml-[290px] flex min-h-screen flex-col">
          <Header />

          <main className="flex flex-1 items-center justify-center px-4">
            <div className="rounded-xl border border-red-200 bg-white px-6 py-5 shadow-sm">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-[290px] flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 space-y-5 px-4 py-4">
          {/* =================================================
              ACADEMIC BANNER
          ================================================= */}

          <AcademicBanner
            academicData={academicData}
            selectedSemesterData={selectedSemesterData}
            activeSemester={activeSemester}
          />

          {/* =================================================
              SEMESTER NAVIGATION
          ================================================= */}

          <AcademicInfo
            currentSemester={currentSemester}
            semesterData={semesterRecords}
            activeSemester={activeSemester}
            onSemesterChange={handleSemesterChange}
          />

          {/* =================================================
              SEMESTER TABLE
          ================================================= */}

          <div className="w-full">
            <SemesterTable semesterNumber={activeSemester} />
          </div>

          {/* =================================================
              ANALYTICS
          ================================================= */}

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {/* SEMESTER SUMMARY */}

            <div className="min-w-0 h-[215px]">
              <div className="h-full [&>*]:h-full">
                <SemesterSummary semesterData={selectedSemesterData} />
              </div>
            </div>

            {/* GRADE DISTRIBUTION */}

            <div className="min-w-0 h-[215px]">
              <div className="h-full [&>*]:h-full">
                <GradeDistribution semesterData={selectedSemesterData} />
              </div>
            </div>

            {/* SGPA TREND */}

            <div className="min-w-0 h-[215px]">
              <div className="h-full [&>*]:h-full">
                <SGPATrend academicData={academicData} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          FIRST LOGIN SETUP
      ===================================================== */}

      <AcademicSetupModal
        isOpen={showSetupModal}
        currentSemester={currentSemester}
        onClose={() => {
          setShowSetupModal(false);
        }}
        onContinue={(semesterNumber) => {
          console.log("Setup semester selected:", semesterNumber);

          setSetupSemester(Number(semesterNumber));

          setSubjectCount(null);

          setShowSetupModal(false);

          setShowSuccessModal(false);
        }}
      />

      {/* =====================================================
          SUBJECT COUNT
      ===================================================== */}

      {setupSemester && !subjectCount && !showSuccessModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg">
            <SubjectCountStep
              semesterNumber={setupSemester}
              onBack={() => {
                setSetupSemester(null);

                setSubjectCount(null);

                setShowSetupModal(false);
              }}
              onContinue={(count) => {
                console.log("Subject count:", count);

                setSubjectCount(Number(count));
              }}
            />
          </div>
        </div>
      )}

      {/* =====================================================
          SUBJECT ENTRY
      ===================================================== */}

      {setupSemester && subjectCount && !showSuccessModal && (
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/40 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-4xl">
            <SubjectEntryForm
              semesterNumber={setupSemester}
              subjectCount={subjectCount}
              onBack={() => {
                setSubjectCount(null);
              }}
              onComplete={async (subjects) => {
                try {
                  // ======================================
                  // ACADEMIC PAYLOAD
                  //
                  // IMPORTANT:
                  // NO attendance field here.
                  //
                  // Attendance belongs to the
                  // Attendance module.
                  // ======================================

                  const payload = {
                    semesterNumber: setupSemester,

                    subjects: subjects.map((subject) => ({
                      courseCode: subject.courseCode,

                      courseName: subject.courseName,

                      credits: Number(subject.credits),

                      subjectType: subject.subjectType,

                      cia1: subject.cia1 === "" ? null : Number(subject.cia1),

                      mse: subject.mse === "" ? null : Number(subject.mse),

                      cia3: subject.cia3 === "" ? null : Number(subject.cia3),

                      ese: subject.ese === "" ? null : Number(subject.ese),

                      maximumMarks:
                        subject.maxMarks === ""
                          ? null
                          : Number(subject.maxMarks),

                      totalMarksObtained:
                        subject.totalMarks === ""
                          ? null
                          : Number(subject.totalMarks),

                      grade: subject.grade || null,

                      gradePoint:
                        subject.gradePoint === ""
                          ? null
                          : Number(subject.gradePoint),
                    })),
                  };

                  console.log("Academic POST payload:", payload);

                  // ======================================
                  // SAVE
                  // ======================================

                  await createAcademicSemester(payload);

                  // ======================================
                  // SUCCESS
                  // ======================================

                  setShowSuccessModal(true);

                  setSubjectCount(null);
                } catch (err) {
                  console.error("Failed to save semester:", err);

                  alert(
                    err?.response?.data?.message ||
                      "Failed to save academic semester.",
                  );
                }
              }}
            />
          </div>
        </div>
      )}

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      <AcademicSuccessModal
        isOpen={showSuccessModal}
        semesterNumber={setupSemester}
        onContinue={async () => {
          // -----------------------------------------------
          // CLOSE
          // -----------------------------------------------

          setShowSuccessModal(false);

          // -----------------------------------------------
          // SELECT SEMESTER
          // -----------------------------------------------

          if (setupSemester) {
            setActiveSemester(setupSemester);
          }

          // -----------------------------------------------
          // CLEAR
          // -----------------------------------------------

          setSetupSemester(null);

          setSubjectCount(null);

          // -----------------------------------------------
          // REFRESH
          // -----------------------------------------------

          try {
            const updated = await getAcademicOverview();

            console.log("Updated Academic Overview:", updated);

            setAcademicData(updated);
          } catch (err) {
            console.error("Failed to refresh academic data:", err);
          }
        }}
      />
    </div>
  );
};

export default Academics;
