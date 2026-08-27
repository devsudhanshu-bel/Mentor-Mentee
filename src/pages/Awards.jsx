import React, { useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import AwardsBanner from "../components/Awards/AwardsBanner";
import AwardsStats from "../components/Awards/AwardsStats";
import AchievementList from "../components/Awards/AchievementList";
import AchievementChart from "../components/Awards/AchievementChart";
import AwardsTips from "../components/Awards/AwardsTips";
import UploadAchievementCard from "../components/Awards/UploadAchievementCard";
import UploadAchievementModal from "../components/Awards/UploadAchievementModal";

const Awards = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6">

          {/* Banner */}
          <div className="mb-3">
            <AwardsBanner />
          </div>

          {/* Stats */}
          <div className="mb-3">
            <AwardsStats />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-3 items-start">

            {/* Left Section */}
            <div className="col-span-8">
              <AchievementList
                onUploadClick={() => setIsUploadModalOpen(true)}
              />
            </div>

            {/* Right Section */}
            <div className="col-span-4 flex flex-col gap-3">

              <AchievementChart />

              <AwardsTips />

              <UploadAchievementCard
                onUploadClick={() => setIsUploadModalOpen(true)}
              />

            </div>

          </div>

        </main>
      </div>

      {/* Upload Achievement Modal */}
      <UploadAchievementModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default Awards;