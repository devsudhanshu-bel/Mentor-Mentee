
import React, { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  Info,
  Save,
  Pencil,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

import api from "../../api/axios";

const ParentGuardianCard = () => {
  // Parent Details State
  const [parentData, setParentData] = useState({
    fatherName: "",
    fatherOccupation: "",
    fatherCompany: "",
    fatherAnnualIncome: "",
    fatherQualification: "",
    fatherEmail: "",
    fatherPhone: "",
    fatherAddress: "",

    motherName: "",
    motherOccupation: "",
    motherQualification: "",
    motherAnnualIncome: "",
    motherEmail: "",
    motherPhone: "",
    motherAddress: "",

    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    guardianAlternatePhone: "",
  });

  // UI State
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Initial Load
  useEffect(() => {
    fetchParentDetails();
  }, []);

  // Fetch Parent Details
  const fetchParentDetails = async () => {
    try {
      const response = await api.get("/mentee/profile/parent");

      if (response.data.data) {
        setParentData((prev) => ({
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

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setParentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Details
  const handleSave = async () => {
    try {
      setSaving(true);

      if (profileExists) {
        await api.put("/mentee/profile/parent", parentData);
      } else {
        await api.post("/mentee/profile/parent", parentData);
        setProfileExists(true);
      }

      setIsEditing(false);
      await fetchParentDetails();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Edit Details
  const handleEdit = () => {
    setIsEditing(true);
  };

  const isDisabled = profileExists && !isEditing;

  // Common Field Styling
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

  // Reusable Input
  const renderInput = (label, name, type = "text") => (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={parentData[name] || ""}
        onChange={handleChange}
        disabled={isDisabled}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={fieldClass}
      />
    </div>
  );

  // Reusable Textarea
  const renderTextarea = (label, name) => (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <textarea
        id={name}
        rows={3}
        name={name}
        value={parentData[name] || ""}
        onChange={handleChange}
        disabled={isDisabled}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="
          min-h-[88px] w-full resize-y rounded-xl
          border border-slate-200 bg-white px-3.5 py-3
          text-sm text-slate-800 outline-none
          transition-all duration-200
          placeholder:text-slate-400
          focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
          disabled:resize-none disabled:cursor-not-allowed
          disabled:bg-slate-50 disabled:text-slate-600
        "
      />
    </div>
  );

  // Loading Skeleton
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 h-6 w-56 animate-pulse rounded-lg bg-slate-100" />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {[1, 2].map((card) => (
            <div
              key={card}
              className="space-y-4 rounded-2xl border border-slate-100 p-5"
            >
              <div className="h-5 w-36 animate-pulse rounded bg-slate-100" />

              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
                  <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
                </div>
              ))}
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
            <Users size={21} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800 sm:text-lg">
              Parent / Guardian Details
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Manage your family and guardian information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          {profileExists && !isEditing && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={14} />
              Details saved
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

      <div className="space-y-7 px-5 py-6 sm:px-7">

        {/* Parent Details */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Family Information
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Provide the professional and contact details of your parents
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* Father Details */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserRound size={19} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Father Details
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Father's personal and professional information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {renderInput("Full Name", "fatherName")}
                {renderInput("Occupation", "fatherOccupation")}
                {renderInput("Organization / Company", "fatherCompany")}
                {renderInput("Annual Income", "fatherAnnualIncome")}
                {renderInput("Email Address", "fatherEmail", "email")}
                {renderInput("Mobile Number", "fatherPhone")}
                {renderInput("Education Qualification", "fatherQualification")}

                <div className="sm:col-span-2">
                  {renderTextarea("Work Address", "fatherAddress")}
                </div>
              </div>
            </div>

            {/* Mother Details */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <UserRound size={19} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Mother Details
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Mother's personal and professional information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {renderInput("Full Name", "motherName")}
                {renderInput("Occupation", "motherOccupation")}
                {renderInput("Email Address", "motherEmail", "email")}
                {renderInput("Mobile Number", "motherPhone")}
                {renderInput("Education Qualification", "motherQualification")}
                {renderInput("Annual Income", "motherAnnualIncome")}

                <div className="sm:col-span-2">
                  {renderInput("Address", "motherAddress")}
                </div>

                <div className="sm:col-span-2">
                  <label className="flex w-fit cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-600">
                    <input
                      type="checkbox"
                      checked={
                        parentData.fatherAddress !== "" &&
                        parentData.fatherAddress === parentData.motherAddress
                      }
                      disabled={isDisabled}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setParentData((prev) => ({
                            ...prev,
                            motherAddress: prev.fatherAddress,
                          }));
                        } else {
                          setParentData((prev) => ({
                            ...prev,
                            motherAddress: "",
                          }));
                        }
                      }}
                      className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                    />

                    Same as Father Address
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-slate-100" />

        {/* Guardian Details */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Guardian Information
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Additional details in case a guardian needs to be contacted
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Users size={19} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Other Guardian Details
                </h4>

                <p className="mt-0.5 text-xs text-slate-400">
                  Alternate guardian and emergency contact information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              {renderInput("Guardian Name", "guardianName")}
              {renderInput("Relationship with Guardian", "guardianRelationship")}
              {renderInput("Guardian Mobile Number", "guardianPhone")}
              {renderInput("Alternate Mobile Number", "guardianAlternatePhone")}
            </div>
          </div>
        </section>

        {/* Information Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3.5">
          <Info size={17} className="mt-0.5 shrink-0 text-blue-600" />

          <p className="text-xs leading-relaxed text-blue-800">
            Please ensure that the above information is accurate and up to date.
            These details may be used for official university communications
            and important student-related notifications.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <LockKeyhole size={14} />
          Your family information is kept private.
        </div>

        <div className="flex w-full gap-3 sm:w-auto">
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
                Edit Details
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
              {saving ? "Creating..." : "Create Details"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentGuardianCard;
