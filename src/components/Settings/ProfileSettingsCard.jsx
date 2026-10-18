
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Pencil, Trash2, Upload, X, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../api/axios";
import profileFallback from "../../assets/profile.jpg";

const PROFILE_ENDPOINT = "/mentee/profile/personal/";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ProfileSettingsCard = () => {
  const fileInputRef = useRef(null);
  const previewUrlRef = useRef(null);

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(PROFILE_ENDPOINT);
      const data = response?.data?.data ?? response?.data;

      setStudent(data || null);
    } catch (error) {
      console.error("Failed to fetch student profile:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();

    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, [fetchProfile]);

  const profileImage = preview || student?.profileImage || profileFallback;

  const clearPreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setPreview("");
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelection = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Choose a JPEG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("The image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);

    previewUrlRef.current = objectUrl;

    setSelectedFile(file);
    setPreview(objectUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    const formData = new FormData();

    formData.append("profileImage", selectedFile);

    try {
      setUploading(true);

      const response = await api.post(
        `${PROFILE_ENDPOINT}picture`,
        formData
      );

      const data = response?.data?.data ?? response?.data;

      setStudent((previous) => ({
        ...previous,
        profileImage:
          data?.profileImage || previous?.profileImage || "",
      }));

      clearPreview();

      // Refresh other components listening for profile updates.
      window.dispatchEvent(
        new CustomEvent("student-profile-updated", {
          detail: {
            profileImage: data?.profileImage || "",
          },
        })
      );

      toast.success("Profile picture updated successfully.");
    } catch (error) {
      console.error("Profile picture upload failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to upload profile picture."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (preview) {
      clearPreview();
      return;
    }

    if (!student?.profileImage) {
      toast.error("You don't have a profile picture to remove.");
      return;
    }

    try {
      setRemoving(true);

      const response = await api.delete(
        `${PROFILE_ENDPOINT}picture`
      );

      const data = response?.data?.data ?? response?.data;

      setStudent((previous) => ({
        ...previous,
        profileImage: data?.profileImage ?? null,
      }));

      window.dispatchEvent(
        new CustomEvent("student-profile-updated", {
          detail: { profileImage: "" },
        })
      );

      toast.success("Profile picture removed.");
    } catch (error) {
      console.error("Profile picture removal failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to remove profile picture."
      );
    } finally {
      setRemoving(false);
    }
  };

  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "Not provided";
    }

    return value;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Profile Settings
          </h2>

          <p className="text-[11px] text-slate-500 mt-0.5">
            Manage your personal information and profile details.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchProfile}
          disabled={loading || uploading || removing}
          className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
        >
          <Pencil size={12} />
          Refresh Profile
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
          <LoaderCircle size={18} className="animate-spin" />
          Loading your profile...
        </div>
      ) : (
        <>
          {/* Body */}
          <div className="grid grid-cols-12 gap-4">
            {/* Profile Picture */}
            <div className="col-span-12 sm:col-span-3 flex justify-center">
              <div className="relative w-fit h-fit">
                <img
                  src={profileImage}
                  alt={student?.fullName || "Student profile"}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = profileFallback;
                  }}
                  className="w-24 h-24 rounded-full object-cover border border-slate-200"
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelection}
                  className="hidden"
                />

                <button
                  type="button"
                  title="Choose profile picture"
                  aria-label="Choose profile picture"
                  disabled={uploading || removing}
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-800 text-white flex items-center justify-center border-2 border-white shadow-md transition disabled:opacity-50"
                >
                  <Camera size={14} />
                </button>
              </div>
            </div>

            {/* Student Details */}
            <div className="col-span-12 sm:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-[10px] text-slate-500">Full Name</p>
                  <h4 className="text-sm font-semibold text-slate-800 mt-0.5">
                    {displayValue(student?.fullName)}
                  </h4>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    Register Number
                  </p>
                  <h4 className="text-sm font-semibold text-slate-800 mt-0.5">
                    {displayValue(student?.registerNumber)}
                  </h4>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">Email</p>
                  <h4 className="text-xs font-medium text-slate-800 break-all mt-0.5">
                    {displayValue(student?.email)}
                  </h4>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">Department</p>
                  <h4 className="text-xs font-medium text-slate-800 mt-0.5 leading-5">
                    {displayValue(student?.department)}
                  </h4>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">Phone Number</p>
                  <h4 className="text-xs font-medium text-slate-800 mt-0.5">
                    {displayValue(student?.phoneNumber)}
                  </h4>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    Class &amp; Section
                  </p>
                  <h4 className="text-xs font-medium text-slate-800 mt-0.5">
                    {displayValue(
                      [student?.programme, student?.semester, student?.section]
                        .filter(Boolean)
                        .join(" · ")
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Controls */}
          {(selectedFile || student?.profileImage) && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500 truncate max-w-full">
                {selectedFile
                  ? selectedFile.name
                  : "Your current profile picture"}
              </p>

              <div className="flex items-center gap-2">
                {selectedFile && (
                  <>
                    <button
                      type="button"
                      onClick={clearPreview}
                      disabled={uploading}
                      className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                      <X size={13} />
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={uploading}
                      className="flex items-center gap-1.5 rounded-md bg-slate-800 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700 disabled:opacity-50"
                    >
                      {uploading ? (
                        <LoaderCircle size={14} className="animate-spin" />
                      ) : (
                        <Upload size={14} />
                      )}
                      {uploading ? "Uploading..." : "Save Picture"}
                    </button>
                  </>
                )}

                {!selectedFile && student?.profileImage && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    disabled={removing}
                    className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {removing ? (
                      <LoaderCircle size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    {removing ? "Removing..." : "Remove Picture"}
                  </button>
                )}
              </div>
            </div>
          )}

          <p className="mt-3 text-[10px] text-slate-400">
            JPEG, PNG or WebP · Maximum size: 5 MB
          </p>
        </>
      )}
    </div>
  );
};

export default ProfileSettingsCard;
