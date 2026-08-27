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

import { getMentorProfile } from "../../api/profile.api";

const Profile = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await getMentorProfile();

      if (response.profileExists) {
        setMentor(response.profile);
      }
    } catch (error) {
      console.error("Failed to fetch mentor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        {/* Sidebar */}
        <MentorSidebar />

        {/* Main Content */}
        <div className="ml-[290px] min-h-screen">
          {/* Header */}
          <MentorHeader />

          {/* Page Content */}
          <main className="space-y-3 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Mentor Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage your professional profile and preferences.
                </p>
              </div>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="rounded-lg border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                Edit Profile
              </button>
            </div>

            {/* Top */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-5">
                <MentorProfileCard mentor={mentor} />
              </div>

              <div className="col-span-7">
                <MentoringOverview mentor={mentor} />
              </div>
            </div>

            {/* Middle */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-4">
                <ProfessionalInformation mentor={mentor} />
              </div>

              <div className="col-span-4">
                <AboutMe mentor={mentor} />
              </div>

              <div className="col-span-4 flex flex-col gap-3">
                <SocialLinks mentor={mentor} />
                <AccountPreferences mentor={mentor} />
              </div>
            </div>

            {/* Bottom */}
            <MentoringExpertise mentor={mentor} />
          </main>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mentor={mentor}
        fetchProfile={fetchProfile}
      />
    </>
  );
};

export default Profile;