import React, { useState } from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AdminBackButton from "../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../components/Admin/Students/Header/AdminStudentTabs";

import CoCurricularBanner from "../../components/CoCurricular/CoCurricularBanner";
import CoCurricularStats from "../../components/CoCurricular/CoCurricularStats";
import CoCurricularActivityList from "../../components/CoCurricular/CoCurricularActivityList";
import UploadCoCurricularCard from "../../components/CoCurricular/UploadCoCurricularCard";
import CoCurricularTips from "../../components/CoCurricular/CoCurricularTips";
import UploadCoCurricularModal from "../../components/CoCurricular/UploadCoCurricularModal";

const AdminStudentCoCurricular = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main Content ================= */}

      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* ================= Header ================= */}

        <AdminHeader />

        {/* ================= Page Content ================= */}

        <main className="flex-1 p-6">
          {/* ================= Top Header ================= */}

          <div className="mb-4">
            <AdminBackButton />
          </div>

          {/* ================= Student Tabs ================= */}

          <div className="mb-3">
            <AdminStudentTabs />
          </div>

          {/* ================= Banner ================= */}

          <div className="mb-3">
            <CoCurricularBanner />
          </div>

          {/* ================= Stats ================= */}

          <div className="mb-3">
            <CoCurricularStats />
          </div>

          {/* ================= Main Content ================= */}

          <div className="grid grid-cols-12 gap-3 items-start">
            {/* Left Section */}

            <div className="col-span-8">
              <CoCurricularActivityList
                onUploadClick={() => setIsUploadModalOpen(true)}
              />
            </div>

            {/* Right Section */}

            <div className="col-span-4 flex flex-col gap-3">
              <UploadCoCurricularCard
                onUploadClick={() => setIsUploadModalOpen(true)}
              />

              <CoCurricularTips />
            </div>
          </div>
        </main>
      </div>

      {/* ================= Upload Modal ================= */}

      <UploadCoCurricularModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default AdminStudentCoCurricular;