import React, { useCallback, useEffect, useState } from "react";

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
import FontSizeSettings from "../../components/common/FontSizeSettings";

import {
  getAdminProfile,
  createAdminProfile,
  updateAdminProfile,
} from "../../api/profile.api";

import {
  getAdminProfileOverview,
} from "../../api/dashboard.api";

/*
|--------------------------------------------------------------------------
| Normalize Profile API Responses
|--------------------------------------------------------------------------
*/

const extractProfileResponse = (response) => {
  const body = response?.data ?? response;

  return {
    profile: body?.profile ?? null,
    profileExists: body?.profileExists === true,
  };
};

/*
|--------------------------------------------------------------------------
| Normalize Overview API Responses
|--------------------------------------------------------------------------
*/

const extractOverviewResponse = (response) => {
  const body = response?.data ?? response;

  return {
    mentors: body?.mentors ?? null,
    students: body?.students ?? null,
    meetings: body?.meetings ?? null,
    attendance: body?.attendance ?? null,
  };
};

/*
|--------------------------------------------------------------------------
| Extract Error Message
|--------------------------------------------------------------------------
*/

const getErrorMessage = (error, fallbackMessage) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage
  );
};

/*
|--------------------------------------------------------------------------
| Admin Profile Page
|--------------------------------------------------------------------------
*/

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [pageError, setPageError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Overview Statistics State
  |--------------------------------------------------------------------------
  */

  const [overviewStats, setOverviewStats] = useState({
    mentors: null,
    students: null,
    meetings: null,
    attendance: null,
  });

  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Admin Profile
  |--------------------------------------------------------------------------
  */

  const fetchAdminProfile = useCallback(async () => {
    try {
      setLoading(true);
      setPageError("");

      const response = await getAdminProfile();
      const result = extractProfileResponse(response);

      setAdmin(result.profile);
      setProfileExists(result.profileExists);

      return result;
    } catch (error) {
      console.error(
        "Failed to fetch Admin profile:",
        error?.response?.data || error
      );

      setPageError(
        getErrorMessage(
          error,
          "Unable to load your Admin profile. Please try again."
        )
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch Actual Profile Overview Statistics
  |--------------------------------------------------------------------------
  */

  const fetchOverviewStats = useCallback(async () => {
    try {
      setOverviewLoading(true);
      setOverviewError("");

      const response = await getAdminProfileOverview();
      const stats = extractOverviewResponse(response);

      setOverviewStats(stats);

      return stats;
    } catch (error) {
      console.error(
        "Failed to fetch Admin profile overview:",
        error?.response?.data || error
      );

      setOverviewError(
        getErrorMessage(
          error,
          "Unable to load profile overview statistics."
        )
      );

      throw error;
    } finally {
      setOverviewLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Initial Fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchAdminProfile().catch(() => {
      // Profile error is handled by fetchAdminProfile.
    });

    fetchOverviewStats().catch(() => {
      // Overview error is handled by fetchOverviewStats.
    });
  }, [fetchAdminProfile, fetchOverviewStats]);

  /*
  |--------------------------------------------------------------------------
  | Create / Update Admin Profile
  |--------------------------------------------------------------------------
  */

  const handleProfileSave = async (updatedData) => {
    if (
      !updatedData ||
      typeof updatedData !== "object" ||
      Array.isArray(updatedData)
    ) {
      throw new Error("Invalid profile data.");
    }

    try {
      setSaving(true);
      setPageError("");
      setSaveMessage("");

      // Check whether the profile already exists.
      const currentResponse = await getAdminProfile();
      const current = extractProfileResponse(currentResponse);

      // Create or update the profile.
      const response = current.profileExists
        ? await updateAdminProfile(updatedData)
        : await createAdminProfile(updatedData);

      const saved = extractProfileResponse(response);

      let savedProfile = saved.profile;
      let savedProfileExists =
        saved.profileExists || current.profileExists;

      // Fetch persisted data if the mutation returns no profile.
      if (!savedProfile) {
        const refreshedResponse = await getAdminProfile();
        const refreshed = extractProfileResponse(refreshedResponse);

        savedProfile = refreshed.profile;
        savedProfileExists = refreshed.profileExists;
      }

      if (savedProfile) {
        setAdmin(savedProfile);
      }

      setProfileExists(savedProfileExists);
      setSaveMessage("Profile updated successfully.");

      return {
        ...response,
        profile: savedProfile,
        profileExists: savedProfileExists,
      };
    } catch (error) {
      console.error(
        "Failed to save Admin profile:",
        error?.response?.data || error
      );

      setPageError(
        getErrorMessage(
          error,
          "Unable to save your profile. Please try again."
        )
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-[290px] flex min-h-screen flex-col">
        <AdminHeader />

        <main className="flex-1 space-y-2 px-6 py-6">
          {/* Page Heading */}
          <div className="flex items-start justify-between">
            <PageTitle />
          </div>

          {/* Application font-size preference */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Font Size Settings</h2>
              <p className="mt-1 text-xs text-slate-500">Choose your preferred text size across the portal.</p>
            </div>
            <FontSizeSettings />
          </div>

          {/* Profile Error */}
          {pageError && (
            <div
              role="alert"
              className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <span>{pageError}</span>

              <button
                type="button"
                onClick={() => {
                  fetchAdminProfile().catch(() => {});
                }}
                disabled={loading}
                className="shrink-0 font-semibold underline underline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Retrying..." : "Retry"}
              </button>
            </div>
          )}

          {/* Save Confirmation */}
          {!pageError && saveMessage && (
            <div
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              {saveMessage}
            </div>
          )}

          {/* Profile Hero */}
          <div className="grid grid-cols-12 items-stretch gap-2">
            <div className="col-span-5">
              <ProfileCard
                admin={admin}
                loading={loading}
                onSave={handleProfileSave}
              />
            </div>

            <div className="col-span-7">
              <ProfileOverview
                stats={overviewStats}
                loading={overviewLoading}
              />

              {/* Overview-specific error and retry */}
              {overviewError && (
                <div
                  role="alert"
                  className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                >
                  <span>{overviewError}</span>

                  <button
                    type="button"
                    onClick={() => {
                      fetchOverviewStats().catch(() => {});
                    }}
                    disabled={overviewLoading}
                    className="shrink-0 font-semibold underline disabled:opacity-50"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-12 items-start gap-2">
            {/* Personal Information */}
            <div className="col-span-4">
              <PersonalInformation
                admin={admin}
                loading={loading}
                profileExists={profileExists}
                onSave={handleProfileSave}
              />
            </div>

            {/* Professional Information */}
            <div className="col-span-4">
              <ProfessionalInformation
                admin={admin}
                loading={loading}
                onSave={handleProfileSave}
              />
            </div>

            {/* About and Account Settings */}
            <div className="col-span-4 space-y-2">
              <AboutMe
                about={admin?.about ?? ""}
                personalInfo={admin ?? {}}
                profileExists={profileExists}
                onSave={handleProfileSave}
              />

              <AccountSettings
                admin={admin}
                loading={loading || saving}
              />
            </div>
          </div>

          {/* Support */}
          <SupportCard />
        </main>
      </div>
    </div>
  );
};

export default Profile;