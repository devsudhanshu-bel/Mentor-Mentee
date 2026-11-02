
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
    academicData?.currentSemester ??
      academicData?.data?.currentSemester ??
      1
  );

  // =========================================================
  // SEMESTER RECORDS
  // =========================================================

  const semesterRecords =
    academicData?.semesters ||
    academicData?.data?.semesters ||
    [];

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
          data?.setupCompleted ??
          data?.data?.setupCompleted ??
          false;

        // -------------------------------------------------
        // RECORDS
        // -------------------------------------------------

        const records =
          data?.semesters ||
          data?.data?.semesters ||
          [];

        // -------------------------------------------------
        // COMPLETED PREVIOUS SEMESTERS
        // -------------------------------------------------

        const completedSemesters = records.filter(
          (semester) =>
            semester?.hasRecord === true &&
            Number(semester?.semesterNumber) <
              Number(
                data?.currentSemester ??
                  data?.data?.currentSemester ??
                  1
              )
        );

        // -------------------------------------------------
        // LATEST COMPLETED
        // -------------------------------------------------

        if (completedSemesters.length > 0) {
          const latestCompletedSemester = Math.max(
            ...completedSemesters.map((semester) =>
              Number(semester.semesterNumber)
            )
          );

          setActiveSemester(latestCompletedSemester);
        } else if (
          Number(
            data?.currentSemester ??
              data?.data?.currentSemester ??
              1
          ) > 1
        ) {
          setActiveSemester(
            Number(
              data?.currentSemester ??
                data?.data?.currentSemester ??
                1
            ) - 1
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
            "Failed to load academic information."
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
      if (!activeSemester) return;

      try {
        setSelectedSemesterData(null);

        const data = await getAcademicSemester(activeSemester);

        if (cancelled) return;

        console.log(`Semester ${activeSemester} data:`, data);

        setSelectedSemesterData(data);
      } catch (err) {
        if (cancelled) return;

        console.log(
          `No saved data for Semester ${activeSemester}:`,
          err
        );

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
  // SHARED PAGE LAYOUT
  // =========================================================

  const pageLayout = (content) => (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen w-full min-w-0 flex-col lg:ml-[290px] lg:w-[calc(100%-290px)]">
        <Header />

        {content}
      </div>
    </div>
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return pageLayout(
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-blue-200 border-t-blue-600" />
          </div>

          <h2 className="text-base font-bold text-slate-800">
            Loading Academics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please wait while we retrieve your academic information.
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return pageLayout(
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <span className="text-xl font-bold">!</span>
          </div>

          <h2 className="mt-4 text-base font-bold text-slate-800">
            Unable to load academics
          </h2>

          <p className="mt-2 break-words text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen w-full min-w-0 flex-col lg:ml-[290px] lg:w-[calc(100%-290px)]">
        <Header />

        <main className="w-full min-w-0 flex-1 space-y-4 px-3 py-4 sm:space-y-5 sm:px-5 sm:py-5 lg:px-6 xl:px-7">

          {/* =================================================
              ACADEMIC BANNER
          ================================================= */}

          <section className="w-full min-w-0">
            <AcademicBanner
              academicData={academicData}
              selectedSemesterData={selectedSemesterData}
              activeSemester={activeSemester}
            />
          </section>

          {/* =================================================
              SEMESTER NAVIGATION
          ================================================= */}

          <section className="w-full min-w-0">
            <AcademicInfo
              currentSemester={currentSemester}
              semesterData={semesterRecords}
              activeSemester={activeSemester}
              onSemesterChange={handleSemesterChange}
            />
          </section>

          {/* =================================================
              SEMESTER TABLE
          ================================================= */}

          <section className="w-full min-w-0">
            <SemesterTable semesterNumber={activeSemester} />
          </section>

          {/* =================================================
              ANALYTICS
          ================================================= */}

          <section className="grid w-full min-w-0 grid-cols-1 items-stretch gap-4 md:grid-cols-2 2xl:grid-cols-3">

            {/* SEMESTER SUMMARY */}

            <div className="h-[215px] min-w-0">
              <div className="h-full min-w-0 [&>*]:h-full">
                <SemesterSummary
                  semesterData={selectedSemesterData}
                />
              </div>
            </div>

            {/* GRADE DISTRIBUTION */}

            <div className="h-[215px] min-w-0">
              <div className="h-full min-w-0 [&>*]:h-full">
                <GradeDistribution
                  semesterData={selectedSemesterData}
                />
              </div>
            </div>

            {/* SGPA TREND */}

            <div className="h-[215px] min-w-0 md:col-span-2 2xl:col-span-1">
              <div className="h-full min-w-0 [&>*]:h-full">
                <SGPATrend academicData={academicData} />
              </div>
            </div>
          </section>
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
        <div className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/40 px-3 py-5 backdrop-blur-sm sm:items-center sm:px-4 sm:py-8">
          <div className="my-auto w-full max-w-lg min-w-0">
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
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/40 px-2 py-4 backdrop-blur-sm sm:px-4 sm:py-8">
          <div className="mx-auto w-full max-w-4xl min-w-0">
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
                  // Attendance is handled separately
                  // by the Attendance module.
                  // ======================================

                  const payload = {
                    semesterNumber: setupSemester,

                    subjects: subjects.map((subject) => ({
                      courseCode: subject.courseCode,

                      courseName: subject.courseName,

                      credits: Number(subject.credits),

                      subjectType: subject.subjectType,

                      cia1:
                        subject.cia1 === ""
                          ? null
                          : Number(subject.cia1),

                      mse:
                        subject.mse === ""
                          ? null
                          : Number(subject.mse),

                      cia3:
                        subject.cia3 === ""
                          ? null
                          : Number(subject.cia3),

                      ese:
                        subject.ese === ""
                          ? null
                          : Number(subject.ese),

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
                      "Failed to save academic semester."
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
            console.error(
              "Failed to refresh academic data:",
              err
            );
          }
        }}
      />
    </div>
  );
};

export default Academics;
