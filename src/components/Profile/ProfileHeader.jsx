
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

      if (updatedImage !== undefined) {
        setUser((previous) =>
          previous
            ? { ...previous, profileImage: updatedImage || null }
            : previous
        );
      }

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
     REUSABLE DETAIL ITEM
  ======================================================== */

  const DetailItem = ({ icon: Icon, children }) => (
    <div className="flex min-w-0 max-w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <Icon
        size={15}
        className="shrink-0 text-blue-600"
      />
      <span className="min-w-0 break-all text-xs font-medium text-slate-600">
        {children}
      </span>
    </div>
  );

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 lg:p-6">
      <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] xl:items-center xl:gap-7">

        {/* STUDENT INFORMATION */}

        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">

          {/* PROFILE IMAGE */}

          <div className="flex shrink-0 flex-col items-center gap-3 sm:items-start">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg sm:h-28 sm:w-28">
                <img
                  src={profileImage}
                  alt={fullName}
                  onError={(event) => {
                    if (event.currentTarget.src !== profile) {
                      event.currentTarget.src = profile;
                    }
                  }}
                  className="h-full w-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={openFilePicker}
                disabled={uploading || removing}
                aria-label="Change profile picture"
                title="Change profile picture"
                className="
                  absolute -bottom-1 -right-1
                  flex h-9 w-9 items-center justify-center
                  rounded-full border-2 border-white
                  bg-blue-600 text-white shadow-md
                  transition hover:bg-blue-700
                  active:scale-95
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                {uploading ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Camera size={16} />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Choose a profile picture"
              />
            </div>

            {user?.profileImage && !selectedFile && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading || removing}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 transition hover:text-red-700 disabled:opacity-60"
              >
                {removing ? (
                  <LoaderCircle size={13} className="animate-spin" />
                ) : (
                  <Trash2 size={13} />
                )}
                {removing ? "Removing..." : "Remove photo"}
              </button>
            )}
          </div>

          {/* STUDENT DETAILS */}

          <div className="min-w-0 flex-1 text-center sm:text-left">

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="max-w-full break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {fullName}
              </h1>

              <BadgeCheck
                size={19}
                className="shrink-0 fill-blue-600 text-blue-600"
              />
            </div>

            {/* REGISTRATION DETAILS */}

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:justify-start sm:text-sm">
              <span>
                Reg. No.{" "}
                <span className="font-semibold text-slate-800">
                  {registerNumber}
                </span>
              </span>

              <span className="hidden text-slate-300 sm:inline">|</span>

              <span>
                Adm. No.{" "}
                <span className="font-semibold text-slate-800">
                  {admissionNumber}
                </span>
              </span>
            </div>

            {/* PROGRAMME AND SEMESTER */}

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <div className="flex min-w-0 max-w-full items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
                <GraduationCap size={15} className="shrink-0 text-blue-600" />
                <span className="break-words text-xs font-semibold text-blue-800">
                  {programme}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
                <CalendarDays size={15} className="shrink-0 text-blue-600" />
                <span className="text-xs font-semibold text-blue-800">
                  Semester {semester}
                </span>
              </div>
            </div>

            {/* CONTACT DETAILS */}

            <div className="mt-3 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
              <DetailItem icon={Mail}>{email}</DetailItem>
              <DetailItem icon={Phone}>{phone}</DetailItem>
            </div>

            {/* IMAGE ACTIONS */}

            {selectedFile && (
              <div className="mt-4 flex min-w-0 flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="max-w-full truncate text-xs text-slate-500 sm:max-w-44">
                  {selectedFile.name}
                </span>

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || removing}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
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
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
                >
                  <X size={13} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ACADEMIC SUMMARY */}

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Academic overview
              </p>
              <h2 className="mt-1 text-sm font-bold text-slate-800">
                Student Summary
              </h2>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <GraduationCap size={18} />
            </div>
          </div>

          <div className="space-y-4">

            {/* CGPA */}

            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Trophy size={16} className="shrink-0 text-blue-600" />
                <span className="text-sm text-slate-600">
                  Current CGPA
                </span>
              </div>

              <span className="shrink-0 text-lg font-bold tabular-nums text-blue-600">
                {cgpa}
                <span className="ml-0.5 text-sm font-medium text-slate-400">
                  /4
                </span>
              </span>
            </div>

            <div className="h-px bg-slate-200" />

            {/* MENTOR */}

            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <UserRoundCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <span className="text-sm text-slate-600">
                  Current Mentor
                </span>
              </div>

              <span className="max-w-[55%] break-words text-right text-sm font-semibold text-slate-800">
                {mentor}
              </span>
            </div>

            <div className="h-px bg-slate-200" />

            {/* ACADEMIC STANDING */}

            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <BookOpen
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <span className="text-sm text-slate-600">
                  Academic Standing
                </span>
              </div>

              <span className="max-w-[55%] break-words rounded-full bg-green-100 px-3 py-1 text-right text-[11px] font-semibold text-green-700">
                {academicStanding}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
