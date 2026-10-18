
import React, { useEffect, useState } from "react";
import { User, Pencil, Save, X } from "lucide-react";

import InfoRow from "./InfoRow";

const EMPTY_FORM = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  email: "",
  phone: "",
  officePhone: "",
  office: "",
  dateOfJoining: "",
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const toDateInput = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

const PersonalInformation = ({
  admin = null,
  loading = false,
  profileExists = false,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    setForm({
      fullName: admin?.fullName ?? "",
      dateOfBirth: toDateInput(admin?.dateOfBirth),
      gender: admin?.gender ?? "",
      nationality: admin?.nationality ?? "",
      email: admin?.email ?? "",
      phone: admin?.phone ?? "",
      officePhone: admin?.officePhone ?? "",
      office: admin?.office ?? "",
      dateOfJoining: toDateInput(admin?.dateOfJoining),
    });
  }, [admin]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm({
      fullName: admin?.fullName ?? "",
      dateOfBirth: toDateInput(admin?.dateOfBirth),
      gender: admin?.gender ?? "",
      nationality: admin?.nationality ?? "",
      email: admin?.email ?? "",
      phone: admin?.phone ?? "",
      officePhone: admin?.officePhone ?? "",
      office: admin?.office ?? "",
      dateOfJoining: toDateInput(admin?.dateOfJoining),
    });

    setError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    const fullName = form.fullName.trim();
    const email = form.email.trim();

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (typeof onSave !== "function") {
      setError("Profile save handler is not configured.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        fullName,
        email,
        gender: form.gender.trim(),
        nationality: form.nationality.trim(),
        phone: form.phone.trim(),
        officePhone: form.officePhone.trim(),
        office: form.office.trim(),
        dateOfBirth: form.dateOfBirth || null,
        dateOfJoining: form.dateOfJoining || null,
      };

      const result = await onSave(payload);

      if (result?.profileExists === false) {
        throw new Error("Your profile was not saved. Please try again.");
      }

      setIsEditing(false);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save Personal Information."
      );
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      label: "Date of Birth",
      name: "dateOfBirth",
      type: "date",
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other", "Prefer not to say"],
    },
    {
      label: "Nationality",
      name: "nationality",
      type: "text",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
    },
    {
      label: "Office Phone",
      name: "officePhone",
      type: "tel",
    },
    {
      label: "Office Location",
      name: "office",
      type: "text",
    },
    {
      label: "Date of Joining",
      name: "dateOfJoining",
      type: "date",
    },
  ];

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50";

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <User size={18} className="text-blue-600" />

          <h2 className="text-[18px] font-semibold text-slate-900">
            Personal Information
          </h2>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            disabled={loading || saving}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil size={14} />
            Edit
          </button>
        )}
      </div>

      {loading ? (
        <p className="py-4 text-[13px] text-slate-500">
          Loading personal information...
        </p>
      ) : isEditing ? (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          {fields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label
                htmlFor={`admin-${field.name}`}
                className="block text-[12px] font-medium text-slate-600"
              >
                {field.label}
                {field.required && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>

              {field.type === "select" ? (
                <select
                  id={`admin-${field.name}`}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  disabled={saving}
                  className={inputClass}
                >
                  <option value="">Select gender</option>

                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`admin-${field.name}`}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  disabled={saving}
                  className={inputClass}
                />
              )}
            </div>
          ))}

          {/* Editable Email */}
          <div className="space-y-1">
            <label
              htmlFor="admin-email"
              className="block text-[12px] font-medium text-slate-600"
            >
              Email Address
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="admin-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={saving}
              autoComplete="email"
              className={inputClass}
              placeholder="Enter your email address"
            />

            <p className="text-[11px] text-slate-400">
              Use a valid email address associated with your account.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <X size={14} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-[12px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

          {error && (
            <p role="alert" className="text-[12px] text-red-600">
              {error}
            </p>
          )}
        </form>
      ) : (
        <div className="space-y-1">
          <InfoRow
            label="Full Name"
            value={admin?.fullName || "Not provided"}
          />

          <InfoRow
            label="Date of Birth"
            value={formatDate(admin?.dateOfBirth) || "Not provided"}
          />

          <InfoRow
            label="Gender"
            value={admin?.gender || "Not provided"}
          />

          <InfoRow
            label="Nationality"
            value={admin?.nationality || "Not provided"}
          />

          <InfoRow
            label="Email Address"
            value={admin?.email || "Not provided"}
          />

          <InfoRow
            label="Phone Number"
            value={admin?.phone || "Not provided"}
          />

          <InfoRow
            label="Office Phone"
            value={admin?.officePhone || "Not provided"}
          />

          <InfoRow
            label="Office Location"
            value={admin?.office || "Not provided"}
          />

          <InfoRow
            label="Date of Joining"
            value={formatDate(admin?.dateOfJoining) || "Not provided"}
          />
        </div>
      )}

      {!loading && !isEditing && !profileExists && (
        <p className="mt-3 text-[12px] text-amber-600">
          Complete and save your Personal Information first to create
          your Admin profile.
        </p>
      )}
    </div>
  );
};

export default PersonalInformation;
