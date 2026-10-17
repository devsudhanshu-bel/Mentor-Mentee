import React, { useState, useCallback } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import CertificatesBanner from "../components/Certificates/CertificatesBanner";
import CertificatesStats from "../components/Certificates/CertificatesStats";
import CertificateList from "../components/Certificates/CertificateList";
import CertificatesTips from "../components/Certificates/CertificatesTips";
import UploadCertificateCard from "../components/Certificates/UploadCertificateCard";
import UploadCertificateModal from "../components/Certificates/UploadCertificateModal";

const Certificates = () => {
  // ==========================================================
  // MODAL STATE
  // ==========================================================

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // ==========================================================
  // REFRESH STATE
  // Refreshes certificate statistics and list after changes.
  // ==========================================================

  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenUploadModal = useCallback(() => {
    setIsUploadModalOpen(true);
  }, []);

  const handleCloseUploadModal = useCallback(() => {
    setIsUploadModalOpen(false);
  }, []);

  const handleCertificatesRefresh = useCallback(() => {
    setRefreshKey((previousKey) => previousKey + 1);
  }, []);

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

      <div className="ml-[290px] flex min-h-screen flex-col">
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
            <CertificatesBanner />
          </div>

          {/* ==================================================
              STATISTICS
          ================================================== */}

          <div className="mb-3">
            <CertificatesStats refreshKey={refreshKey} />
          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="grid grid-cols-12 items-start gap-3">
            {/* ==================================================
                LEFT SECTION — CERTIFICATE LIST
            ================================================== */}

            <div className="col-span-8">
              <CertificateList
                onUploadClick={handleOpenUploadModal}
                refreshKey={refreshKey}
                onRefresh={handleCertificatesRefresh}
              />
            </div>

            {/* ==================================================
                RIGHT SECTION — TIPS AND UPLOAD CARD
            ================================================== */}

            <div className="col-span-4 flex flex-col gap-3">
              <CertificatesTips />

              <UploadCertificateCard
                onUploadClick={handleOpenUploadModal}
              />
            </div>
          </div>
        </main>
      </div>

      {/* ======================================================
          UPLOAD CERTIFICATE MODAL
      ====================================================== */}

      <UploadCertificateModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSuccess={() => {
          handleCertificatesRefresh();
          handleCloseUploadModal();
        }}
      />
    </div>
  );
};

export default Certificates;