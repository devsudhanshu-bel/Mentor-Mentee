import React, { useEffect, useRef, useState } from "react";

import {
  X,
  Camera,
  User,
  Mail,
  Phone,
  Save,
  LoaderCircle,
  Check,
  Trash2,
} from "lucide-react";

import {
  updateMentorProfile,
} from "../../../../api/profile.api";

import api from "../../../../api/axios";

// ==========================================================
// CONFIGURATION
// ==========================================================

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const PROFILE_PICTURE_ENDPOINT = "/mentor/profile/picture";

// ==========================================================
// COMPONENT
// ==========================================================

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [removingPicture, setRemovingPicture] = useState(false);

  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");

  // ========================================================
  // CLEAN UP IMAGE PREVIEW
  // ========================================================

  const clearPreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }

    setPreviewUrl("");
    setSelectedFile(null);
  };

  useEffect(() => {
    if (open && mentor) {
      setFormData({
        fullName: mentor.fullName || "",
        email: mentor.email || "",
        phone: mentor.phone || "",
      });

      clearPreview();
    }
  }, [mentor, open]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  // ========================================================
  // HANDLE INPUT CHANGE
  // ========================================================

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ========================================================
  // OPEN FILE PICKER
  // ========================================================

  const handleChoosePicture = () => {
    if (uploadingPicture || removingPicture) return;

    fileInputRef.current?.click();
  };

  // ========================================================
  // SELECT PICTURE
  // ========================================================

  const handlePictureChange = (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Please select a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Profile pictures must be 5 MB or smaller.");
      return;
    }

    clearPreview();

    const objectUrl = URL.createObjectURL(file);

    previewUrlRef.current = objectUrl;

    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  // ========================================================
  // UPLOAD PROFILE PICTURE
  // ========================================================

  const handleUploadPicture = async () => {
    if (!selectedFile || uploadingPicture || removingPicture) {
      return;
    }

    const formData = new FormData();

    // Must match multer.single("profileImage") on the backend.
    formData.append("profileImage", selectedFile);

    try {
      setUploadingPicture(true);

      const response = await api.post(
        PROFILE_PICTURE_ENDPOINT,
        formData
      );

      const payload =
        response?.data?.data ?? response?.data;

      const imageUrl = payload?.profileImage;

      if (!imageUrl) {
        throw new Error(
          "The server did not return the uploaded profile picture."
        );
      }

      clearPreview();

      // Notify the mentor header and other listening components.
      window.dispatchEvent(
        new CustomEvent("mentor-profile-updated", {
          detail: {
            profileImage: imageUrl,
          },
        })
      );

      // Refresh the parent profile so it displays the saved URL.
      await fetchProfile();

      alert("Profile picture updated successfully.");
    } catch (error) {
      console.error("Mentor picture upload failed:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload profile picture."
      );
    } finally {
      setUploadingPicture(false);
    }
  };

  // ========================================================
  // REMOVE PROFILE PICTURE
  // ========================================================

  const handleRemovePicture = async () => {
    if (uploadingPicture || removingPicture) return;

    if (!mentor?.profileImage) {
      alert("There is no uploaded profile picture to remove.");
      return;
    }

    try {
      setRemovingPicture(true);

      await api.delete(PROFILE_PICTURE_ENDPOINT);

      clearPreview();

      window.dispatchEvent(
        new CustomEvent("mentor-profile-updated", {
          detail: {
            profileImage: "",
          },
        })
      );

      await fetchProfile();

      alert("Profile picture removed successfully.");
    } catch (error) {
      console.error("Mentor picture removal failed:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to remove profile picture."
      );
    } finally {
      setRemovingPicture(false);
    }
  };

  // ========================================================
  // HANDLE PROFILE SAVE
  // ========================================================

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

      await updateMentorProfile(updatedData);

      await fetchProfile();

      onClose();

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Update Profile Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // CLOSE MODAL
  // ========================================================

  const handleClose = () => {
    if (loading || uploadingPicture || removingPicture) return;

    clearPreview();
    onClose();
  };

  // ========================================================
  // MODAL CLOSED
  // ========================================================

  if (!open) {
    return null;
  }

  // ========================================================
  // DISPLAY IMAGE
  // ========================================================

  const displayedImage =
    previewUrl || mentor?.profileImage || "";

  const pictureBusy = uploadingPicture || removingPicture;

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/40 p-2 backdrop-blur-sm sm:p-4">
      <div className="flex max-h-[calc(100dvh-1rem)] w-full max-w-[980px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:items-center sm:px-7 sm:py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Edit Mentor Profile
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Update your profile information.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading || pictureBusy}
            aria-label="Close edit profile"
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-7 sm:py-7">

          {/* PROFILE PICTURE */}

          <div className="border-b border-slate-200 pb-5 sm:pb-7">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">

              {/* AVATAR */}

              <div className="relative shrink-0">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-slate-200 bg-slate-100 sm:h-32 sm:w-32">
                  {displayedImage ? (
                    <img
                      src={displayedImage}
                      alt="Mentor profile"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      size={58}
                      className="text-slate-400"
                    />
                  )}
                </div>

                {/* CAMERA BUTTON */}

                <button
                  type="button"
                  onClick={handleChoosePicture}
                  disabled={pictureBusy || loading}
                  title="Change profile picture"
                  aria-label="Choose profile picture"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:bottom-1 sm:right-1 sm:h-10 sm:w-10"
                >
                  {uploadingPicture ? (
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Camera size={18} />
                  )}
                </button>

                {/* HIDDEN FILE INPUT */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePictureChange}
                  className="hidden"
                  aria-label="Select mentor profile picture"
                />
              </div>

              {/* PICTURE DETAILS */}

              <div className="min-w-0 w-full flex-1 sm:w-auto">
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Profile Picture
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Upload a professional profile picture.
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  JPEG, PNG or WebP · Maximum 5 MB
                </p>

                {selectedFile && (
                  <p className="mx-auto mt-2 max-w-full truncate text-xs text-blue-600 sm:mx-0 sm:max-w-xs">
                    {selectedFile.name}
                  </p>
                )}

                {/* IMAGE ACTIONS */}

                {selectedFile && (
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <button
                      type="button"
                      onClick={handleUploadPicture}
                      disabled={pictureBusy || loading}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {uploadingPicture ? (
                        <LoaderCircle
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Check size={14} />
                      )}

                      {uploadingPicture
                        ? "Uploading..."
                        : "Save Picture"}
                    </button>

                    <button
                      type="button"
                      onClick={clearPreview}
                      disabled={pictureBusy}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
                    >
                      <X size={13} />
                      Cancel
                    </button>
                  </div>
                )}

                {!selectedFile && mentor?.profileImage && (
                  <button
                    type="button"
                    onClick={handleRemovePicture}
                    disabled={pictureBusy || loading}
                    className="mt-3 inline-flex items-center justify-center gap-2 text-xs font-semibold text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:justify-start"
                  >
                    {removingPicture ? (
                      <LoaderCircle
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={14} />
                    )}

                    {removingPicture
                      ? "Removing..."
                      : "Remove Picture"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PERSONAL INFORMATION */}

          <div className="pt-5 sm:pt-7">
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">

              {/* FULL NAME */}

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
                  onChange={(event) =>
                    handleChange("fullName", event.target.value)
                  }
                  disabled={loading || pictureBusy}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>

              {/* EMAIL */}

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

              {/* PHONE */}

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
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  disabled={loading || pictureBusy}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex flex-col-reverse items-stretch justify-end gap-2 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-7 sm:py-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading || pictureBusy}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading || pictureBusy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <Save size={16} />
            )}

            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;