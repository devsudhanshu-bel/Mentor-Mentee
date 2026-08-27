import React, { useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileTabs from "../components/Profile/ProfileTabs";

import PersonalInformationCard from "../components/Profile/PersonalInformationCard";
import ParentGuardianCard from "../components/Profile/ParentGuardianCard";
import ContactDetailsCard from "../components/Profile/ContactDetailsCard";
import AcademicInformationCard from "../components/Profile/AcademicInformationCard";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInformationCard />;

      case "parent":
        return <ParentGuardianCard />;

      case "contact":
        return <ContactDetailsCard />;

      case "academic":
        return <AcademicInformationCard />;

      default:
        return <PersonalInformationCard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Profile Content */}
        <main className="flex-1 px-4 py-4 space-y-4">
          {/* Profile Header */}
          <ProfileHeader />

          {/* Profile Navigation Tabs */}
          <ProfileTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Selected Profile Section */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;