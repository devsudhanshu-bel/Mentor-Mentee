import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  BadgeCheck,
  GraduationCap,
  CalendarDays,
  Mail,
  Phone,
  Trophy,
  UserRoundCheck,
  BookOpen,
  Camera,
  X,
  Check,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import { getPersonalProfile } from "../../api/profile.api";
import api from "../../api/axios";

import profile from "../../assets/profile.jpg";

const PROFILE_ENDPOINT = "/mentee/profile/personal";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");

  /* ========================================================
     PROFILE IMAGE HELPERS
  ======================================================== */

  const clearPreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }

    setPreviewUrl("");
    setSelectedFile(null);
  }, []);

  const loadProfile = useCallback(async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const response = await getPersonalProfile();

      // Supports both Axios-wrapped and directly returned profile data.
      const payload = response?.data?.data ?? response?.data ?? null;

      setUser(payload);
    } catch (error) {
      console.error("Failed to fetch student profile:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load your profile information."
      );
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  /* ========================================================
     LOAD PROFILE AND LISTEN FOR IMAGE UPDATES
  ======================================================== */

  useEffect(() => {
    loadProfile(true);

    const handleProfileUpdated = (event) => {
      const updatedImage = event?.detail?.profileImage;

      // Update the avatar immediately when the event contains an image URL.
      if (updatedImage !== undefined) {
        setUser((previous) =>
          previous
            ? { ...previous, profileImage: updatedImage || null }
            : previous
        );
      }

      // Re-fetch to synchronize all profile information with the backend.
      loadProfile(false);
    };

    window.addEventListener(
      "student-profile-updated",
      handleProfileUpdated
    );

    return () => {
      window.removeEventListener(
        "student-profile-updated",
        handleProfileUpdated
      );

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = "";
      }
    };
  }, [loadProfile]);

  /* ========================================================
     OPEN FILE PICKER
  ======================================================== */

  const openFilePicker = () => {
    if (uploading || removing) return;

    fileInputRef.current?.click();
  };

  /* ========================================================
     SELECT IMAGE
  ======================================================== */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again later.
    event.target.value = "";

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Choose a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Profile pictures must be 5 MB or smaller.");
      return;
    }

    clearPreview();

    const objectUrl = URL.createObjectURL(file);

    previewUrlRef.current = objectUrl;

    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  /* ========================================================
     CANCEL IMAGE SELECTION
  ======================================================== */

  const handleCancel = () => {
    clearPreview();
  };

  /* ========================================================
     UPLOAD PROFILE PICTURE
  ======================================================== */

  const handleUpload = async () => {
    if (!selectedFile || uploading || removing) return;

    const formData = new FormData();

    // Must match multer.single("profileImage") on the backend.
    formData.append("profileImage", selectedFile);

    try {
      setUploading(true);

      const response = await api.post(
        `${PROFILE_ENDPOINT}/picture`,
        formData
      );

      const payload = response?.data?.data ?? response?.data;

      const imageUrl = payload?.profileImage;

      if (!imageUrl) {
        throw new Error(
          "The server did not return the updated profile picture."
        );
      }

      setUser((previous) =>
        previous
          ? { ...previous, profileImage: imageUrl }
          : previous
      );

      clearPreview();

      window.dispatchEvent(
        new CustomEvent("student-profile-updated", {
          detail: { profileImage: imageUrl },
        })
      );

      toast.success("Profile picture updated successfully.");
    } catch (error) {
      console.error("Profile picture upload failed:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload your profile picture."
      );
    } finally {
      setUploading(false);
    }
  };

  /* ========================================================
     REMOVE PROFILE PICTURE
  ======================================================== */

  const handleRemove = async () => {
    if (uploading || removing) return;

    if (!user?.profileImage) {
      toast.error("There is no uploaded profile picture to remove.");
      return;
    }

    try {
      setRemoving(true);

      await api.delete(`${PROFILE_ENDPOINT}/picture`);

      setUser((previous) =>
        previous ? { ...previous, profileImage: null } : previous
      );

      clearPreview();

      window.dispatchEvent(
        new CustomEvent("student-profile-updated", {
          detail: { profileImage: "" },
        })
      );

      toast.success("Profile picture removed successfully.");
    } catch (error) {
      console.error("Failed to remove profile picture:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to remove your profile picture."
      );
    } finally {
      setRemoving(false);
    }
  };

  /* ========================================================
     DISPLAY VALUES
  ======================================================== */

  const fullName =
    user?.fullName || (loading ? "Loading..." : "Student");

  const profileImage = previewUrl || user?.profileImage || profile;

  const registerNumber = user?.registerNumber || "Not Available";
  const admissionNumber = user?.admissionNumber || "Not Available";
  const programme = user?.programme || "Not Available";
  const semester = user?.semester || "Not Available";
  const email = user?.email || "Not Available";
  const phone = user?.phoneNumber || "Not Available";
  const cgpa = user?.currentCGPA ?? "—";
  const mentor = user?.currentMentor || "Not Assigned";
  const academicStanding = user?.academicStanding || "Not Available";

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm px-7 py-5">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* LEFT: STUDENT INFORMATION */}

        <div className="col-span-12 xl:col-span-8 flex items-center gap-5">
          {/* PROFILE IMAGE */}

          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profileImage}
                alt={fullName}
                onError={(event) => {
                  if (event.currentTarget.src !== profile) {
                    event.currentTarget.src = profile;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CAMERA BUTTON */}

            <button
              type="button"
              onClick={openFilePicker}
              disabled={uploading || removing}
              aria-label="Change profile picture"
              title="Change profile picture"
              className="
                absolute -bottom-1 -right-1
                w-9 h-9 rounded-full
                bg-blue-600 text-white
                flex items-center justify-center
                shadow-md border-2 border-white
                hover:bg-blue-700
                active:scale-95
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {uploading ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Camera size={16} />
              )}
            </button>

            {/* HIDDEN FILE INPUT */}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Choose a profile picture"
            />
          </div>

          {/* STUDENT DETAILS */}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[20px] font-bold text-slate-900">
                {fullName}
              </h1>

              <BadgeCheck
                size={17}
                className="text-blue-600 fill-blue-600"
              />
            </div>

            <p className="mt-2 text-[13px] text-slate-600">
              Reg. No.
              <span className="font-semibold text-slate-800">
                {" "}
                {registerNumber}
              </span>

              <span className="mx-3 text-slate-300">|</span>

              Adm. No.
              <span className="font-semibold text-slate-800">
                {" "}
                {admissionNumber}
              </span>
            </p>

            {/* PROGRAMME AND SEMESTER */}

            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
                <GraduationCap size={15} className="text-blue-600" />
                <span className="text-xs font-semibold">
                  {programme}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
                <CalendarDays size={15} className="text-blue-600" />
                <span className="text-xs font-semibold">
                  Semester {semester}
                </span>
              </div>
            </div>

            {/* CONTACT DETAILS */}

            <div className="flex flex-wrap gap-2 mt-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                <Mail size={15} className="text-blue-600" />
                <span className="text-xs">{email}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                <Phone size={15} className="text-blue-600" />
                <span className="text-xs">{phone}</span>
              </div>
            </div>

            {/* IMAGE ACTIONS */}

            {selectedFile && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-slate-500 max-w-44 truncate">
                  {selectedFile.name}
                </span>

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || removing}
                  className="
                    inline-flex items-center gap-1.5
                    px-3 py-1.5 rounded-lg
                    bg-blue-600 text-white
                    text-xs font-semibold
                    hover:bg-blue-700 transition
                    disabled:opacity-60
                  "
                >
                  {uploading ? (
                    <LoaderCircle size={13} className="animate-spin" />
                  ) : (
                    <Check size={13} />
                  )}

                  {uploading ? "Uploading..." : "Save photo"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={uploading || removing}
                  className="
                    inline-flex items-center gap-1
                    px-3 py-1.5 rounded-lg
                    border border-slate-200
                    text-slate-600 text-xs font-semibold
                    hover:bg-slate-100 transition
                    disabled:opacity-60
                  "
                >
                  <X size={13} />
                  Cancel
                </button>
              </div>
            )}

            {!selectedFile && user?.profileImage && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading || removing}
                className="
                  inline-flex items-center gap-1.5
                  mt-2 text-xs text-red-600
                  hover:text-red-700 transition
                  disabled:opacity-60
                "
              >
                {removing ? (
                  <LoaderCircle size={13} className="animate-spin" />
                ) : (
                  <Trash2 size={13} />
                )}

                {removing ? "Removing..." : "Remove profile picture"}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: ACADEMIC SUMMARY */}

        <div className="col-span-12 xl:col-span-4">
          <div className="rounded-2xl border border-slate-200 p-5 shadow-sm bg-white space-y-4">
            {/* CGPA */}

            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <Trophy size={15} className="text-blue-600" />
                <span className="text-[13px] text-slate-600">
                  Current CGPA
                </span>
              </div>

              <span className="text-lg font-bold text-blue-600">
                {cgpa}
                <span className="text-sm text-slate-400">/4</span>
              </span>
            </div>

            {/* MENTOR */}

            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <UserRoundCheck size={15} className="text-blue-600" />
                <span className="text-[13px] text-slate-600">
                  Current Mentor
                </span>
              </div>

              <span className="text-xs font-semibold text-blue-600 text-right">
                {mentor}
              </span>
            </div>

            {/* ACADEMIC STANDING */}

            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-blue-600" />
                <span className="text-[13px] text-slate-600">
                  Academic Standing
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">
                {academicStanding}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;