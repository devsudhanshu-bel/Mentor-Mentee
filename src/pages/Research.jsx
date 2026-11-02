
import React, { useState, useCallback } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import ResearchBanner from "../components/Research/ResearchBanner";
import ResearchStats from "../components/Research/ResearchStats";
import ResearchWorkList from "../components/Research/ResearchWorkList";
import UploadResearchCard from "../components/Research/UploadResearchCard";
import ResearchTips from "../components/Research/ResearchTips";
import EditResearchModal from "../components/Research/EditResearchModal";

import { updateDocument } from "../api/document.api";

const Research = () => {
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Open edit modal.
  const handleEditResearch = useCallback((research) => {
    console.log("Selected research for editing:", research);

    if (!research?.id) {
      console.error("Research document is missing its ID:", research);
      return;
    }

    setSelectedResearch(research);
    setIsEditModalOpen(true);
  }, []);

  // Close edit modal.
  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedResearch(null);
  }, []);

  // Update the existing document.
  const handleSaveResearch = useCallback(
    async ({ id, documentName, description, file }) => {
      if (!id || typeof id !== "string") {
        throw new Error("Research document ID is missing or invalid.");
      }

      console.log("Updating research document ID:", id);

      // Do not apply CUID validation here.
      // This project generates document IDs using crypto.randomUUID().
      return updateDocument({
        documentId: id,
        documentName,
        category: "RESEARCH",
        description,
        file,
      });
    },
    []
  );

  // Refresh the research list after successful resubmission.
  const handleResearchUpdated = useCallback(() => {
    setRefreshKey((previous) => previous + 1);
    handleCloseEditModal();
  }, [handleCloseEditModal]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-col lg:ml-[290px] lg:w-[calc(100%-290px)]">
        <Header />

        <main className="w-full min-w-0 flex-1 p-3 sm:p-5 lg:p-6">
          {/* Research Banner */}
          <div className="mb-4 min-w-0 sm:mb-6">
            <ResearchBanner />
          </div>

          {/* Research Statistics */}
          <div className="mb-4 min-w-0 sm:mb-6">
            <ResearchStats key={refreshKey} />
          </div>

          {/* Main Content */}
          <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
            {/* Research Work List */}
            <div className="min-w-0 lg:col-span-8">
              <ResearchWorkList
                key={refreshKey}
                onEditResearch={handleEditResearch}
              />
            </div>

            {/* Sidebar Cards */}
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:col-span-4 lg:gap-6">
              <UploadResearchCard />
              <ResearchTips />
            </div>
          </div>
        </main>
      </div>

      {/* Edit Research Modal */}
      <EditResearchModal
        isOpen={isEditModalOpen}
        research={selectedResearch}
        onClose={handleCloseEditModal}
        onSave={handleSaveResearch}
        onSuccess={handleResearchUpdated}
      />
    </div>
  );
};

export default Research;
