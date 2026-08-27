import React, { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Save,
  Users,
  Pencil,
} from "lucide-react";

import api from "../../api/axios";

const ContactDetailsCard = () => {

  //--------------------------------------------------
  // Contact Details State
  //--------------------------------------------------

  const [contactData, setContactData] = useState({

    // Address

    permanentAddress: "",
    currentAddress: "",
    addressType: "",
    durationAtCurrentAddress: "",

    // Contact

    personalMobile: "",
    alternateMobile: "",
    personalEmail: "",
    alternateEmail: "",

    // Social

    whatsappNumber: "",
    telegramUsername: "",
    linkedInProfile: "",
    githubProfile: "",

    // Preferences

    preferredContactMethod: "",
    preferredContactTime: "",
    communicationEmailPreference: "",
    allowWhatsappCommunication: false,

  });

  //--------------------------------------------------
  // UI State
  //--------------------------------------------------

  const [loading, setLoading] =
    useState(true);

  const [profileExists, setProfileExists] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  //--------------------------------------------------
  // Initial Load
  //--------------------------------------------------

  useEffect(() => {
    fetchContactDetails();
  }, []);

  //--------------------------------------------------
  // Fetch Contact Details
  //--------------------------------------------------

  const fetchContactDetails = async () => {

    try {

      const response =
        await api.get(
          "/mentee/profile/contact"
        );

      if (response.data.data) {

        setContactData(response.data.data);

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

  //--------------------------------------------------
  // Handle Change
  //--------------------------------------------------

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setContactData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  //--------------------------------------------------
  // Save
  //--------------------------------------------------

  const handleSave = async () => {

    try {

      if (profileExists) {

        await api.put(
          "/mentee/profile/contact",
          contactData
        );

      } else {

        await api.post(
          "/mentee/profile/contact",
          contactData
        );

        setProfileExists(true);

      }

      setIsEditing(false);

      fetchContactDetails();

    } catch (error) {

      console.error(error);

    }

  };

  //--------------------------------------------------
  // Edit
  //--------------------------------------------------

  const handleEdit = () => {

    setIsEditing(true);

  };

  //--------------------------------------------------
  // Loading
  //--------------------------------------------------

  if (loading) {

    return (

      <div className="bg-white rounded-2xl p-10 text-center">

        Loading...

      </div>

    );

  }

  return (

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">

      {/* ================= Header ================= */}

      <div className="mb-4">

        <div className="flex items-center gap-2">

          <Mail
            size={18}
            className="text-blue-600"
          />

          <h2 className="text-lg font-semibold text-blue-600">

            Contact Details

          </h2>

        </div>

        <p className="text-[13px] text-slate-500 mt-1">

          Manage your contact information

        </p>

      </div>

      {/* ================= Top Cards ================= */}

      <div className="grid grid-cols-2 gap-4">

        {/* ================= Address ================= */}

        <div className="border border-slate-200 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-4">

            <MapPin
              size={17}
              className="text-blue-600"
            />

            <h3 className="text-base font-semibold text-blue-600">

              Address Details

            </h3>

          </div>
                    {/* ================= Permanent Address ================= */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Permanent Address
            </label>

            <textarea
              rows={2}
              name="permanentAddress"
              value={contactData.permanentAddress || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                px-3
                py-2
                text-[13px]
                resize-none
                outline-none
                focus:border-blue-500
                disabled:bg-slate-50
              "
            />

          </div>

          {/* ================= Same as Permanent ================= */}

          <div className="mt-3">

            <label className="flex items-center gap-2 text-[12px] text-slate-600">

              <input
                type="checkbox"
                disabled={profileExists && !isEditing}
                checked={
                  contactData.permanentAddress !== "" &&
                  contactData.permanentAddress ===
                    contactData.currentAddress
                }
                onChange={(e) => {

                  if (e.target.checked) {

                    setContactData((prev) => ({
                      ...prev,
                      currentAddress:
                        prev.permanentAddress,
                    }));

                  } else {

                    setContactData((prev) => ({
                      ...prev,
                      currentAddress: "",
                    }));

                  }

                }}
                className="w-4 h-4 accent-blue-600"
              />

              Same as Permanent Address

            </label>

          </div>

          {/* ================= Current Address ================= */}

          <div className="mt-4">

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Current Address
            </label>

            <textarea
              rows={2}
              name="currentAddress"
              value={contactData.currentAddress || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                px-3
                py-2
                text-[13px]
                resize-none
                outline-none
                focus:border-blue-500
                disabled:bg-slate-50
              "
            />

          </div>

          {/* ================= Bottom ================= */}

          <div className="grid grid-cols-2 gap-4 mt-4">

            {/* Address Type */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Address Type
              </label>

              <select
                name="addressType"
                value={contactData.addressType || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              >
                <option value="">
                  Select Address Type
                </option>

                <option value="HOME">
                  Home
                </option>

                <option value="HOSTEL">
                  Hostel
                </option>

                <option value="RENTED">
                  Rented
                </option>

                <option value="OTHER">
                  Other
                </option>

              </select>

            </div>

            {/* Duration */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Duration at Current Address
              </label>

              <input
                type="text"
                name="durationAtCurrentAddress"
                value={
                  contactData.durationAtCurrentAddress || ""
                }
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                placeholder="Eg. Since July 2023"
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

          </div>

        </div>
                {/* ================= Contact Information ================= */}

        <div className="border border-slate-200 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-4">

            <Phone
              size={17}
              className="text-blue-600"
            />

            <h3 className="text-base font-semibold text-blue-600">
              Contact Information
            </h3>

          </div>

          <div className="grid grid-cols-2 gap-3">

            {/* Personal Mobile */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Personal Mobile Number
              </label>

              <input
                type="text"
                name="personalMobile"
                value={contactData.personalMobile || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* Alternate Mobile */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Alternate Mobile Number
              </label>

              <input
                type="text"
                name="alternateMobile"
                value={contactData.alternateMobile || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* Personal Email */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Personal Email
              </label>

              <input
                type="email"
                name="personalEmail"
                value={contactData.personalEmail || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* Alternate Email */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Alternate Email
              </label>

              <input
                type="email"
                name="alternateEmail"
                value={contactData.alternateEmail || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* WhatsApp */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                WhatsApp Number
              </label>

              <input
                type="text"
                name="whatsappNumber"
                value={contactData.whatsappNumber || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* Telegram */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Telegram Username
              </label>

              <input
                type="text"
                name="telegramUsername"
                value={contactData.telegramUsername || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                placeholder="@username"
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* LinkedIn */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                LinkedIn Profile
              </label>

              <input
                type="text"
                name="linkedInProfile"
                value={contactData.linkedInProfile || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                placeholder="https://linkedin.com/in/..."
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* GitHub */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                GitHub Profile
              </label>

              <input
                type="text"
                name="githubProfile"
                value={contactData.githubProfile || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                placeholder="https://github.com/username"
                className="
                  w-full
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  text-[13px]
                  outline-none
                  focus:border-blue-500
                  disabled:bg-slate-50
                "
              />

            </div>

          </div>

        </div>

      </div>
            {/* ================= Additional Contact ================= */}

      <div className="mt-4 border border-slate-200 rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-4">

          <Users
            size={17}
            className="text-blue-600"
          />

          <h3 className="text-base font-semibold text-blue-600">

            Additional Contact

          </h3>

        </div>

        <div className="grid grid-cols-4 gap-4">

          {/* Preferred Contact Method */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Preferred Contact Method
            </label>

            <select
              name="preferredContactMethod"
              value={contactData.preferredContactMethod || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-200
                px-3
                text-[13px]
                outline-none
                focus:border-blue-500
                disabled:bg-slate-50
              "
            >
              <option value="">
                Select Method
              </option>

              <option value="MOBILE">
                Mobile
              </option>

              <option value="EMAIL">
                Email
              </option>

              <option value="WHATSAPP">
                WhatsApp
              </option>

            </select>

          </div>

          {/* Preferred Contact Time */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Preferred Contact Time
            </label>

            <input
              type="text"
              name="preferredContactTime"
              value={contactData.preferredContactTime || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              placeholder="Eg. 6 PM - 9 PM"
              className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-200
                px-3
                text-[13px]
                outline-none
                focus:border-blue-500
                disabled:bg-slate-50
              "
            />

          </div>

          {/* Communication Email Preference */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Communication Email Preference
            </label>

            <select
              name="communicationEmailPreference"
              value={
                contactData.communicationEmailPreference || ""
              }
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-200
                px-3
                text-[13px]
                outline-none
                focus:border-blue-500
                disabled:bg-slate-50
              "
            >
              <option value="">
                Select Email
              </option>

              <option value="PERSONAL_EMAIL">
                Personal Email
              </option>

              <option value="UNIVERSITY_EMAIL">
                University Email
              </option>

            </select>

          </div>

          {/* Allow WhatsApp Communication */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-2">
              Allow Communication on WhatsApp
            </label>

            <div className="flex items-center h-9">

              <label className="flex items-center cursor-pointer">

                <input
                  type="checkbox"
                  name="allowWhatsappCommunication"
                  checked={
                    contactData.allowWhatsappCommunication
                  }
                  onChange={handleChange}
                  disabled={profileExists && !isEditing}
                  className="sr-only"
                />

                <div
                  className={`
                    relative
                    w-11
                    h-6
                    rounded-full
                    transition-colors
                    ${
                      contactData.allowWhatsappCommunication
                        ? "bg-blue-600"
                        : "bg-slate-300"
                    }
                    ${
                      profileExists && !isEditing
                        ? "opacity-70"
                        : ""
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-0.5
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      shadow
                      transition-all
                      ${
                        contactData.allowWhatsappCommunication
                          ? "right-0.5"
                          : "left-0.5"
                      }
                    `}
                  />

                </div>

              </label>

            </div>

          </div>

        </div>
                {/* ================= Footer ================= */}

        <div className="flex justify-end mt-5">

          {profileExists ? (

            isEditing ? (

              <button
                type="button"
                onClick={handleSave}
                className="
                  flex
                  items-center
                  gap-2
                  h-9
                  px-5
                  rounded-lg
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-500
                  text-white
                  text-[13px]
                  font-medium
                  shadow-md
                  hover:shadow-lg
                  transition
                "
              >

                <Save size={15} />

                <span>

                  Save Changes

                </span>

              </button>

            ) : (

              <button
                type="button"
                onClick={handleEdit}
                className="
                  flex
                  items-center
                  gap-2
                  h-9
                  px-5
                  rounded-lg
                  bg-gradient-to-r
                  from-amber-500
                  to-amber-400
                  text-white
                  text-[13px]
                  font-medium
                  shadow-md
                  hover:shadow-lg
                  transition
                "
              >

                <Pencil size={15} />

                <span>

                  Edit Details

                </span>

              </button>

            )

          ) : (

            <button
              type="button"
              onClick={handleSave}
              className="
                flex
                items-center
                gap-2
                h-9
                px-5
                rounded-lg
                bg-gradient-to-r
                from-green-600
                to-green-500
                text-white
                text-[13px]
                font-medium
                shadow-md
                hover:shadow-lg
                transition
              "
            >

              <Save size={15} />

              <span>

                Create Details

              </span>

            </button>

          )}

        </div>

      </div>

    </div>

  );

};

export default ContactDetailsCard;