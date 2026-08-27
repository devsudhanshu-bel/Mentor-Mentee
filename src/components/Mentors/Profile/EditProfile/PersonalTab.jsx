import React from "react";
import { Camera } from "lucide-react";

import defaultProfile from "../../../../assets/profile.jpg";

const InputField = ({
  label,
  value,
  name,
  onChange,
  readOnly = false,
  type = "text",
}) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value || ""}
      readOnly={readOnly}
      onChange={onChange}
      className={`
        w-full rounded-xl border px-4 py-3 text-sm outline-none transition

        ${
          readOnly
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
            : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        }
      `}
    />
  </div>
);

const PersonalTab = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={
              formData.profileImage &&
              formData.profileImage.trim() !== ""
                ? formData.profileImage
                : defaultProfile
            }
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-slate-200 object-cover"
          />

          <button
            className="
              absolute
              bottom-1
              right-1
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-white
              shadow-lg
              transition
              hover:bg-blue-700
            "
          >
            <Camera size={18} />
          </button>
        </div>

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
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Form */}
      <div className="grid grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <InputField
          label="Email Address"
          name="email"
          value={formData.email}
          readOnly
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalTab;