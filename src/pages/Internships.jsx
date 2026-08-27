import React from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import InternshipStats from "../components/Internships/InternshipStats";
import ApplicationStatus from "../components/Internships/ApplicationStatus";
import LatestApplications from "../components/Internships/LatestApplications";
import UpcomingDeadlines from "../components/Internships/UpcomingDeadlines";
import OngoingInternship from "../components/Internships/OngoingInternship";
import InternshipResources from "../components/Internships/InternshipResources";

const Internships = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Internship Page */}
        <main className="flex-1 px-4 py-4 space-y-4">
          {/* ================= Top Section ================= */}
          <InternshipStats />

          {/* ================= Second Row ================= */}
          <div className="grid grid-cols-12 gap-4">
            {/* Application Status */}
            <div className="col-span-12 xl:col-span-4">
              <ApplicationStatus />
            </div>

            {/* Latest Applications */}
            <div className="col-span-12 xl:col-span-4">
              <LatestApplications />
            </div>

            {/* Upcoming Deadlines */}
            <div className="col-span-12 xl:col-span-4">
              <UpcomingDeadlines />
            </div>
          </div>

          {/* ================= Third Row ================= */}
          <div className="grid grid-cols-12 gap-4">
            {/* Ongoing Internship */}
            <div className="col-span-12 xl:col-span-8">
              <OngoingInternship />
            </div>

            {/* Resources */}
            <div className="col-span-12 xl:col-span-4">
              <InternshipResources />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Internships;