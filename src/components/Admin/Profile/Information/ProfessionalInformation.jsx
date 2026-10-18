import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Pencil,
  Check,
  X,
} from "lucide-react";

import InfoRow from "./InfoRow";

const ProfessionalInformation = ({
  admin: adminProp,
  loading = false,
  onSave,
}) => {
  // Safely handle null or undefined profile data.
  const admin = adminProp ?? {};

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const professionalFields = [
    { name: "designation", label: "Designation" },
    { name: "department", label: "Department" },
    { name: "school", label: "School" },
    { name: "qualification", label: "Qualification" },
    { name: "specialization", label: "Specialization" },
    { name: "officeHours", label: "Office Hours" },
  ];

  const getFormValues = (profile = {}) => ({
    designation: profile.designation ?? "",
    department: profile.department ?? "",
    school: profile.school ?? "",
    qualification: profile.qualification ?? "",
    specialization: profile.specialization ?? "",
    officeHours: profile.officeHours ?? "",
  });

  const [form, setForm] = useState(() =>
    getFormValues(admin)
  );

  // Keep editable fields synchronized with the latest profile.
  useEffect(() => {
    setForm(getFormValues(admin));
  }, [
    admin.designation,
    admin.department,
    admin.school,
    admin.qualification,
    admin.specialization,
    admin.officeHours,
  ]);

  const getValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      return "Not provided";
    }

    return value;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setForm(getFormValues(admin));
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(getFormValues(admin));
    setError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (typeof onSave !== "function") {
      setError("Profile saving is not configured.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await onSave({
        designation: form.designation.trim(),
        department: form.department.trim(),
        school: form.school.trim(),
        qualification: form.qualification.trim(),
        specialization: form.specialization.trim(),
        officeHours: form.officeHours.trim(),
      });

      setIsEditing(false);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update professional information."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50";

  return (
    <div className="h-full min-h-[416px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness
            size={18}
            className="text-blue-600"
          />

          <h2 className="text-[18px] font-semibold text-slate-900">
            Professional Information
          </h2>
        </div>

        {!loading && !isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={14} />
            Edit
          </button>
        )}

        {!loading && isEditing && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <X size={14} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Check size={14} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* ================= Details ================= */}
      <div className="space-y-1">
        {loading ? (
          <div className="space-y-4 py-2">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="h-5 animate-pulse rounded bg-slate-100"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Employee ID: fetched from backend, never editable */}
            <div className="text-slate-400">
              <InfoRow
                label="Employee ID"
                value={getValue(admin.employeeId)}
              />
            </div>

            {/* Editable professional details */}
            {professionalFields.map((field) => (
              <div key={field.name}>
                {isEditing ? (
                  <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-center sm:gap-3">
                    <label
                      htmlFor={`professional-${field.name}`}
                      className="text-sm font-medium text-slate-600"
                    >
                      {field.label}
                    </label>

                    <input
                      id={`professional-${field.name}`}
                      name={field.name}
                      type="text"
                      value={form[field.name]}
                      onChange={handleChange}
                      disabled={saving}
                      className={inputClass}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ) : (
                  <InfoRow
                    label={field.label}
                    value={getValue(admin[field.name])}
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* ================= Error Message ================= */}
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default ProfessionalInformation;