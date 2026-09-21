import React, { useEffect, useState } from "react";

import MentorSidebar from "../../components/layouts/MentorSidebar";
import MentorHeader from "../../components/layouts/MentorHeader";

import MentorProfileCard from "../../components/Mentors/Profile/MentorProfileCard";
import MentoringOverview from "../../components/Mentors/Profile/MentoringOverview";
import ProfessionalInformation from "../../components/Mentors/Profile/ProfessionalInformation";
import AboutMe from "../../components/Mentors/Profile/AboutMe";
import SocialLinks from "../../components/Mentors/Profile/SocialLinks";
import AccountPreferences from "../../components/Mentors/Profile/AccountPreferences";
import MentoringExpertise from "../../components/Mentors/Profile/MentoringExpertise";

import EditProfileModal from "../../components/Mentors/Profile/EditProfile/EditProfileModal";

import {
  getMentorProfile,
  updateMentorProfile,
} from "../../api/profile.api";

const Profile = () => {
  const [mentor, setMentor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  /* ==========================================================
     FETCH PROFILE
  ========================================================== */

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await getMentorProfile();

      console.log(
        "Mentor profile response:",
        response
      );

      if (
        response?.profileExists &&
        response?.profile
      ) {
        setMentor(response.profile);
      } else {
        setMentor(null);
      }
    } catch (error) {
      console.error(
        "Failed to fetch mentor profile:",
        error
      );

      setMentor(null);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ==========================================================
     SAVE MENTOR PROFILE
  ==========================================================
  
     This is the shared save handler for all editable
     profile cards.
  
     Currently connected to:
  
     - ProfessionalInformation
     - AboutMe
     - SocialLinks
  
     Later it can also be connected to:
  
     - MentorProfileCard
     - AccountPreferences
     - MentoringExpertise
  
     Backend endpoint:
  
     PUT /api/mentor/profile
  
  ========================================================== */

  const handleProfileSave = async (updatedData) => {
    try {
      console.log(
        "Saving mentor profile:",
        updatedData
      );

      /*
       * Send the updated fields to the backend.
       */

      const response = await updateMentorProfile(
        updatedData
      );

      console.log(
        "Updated mentor profile response:",
        response
      );

      /*
       * Backend returns:
       *
       * {
       *   profileExists: true,
       *   profile: {...}
       * }
       *
       * Replace local mentor state with the
       * fresh profile returned from the database.
       */

      if (
        response?.profileExists &&
        response?.profile
      ) {
        setMentor(response.profile);
      } else {
        /*
         * Fallback:
         *
         * If the update response doesn't contain
         * the expected profile, fetch it again.
         */

        await fetchProfile();
      }

      /*
       * Return the response to the component
       * that triggered the save.
       */

      return response;
    } catch (error) {
      console.error(
        "Failed to update mentor profile:",
        error
      );

      /*
       * Re-throw the error.
       *
       * This is important because the child component
       * needs to know that the save failed.
       */

      throw error;
    }
  };

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <>
      <div className="min-h-screen bg-slate-100">

        {/* ====================================================
            SIDEBAR
        ==================================================== */}

        <MentorSidebar />

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="ml-[290px] min-h-screen">

          {/* ==================================================
              HEADER
          ================================================== */}

          <MentorHeader />

          {/* ==================================================
              PAGE CONTENT
          ================================================== */}

          <main className="space-y-3 p-6">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="flex items-center justify-between">

              <div>

                <h1 className="text-2xl font-bold text-slate-900">
                  Mentor Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage your professional profile
                  and preferences.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setIsEditModalOpen(true)
                }
                className="rounded-lg border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                Edit Profile
              </button>

            </div>

            {/* ==================================================
                TOP SECTION
            ================================================== */}

            <div className="grid grid-cols-12 gap-3">

              {/* =================================================
                  PROFILE CARD
              ================================================= */}

              <div className="col-span-5">

                <MentorProfileCard
                  mentor={mentor}
                />

              </div>

              {/* =================================================
                  MENTORING OVERVIEW
              ================================================= */}

              <div className="col-span-7">

                <MentoringOverview
                  mentor={mentor}
                />

              </div>

            </div>

            {/* ==================================================
                MIDDLE SECTION
            ================================================== */}

            <div className="grid grid-cols-12 gap-3">

              {/* =================================================
                  PROFESSIONAL INFORMATION
              ================================================= */}

              <div className="col-span-4">

                <ProfessionalInformation
                  mentor={mentor}
                  onSave={handleProfileSave}
                />

              </div>

              {/* =================================================
                  ABOUT ME
              ================================================= */}

              <div className="col-span-4">

                <AboutMe
                  mentor={mentor}
                  onSave={handleProfileSave}
                />

              </div>

              {/* =================================================
                  RIGHT SIDE
              ================================================= */}

              <div className="col-span-4 flex flex-col gap-3">

                {/* =================================================
                    SOCIAL LINKS
                ================================================= */}

                <SocialLinks
                  mentor={mentor}
                  onSave={handleProfileSave}
                />

                {/* =================================================
                    ACCOUNT PREFERENCES
                ================================================= */}

                <AccountPreferences
                  mentor={mentor}
                />

              </div>

            </div>

            {/* ==================================================
                BOTTOM
            ================================================== */}

            <MentoringExpertise
              mentor={mentor}
            />

          </main>

        </div>

      </div>

      {/* ======================================================
          EDIT PROFILE MODAL
      ====================================================== */}

      <EditProfileModal
        open={isEditModalOpen}
        onClose={() =>
          setIsEditModalOpen(false)
        }
        mentor={mentor}
        fetchProfile={fetchProfile}
      />

    </>
  );
};

export default Profile;