import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import EditProfileTabs from "./EditProfileTabs";
import PersonalTab from "./PersonalTab";
import ProfessionalTab from "./ProfessionalTab";
import AboutTab from "./AboutTab";
import SocialLinksTab from "./SocialLinksTab";
import SaveFooter from "./SaveFooter";

import {
  updateMentorProfile,
} from "../../../../api/profile.api";

const tabs = [
  "Personal",
  "Professional",
  "About",
  "Social Links",
];

const EditProfileModal = ({
  open,
  onClose,
  mentor,
  fetchProfile,
}) => {
  const [activeTab, setActiveTab] = useState("Personal");

  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && mentor) {
      setFormData(mentor);
      setActiveTab("Personal");
    }
  }, [mentor, open]);

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateMentorProfile(formData);

      await fetchProfile();

      onClose();

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Update Profile Error:", error);

      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex h-[88vh] w-[980px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-7 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Edit Mentor Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your profile information.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <EditProfileTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-7">
          {activeTab === "Personal" && (
            <PersonalTab
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {activeTab === "Professional" && (
            <ProfessionalTab
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {activeTab === "About" && (
            <AboutTab
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {activeTab === "Social Links" && (
            <SocialLinksTab
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>

        {/* Footer */}
        <SaveFooter
          loading={loading}
          onClose={onClose}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default EditProfileModal;    