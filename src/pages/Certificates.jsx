import React, { useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import CertificatesBanner from "../components/Certificates/CertificatesBanner";
import CertificatesStats from "../components/Certificates/CertificatesStats";
import CertificateList from "../components/Certificates/CertificateList";
import CertificateChart from "../components/Certificates/CertificateChart";
import CertificatesTips from "../components/Certificates/CertificatesTips";
import UploadCertificateCard from "../components/Certificates/UploadCertificateCard";
import UploadCertificateModal from "../components/Certificates/UploadCertificateModal";

const Certificates = () => {
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
            <CertificatesBanner />
          </div>

          {/* Stats */}
          <div className="mb-3">
            <CertificatesStats />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-3 items-start">

            {/* Left Section */}
            <div className="col-span-8">
              <CertificateList
                onUploadClick={() => setIsUploadModalOpen(true)}
              />
            </div>

            {/* Right Section */}
            <div className="col-span-4 flex flex-col gap-3">

              <CertificateChart />

              <CertificatesTips />

              <UploadCertificateCard
                onUploadClick={() => setIsUploadModalOpen(true)}
              />

            </div>

          </div>

        </main>
      </div>

      {/* Upload Certificate Modal */}
      <UploadCertificateModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default Certificates;