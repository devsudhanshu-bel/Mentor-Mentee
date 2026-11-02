
import React, { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Save,
  Users,
  Pencil,
  CheckCircle2,
  LockKeyhole,
  MessageCircle,
  Globe,
  Info,
} from "lucide-react";

import api from "../../api/axios";

const ContactDetailsCard = () => {
  // Contact Details State
  const [contactData, setContactData] = useState({
    permanentAddress: "",
    currentAddress: "",
    addressType: "",
    durationAtCurrentAddress: "",

    personalMobile: "",
    alternateMobile: "",
    personalEmail: "",
    alternateEmail: "",

    whatsappNumber: "",
    telegramUsername: "",
    linkedInProfile: "",
    githubProfile: "",

    preferredContactMethod: "",
    preferredContactTime: "",
    communicationEmailPreference: "",
    allowWhatsappCommunication: false,
  });

  // UI State
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Initial Load
  useEffect(() => {
    fetchContactDetails();
  }, []);

  // Fetch Contact Details
  const fetchContactDetails = async () => {
    try {
      const response = await api.get("/mentee/profile/contact");

      if (response.data.data) {
        setContactData((prev) => ({
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
    const { name, value, type, checked } = e.target;

    setContactData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save Contact Details
  const handleSave = async () => {
    try {
      setSaving(true);

      if (profileExists) {
        await api.put("/mentee/profile/contact", contactData);
      } else {
        await api.post("/mentee/profile/contact", contactData);
        setProfileExists(true);
      }

      setIsEditing(false);
      await fetchContactDetails();
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

  // Common Styling
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
  const renderInput = (label, name, type = "text", placeholder = "") => (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={contactData[name] || ""}
        onChange={handleChange}
        disabled={isDisabled}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={fieldClass}
      />
    </div>
  );

  // Reusable Select
  const renderSelect = (label, name, options, placeholder) => (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={contactData[name] || ""}
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
        value={contactData[name] || ""}
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
        <div className="mb-6 h-6 w-48 animate-pulse rounded-lg bg-slate-100" />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {[1, 2].map((card) => (
            <div
              key={card}
              className="space-y-4 rounded-2xl border border-slate-100 p-5"
            >
              <div className="h-5 w-36 animate-pulse rounded bg-slate-100" />

              {Array.from({ length: 5 }).map((_, index) => (
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
            <Mail size={21} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800 sm:text-lg">
              Contact Details
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Manage your addresses, contact information and communication preferences
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

        {/* Address and Contact Information */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Address & Contact Information
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Your residential address and primary communication details
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* Address Details */}
            <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin size={19} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Address Details
                  </h4>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Your current and permanent residence
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {renderTextarea("Permanent Address", "permanentAddress")}

                <label className="flex w-fit cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={
                      contactData.permanentAddress !== "" &&
                      contactData.permanentAddress === contactData.currentAddress
                    }
                    disabled={isDisabled}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setContactData((prev) => ({
                          ...prev,
                          currentAddress: prev.permanentAddress,
                        }));
                      } else {
                        setContactData((prev) => ({
                          ...prev,
                          currentAddress: "",
                        }));
                      }
                    }}
                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                  />

                  Same as Permanent Address
                </label>

                {renderTextarea("Current Address", "currentAddress")}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {renderSelect(
                    "Address Type",
                    "addressType",
                    [
                      { value: "HOME", label: "Home" },
                      { value: "HOSTEL", label: "Hostel" },
                      { value: "RENTED", label: "Rented" },
                      { value: "OTHER", label: "Other" },
                    ],
                    "Select Address Type"
                  )}

                  {renderInput(
                    "Duration at Current Address",
                    "durationAtCurrentAddress",
                    "text",
                    "Eg. Since July 2023"
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Phone size={19} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Contact Information
                  </h4>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Your phone numbers and email addresses
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {renderInput("Personal Mobile Number", "personalMobile", "tel")}
                {renderInput("Alternate Mobile Number", "alternateMobile", "tel")}
                {renderInput("Personal Email", "personalEmail", "email")}
                {renderInput("Alternate Email", "alternateEmail", "email")}
                {renderInput("WhatsApp Number", "whatsappNumber", "tel")}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-slate-100" />

        {/* Social & Online Profiles */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Social & Online Profiles
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Add your online profiles to make professional communication easier
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Globe size={19} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Online Presence
                </h4>

                <p className="mt-0.5 text-xs text-slate-400">
                  Your social and professional profiles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
              {renderInput(
                "Telegram Username",
                "telegramUsername",
                "text",
                "@username"
              )}

              {renderInput(
                "LinkedIn Profile",
                "linkedInProfile",
                "url",
                "https://linkedin.com/in/..."
              )}

              {renderInput(
                "GitHub Profile",
                "githubProfile",
                "url",
                "https://github.com/username"
              )}
            </div>
          </div>
        </section>

        <div className="border-t border-slate-100" />

        {/* Communication Preferences */}
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Communication Preferences
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Choose how and when you prefer to receive communications
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MessageCircle size={19} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Contact Preferences
                </h4>

                <p className="mt-0.5 text-xs text-slate-400">
                  Set your preferred communication channels
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
              {renderSelect(
                "Preferred Contact Method",
                "preferredContactMethod",
                [
                  { value: "MOBILE", label: "Mobile" },
                  { value: "EMAIL", label: "Email" },
                  { value: "WHATSAPP", label: "WhatsApp" },
                ],
                "Select Method"
              )}

              {renderInput(
                "Preferred Contact Time",
                "preferredContactTime",
                "text",
                "Eg. 6 PM - 9 PM"
              )}

              {renderSelect(
                "Communication Email Preference",
                "communicationEmailPreference",
                [
                  { value: "PERSONAL_EMAIL", label: "Personal Email" },
                  { value: "UNIVERSITY_EMAIL", label: "University Email" },
                ],
                "Select Email"
              )}
            </div>

            {/* WhatsApp Toggle */}
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <MessageCircle size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    WhatsApp Communication
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Allow the university to contact you through WhatsApp.
                  </p>
                </div>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-3 self-start sm:self-auto">
                <span className="text-xs font-semibold text-slate-600">
                  {contactData.allowWhatsappCommunication ? "Enabled" : "Disabled"}
                </span>

                <input
                  type="checkbox"
                  name="allowWhatsappCommunication"
                  checked={Boolean(contactData.allowWhatsappCommunication)}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="sr-only"
                />

                <span
                  className={`
                    relative h-6 w-11 rounded-full transition-colors duration-200
                    ${contactData.allowWhatsappCommunication ? "bg-blue-600" : "bg-slate-300"}
                    ${isDisabled ? "cursor-not-allowed opacity-70" : ""}
                  `}
                >
                  <span
                    className={`
                      absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm
                      transition-all duration-200
                      ${contactData.allowWhatsappCommunication ? "left-[22px]" : "left-0.5"}
                    `}
                  />
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Information Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3.5">
          <Info size={17} className="mt-0.5 shrink-0 text-blue-600" />

          <p className="text-xs leading-relaxed text-blue-800">
            Please ensure that your contact information is accurate and up to
            date. Your preferences will help the university communicate with
            you through your chosen channels.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <LockKeyhole size={14} />
          Your contact information is kept private.
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

export default ContactDetailsCard;
