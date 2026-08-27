import React, { useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import CoCurricularBanner from "../components/CoCurricular/CoCurricularBanner";
import CoCurricularStats from "../components/CoCurricular/CoCurricularStats";
import CoCurricularActivityList from "../components/CoCurricular/CoCurricularActivityList";
import UploadCoCurricularCard from "../components/CoCurricular/UploadCoCurricularCard";
import CoCurricularTips from "../components/CoCurricular/CoCurricularTips";
import UploadCoCurricularModal from "../components/CoCurricular/UploadCoCurricularModal";

const CoCurricular = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  // ==========================================================
  // UPLOAD SUCCESS
  // ==========================================================

  const handleUploadSuccess = () => {
    // Close modal
    setIsUploadModalOpen(false);

    // Refresh all data-dependent components
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <Sidebar />

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="ml-[290px] min-h-screen flex flex-col">

        {/* Header */}

        <Header />

        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main className="flex-1 p-6">

          {/* ==================================================
              BANNER
          ================================================== */}

          <div className="mb-3">
            <CoCurricularBanner />
          </div>

          {/* ==================================================
              STATS
          ================================================== */}

          <div className="mb-3">

            <CoCurricularStats
              key={`stats-${refreshKey}`}
            />

          </div>

          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div className="grid grid-cols-12 gap-3 items-start">

            {/* ==================================================
                LEFT
            ================================================== */}

            <div className="col-span-8">

              <CoCurricularActivityList
                key={`list-${refreshKey}`}
                onUploadClick={() =>
                  setIsUploadModalOpen(true)
                }
              />

            </div>

            {/* ==================================================
                RIGHT
            ================================================== */}

            <div className="col-span-4 flex flex-col gap-3">

              <UploadCoCurricularCard
                onUploadClick={() =>
                  setIsUploadModalOpen(true)
                }
              />

              <CoCurricularTips />

            </div>

          </div>

        </main>

      </div>

      {/* ==================================================
          UPLOAD MODAL
      ================================================== */}

      <UploadCoCurricularModal
        isOpen={isUploadModalOpen}

        onClose={() =>
          setIsUploadModalOpen(false)
        }

        onSuccess={handleUploadSuccess}
      />

    </div>
  );
};

export default CoCurricular;