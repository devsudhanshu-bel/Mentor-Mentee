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
import SubjectsChart from "../components/Academics/SubjectsChart";

import {
  getAcademicOverview,
  getAcademicSemester,
  createAcademicSemester,
} from "../api/academic.api";

const Academics = () => {
  // =========================================================
  // Academic overview
  // =========================================================
  const [academicData, setAcademicData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // Selected semester data
  // =========================================================
  const [selectedSemesterData, setSelectedSemesterData] = useState(null);

  // =========================================================
  // Setup modal
  // =========================================================
  const [showSetupModal, setShowSetupModal] = useState(false);

  // =========================================================
  // Semester currently being entered
  // =========================================================
  const [setupSemester, setSetupSemester] = useState(null);

  // =========================================================
  // Number of subjects
  // =========================================================
  const [subjectCount, setSubjectCount] = useState(null);

  // =========================================================
  // Success modal
  // =========================================================
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // =========================================================
  // Currently selected semester
  // =========================================================
  const [activeSemester, setActiveSemester] = useState(1);

  // =========================================================
  // Current semester
  // =========================================================
  const currentSemester = Number(
    academicData?.currentSemester ?? academicData?.data?.currentSemester ?? 1,
  );

  // =========================================================
  // Semester records
  // =========================================================
  const semesterRecords =
    academicData?.semesters || academicData?.data?.semesters || [];

  // =========================================================
  // INITIAL ACADEMIC OVERVIEW
  // =========================================================
  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAcademicOverview();

        console.log("Academic Overview:", data);

        setAcademicData(data);

        // -----------------------------------------------------
        // Setup completion
        // -----------------------------------------------------
        const setupCompleted =
          data?.setupCompleted ?? data?.data?.setupCompleted ?? false;

        // -----------------------------------------------------
        // Semester records
        // -----------------------------------------------------
        const records = data?.semesters || data?.data?.semesters || [];

        // -----------------------------------------------------
        // Completed semesters only
        // Current semester remains locked.
        // -----------------------------------------------------
        const completedSemesters = records.filter(
          (semester) =>
            semester?.hasRecord === true &&
            Number(semester?.semesterNumber) < currentSemester,
        );

        // -----------------------------------------------------
        // Select latest completed semester
        // -----------------------------------------------------
        if (completedSemesters.length > 0) {
          const latestCompletedSemester = Math.max(
            ...completedSemesters.map((semester) =>
              Number(semester.semesterNumber),
            ),
          );

          setActiveSemester(latestCompletedSemester);
        } else if (currentSemester > 1) {
          setActiveSemester(currentSemester - 1);
        } else {
          setActiveSemester(1);
        }

        // -----------------------------------------------------
        // First login setup
        // -----------------------------------------------------
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
        // Clear previous semester data
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
  // HANDLE SEMESTER TAB CLICK
  // =========================================================
  const handleSemesterChange = (semesterNumber, options = {}) => {
    console.log("Semester clicked:", semesterNumber, options);

    // -------------------------------------------------------
    // Current and future semesters locked
    // -------------------------------------------------------
    if (Number(semesterNumber) >= currentSemester) {
      console.log(`Semester ${semesterNumber} is locked.`);

      return;
    }

    // -------------------------------------------------------
    // Set active semester
    // -------------------------------------------------------
    setActiveSemester(Number(semesterNumber));

    // -------------------------------------------------------
    // ENTRY MODE
    // -------------------------------------------------------
    if (options.mode === "ENTRY") {
      setSetupSemester(Number(semesterNumber));

      setSubjectCount(null);
      setShowSetupModal(false);
      setShowSuccessModal(false);

      return;
    }

    // -------------------------------------------------------
    // VIEW MODE
    // -------------------------------------------------------
    if (options.mode === "VIEW") {
      setSetupSemester(null);
      setSubjectCount(null);
      setShowSuccessModal(false);

      return;
    }
  };

  // =========================================================
  // LOADING STATE
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
  // ERROR STATE
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
  // MAIN PAGE
  // =========================================================
  return (
    <div className="min-h-screen bg-slate-100">
      {/* =====================================================
          SIDEBAR
         ===================================================== */}
      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
         ===================================================== */}
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
              ACADEMIC INFORMATION + SEMESTER TABS
             ================================================= */}
          <AcademicInfo
            currentSemester={currentSemester}
            semesterData={semesterRecords}
            activeSemester={activeSemester}
            onSemesterChange={handleSemesterChange}
          />

          {/* =================================================
              SEMESTER TABLE
              
              FULL WIDTH
              
              This is intentionally separated from the
              analytics section so that the height of the
              table does not affect the positioning of the
              analytics cards.
             ================================================= */}
          <div className="w-full">
            <SemesterTable semesterNumber={activeSemester} />
          </div>

          {/* =================================================
    ANALYTICS SECTION
    All cards stay at the same height and level.
    Table above remains completely dynamic.
   ================================================= */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {/* Semester Summary */}
            <div className="min-w-0 h-[215px]">
              <div className="h-full [&>*]:h-full">
                <SemesterSummary semesterData={selectedSemesterData} />
              </div>
            </div>

            {/* Grade Distribution */}
            <div className="min-w-0 h-[215px]">
              <div className="h-full [&>*]:h-full">
                <GradeDistribution semesterData={selectedSemesterData} />
              </div>
            </div>

            {/* SGPA Trend */}
            <div className="min-w-0 h-[215px]">
              <div className="h-full [&>*]:h-full">
                <SGPATrend academicData={academicData} />
              </div>
            </div>

            {/* Subjects */}
            <div className="min-w-0 h-[215px]">
              <div className="h-full [&>*]:h-full">
                <SubjectsChart
                  semesterData={selectedSemesterData}
                  academicData={academicData}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          FIRST LOGIN / ACADEMIC SETUP
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
          SUBJECT COUNT STEP
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
          SUBJECT ENTRY FORM
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
                  // =========================================
                  // BACKEND PAYLOAD
                  // =========================================
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

                      attendance:
                        subject.attendance === ""
                          ? null
                          : Number(subject.attendance),
                    })),
                  };

                  console.log("Academic POST payload:", payload);

                  // =========================================
                  // SAVE TO BACKEND
                  // =========================================
                  await createAcademicSemester(payload);

                  // =========================================
                  // SUCCESS POPUP
                  // =========================================
                  setShowSuccessModal(true);

                  // Hide entry form
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
          SUCCESS MODAL
         ===================================================== */}
      <AcademicSuccessModal
        isOpen={showSuccessModal}
        semesterNumber={setupSemester}
        onContinue={async () => {
          // -----------------------------------------------
          // Close success modal
          // -----------------------------------------------
          setShowSuccessModal(false);

          // -----------------------------------------------
          // Select submitted semester
          // -----------------------------------------------
          if (setupSemester) {
            setActiveSemester(setupSemester);
          }

          // -----------------------------------------------
          // Clear setup state
          // -----------------------------------------------
          setSetupSemester(null);

          setSubjectCount(null);

          // -----------------------------------------------
          // Refresh overview
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
