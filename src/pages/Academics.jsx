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
import AttendanceOverview from "../components/Academics/AttendanceOverview";
import PerformanceInsights from "../components/Academics/PerformanceInsights";

import SGPATrend from "../components/Academics/SGPATrend";
import SubjectsChart from "../components/Academics/SubjectsChart";

import {
  getAcademicOverview,
  createAcademicSemester,
} from "../api/academic.api";

const Academics = () => {
  const [academicData, setAcademicData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Academic setup
  const [showSetupModal, setShowSetupModal] = useState(false);

  // Selected semester during setup
  const [setupSemester, setSetupSemester] = useState(null);

  // Number of subjects for selected semester
  const [subjectCount, setSubjectCount] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeSemester, setActiveSemester] = useState(1);

  /*
   * ---------------------------------------------------------
   * Fetch Academic Overview
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAcademicOverview();

        console.log("Academic Overview:", data);

        setAcademicData(data);

        const setupCompleted =
          data?.setupCompleted ?? data?.data?.setupCompleted ?? false;

        /*
         * If previous semester records haven't been entered,
         * open the setup flow automatically.
         */
        if (!setupCompleted) {
          setShowSetupModal(true);
        }
      } catch (err) {
        console.error("Failed to fetch academic overview:", err);

        setError(
          err.response?.data?.message || "Failed to load academic information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  /*
   * ---------------------------------------------------------
   * Current Semester
   * ---------------------------------------------------------
   */
  const currentSemester =
    Number(academicData?.currentSemester) ||
    Number(academicData?.data?.currentSemester) ||
    1;

  /*
   * ---------------------------------------------------------
   * Loading State
   * ---------------------------------------------------------
   */
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

  /*
   * ---------------------------------------------------------
   * Error State
   * ---------------------------------------------------------
   */
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

  /*
   * ---------------------------------------------------------
   * Main Page
   * ---------------------------------------------------------
   */
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="ml-[290px] flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 space-y-5 px-4 py-4">
          {/* Banner */}
          <AcademicBanner />

          {/* Academic Information + Semester Tabs */}
          <AcademicInfo
            currentSemester={currentSemester}
            semesterData={
              academicData?.semesters || academicData?.data?.semesters || []
            }
            activeSemester={activeSemester}
            onSemesterChange={handleSemesterChange}
          />

          {/* ================= Main Layout ================= */}
          <div className="grid grid-cols-12 items-start gap-4">
            {/* ================= LEFT ================= */}
            <div className="col-span-12 space-y-4 xl:col-span-9">
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
            <div className="col-span-12 space-y-4 xl:col-span-3">
              <SemesterSummary />

              <GradeDistribution />

              <AttendanceOverview />

              <PerformanceInsights />
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          STEP 1
          Academic Setup Modal
         ===================================================== */}
      <AcademicSetupModal
        isOpen={showSetupModal}
        currentSemester={currentSemester}
        onClose={() => {
          setShowSetupModal(false);
        }}
        onContinue={(semesterNumber) => {
          console.log("Setup semester selected:", semesterNumber);

          setSetupSemester(semesterNumber);
          setSubjectCount(null);
          setShowSetupModal(false);
        }}
      />

      {/* =====================================================
          STEP 2
          Subject Count
         ===================================================== */}
      {setupSemester && !subjectCount && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg">
            <SubjectCountStep
              semesterNumber={setupSemester}
              onBack={() => {
                setSetupSemester(null);
                setSubjectCount(null);
                setShowSetupModal(true);
              }}
              onContinue={(count) => {
                console.log("Subject count:", count);

                setSubjectCount(count);
              }}
            />
          </div>
        </div>
      )}

      {/* =====================================================
          STEP 3
          Subject Entry
         ===================================================== */}
      {setupSemester && subjectCount && (
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
                  const payload = {
                    semesterNumber: setupSemester,
                    subjects: subjects.map((subject) => ({
                      courseCode: subject.courseCode,
                      courseName: subject.courseName,
                      credits: Number(subject.credits),

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

                  const response = await createAcademicSemester(payload);

                  setShowSuccessModal(true);

                  // Close setup flow
                  setSetupSemester(null);
                  setSubjectCount(null);

                  // Refresh academic overview
                  const updated = await getAcademicOverview();

                  setAcademicData(updated);
                } catch (error) {
                  console.error("Failed to save semester:", error);

                  alert(
                    error.response?.data?.message ||
                      "Failed to save academic semester.",
                  );
                }
              }}
            />
            <AcademicSuccessModal
              isOpen={showSuccessModal}
              semesterNumber={setupSemester}
              onContinue={async () => {
                setShowSuccessModal(false);

                setSetupSemester(null);
                setSubjectCount(null);

                try {
                  const updated = await getAcademicOverview();

                  setAcademicData(updated);
                } catch (error) {
                  console.error("Failed to refresh academic data:", error);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Academics;
