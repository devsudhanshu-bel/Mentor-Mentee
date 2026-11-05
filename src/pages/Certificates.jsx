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
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* ======================================================
          MAIN CONTENT
          Desktop: Sidebar offset
          Tablet/Mobile: Full width
      ====================================================== */}

      <div className="flex min-h-screen min-w-0 flex-col md:ml-0 lg:ml-[290px]">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <Header />

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="w-full min-w-0 flex-1 p-3 sm:p-4 md:p-5 lg:p-6">

          {/* ==================================================
              BANNER
          ================================================== */}

          <div className="mb-3 w-full min-w-0">
            <CertificatesBanner />
          </div>

          {/* ==================================================
              STATISTICS
          ================================================== */}

          <div className="mb-3 w-full min-w-0">
            <CertificatesStats refreshKey={refreshKey} />
          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="grid w-full min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-12">

            {/* ==================================================
                LEFT SECTION — CERTIFICATE LIST
            ================================================== */}

            <div className="min-w-0 xl:col-span-8">
              <CertificateList
                onUploadClick={handleOpenUploadModal}
                refreshKey={refreshKey}
                onRefresh={handleCertificatesRefresh}
              />
            </div>

            {/* ==================================================
                RIGHT SECTION — TIPS AND UPLOAD CARD
            ================================================== */}

            <div className="flex min-w-0 flex-col gap-3 xl:col-span-4">

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