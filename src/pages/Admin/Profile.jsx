import React from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import PageTitle from "../../components/Admin/Profile/Header/PageTitle";
import EditProfileButton from "../../components/Admin/Profile/Header/EditProfileButton";

import ProfileCard from "../../components/Admin/Profile/Hero/ProfileCard";
import ProfileOverview from "../../components/Admin/Profile/Hero/ProfileOverview";

import PersonalInformation from "../../components/Admin/Profile/Information/PersonalInformation";
import ProfessionalInformation from "../../components/Admin/Profile/Information/ProfessionalInformation";

import AboutMe from "../../components/Admin/Profile/About/AboutMe";
import AccountSettings from "../../components/Admin/Profile/Settings/AccountSettings";

import SupportCard from "../../components/Admin/Profile/Support/SupportCard";

const Profile = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}
      <AdminSidebar />

      {/* ================= Main Content ================= */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* ================= Header ================= */}
        <AdminHeader />

        {/* ================= Page Content ================= */}
        <main className="flex-1 px-6 py-6 space-y-2">
          {/* ================= Page Header ================= */}
          <div className="flex items-start justify-between">
            <PageTitle />
            <EditProfileButton />
          </div>

          {/* ================= Hero Section ================= */}
          <div className="grid grid-cols-12 gap-2 items-start">
            {/* Left */}
            <div className="col-span-5">
              <ProfileCard />
            </div>

            {/* Right */}
            <div className="col-span-7">
              <ProfileOverview />
            </div>
          </div>

          {/* ================= Information Section ================= */}
          <div className="grid grid-cols-12 gap-2">
            {/* ================= Personal Information ================= */}
            <div className="col-span-4">
              <PersonalInformation />
            </div>

            {/* ================= Professional Information ================= */}
            <div className="col-span-4">
              <ProfessionalInformation />
            </div>

            {/* ================= About + Settings ================= */}
            <div className="col-span-4 space-y-2">
              <AboutMe />
              <AccountSettings />
            </div>
          </div>

          {/* ================= Support ================= */}
          <SupportCard />
        </main>
      </div>
    </div>
  );
};

export default Profile;