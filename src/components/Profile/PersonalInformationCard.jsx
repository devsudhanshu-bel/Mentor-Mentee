
import React, { useEffect, useState } from "react";
import {
  User,
  CalendarDays,
  MapPin,
  Save,
  Pencil,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

import api from "../../api/axios";

const PersonalInformationCard = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    registerNumber: "",
    admissionNumber: "",
    profileImage: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    department: "",
    programme: "",
    semester: "",
    section: "",
    studentType: "",
    address: "",
    permanentAddress: "",
    yearsAtUniversity: "",
    totalCredits: "",
    currentCGPA: "",
    overallAttendance: "",
    academicStanding: "",
    currentMentor: "",
  });

  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/mentee/profile/personal");

      if (response.data.data) {
        setProfileData((prev) => ({
          ...prev,
          ...response.data.data,
        }));

        setProfileExists(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      setProfileExists(false);
      setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (profileExists) {
        await api.put("/mentee/profile/personal", profileData);
      } else {
        await api.post("/mentee/profile/personal", profileData);
        setProfileExists(true);
      }

      setIsEditing(false);
      await fetchProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const isDisabled = profileExists && !isEditing;

  const fieldClass = `
    h-11 w-full rounded-xl border border-slate-200
    bg-white px-3.5 text-sm text-slate-800
    outline-none transition-all duration-200
    placeholder:text-slate-400
    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
    disabled:cursor-not-allowed disabled:bg-slate-50
    disabled:text-slate-600 disabled:opacity-100
  `;

  const labelClass =
    "mb-1.5 block text-xs font-semibold tracking-wide text-slate-600";

  const renderInput = (label, name, type = "text") => (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={
          type === "date" && profileData[name]
            ? profileData[name].substring(0, 10)
            : profileData[name] || ""
        }
        onChange={handleChange}
        disabled={isDisabled}
        className={fieldClass}
      />
    </div>
  );

  const renderSelect = (label, name, options, placeholder) => (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={profileData[name] || ""}
        onChange={handleChange}
        disabled={isDisabled}
        className={fieldClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderTextarea = (label, name, withIcon = false) => (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        {withIcon && (
          <MapPin
            size={17}
            className="absolute left-3.5 top-3.5 text-slate-400"
          />
        )}

        <textarea
          id={name}
          rows={3}
          name={name}
          value={profileData[name] || ""}
          onChange={handleChange}
          disabled={isDisabled}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={`
            min-h-[88px] w-full resize-y rounded-xl
            border border-slate-200 bg-white
            ${withIcon ? "pl-10" : "px-3.5"}
            py-3 text-sm text-slate-800 outline-none
            transition-all duration-200
            placeholder:text-slate-400
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            disabled:resize-none disabled:cursor-not-allowed
            disabled:bg-slate-50 disabled:text-slate-600
          `}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 h-6 w-48 animate-pulse rounded-lg bg-slate-100" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
              <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <User size={21} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800 sm:text-lg">
              Personal Information
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Your basic identity and personal details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {profileExists && !isEditing && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={14} />
              Profile saved
            </span>
          )}

          {isEditing && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <Pencil size={13} />
              Editing
            </span>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-7 px-5 py-6 sm:px-7">
        {/* Basic Details */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Basic Details
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Your identity and university registration information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
            {renderInput("Full Name", "fullName")}
            {renderInput("Register Number", "registerNumber")}
            {renderInput("Admission Number", "admissionNumber")}
            {renderInput("Date of Birth", "dateOfBirth", "date")}

            {renderSelect(
              "Gender",
              "gender",
              [
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
                { value: "OTHER", label: "Other" },
              ],
              "Select Gender"
            )}

            {renderSelect(
              "Blood Group",
              "bloodGroup",
              [
                { value: "O_POSITIVE", label: "O+" },
                { value: "O_NEGATIVE", label: "O-" },
                { value: "A_POSITIVE", label: "A+" },
                { value: "A_NEGATIVE", label: "A-" },
                { value: "B_POSITIVE", label: "B+" },
                { value: "B_NEGATIVE", label: "B-" },
                { value: "AB_POSITIVE", label: "AB+" },
                { value: "AB_NEGATIVE", label: "AB-" },
              ],
              "Select Blood Group"
            )}

            {renderInput("Nationality", "nationality")}
            {renderInput("Religion", "religion")}
          </div>
        </section>

        <div className="border-t border-slate-100" />

        {/* Academic Details */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              University Details
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Your current programme and academic placement
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
            {renderInput("Department", "department")}

            {renderSelect(
              "Semester",
              "semester",
              [1, 2, 3, 4, 5, 6, 7, 8].map((sem) => ({
                value: String(sem),
                label: `Semester ${sem}`,
              })),
              "Select Semester"
            )}

            {renderSelect(
              "Section",
              "section",
              ["A", "B", "C"].map((section) => ({
                value: section,
                label: section,
              })),
              "Select Section"
            )}

            {renderSelect(
              "Student Type",
              "studentType",
              [
                { value: "DAY_SCHOLAR", label: "Day Scholar" },
                { value: "HOSTELLER", label: "Hosteller" },
              ],
              "Select Student Type"
            )}
          </div>
        </section>

        <div className="border-t border-slate-100" />

        {/* Address Details */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Address Information
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Your current and permanent residential address
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renderTextarea("Current Address", "address", true)}
            {renderTextarea("Permanent Address", "permanentAddress")}

            <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={
                  profileData.address !== "" &&
                  profileData.address === profileData.permanentAddress
                }
                disabled={isDisabled}
                onChange={(e) => {
                  if (e.target.checked) {
                    setProfileData((prev) => ({
                      ...prev,
                      permanentAddress: prev.address,
                    }));
                  } else {
                    setProfileData((prev) => ({
                      ...prev,
                      permanentAddress: "",
                    }));
                  }
                }}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />
              Same as Current Address
            </label>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <LockKeyhole size={14} />
          Your personal information is kept private.
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          {profileExists ? (
            isEditing ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md sm:w-auto"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={16} />
              {saving ? "Creating..." : "Create Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;
