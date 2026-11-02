
import React, { useEffect, useState } from "react";

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
  const [profileImageVersion, setProfileImageVersion] = useState(0);

  // --------------------------------------------------
  // PROFILE IMAGE UPDATE LISTENER
  // --------------------------------------------------

  useEffect(() => {
    const handleProfileUpdate = () => {
      setProfileImageVersion((version) => version + 1);
    };

    window.addEventListener(
      "student-profile-updated",
      handleProfileUpdate
    );

    return () => {
      window.removeEventListener(
        "student-profile-updated",
        handleProfileUpdate
      );
    };
  }, []);

  // --------------------------------------------------
  // PROFILE CONTENT
  // --------------------------------------------------

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

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-slate-100
      "
      data-profile-image-version={profileImageVersion}
    >
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
        className="
          flex
          min-h-screen
          min-w-0
          w-full
          flex-col
          ml-0
          lg:ml-[290px]
          lg:w-[calc(100%-290px)]
        "
      >
        {/* HEADER */}

        <div className="sticky top-0 z-40 w-full min-w-0">
          <Header />
        </div>

        {/* PROFILE CONTENT */}

        <main
          className="
            w-full
            min-w-0
            flex-1
            px-3
            py-4
            space-y-5
            sm:px-5
            sm:py-5
            sm:space-y-6
            lg:px-6
            lg:py-6
            2xl:px-8
          "
        >
          {/* PROFILE HEADER */}

          <section className="w-full min-w-0">
            <ProfileHeader />
          </section>

          {/* PROFILE TABS */}

          <section className="w-full min-w-0">
            <ProfileTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </section>

          {/* PROFILE INFORMATION */}

          <section
            className="
              w-full
              min-w-0
              rounded-2xl
            "
          >
            {renderContent()}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
