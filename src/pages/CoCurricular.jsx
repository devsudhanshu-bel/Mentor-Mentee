
import React, { useCallback, useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import CoCurricularBanner from "../components/CoCurricular/CoCurricularBanner";
import CoCurricularStats from "../components/CoCurricular/CoCurricularStats";
import CoCurricularActivityList from "../components/CoCurricular/CoCurricularActivityList";
import UploadCoCurricularCard from "../components/CoCurricular/UploadCoCurricularCard";
import CoCurricularTips from "../components/CoCurricular/CoCurricularTips";
import UploadCoCurricularModal from "../components/CoCurricular/UploadCoCurricularModal";
import EditCoCurricularModal from "../components/CoCurricular/EditCoCurricularModal";

import { updateDocument } from "../api/document.api";

const CoCurricular = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // ==========================================================
  // OPEN EDIT MODAL
  // ==========================================================

  const handleEditActivity = useCallback((activity) => {
    if (!activity?.id) {
      console.error("Co-Curricular activity is missing its ID:", activity);
      alert("Unable to edit this activity because its ID is missing.");
      return;
    }

    setSelectedActivity(activity);
    setIsEditModalOpen(true);
  }, []);

  // ==========================================================
  // CLOSE EDIT MODAL
  // ==========================================================

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedActivity(null);
  }, []);

  // ==========================================================
  // SAVE EDITED ACTIVITY
  // ==========================================================

  const handleSaveActivity = useCallback(
    async ({ id, documentName, description, file }) => {
      if (!id || typeof id !== "string") {
        throw new Error("Co-Curricular activity ID is missing or invalid.");
      }

      return updateDocument({
        documentId: id,
        documentName,
        category: "CO_CURRICULAR",
        description,
        file,
      });
    },
    []
  );

  // ==========================================================
  // REFRESH AFTER EDIT
  // ==========================================================

  const handleActivityUpdated = useCallback(() => {
    setRefreshKey((previous) => previous + 1);
    handleCloseEditModal();
  }, [handleCloseEditModal]);

  // ==========================================================
  // REFRESH AFTER UPLOAD
  // ==========================================================

  const handleUploadSuccess = useCallback(() => {
    setIsUploadModalOpen(false);
    setRefreshKey((previous) => previous + 1);
  }, []);

  // ==========================================================
  // OPEN UPLOAD MODAL
  // ==========================================================

  const handleOpenUploadModal = useCallback(() => {
    setIsUploadModalOpen(true);
  }, []);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      <Sidebar />

      {/* PAGE CONTENT */}

      <div className="flex min-h-screen min-w-0 flex-col lg:ml-[290px]">
        <Header />

        <main className="w-full min-w-0 flex-1 p-3 sm:p-4 md:p-5 lg:p-6">

          {/* BANNER */}

          <div className="mb-3 min-w-0">
            <CoCurricularBanner />
          </div>

          {/* STATS */}

          <div className="mb-3 min-w-0">
            <CoCurricularStats refreshKey={refreshKey} />
          </div>

          {/* MAIN CONTENT */}

          <div className="grid min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-12">

            {/* ACTIVITY LIST */}

            <div className="min-w-0 xl:col-span-8">
              <CoCurricularActivityList
                key={`activities-${refreshKey}`}
                onUploadClick={handleOpenUploadModal}
                onEditActivity={handleEditActivity}
              />
            </div>

            {/* RIGHT SIDEBAR */}

            <div className="flex min-w-0 flex-col gap-3 xl:col-span-4">
              <UploadCoCurricularCard
                onUploadClick={handleOpenUploadModal}
              />

              <CoCurricularTips />
            </div>
          </div>
        </main>
      </div>

      {/* UPLOAD MODAL */}

      <UploadCoCurricularModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* EDIT / REPLACE MODAL */}

      <EditCoCurricularModal
        isOpen={isEditModalOpen}
        activity={selectedActivity}
        onClose={handleCloseEditModal}
        onSave={handleSaveActivity}
        onSuccess={handleActivityUpdated}
      />
    </div>
  );
};

export default CoCurricular;
