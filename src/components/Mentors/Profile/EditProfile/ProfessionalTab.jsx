import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) => (
  <div className="min-w-0 space-y-2">
    <label className="text-sm font-semibold text-slate-700">
      {label}
    </label>

    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full
        min-w-0
        rounded-xl
        border
        border-slate-300
        px-3
        py-3
        text-sm
        outline-none
        transition
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
        sm:px-4
      "
    />
  </div>
);

const ProfessionalTab = ({
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
    <div className="min-w-0 space-y-6 sm:space-y-8">
      {/* Section Heading */}

      <div>
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          Professional Information
        </h2>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Update your academic and professional details.
        </p>
      </div>

      {/* Form */}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <InputField
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
        />

        <InputField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />

        <InputField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />

        <InputField
          label="School"
          name="school"
          value={formData.school}
          onChange={handleChange}
        />

        <InputField
          label="Qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
        />

        <InputField
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />

        <InputField
          label="Office"
          name="office"
          value={formData.office}
          onChange={handleChange}
        />

        <InputField
          label="Office Hours"
          name="officeHours"
          value={formData.officeHours}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ProfessionalTab;
