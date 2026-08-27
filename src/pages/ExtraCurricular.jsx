import React, { useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import ExtraCurricularBanner from "../components/ExtraCurricular/ExtraCurricularBanner";
import ExtraCurricularStats from "../components/ExtraCurricular/ExtraCurricularStats";
import ExtraCurricularActivityList from "../components/ExtraCurricular/ExtraCurricularActivityList";
import UploadExtraCurricularCard from "../components/ExtraCurricular/UploadExtraCurricularCard";
import UploadExtraCurricularModal from "../components/ExtraCurricular/UploadExtraCurricularModal";
import ExtraCurricularDocumentViewerModal from "../components/ExtraCurricular/ExtraCurricularDocumentViewerModal";

const ExtraCurricular = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] =
    useState(false);

  const [isViewerOpen, setIsViewerOpen] =
    useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  // ==========================================================
  // OPEN UPLOAD MODAL
  // ==========================================================

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  // ==========================================================
  // UPLOAD SUCCESS
  // ==========================================================

  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);

    setRefreshKey(
      (previous) => previous + 1
    );
  };

  // ==========================================================
  // OPEN DOCUMENT PREVIEW
  // ==========================================================

  const handleViewDocument = (document) => {
    if (!document) {
      return;
    }

    setSelectedDocument(document);
    setIsViewerOpen(true);
  };

  // ==========================================================
  // CLOSE DOCUMENT PREVIEW
  // ==========================================================

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedDocument(null);
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

        {/* ==================================================
            HEADER
        ================================================== */}

        <Header />

        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main className="flex-1 p-6">

          {/* ==================================================
              BANNER
          ================================================== */}

          <div className="mb-3">
            <ExtraCurricularBanner />
          </div>

          {/* ==================================================
              STATS
          ================================================== */}

          <div className="mb-3">

            <ExtraCurricularStats
              key={`stats-${refreshKey}`}
            />

          </div>

          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div className="grid grid-cols-12 gap-3 items-start">

            {/* ==================================================
                LEFT SECTION
            ================================================== */}

            <div className="col-span-8">

              <ExtraCurricularActivityList
                key={`list-${refreshKey}`}
                onUploadClick={
                  handleUploadClick
                }
                onView={
                  handleViewDocument
                }
              />

            </div>

            {/* ==================================================
                RIGHT SECTION
            ================================================== */}

            <div className="col-span-4">

              <UploadExtraCurricularCard
                onUploadClick={
                  handleUploadClick
                }
              />

            </div>

          </div>

        </main>

      </div>

      {/* ======================================================
          UPLOAD MODAL
      ====================================================== */}

      <UploadExtraCurricularModal
        isOpen={isUploadModalOpen}

        onClose={() =>
          setIsUploadModalOpen(false)
        }

        onSuccess={
          handleUploadSuccess
        }
      />

      {/* ======================================================
          DOCUMENT VIEWER
      ====================================================== */}

      <ExtraCurricularDocumentViewerModal
        isOpen={isViewerOpen}
        document={selectedDocument}
        onClose={
          handleCloseViewer
        }
      />

    </div>
  );
};

export default ExtraCurricular;