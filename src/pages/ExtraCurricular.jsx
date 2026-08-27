import React, { useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import ExtraCurricularBanner from "../components/ExtraCurricular/ExtraCurricularBanner";
import ExtraCurricularStats from "../components/ExtraCurricular/ExtraCurricularStats";
import ExtraCurricularActivityList from "../components/ExtraCurricular/ExtraCurricularActivityList";
import UploadExtraCurricularCard from "../components/ExtraCurricular/UploadExtraCurricularCard";
import ExtraCurricularTips from "../components/ExtraCurricular/ExtraCurricularTips";
import UploadExtraCurricularModal from "../components/ExtraCurricular/UploadExtraCurricularModal";

const ExtraCurricular = () => {
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
            <ExtraCurricularBanner />
          </div>

          {/* Stats */}
          <div className="mb-3">
            <ExtraCurricularStats />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-3 items-start">

            {/* Left Section */}
            <div className="col-span-8">
              <ExtraCurricularActivityList
                onUploadClick={() => setIsUploadModalOpen(true)}
              />
            </div>

            {/* Right Section */}
            <div className="col-span-4 flex flex-col gap-3">

              <UploadExtraCurricularCard
                onUploadClick={() => setIsUploadModalOpen(true)}
              />

              <ExtraCurricularTips />

            </div>

          </div>

        </main>
      </div>

      {/* Upload Modal */}
      <UploadExtraCurricularModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default ExtraCurricular;