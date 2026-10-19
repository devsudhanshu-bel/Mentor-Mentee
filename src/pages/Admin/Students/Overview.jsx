import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import api from "../../../api/axios";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import AdminSidebar from "../../../components/layouts/AdminSidebar";
import AdminHeader from "../../../components/layouts/AdminHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import AdminBackButton from "../../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../../components/Admin/Students/Header/AdminStudentTabs";

import StudentProfileSidebar from "../../../components/Mentors/Students/Sidebar/StudentProfileSidebar";

import OverviewStats from "../../../components/Mentors/Students/Overview/OverviewStats";
import AcademicProgress from "../../../components/Mentors/Students/Overview/AcademicProgress";

import InternshipsOverview from "../../../components/Mentors/Students/Overview/InternshipsOverview";
import ResearchOverview from "../../../components/Mentors/Students/Overview/ResearchOverview";
import CoCurricularOverview from "../../../components/Mentors/Students/Overview/CoCurricularOverview";

import UploadedDocuments from "../../../components/Mentors/Students/Overview/UploadedDocuments";
import CertificatesOverview from "../../../components/Mentors/Students/Overview/CertificatesOverview";

import MeetingHistory from "../../../components/Mentors/Students/Overview/MeetingHistory";

import mentorOverviewService from "../../../services/mentorOverviewService";

const Overview = () => {
  const { id: studentId } = useParams();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith(
    "/admin/overview/students/",
  );

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // FETCH STUDENT OVERVIEW
  // Mentor -> Existing Mentor overview service
  // Admin  -> New Admin overview endpoint
  // ==========================================================

  const loadOverview = useCallback(async () => {
    if (!studentId) {
      setOverview(null);
      setError("Student ID is missing from the URL.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      let data;

      if (isAdminRoute) {
        const response = await api.get(
          `/admin/overview/students/${studentId}`,
        );

        data = response.data?.data;
      } else {
        data =
          await mentorOverviewService.getStudentOverview(studentId);
      }

      if (!data) {
        throw new Error("No student overview data was returned.");
      }

      setOverview(data);
    } catch (err) {
      console.error("Failed to load student overview:", err);

      setOverview(null);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load the student overview.",
      );
    } finally {
      setLoading(false);
    }
  }, [studentId, isAdminRoute]);

  useEffect(() => {
    let cancelled = false;

    const fetchOverview = async () => {
      if (!studentId) {
        setOverview(null);
        setError("Student ID is missing from the URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        let data;

        if (isAdminRoute) {
          const response = await api.get(
            `/admin/overview/students/${studentId}`,
          );

          data = response.data?.data;
        } else {
          data =
            await mentorOverviewService.getStudentOverview(studentId);
        }

        if (!data) {
          throw new Error("No student overview data was returned.");
        }

        if (!cancelled) {
          setOverview(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load student overview:", err);

          setOverview(null);

          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load the student overview.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchOverview();

    return () => {
      cancelled = true;
    };
  }, [studentId, isAdminRoute]);

  // ==========================================================
  // RETRY
  // ==========================================================

  const handleRetry = () => {
    loadOverview();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      {isAdminRoute ? <AdminSidebar /> : <MentorSidebar />}

      {/* ================= Main Content ================= */}

      <div className="ml-[290px] min-h-screen max-[900px]:ml-0">
        {isAdminRoute ? <AdminHeader /> : <MentorHeader />}

        <main className="space-y-5 p-4 lg:p-6">
          {/* ================= Page Actions ================= */}

          <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            {isAdminRoute ? (
              <AdminBackButton />
            ) : (
              <>
                <BackButton />
                <ActionButtons />
              </>
            )}
          </section>

          {/* ================= Loading State ================= */}

          {loading && (
            <div
              className="rounded-xl border border-slate-200 bg-white p-6"
              role="status"
            >
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

                <p className="text-sm text-slate-600">
                  Loading student overview...
                </p>
              </div>
            </div>
          )}

          {/* ================= Error State ================= */}

          {!loading && error && (
            <div
              className="rounded-xl border border-red-200 bg-red-50 p-5"
              role="alert"
            >
              <h2 className="font-semibold text-red-800">
                Unable to load overview
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-3 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* ================= Student Overview ================= */}

          {!loading && !error && overview && (
            <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
              {/* Left Sidebar */}

              <aside className="flex min-w-0 flex-col gap-5">
                <StudentProfileSidebar
                  student={overview.student}
                  overview={overview}
                />

                <MeetingHistory
                  studentId={studentId}
                  overview={overview}
                />
              </aside>

              {/* Main Content */}

              <div className="flex min-w-0 flex-col gap-5">
                {/* Tabs */}

                {isAdminRoute ? (
                  <AdminStudentTabs />
                ) : (
                  <StudentTabs />
                )}

                {/* Overview Statistics */}

                <OverviewStats
                  statistics={overview.statistics}
                  student={overview.student}
                />

                {/* Academic Progress */}

                <section className="grid grid-cols-1 gap-5">
                  <AcademicProgress
                    academicProgress={overview.academicProgress}
                    student={overview.student}
                  />
                </section>

                {/* Student Activities */}

                <section>
                  <div className="mb-3">
                    <h2 className="text-base font-semibold text-slate-800">
                      Student Activities
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Internship, research, and co-curricular activities.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                    <InternshipsOverview
                      internships={overview.internships}
                      statistics={overview.statistics?.internships}
                    />

                    <ResearchOverview
                      research={overview.research}
                      statistics={overview.statistics?.research}
                    />

                    <CoCurricularOverview
                      activities={overview.coCurricularActivities}
                      statistics={overview.statistics?.coCurricular}
                    />
                  </div>
                </section>

                {/* Documents and Certificates */}

                <section>
                  <div className="mb-3">
                    <h2 className="text-base font-semibold text-slate-800">
                      Documents & Certificates
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Review documents and earned certificates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
                    <UploadedDocuments
                      documents={overview.documents}
                    />

                    <CertificatesOverview
                      certificates={overview.certificates}
                      statistics={overview.statistics?.certificates}
                    />
                  </div>
                </section>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Overview;