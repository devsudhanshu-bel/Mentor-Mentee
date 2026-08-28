import React from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import InternshipStats from "../components/Internships/InternshipStats";
import OngoingInternship from "../components/Internships/OngoingInternship";
import InternshipHistory from "../components/Internships/InternshipHistory";
import ResumeCard from "../components/Internships/ResumeCard";

const Internships = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* ====================================================
          SIDEBAR
      ==================================================== */}

      <Sidebar />

      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <div className="ml-[290px] min-h-screen flex flex-col">

        {/* ==================================================
            HEADER
        ================================================== */}

        <Header />

        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main className="flex-1 px-4 py-4 space-y-4">

          {/* ==================================================
              STATS
          ================================================== */}

          <InternshipStats />

          {/* ==================================================
              CURRENT INTERNSHIP + RESUME
          ================================================== */}

          <div className="grid grid-cols-12 gap-4 items-start">

            {/* ==================================================
                ONGOING INTERNSHIP
            ================================================== */}

            <div className="col-span-12 xl:col-span-8">

              <OngoingInternship />

            </div>

            {/* ==================================================
                RESUME
            ================================================== */}

            <div className="col-span-12 xl:col-span-4">

              <ResumeCard />

            </div>

          </div>

          {/* ==================================================
              INTERNSHIP HISTORY
          ================================================== */}

          <div className="grid grid-cols-12">

            <div className="col-span-12">

              <InternshipHistory />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Internships;