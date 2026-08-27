import React from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  Clock3,
} from "lucide-react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AdminBackButton from "../../components/Admin/Students/Header/AdminBackButton";
import AdminStudentTabs from "../../components/Admin/Students/Header/AdminStudentTabs";

import StudentProfileSidebar from "../../components/Mentors/Students/Sidebar/StudentProfileSidebar";

import CertificateStatCard from "../../components/Mentors/Students/Certificates/CertificateStatCard";
import StudentCertificatesTable from "../../components/Mentors/Students/Certificates/CertificateTable/StudentCertificatesTable";
import MentorNote from "../../components/Mentors/Students/Certificates/MentorNote";

const AdminStudentCertificates = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main ================= */}

      <div className="ml-[290px] min-h-screen">
        {/* ================= Header ================= */}

        <AdminHeader />

        {/* ================= Content ================= */}

        <main className="p-6">
          {/* ================= Top Header ================= */}

          <div className="mb-4">
            <AdminBackButton />
          </div>

          {/* ================= Dashboard Layout ================= */}

          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* ================= Left Sidebar ================= */}

            <div className="flex flex-col gap-2">
              <StudentProfileSidebar />
            </div>

            {/* ================= Right Content ================= */}

            <div className="flex flex-col gap-2">
              {/* ================= Student Tabs ================= */}

              <AdminStudentTabs />

              {/* ================= KPI Cards ================= */}

              <div className="grid grid-cols-4 gap-2">
                <CertificateStatCard
                  icon={Award}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Total Certificates"
                  value="14"
                  subtitle="All certificates uploaded"
                />

                <CertificateStatCard
                  icon={BadgeCheck}
                  iconBg="bg-green-100"
                  iconColor="text-green-600"
                  title="Verified Certificates"
                  value="11"
                  subtitle="Verified and approved"
                />

                <CertificateStatCard
                  icon={Clock3}
                  iconBg="bg-orange-100"
                  iconColor="text-orange-600"
                  title="Pending Verification"
                  value="3"
                  subtitle="Awaiting review"
                />

                <CertificateStatCard
                  icon={Building2}
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                  title="Organizations"
                  value="8"
                  subtitle="Issuing organizations"
                />
              </div>

              {/* ================= Certificates Table ================= */}

              <StudentCertificatesTable />

              {/* ================= Mentor Note ================= */}

              <MentorNote />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudentCertificates;