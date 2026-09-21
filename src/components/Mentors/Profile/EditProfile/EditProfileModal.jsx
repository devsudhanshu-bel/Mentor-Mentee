import React, { useEffect, useState } from "react";
import {
  X,
  Camera,
  User,
  Mail,
  Phone,
  Save,
} from "lucide-react";

import {
  updateMentorProfile,
} from "../../../../api/profile.api";

const EditProfileModal = ({
  open,
  onClose,
  mentor,
  fetchProfile,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  /* ==========================================================
     LOAD MENTOR DATA
  ========================================================== */

  useEffect(() => {
    if (open && mentor) {
      setFormData({
        fullName: mentor.fullName || "",
        email: mentor.email || "",
        phone: mentor.phone || "",
      });
    }
  }, [mentor, open]);

  /* ==========================================================
     HANDLE INPUT CHANGE
  ========================================================== */

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ==========================================================
     HANDLE SAVE
  ========================================================== */

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      alert("Full name cannot be empty.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Phone number cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const updatedData = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
      };

      console.log(
        "Updating mentor profile:",
        updatedData
      );

      await updateMentorProfile(updatedData);

      /*
       * Fetch fresh profile data from backend
       * so the main profile page immediately
       * reflects the changes.
       */

      await fetchProfile();

      onClose();

      alert("Profile updated successfully.");
    } catch (error) {
      console.error(
        "Update Profile Error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     MODAL CLOSED
  ========================================================== */

  if (!open) {
    return null;
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

      {/* ======================================================
          MODAL
      ====================================================== */}

      <div className="flex max-h-[90vh] w-full max-w-[980px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* ====================================================
            HEADER
        ==================================================== */}

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
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        {/* ====================================================
            BODY
        ==================================================== */}

        <div className="flex-1 overflow-y-auto px-7 py-7">

          {/* ==================================================
              PROFILE PICTURE
          ================================================== */}

          <div className="border-b border-slate-200 pb-7">

            <div className="flex items-center gap-6">

              {/* Profile Picture */}

              <div className="relative">

                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-slate-200 bg-slate-100">

                  {mentor?.profileImage ? (
                    <img
                      src={mentor.profileImage}
                      alt="Mentor profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      size={58}
                      className="text-slate-400"
                    />
                  )}

                </div>

                {/* Camera Button */}

                <button
                  type="button"
                  disabled
                  title="Profile picture upload will be added later"
                  className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg opacity-90"
                >
                  <Camera size={18} />
                </button>

              </div>

              {/* Picture Information */}

              <div>

                <h3 className="text-lg font-semibold text-slate-900">
                  Profile Picture
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Upload a professional profile picture.
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  JPG, PNG • Max 2MB
                </p>

                <p className="mt-1 text-[11px] text-blue-500">
                  Profile picture upload will be available later.
                </p>

              </div>

            </div>

          </div>

          {/* ==================================================
              PERSONAL INFORMATION
          ================================================== */}

          <div className="pt-7">

            <div className="grid grid-cols-2 gap-6">

              {/* =================================================
                  FULL NAME
              ================================================= */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                  <User
                    size={16}
                    className="text-blue-600"
                  />

                  Full Name

                </label>

                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleChange(
                      "fullName",
                      e.target.value
                    )
                  }
                  disabled={loading}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                  <Mail
                    size={16}
                    className="text-blue-600"
                  />

                  Email Address

                </label>

                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none"
                />

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Email address cannot be changed here.
                </p>

              </div>

              {/* =================================================
                  PHONE
              ================================================= */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                  <Phone
                    size={16}
                    className="text-blue-600"
                  />

                  Phone Number

                </label>

                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                  disabled={loading}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-7 py-5">

          {/* Cancel */}

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={16} />

            Cancel
          </button>

          {/* Save */}

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />

            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditProfileModal;