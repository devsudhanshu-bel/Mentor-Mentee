import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";
import AdminBackButton from "../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../components/Admin/Students/Header/AdminStudentTabs";

import StudentProfileSidebar from "../../components/Mentors/Students/Sidebar/StudentProfileSidebar";
import OverviewStats from "../../components/Mentors/Students/Overview/OverviewStats";
import AcademicProgress from "../../components/Mentors/Students/Overview/AcademicProgress";
import SubjectPerformance from "../../components/Mentors/Students/Overview/SubjectPerformance";
import InternshipsOverview from "../../components/Mentors/Students/Overview/InternshipsOverview";
import ResearchOverview from "../../components/Mentors/Students/Overview/ResearchOverview";
import CoCurricularOverview from "../../components/Mentors/Students/Overview/CoCurricularOverview";
import UploadedDocuments from "../../components/Mentors/Students/Overview/UploadedDocuments";
import CertificatesOverview from "../../components/Mentors/Students/Overview/CertificatesOverview";
import StudentTimeline from "../../components/Mentors/Students/Overview/StudentTimeline";
import MeetingHistory from "../../components/Mentors/Students/Overview/MeetingHistory";
import MentorRemarks from "../../components/Mentors/Students/Overview/MentorRemarks";
import ActionItems from "../../components/Mentors/Students/Overview/ActionItems";

import useAdminStudentOverview from "../../components/Admin/Students/useAdminStudentOverview";

const AdminStudentDetails = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const { overview, loading, error, refresh } = useAdminStudentOverview();

  const student = overview?.student ?? null;
  const mentor = overview?.mentor ?? null;
  const statistics = overview?.statistics ?? {};
  const academicProgress = overview?.academicProgress ?? [];
  const subjects = overview?.subjects ?? [];
  const documents = overview?.documents ?? [];

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-[290px] min-h-screen">
        <AdminHeader />

        <main className="p-6">
          <div className="mb-4">
            <AdminBackButton />
          </div>

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-white shadow-sm">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                <p className="text-sm font-medium text-slate-600">
                  Loading student details...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <span className="text-xl font-bold">!</span>
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                Unable to load student details
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={refresh}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : !student ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">
                Student not found
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                No student details were returned for this record.
              </p>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-5 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
              {/* Student profile and meeting history */}
              <div className="flex min-w-0 flex-col gap-2">
                <StudentProfileSidebar
                  student={student}
                  mentor={mentor}
                  statistics={statistics}
                />

                <MeetingHistory meetings={overview?.meetings ?? []} />
              </div>

              {/* Main student overview */}
              <div className="flex min-w-0 flex-col gap-2">
                <AdminStudentTabs />

                <OverviewStats
                  statistics={statistics}
                  internships={overview?.internships ?? []}
                  research={overview?.research ?? []}
                  certificates={overview?.certificates ?? []}
                  coCurricularActivities={
                    overview?.coCurricularActivities ?? []
                  }
                />

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-7 min-w-0">
                    <AcademicProgress
                      academicProgress={academicProgress}
                      statistics={statistics}
                    />
                  </div>

                  <div className="col-span-5 min-w-0">
                    <SubjectPerformance subjects={subjects} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <InternshipsOverview
                    internships={overview?.internships ?? []}
                  />

                  <ResearchOverview research={overview?.research ?? []} />

                  <CoCurricularOverview
                    activities={overview?.coCurricularActivities ?? []}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <UploadedDocuments documents={documents} />

                  <CertificatesOverview
                    certificates={overview?.certificates ?? []}
                  />

                  <StudentTimeline
                    student={student}
                    academicProgress={academicProgress}
                  />
                </div>

                <div className="grid grid-cols-12 items-start gap-2">
                  <div className="col-span-4 min-w-0">
                    <MentorRemarks
                      mentorRemarks={overview?.mentorRemarks ?? []}
                    />
                  </div>

                  <div className="col-span-8 min-w-0">
                    <ActionItems actionItems={overview?.actionItems ?? []} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminStudentDetails;
