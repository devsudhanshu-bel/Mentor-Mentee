import React from "react";
import { useParams } from "react-router-dom";

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

const AdminStudentDetails = () => {
  const { studentId, mentorId } = useParams();

  // Supports both Admin URL formats:
  // /admin/overview/students/:studentId
  // /admin/mentor/:mentorId/student/:studentId/overview

  if (!studentId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Student ID Missing
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Unable to display the student overview because no student ID
            was provided in the URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-100"
      data-student-id={studentId}
      data-mentor-id={mentorId || ""}
    >
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

          {/* ================= Dashboard ================= */}
          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* ================= Left Column ================= */}
            <div className="flex flex-col gap-2">
              <StudentProfileSidebar />

              <MeetingHistory />
            </div>

            {/* ================= Right Column ================= */}
            <div className="flex flex-col gap-2">
              {/* Tabs */}
              <AdminStudentTabs />

              {/* Stats */}
              <OverviewStats />

              {/* Academic */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7">
                  <AcademicProgress />
                </div>

                <div className="col-span-5">
                  <SubjectPerformance />
                </div>
              </div>

              {/* Activities */}
              <div className="grid grid-cols-3 gap-2">
                <InternshipsOverview />

                <ResearchOverview />

                <CoCurricularOverview />
              </div>

              {/* Documents */}
              <div className="grid grid-cols-3 gap-2">
                <UploadedDocuments />

                <CertificatesOverview />

                <StudentTimeline />
              </div>

              {/* Mentor Section */}
              <div className="grid grid-cols-12 items-start gap-2">
                <div className="col-span-4">
                  <MentorRemarks />
                </div>

                <div className="col-span-8">
                  <ActionItems />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudentDetails;