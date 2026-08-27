import React, {
  useState,
} from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import AwardsBanner from "../components/Awards/AwardsBanner";
import AwardsStats from "../components/Awards/AwardsStats";
import AchievementList from "../components/Awards/AchievementList";
import AwardsTips from "../components/Awards/AwardsTips";
import UploadAchievementCard from "../components/Awards/UploadAchievementCard";
import UploadAchievementModal from "../components/Awards/UploadAchievementModal";

const Awards = () => {
  // ==========================================================
  // UPLOAD MODAL
  // ==========================================================

  const [
    isUploadModalOpen,
    setIsUploadModalOpen,
  ] = useState(false);

  // ==========================================================
  // UPLOAD SUCCESS
  // ==========================================================

  const handleUploadSuccess = (
    response
  ) => {
    console.log(
      "Award uploaded successfully:",
      response
    );

    // Reload the complete Awards page.
    // This refreshes:
    // - KPIs
    // - Achievement list
    // - All backend data
    window.location.reload();
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="ml-[290px] min-h-screen flex flex-col">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <Header />

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="flex-1 p-6">

          {/* ==================================================
              BANNER
          ================================================== */}

          <div className="mb-3">
            <AwardsBanner />
          </div>

          {/* ==================================================
              STATS
          ================================================== */}

          <div className="mb-3">
            <AwardsStats />
          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="grid grid-cols-12 gap-3 items-start">

            {/* =================================================
                LEFT SECTION
            ================================================= */}

            <div className="col-span-8">

              <AchievementList
                onUploadClick={() =>
                  setIsUploadModalOpen(
                    true
                  )
                }
              />

            </div>

            {/* =================================================
                RIGHT SECTION
            ================================================= */}

            <div className="col-span-4 flex flex-col gap-3">

              <AwardsTips />

              <UploadAchievementCard
                onUploadClick={() =>
                  setIsUploadModalOpen(
                    true
                  )
                }
              />

            </div>

          </div>

        </main>

      </div>

      {/* ======================================================
          UPLOAD ACHIEVEMENT MODAL
      ====================================================== */}

      <UploadAchievementModal
        isOpen={
          isUploadModalOpen
        }
        onClose={() =>
          setIsUploadModalOpen(
            false
          )
        }
        onUploadSuccess={
          handleUploadSuccess
        }
      />

    </div>
  );
};

export default Awards;