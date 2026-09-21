import React, { useEffect, useState } from "react";

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

import {
  getMentorProfile,
  updateMentorProfile,
} from "../../api/profile.api";

const Profile = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Fetch Mentor Profile
  |--------------------------------------------------------------------------
  */

  const fetchMentorProfile = async () => {
    try {
      setLoading(true);

      const response = await getMentorProfile();

      console.log("Mentor profile response:", response);

      if (response?.profileExists && response?.profile) {
        setMentor(response.profile);
      } else {
        setMentor(null);
      }
    } catch (error) {
      console.error("Failed to fetch mentor profile:", error);
      setMentor(null);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Profile Fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchMentorProfile();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Update Mentor Profile
  |--------------------------------------------------------------------------
  |
  | Both Professional Information and About Me use the same backend
  | endpoint:
  |
  | PUT /api/mentor/profile
  |
  | The backend decides which fields belong to teachers and which
  | fields belong to teacher_profiles.
  |
  */

  const handleProfileSave = async (updatedData) => {
    try {
      console.log("Updating mentor profile:", updatedData);

      const response = await updateMentorProfile(updatedData);

      console.log("Updated mentor profile response:", response);

      /*
       * The API returns:
       *
       * {
       *   profileExists: true,
       *   profile: {...}
       * }
       */

      if (response?.profileExists && response?.profile) {
        setMentor(response.profile);
      } else {
        /*
         * Fallback:
         * If the update response doesn't contain the complete profile,
         * fetch the latest profile from the backend.
         */
        await fetchMentorProfile();
      }

      return response;
    } catch (error) {
      console.error("Failed to update mentor profile:", error);

      throw error;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main Content ================= */}

      <div className="ml-[290px] flex min-h-screen flex-col">

        {/* ================= Header ================= */}

        <AdminHeader />

        {/* ================= Page Content ================= */}

        <main className="flex-1 space-y-2 px-6 py-6">

          {/* ================= Page Header ================= */}

          <div className="flex items-start justify-between">
            <PageTitle />
            <EditProfileButton />
          </div>

          {/* ================= Hero Section ================= */}

          <div className="grid grid-cols-12 items-start gap-2">

            {/* ================= Profile Card ================= */}

            <div className="col-span-5">
              <ProfileCard
                mentor={mentor}
                loading={loading}
              />
            </div>

            {/* ================= Mentoring Overview ================= */}

            <div className="col-span-7">
              <ProfileOverview
                mentor={mentor}
                loading={loading}
              />
            </div>
          </div>

          {/* ================= Information Section ================= */}

          <div className="grid grid-cols-12 gap-2">

            {/* ================= Personal Information ================= */}

            <div className="col-span-4">
              <PersonalInformation
                mentor={mentor}
                loading={loading}
              />
            </div>

            {/* ================= Professional Information ================= */}

            <div className="col-span-4">
              <ProfessionalInformation
                mentor={mentor}
                loading={loading}
                onSave={handleProfileSave}
              />
            </div>

            {/* ================= About + Settings ================= */}

            <div className="col-span-4 space-y-2">

              <AboutMe
                mentor={mentor}
                loading={loading}
                onSave={handleProfileSave}
              />

              <AccountSettings
                mentor={mentor}
                loading={loading}
              />

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