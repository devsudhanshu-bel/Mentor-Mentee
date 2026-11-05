import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  User,
  Building2,
  Brain,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Clock3,
  Pencil,
  Save,
  X,
  LockKeyhole,
} from "lucide-react";

/* ==========================================================
   EMPTY FORM
========================================================== */

const EMPTY_FORM = {
  employeeId: "",
  designation: "",
  department: "",
  specialization: "",
  qualification: "",
  office: "",
  email: "",
  phone: "",
  officeHours: "",
};

/* ==========================================================
   GET FORM DATA FROM MENTOR
========================================================== */

const getFormDataFromMentor = (mentor) => {
  if (!mentor) {
    return EMPTY_FORM;
  }

  return {
    /*
     * New backend field = employeeCode
     * employeeId kept as fallback for frontend compatibility.
     */

    employeeId:
      mentor.employeeCode ||
      mentor.employeeId ||
      "",

    designation:
      mentor.designation ||
      "",

    department:
      mentor.department ||
      "",

    specialization:
      mentor.specialization ||
      "",

    qualification:
      mentor.qualification ||
      "",

    office:
      mentor.office ||
      "",

    email:
      mentor.email ||
      "",

    phone:
      mentor.phone ||
      "",

    officeHours:
      mentor.officeHours ||
      "",
  };
};

/* ==========================================================
   EDITABLE FIELD
   IMPORTANT:
   This component is OUTSIDE ProfessionalInformation.
   This prevents the input from being recreated on every
   keystroke and fixes the focus-loss bug.
========================================================== */

const EditableField = ({
  icon: Icon,
  label,
  field,
  value,
  onChange,
  isEditing,
  readOnly = false,
  type = "text",
  blue = false,
}) => {
  return (
    <div className="grid min-w-0 grid-cols-[18px_minmax(0,105px)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[18px_140px_minmax(0,1fr)] sm:gap-3">
      {/* ====================================================
          ICON
      ==================================================== */}

      <Icon
        size={15}
        className="mt-2 shrink-0 text-slate-500"
      />

      {/* ====================================================
          LABEL
      ==================================================== */}

      <div className="flex min-w-0 items-center gap-1 pt-2">
        <span className="break-words text-[11px] font-medium text-slate-600 sm:text-[12px]">
          {label}
        </span>

        {readOnly && isEditing && (
          <LockKeyhole
            size={11}
            className="shrink-0 text-slate-400"
          />
        )}
      </div>

      {/* ====================================================
          VALUE / INPUT
      ==================================================== */}

      {!isEditing ? (
        <span
          className={`min-w-0 break-words pt-2 text-[11px] sm:text-[12px] ${
            blue
              ? "font-medium text-blue-600"
              : "text-slate-800"
          }`}
        >
          {value || "Not Available"}
        </span>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(field, event.target.value)
          }
          disabled={readOnly}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={`w-full min-w-0 rounded-lg border px-2.5 py-2 text-[11px] outline-none transition sm:px-3 sm:text-[12px] ${
            readOnly
              ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
              : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
        />
      )}
    </div>
  );
};

/* ==========================================================
   PROFESSIONAL INFORMATION
========================================================== */

const ProfessionalInformation = ({
  mentor,
  onSave,
}) => {
  /* ========================================================
     STATE
  ======================================================== */

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(
    getFormDataFromMentor(mentor)
  );

  const [isSaving, setIsSaving] = useState(false);

  /* ========================================================
     SYNC BACKEND DATA → FORM

     Only sync when mentor changes from the parent.
  ======================================================== */

  useEffect(() => {
    if (!mentor) return;

    setFormData(
      getFormDataFromMentor(mentor)
    );
  }, [mentor]);

  /* ========================================================
     NO PROFILE
  ======================================================== */

  if (!mentor) {
    return (
      <div className="min-h-[420px] rounded-xl border border-slate-200 bg-white shadow-sm sm:min-h-[600px]">
        <div className="flex h-full items-center justify-center p-4 sm:p-8">
          <p className="text-center text-sm text-slate-500">
            No professional information available.
          </p>
        </div>
      </div>
    );
  }

  /* ========================================================
     HANDLE FIELD CHANGE
  ======================================================== */

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* ========================================================
     HANDLE EDIT
  ======================================================== */

  const handleEdit = () => {
    /*
     * Start editing using the latest backend values.
     */

    setFormData(
      getFormDataFromMentor(mentor)
    );

    setIsEditing(true);
  };

  /* ========================================================
     HANDLE CANCEL
  ======================================================== */

  const handleCancel = () => {
    /*
     * Restore the original backend values.
     */

    setFormData(
      getFormDataFromMentor(mentor)
    );

    setIsEditing(false);
  };

  /* ========================================================
     HANDLE SAVE
  ======================================================== */

  const handleSave = async () => {
    try {
      setIsSaving(true);

      /*
       * Send only fields that the mentor is allowed to edit.
       *
       * Employee ID and Department are institution-managed.
       */

      if (onSave) {
        await onSave({
          designation:
            formData.designation,

          specialization:
            formData.specialization,

          qualification:
            formData.qualification,

          office:
            formData.office,

          email:
            formData.email,

          phone:
            formData.phone,

          officeHours:
            formData.officeHours,
        });
      }

      /*
       * Leave edit mode only after successful save.
       */

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Failed to save professional information:",
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="min-h-[420px] min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm sm:min-h-[600px]">
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="flex flex-col gap-3 border-b border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        {/* TITLE */}

        <div className="flex min-w-0 items-center gap-2">
          <BadgeCheck
            size={16}
            className="shrink-0 text-blue-600"
          />

          <h2 className="text-[15px] font-semibold text-slate-900 sm:text-[16px]">
            Professional Information
          </h2>
        </div>

        {/* ==================================================
            ACTION BUTTONS
        ================================================== */}

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[12px] font-medium text-blue-600 transition hover:bg-blue-100 sm:w-auto sm:py-1.5"
          >
            <Pencil size={13} />

            Edit
          </button>
        ) : (
          <div className="flex w-full items-center gap-2 sm:w-auto">
            {/* CANCEL */}

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:py-1.5"
            >
              <X size={13} />

              Cancel
            </button>

            {/* SAVE */}

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-[12px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:py-1.5"
            >
              <Save size={13} />

              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* ====================================================
          EDIT MODE INFORMATION
      ==================================================== */}

      {isEditing && (
        <div className="mx-3 mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5 sm:mx-4 sm:mt-4">
          <p className="break-words text-[11px] leading-5 text-blue-700">
            Update your professional information below.
            Employee ID and Department are managed by the
            institution and cannot be changed here.
          </p>
        </div>
      )}

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div
        className={`min-w-0 space-y-4 p-3 sm:p-4 ${
          isEditing ? "pt-4 sm:pt-5" : ""
        }`}
      >
        {/* ==================================================
            EMPLOYEE ID
        ================================================== */}

        <EditableField
          icon={BadgeCheck}
          label="Employee ID"
          field="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          isEditing={isEditing}
          readOnly
        />

        {/* ==================================================
            DESIGNATION
        ================================================== */}

        <EditableField
          icon={User}
          label="Designation"
          field="designation"
          value={formData.designation}
          onChange={handleChange}
          isEditing={isEditing}
        />

        {/* ==================================================
            DEPARTMENT
        ================================================== */}

        <EditableField
          icon={Building2}
          label="Department"
          field="department"
          value={formData.department}
          onChange={handleChange}
          isEditing={isEditing}
          readOnly
        />

        {/* ==================================================
            SPECIALIZATION
        ================================================== */}

        <EditableField
          icon={Brain}
          label="Specialization"
          field="specialization"
          value={formData.specialization}
          onChange={handleChange}
          isEditing={isEditing}
        />

        {/* ==================================================
            QUALIFICATION
        ================================================== */}

        <EditableField
          icon={GraduationCap}
          label="Qualification"
          field="qualification"
          value={formData.qualification}
          onChange={handleChange}
          isEditing={isEditing}
        />

        {/* ==================================================
            OFFICE
        ================================================== */}

        <EditableField
          icon={MapPin}
          label="Office"
          field="office"
          value={formData.office}
          onChange={handleChange}
          isEditing={isEditing}
        />

        {/* ==================================================
            EMAIL
        ================================================== */}

        <EditableField
          icon={Mail}
          label="Email"
          field="email"
          value={formData.email}
          onChange={handleChange}
          isEditing={isEditing}
          type="email"
          blue
        />

        {/* ==================================================
            PHONE
        ================================================== */}

        <EditableField
          icon={Phone}
          label="Phone"
          field="phone"
          value={formData.phone}
          onChange={handleChange}
          isEditing={isEditing}
          type="tel"
        />

        {/* ==================================================
            OFFICE HOURS
        ================================================== */}

        <EditableField
          icon={Clock3}
          label="Office Hours"
          field="officeHours"
          value={formData.officeHours}
          onChange={handleChange}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default ProfessionalInformation;
