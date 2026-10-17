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
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-[290px] min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <ResearchBanner />
          </div>

          <div className="mb-6">
            <ResearchStats key={refreshKey} />
          </div>

          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-8">
              <ResearchWorkList
                key={refreshKey}
                onEditResearch={handleEditResearch}
              />
            </div>

            <div className="col-span-4 flex flex-col gap-6">
              <UploadResearchCard />
              <ResearchTips />
            </div>
          </div>
        </main>
      </div>

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