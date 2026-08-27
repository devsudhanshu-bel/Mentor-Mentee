import React, { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  Info,
  Save,
  Pencil,
} from "lucide-react";

import api from "../../api/axios";

const ParentGuardianCard = () => {

  //--------------------------------------------------
  // Parent Details State
  //--------------------------------------------------

  const [parentData, setParentData] = useState({

    // Father

    fatherName: "",
    fatherOccupation: "",
    fatherCompany: "",
    fatherAnnualIncome: "",
    fatherQualification: "",
    fatherEmail: "",
    fatherPhone: "",
    fatherAddress: "",

    // Mother

    motherName: "",
    motherOccupation: "",
    motherQualification: "",
    motherAnnualIncome: "",
    motherEmail: "",
    motherPhone: "",
    motherAddress: "",

    // Guardian

    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    guardianAlternatePhone: "",

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
    fetchParentDetails();
  }, []);

  //--------------------------------------------------
  // Fetch Parent Details
  //--------------------------------------------------

  const fetchParentDetails = async () => {

    try {

      const response =
        await api.get(
          "/mentee/profile/parent"
        );

      if (response.data.data) {

        setParentData(response.data.data);

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

    const { name, value } = e.target;

    setParentData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  //--------------------------------------------------
  // Save
  //--------------------------------------------------

  const handleSave = async () => {

    try {

      if (profileExists) {

        await api.put(
          "/mentee/profile/parent",
          parentData
        );

      } else {

        await api.post(
          "/mentee/profile/parent",
          parentData
        );

        setProfileExists(true);

      }

      setIsEditing(false);

      fetchParentDetails();

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

          <Users
            size={18}
            className="text-blue-600"
          />

          <h2 className="text-lg font-semibold text-blue-600">

            Parent / Guardian Details

          </h2>

        </div>

        <p className="text-[13px] text-slate-500 mt-1">

          Enter your parent / guardian details

        </p>

      </div>

      {/* ================= Parent Cards ================= */}

      <div className="grid grid-cols-2 gap-4">

        {/* ================= Father Details ================= */}

        <div className="border border-slate-200 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-4">

            <UserRound
              size={17}
              className="text-blue-600"
            />

            <h3 className="text-base font-semibold text-blue-600">

              Father Details

            </h3>

          </div>

          <div className="grid grid-cols-3 gap-3">
                        {/* ================= Father Name ================= */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="fatherName"
                value={parentData.fatherName || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* ================= Occupation ================= */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Occupation
              </label>

              <input
                type="text"
                name="fatherOccupation"
                value={parentData.fatherOccupation || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* ================= Company ================= */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Organization / Company
              </label>

              <input
                type="text"
                name="fatherCompany"
                value={parentData.fatherCompany || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* ================= Annual Income ================= */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Annual Income
              </label>

              <input
                type="text"
                name="fatherAnnualIncome"
                value={parentData.fatherAnnualIncome || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* ================= Email ================= */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Email
              </label>

              <input
                type="email"
                name="fatherEmail"
                value={parentData.fatherEmail || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* ================= Mobile ================= */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Mobile Number
              </label>

              <input
                type="text"
                name="fatherPhone"
                value={parentData.fatherPhone || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* ================= Qualification ================= */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Education Qualification
              </label>

              <input
                type="text"
                name="fatherQualification"
                value={parentData.fatherQualification || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* ================= Work Address ================= */}

            <div className="col-span-2">

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Work Address
              </label>

              <textarea
                rows={2}
                name="fatherAddress"
                value={parentData.fatherAddress || ""}
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

          </div>

        </div>
                {/* ================= Mother Details ================= */}

        <div className="border border-slate-200 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-4">

            <UserRound
              size={17}
              className="text-pink-500"
            />

            <h3 className="text-base font-semibold text-blue-600">
              Mother Details
            </h3>

          </div>

          <div className="grid grid-cols-3 gap-3">

            {/* Full Name */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="motherName"
                value={parentData.motherName || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* Occupation */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Occupation
              </label>

              <input
                type="text"
                name="motherOccupation"
                value={parentData.motherOccupation || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* Email */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Email
              </label>

              <input
                type="email"
                name="motherEmail"
                value={parentData.motherEmail || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* Mobile */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Mobile Number
              </label>

              <input
                type="text"
                name="motherPhone"
                value={parentData.motherPhone || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* Qualification */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Education Qualification
              </label>

              <input
                type="text"
                name="motherQualification"
                value={parentData.motherQualification || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* Income */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Annual Income
              </label>

              <input
                type="text"
                name="motherAnnualIncome"
                value={parentData.motherAnnualIncome || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* Address */}

            <div className="col-span-2">

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Address
              </label>

              <input
                type="text"
                name="motherAddress"
                value={parentData.motherAddress || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
              />

            </div>

            {/* Same as Father Address */}

            <div className="flex items-end pb-2">

              <label className="flex items-center gap-2 text-[12px] text-slate-600">

                <input
                  type="checkbox"
                  disabled={profileExists && !isEditing}
                  checked={
                    parentData.fatherAddress !== "" &&
                    parentData.fatherAddress ===
                      parentData.motherAddress
                  }
                  onChange={(e) => {

                    if (e.target.checked) {

                      setParentData((prev) => ({
                        ...prev,
                        motherAddress:
                          prev.fatherAddress,
                      }));

                    } else {

                      setParentData((prev) => ({
                        ...prev,
                        motherAddress: "",
                      }));

                    }

                  }}
                  className="w-4 h-4 accent-blue-600"
                />

                Same as Father Address

              </label>

            </div>

          </div>

        </div>

      </div>
            {/* ================= Other Details ================= */}

      <div className="mt-4 border border-slate-200 rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-4">

          <Info
            size={17}
            className="text-blue-600"
          />

          <h3 className="text-base font-semibold text-blue-600">
            Other Details
          </h3>

        </div>

        <div className="grid grid-cols-4 gap-4">

          {/* Guardian Name */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Guardian Name
            </label>

            <input
              type="text"
              name="guardianName"
              value={parentData.guardianName || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
            />

          </div>

          {/* Relationship */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Relationship with Guardian
            </label>

            <input
              type="text"
              name="guardianRelationship"
              value={parentData.guardianRelationship || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
            />

          </div>

          {/* Guardian Mobile */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Guardian Mobile Number
            </label>

            <input
              type="text"
              name="guardianPhone"
              value={parentData.guardianPhone || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
            />

          </div>

          {/* Alternate Mobile */}

          <div>

            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Alternate Mobile Number
            </label>

            <input
              type="text"
              name="guardianAlternatePhone"
              value={parentData.guardianAlternatePhone || ""}
              onChange={handleChange}
              disabled={profileExists && !isEditing}
              className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
            />

          </div>

        </div>

        {/* ================= Information ================= */}

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-blue-200
            bg-blue-50
            px-3
            py-2
          "
        >

          <Info
            size={15}
            className="text-blue-600 flex-shrink-0"
          />

          <p className="text-[12px] text-blue-700">
            Please ensure the above information is correct and up to date.
            It will be used for all official communications.
          </p>

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

export default ParentGuardianCard;