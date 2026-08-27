import React from "react";
import {
  Trophy,
  ShieldCheck,
  Clock3,
  FilePenLine,
  Award,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import CoCurricularStatCard from "../../../components/Mentors/Students/CoCurricular/CoCurricularStatCard";

import ActivitiesTable from "../../../components/Mentors/Students/CoCurricular/Activities/ActivitiesTable";

import MentorNote from "../../../components/Mentors/Students/CoCurricular/Analytics/MentorNote";
import ActivityCategories from "../../../components/Mentors/Students/CoCurricular/Analytics/ActivityCategories";
import StudentTips from "../../../components/Mentors/Students/CoCurricular/Analytics/StudentTips";

const CoCurricular = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <MentorSidebar />

      {/* ================= Main ================= */}

      <div className="ml-[290px] min-h-screen">
        {/* ================= Header ================= */}

        <MentorHeader />

        {/* ================= Content ================= */}

        <main className="p-6">
          {/* ================= Top Header ================= */}

          <div className="mb-4 flex items-center justify-between">
            <BackButton />
            <ActionButtons />
          </div>

          {/* ================= Student Tabs ================= */}

          <StudentTabs />

          {/* ================= KPI Cards ================= */}

          <div className="mt-2 grid grid-cols-5 gap-2">
            <CoCurricularStatCard
              icon={Trophy}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              title="Total Activities"
              value="7"
              subtitle="All Time"
            />

            <CoCurricularStatCard
              icon={ShieldCheck}
              iconBg="bg-green-100"
              iconColor="text-green-600"
              title="Approved"
              value="5"
              subtitle="Approved Activities"
            />

            <CoCurricularStatCard
              icon={Clock3}
              iconBg="bg-orange-100"
              iconColor="text-orange-600"
              title="Under Review"
              value="1"
              subtitle="Awaiting Review"
            />

            <CoCurricularStatCard
              icon={FilePenLine}
              iconBg="bg-violet-100"
              iconColor="text-violet-600"
              title="Drafts"
              value="1"
              subtitle="Work in Progress"
            />

            <CoCurricularStatCard
              icon={Award}
              iconBg="bg-cyan-100"
              iconColor="text-cyan-600"
              title="Achievements"
              value="4"
              subtitle="Recognitions"
            />
          </div>

          {/* ================= Activities + Analytics ================= */}

          <div className="mt-4 grid grid-cols-12 gap-2">
            {/* ================= Left ================= */}

            <div className="col-span-8">
              <ActivitiesTable />
            </div>

            {/* ================= Right ================= */}

            <div className="col-span-4 space-y-2">
              <MentorNote />

              <ActivityCategories />

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoCurricular;