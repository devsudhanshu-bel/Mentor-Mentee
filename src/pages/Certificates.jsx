import React, { useState } from "react";

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
  // UPLOAD MODAL
  // ==========================================================

  const [isUploadModalOpen, setIsUploadModalOpen] =
    useState(false);

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

      <div className="ml-[290px] min-h-screen flex flex-col">

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
            <CertificatesStats />
          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="grid grid-cols-12 gap-3 items-start">

            {/* ==================================================
                LEFT SECTION
            ================================================== */}

            <div className="col-span-8">

              <CertificateList
                onUploadClick={() =>
                  setIsUploadModalOpen(true)
                }
              />

            </div>

            {/* ==================================================
                RIGHT SECTION
            ================================================== */}

            <div className="col-span-4 flex flex-col gap-3">

              {/* TIPS */}

              <CertificatesTips />

              {/* UPLOAD CARD */}

              <UploadCertificateCard
                onUploadClick={() =>
                  setIsUploadModalOpen(true)
                }
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
        onClose={() =>
          setIsUploadModalOpen(false)
        }
      />

    </div>
  );
};

export default Certificates;