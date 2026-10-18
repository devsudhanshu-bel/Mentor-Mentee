import React, { useRef, useState } from "react";

import {
  Camera,
  Mail,
  Phone,
  MapPin,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import profile from "../../../../assets/profile.jpg";

const ProfileCard = ({ admin, loading = false, onSave }) => {
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState("");
  const [savingImage, setSavingImage] = useState(false);
  const [imageError, setImageError] = useState("");

  const image = previewImage || admin?.profileImage || profile;

  const fullName = admin?.fullName || admin?.username || "Admin";
  const designation = admin?.designation || "Administrator";
  const department = admin?.department || "Department not provided";
  const school = admin?.school || "School not provided";
  const office = admin?.office || "Office not provided";
  const email = admin?.email || "No email provided";
  const phone = admin?.phone || "No phone provided";
  const nationality = admin?.nationality || "Nationality not provided";

  const isActive = admin?.isActive !== false;

  /*
  |--------------------------------------------------------------------------
  | Change Profile Picture
  |--------------------------------------------------------------------------
  */

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Please select an image smaller than 2 MB.");
      return;
    }

    if (typeof onSave !== "function") {
      setImageError(
        "Profile saving is unavailable. Please refresh the page and try again."
      );
      return;
    }

    let imageData;

    try {
      setSavingImage(true);

      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Unable to read the selected image."));
          }
        };

        reader.onerror = () => {
          reject(new Error("Failed to read the image."));
        };

        reader.readAsDataURL(file);
      });

      // Show the new image immediately.
      setPreviewImage(imageData);

      // Persist using the parent profile save handler.
      await onSave({ profileImage: imageData });

      setImageError("");
    } catch (error) {
      console.error("Failed to save admin profile picture:", error);

      setPreviewImage("");

      setImageError(
        error?.response?.data?.message ||
          "Unable to save the profile picture. Please try again."
      );
    } finally {
      setSavingImage(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading && !admin) {
    return (
      <div className="min-h-[280px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-[76px] w-[76px] rounded-full bg-slate-200" />

          <div className="flex-1 space-y-3">
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>
        </div>

        <div className="mt-7 space-y-4">
          <div className="h-4 w-48 rounded bg-slate-200" />
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="h-4 w-44 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Profile Card
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-[280px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        {/* Profile Picture */}
        <div className="relative shrink-0">
          <img
            src={image}
            alt={`${fullName} profile`}
            className="h-[76px] w-[76px] rounded-full border border-slate-200 object-cover"
            onError={(event) => {
              if (
                event.currentTarget.dataset.fallbackApplied === "true"
              ) {
                return;
              }

              event.currentTarget.dataset.fallbackApplied = "true";
              event.currentTarget.src = profile;
            }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={savingImage}
            aria-label="Change profile picture"
            title="Change profile picture"
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingImage ? (
              <LoaderCircle size={14} className="animate-spin" />
            ) : (
              <Camera size={14} />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Name and Designation */}
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="break-words text-[19px] font-bold leading-6 text-slate-900">
              {fullName}
            </h2>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="mt-1.5 text-[14px] font-medium text-slate-500">
            {designation}
          </p>
        </div>
      </div>

      {/* Compact Error Message */}
      {imageError && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs leading-4 text-red-700"
        >
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{imageError}</span>
        </div>
      )}

      {/* Divider */}
      <div className="my-5 border-t border-slate-100" />

      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-4">
        {/* Contact Information */}
        <div className="min-w-0 space-y-4">
          <div className="flex min-w-0 items-start gap-2.5">
            <Mail
              size={17}
              className="mt-0.5 shrink-0 text-slate-400"
            />
            <span className="break-all text-[13px] leading-5 text-slate-700">
              {email}
            </span>
          </div>

          <div className="flex min-w-0 items-start gap-2.5">
            <Phone
              size={17}
              className="mt-0.5 shrink-0 text-slate-400"
            />
            <span className="break-words text-[13px] leading-5 text-slate-700">
              {phone}
            </span>
          </div>

          <div className="flex min-w-0 items-start gap-2.5">
            <MapPin
              size={17}
              className="mt-0.5 shrink-0 text-slate-400"
            />
            <span className="break-words text-[13px] leading-5 text-slate-700">
              {office}
            </span>
          </div>
        </div>

        {/* Department Information */}
        <div className="min-w-0 space-y-3 border-l border-slate-200 pl-4">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Department
            </p>
            <p className="break-words text-[13px] font-medium leading-5 text-slate-700">
              {department}
            </p>
          </div>

          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              School
            </p>
            <p className="break-words text-[13px] leading-5 text-slate-600">
              {school}
            </p>
          </div>

          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Nationality
            </p>
            <p className="text-[13px] leading-5 text-slate-600">
              {nationality}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;