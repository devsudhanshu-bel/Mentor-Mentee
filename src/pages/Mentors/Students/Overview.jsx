import React from "react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentProfileSidebar from "../../../components/Mentors/Students/Sidebar/StudentProfileSidebar";

import OverviewStats from "../../../components/Mentors/Students/Overview/OverviewStats";
import AcademicProgress from "../../../components/Mentors/Students/Overview/AcademicProgress";
import SubjectPerformance from "../../../components/Mentors/Students/Overview/SubjectPerformance";

import InternshipsOverview from "../../../components/Mentors/Students/Overview/InternshipsOverview";
import ResearchOverview from "../../../components/Mentors/Students/Overview/ResearchOverview";
import CoCurricularOverview from "../../../components/Mentors/Students/Overview/CoCurricularOverview";

import UploadedDocuments from "../../../components/Mentors/Students/Overview/UploadedDocuments";
import CertificatesOverview from "../../../components/Mentors/Students/Overview/CertificatesOverview";
import StudentTimeline from "../../../components/Mentors/Students/Overview/StudentTimeline";

import MeetingHistory from "../../../components/Mentors/Students/Overview/MeetingHistory";
import MentorRemarks from "../../../components/Mentors/Students/Overview/MentorRemarks";
import ActionItems from "../../../components/Mentors/Students/Overview/ActionItems";

const Overview = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen">
        <MentorHeader />

        <main className="p-6">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <BackButton />
            <ActionButtons />
          </div>

          {/* Dashboard */}
          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* Left Column */}
            <div className="flex flex-col gap-2">
              <StudentProfileSidebar />

              <MeetingHistory />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-2">
              {/* Tabs */}
              <StudentTabs />

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
              <div className="grid grid-cols-12 gap-2 items-start">
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

export default Overview;