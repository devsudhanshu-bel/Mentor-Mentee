import React from "react";
import {
  FlaskConical,
  FileCheck2,
  Presentation,
  FolderKanban,
  CalendarDays,
} from "lucide-react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AdminBackButton from "../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../components/Admin/Students/Header/AdminStudentTabs";

import StudentProfileCard from "../../components/Mentors/Students/Research/StudentProfileCard";

import ResearchStatCard from "../../components/Mentors/Students/Research/ResearchStatCard";
import ResearchWorks from "../../components/Mentors/Students/Research/ResearchWorks";

import ResearchTimeline from "../../components/Mentors/Students/Research/Timeline/ResearchTimeline";

import ResearchAreas from "../../components/Mentors/Students/Research/Analytics/ResearchAreas";
import MentorResearchNote from "../../components/Mentors/Students/Research/Analytics/MentorResearchNote";

// import ResearchInfo from "../../components/Mentors/Students/Research/ResearchInfo";

const AdminStudentResearch = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main ================= */}

      <div className="ml-[290px] min-h-screen">
        {/* ================= Header ================= */}

        <AdminHeader />

        <main className="p-6">
          {/* ================= Top Header ================= */}

          <div className="mb-4">
            <AdminBackButton />
          </div>

          {/* ==========================================================
                                FIRST ROW
          ========================================================== */}

          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* ================= Student Profile ================= */}

            <StudentProfileCard />

            {/* ================= Right Section ================= */}

            <div className="flex flex-col gap-2">
              {/* Student Tabs */}

              <AdminStudentTabs />

              {/* ================= KPI Cards ================= */}

              <div className="grid grid-cols-5 gap-2">
                <ResearchStatCard
                  icon={FlaskConical}
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                  title="Research Works"
                  value="2"
                  subtitle="Total Submitted"
                />

                <ResearchStatCard
                  icon={FileCheck2}
                  iconBg="bg-green-100"
                  iconColor="text-green-600"
                  title="Published"
                  value="1"
                  subtitle="Published Papers"
                />

                <ResearchStatCard
                  icon={Presentation}
                  iconBg="bg-orange-100"
                  iconColor="text-orange-600"
                  title="Conferences"
                  value="1"
                  subtitle="Presented"
                />

                <ResearchStatCard
                  icon={FolderKanban}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Projects"
                  value="1"
                  subtitle="Completed"
                />

                <ResearchStatCard
                  icon={CalendarDays}
                  iconBg="bg-purple-100"
                  iconColor="text-purple-600"
                  title="Last Submission"
                  value="20 Apr"
                  subtitle="2025"
                />
              </div>

              {/* ================= Research Works ================= */}

              <ResearchWorks />
            </div>
          </div>

          {/* ==========================================================
                                SECOND ROW
          ========================================================== */}

          <div className="mt-2 grid grid-cols-[2fr_1fr] gap-2">
            {/* ================= Timeline ================= */}

            <ResearchTimeline />

            {/* ================= Right Side ================= */}

            <div className="flex flex-col gap-2">
              <ResearchAreas />

              <MentorResearchNote />
            </div>
          </div>

          {/* ==========================================================
                                THIRD ROW
          ========================================================== */}

          {/*
          <div className="mt-2">
            <ResearchInfo />
          </div>
          */}
        </main>
      </div>
    </div>
  );
};

export default AdminStudentResearch;