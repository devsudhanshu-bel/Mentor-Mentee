import React from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import ResearchBanner from "../components/Research/ResearchBanner";
import ResearchStats from "../components/Research/ResearchStats";
import ResearchWorkList from "../components/Research/ResearchWorkList";
import UploadResearchCard from "../components/Research/UploadResearchCard";
import ResearchTips from "../components/Research/ResearchTips";

const Research = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="ml-[290px] min-h-screen flex flex-col">

        {/* HEADER */}

        <Header />

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main className="flex-1 p-6">

          {/* =================================================
              BANNER
          ================================================= */}

          <div className="mb-6">
            <ResearchBanner />
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mb-6">
            <ResearchStats />
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="grid grid-cols-12 gap-6 items-start">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="col-span-8">

              <ResearchWorkList />

            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="col-span-4 flex flex-col gap-6">

              <UploadResearchCard />

              <ResearchTips />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Research;