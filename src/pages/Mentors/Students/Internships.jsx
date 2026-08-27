import React from "react";
import {
  BriefcaseBusiness,
  BadgeCheck,
  CircleCheckBig,
  Building2,
  Star,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentInternshipProfile from "../../../components/Mentors/Students/Internships/StudentInternshipProfile";
import InternshipStatCard from "../../../components/Mentors/Students/Internships/InternshipStatCard";

import PreviousInternships from "../../../components/Mentors/Students/Internships/PreviousInternships";
import OngoingInternship from "../../../components/Mentors/Students/Internships/OngoingInternship";
// import InternshipInfo from "../../../components/Mentors/Students/Internships/InternshipInfo";

const Internships = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <MentorSidebar />

      {/* ================= Main ================= */}

      <div className="ml-[290px] min-h-screen">
        <MentorHeader />

        <main className="p-6">
          {/* ================= Header ================= */}

          <div className="mb-4 flex items-center justify-between">
            <BackButton />
            <ActionButtons />
          </div>

          {/* ==========================================================
                            TOP SECTION
          ========================================================== */}

          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* ================= Left ================= */}

            <StudentInternshipProfile />

            {/* ================= Right ================= */}

            <div className="flex flex-col gap-2">
              {/* Navigation */}

              <StudentTabs />

              {/* KPI */}

              <div className="grid grid-cols-5 gap-2">
                <InternshipStatCard
                  icon={BriefcaseBusiness}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Total Internships"
                  value="3"
                  subtitle="All Time"
                />

                <InternshipStatCard
                  icon={BadgeCheck}
                  iconBg="bg-green-100"
                  iconColor="text-green-600"
                  title="Ongoing Internship"
                  value="1"
                  subtitle="Currently Active"
                />

                <InternshipStatCard
                  icon={CircleCheckBig}
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                  title="Completed"
                  value="2"
                  subtitle="Successfully Finished"
                />

                <InternshipStatCard
                  icon={Building2}
                  iconBg="bg-orange-100"
                  iconColor="text-orange-600"
                  title="Companies"
                  value="2"
                  subtitle="Worked With"
                />

                <InternshipStatCard
                  icon={Star}
                  iconBg="bg-yellow-100"
                  iconColor="text-yellow-600"
                  title="Average Rating"
                  value="4.6"
                  subtitle="Out of 5"
                />
              </div>

              {/* ==========================================================
                          Previous Internships
              ========================================================== */}

              <PreviousInternships />
            </div>
          </div>

          {/* ==========================================================
                          Ongoing Internship
          ========================================================== */}

          <div className="mt-2">
            <OngoingInternship />
          </div>

          {/* ==========================================================
                            Information
          ========================================================== */}

          {/*
          <div className="mt-2">
            <InternshipInfo />
          </div>
          */}
        </main>
      </div>
    </div>
  );
};

export default Internships;