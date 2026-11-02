
import React, { useState } from "react";

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

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // ==========================================================
  // UPLOAD SUCCESS
  // ==========================================================

  const handleUploadSuccess = (response) => {
    console.log("Award uploaded successfully:", response);

    // Reload the complete Awards page.
    // This refreshes KPIs, achievement list, and backend data.
    window.location.reload();
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex min-h-screen min-w-0 w-full flex-col lg:ml-[290px] lg:w-[calc(100%-290px)]">
        {/* HEADER */}
        <Header />

        {/* PAGE CONTENT */}
        <main className="w-full min-w-0 flex-1 p-3 sm:p-4 md:p-5 lg:p-6">
          {/* BANNER */}
          <div className="mb-3 min-w-0">
            <AwardsBanner />
          </div>

          {/* STATS */}
          <div className="mb-3 min-w-0">
            <AwardsStats />
          </div>

          {/* MAIN CONTENT */}
          <div className="grid min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-12">
            {/* LEFT SECTION */}
            <div className="min-w-0 xl:col-span-8">
              <AchievementList
                onUploadClick={() => setIsUploadModalOpen(true)}
              />
            </div>

            {/* RIGHT SECTION */}
            <div className="flex min-w-0 flex-col gap-3 xl:col-span-4">
              <AwardsTips />

              <UploadAchievementCard
                onUploadClick={() => setIsUploadModalOpen(true)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* UPLOAD ACHIEVEMENT MODAL */}
      <UploadAchievementModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default Awards;
