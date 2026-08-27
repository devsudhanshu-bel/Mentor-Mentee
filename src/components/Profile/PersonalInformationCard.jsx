import React, { useEffect, useState } from "react";
import {
  User,
  CalendarDays,
  MapPin,
  Save,
  Pencil,
} from "lucide-react";

import api from "../../api/axios";

import profile from "../../assets/profile.jpg";

const PersonalInformationCard = () => {
  //--------------------------------------------------
  // Profile State
  //--------------------------------------------------

  const [profileData, setProfileData] = useState({
    // User

    fullName: "",

    // Personal Information

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

    // Address

    address: "",

    permanentAddress: "",

    // Summary

    yearsAtUniversity: "",

    totalCredits: "",

    currentCGPA: "",

    overallAttendance: "",

    academicStanding: "",

    currentMentor: "",
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
    fetchProfile();
  }, []);

  //--------------------------------------------------
  // Fetch Profile
  //--------------------------------------------------

  const fetchProfile = async () => {
    try {
      const response =
        await api.get(
          "/mentee/profile/personal"
        );

      if (response.data.data) {
        setProfileData(response.data.data);

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
  // Handle Input Change
  //--------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
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
          "/mentee/profile/personal",
          profileData
        );
      } else {
        await api.post(
          "/mentee/profile/personal",
          profileData
        );

        setProfileExists(true);
      }

      setIsEditing(false);

      fetchProfile();
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
    <div className="grid grid-cols-12 gap-3">

      {/* ================= LEFT ================= */}

      <div className="col-span-12 xl:col-span-8">

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">

          {/* Header */}

          <div className="flex items-center gap-2 mb-4">

            <User
              size={16}
              className="text-blue-600"
            />

            <h2 className="text-base font-semibold text-blue-600">
              Personal Information
            </h2>

          </div>

          {/* Form */}

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {/* ================= Full Name ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={profileData.fullName || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>

            {/* ================= Register Number ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Register Number
              </label>

              <input
                type="text"
                name="registerNumber"
                value={profileData.registerNumber || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />
            </div>

            {/* ================= Date Of Birth ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Date of Birth
              </label>

              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute left-3 top-2.5 text-slate-400"
                />

                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    profileData.dateOfBirth
                      ? profileData.dateOfBirth.substring(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                  disabled={profileExists && !isEditing}
                  className="w-full h-9 rounded-lg border border-slate-200 pl-9 pr-3 text-[13px] outline-none disabled:bg-slate-50"
                />
              </div>
            </div>

            {/* ================= Admission Number ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Admission Number
              </label>

              <input
                type="text"
                name="admissionNumber"
                value={profileData.admissionNumber || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />
            </div>

            {/* ================= Gender ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Gender
              </label>

              <select
                name="gender"
                value={profileData.gender || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] disabled:bg-slate-50"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* ================= Department ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={profileData.department || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />
            </div>

            {/* ================= Blood Group ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Blood Group
              </label>

              <select
                name="bloodGroup"
                value={profileData.bloodGroup || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] disabled:bg-slate-50"
              >
                <option value="">Select Blood Group</option>
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
              </select>
            </div>

            {/* ================= Semester ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Semester
              </label>

              <select
                name="semester"
                value={profileData.semester || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] disabled:bg-slate-50"
              >
                <option value="">Select Semester</option>

                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={String(sem)}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* ================= Nationality ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Nationality
              </label>

              <input
                type="text"
                name="nationality"
                value={profileData.nationality || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />
            </div>

            {/* ================= Section ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Section
              </label>

              <select
                name="section"
                value={profileData.section || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] disabled:bg-slate-50"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* ================= Religion ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Religion
              </label>

              <input
                type="text"
                name="religion"
                value={profileData.religion || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />
            </div>

            {/* ================= Student Type ================= */}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Student Type
              </label>

              <select
                name="studentType"
                value={profileData.studentType || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] disabled:bg-slate-50"
              >
                <option value="">Select Student Type</option>
                <option value="DAY_SCHOLAR">Day Scholar</option>
                <option value="HOSTELLER">Hosteller</option>
              </select>
            </div>
                        {/* ================= Current Address ================= */}

            <div className="col-span-2">

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Current Address
              </label>

              <div className="relative">

                <MapPin
                  size={14}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <textarea
                  rows={2}
                  name="address"
                  value={profileData.address || ""}
                  onChange={handleChange}
                  disabled={profileExists && !isEditing}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    pl-9
                    pr-3
                    py-2
                    text-[13px]
                    resize-none
                    outline-none
                    disabled:bg-slate-50
                  "
                />

              </div>

            </div>

            {/* ================= Permanent Address ================= */}

            <div className="col-span-2">

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Permanent Address
              </label>

              <textarea
                rows={2}
                name="permanentAddress"
                value={profileData.permanentAddress || ""}
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
                  disabled:bg-slate-50
                "
              />

            </div>

            {/* ================= Footer ================= */}

            <div className="col-span-2 flex items-center justify-between mt-2">

              {/* Same Address */}

              <label className="flex items-center gap-2 text-[13px] text-slate-700">

                <input
                  type="checkbox"
                  checked={
                    profileData.address !== "" &&
                    profileData.address ===
                      profileData.permanentAddress
                  }
                  disabled={profileExists && !isEditing}
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
                  className="w-3.5 h-3.5 accent-blue-600"
                />

                Same as Current Address

              </label>

              {/* Buttons */}

              <div className="flex items-center gap-3">

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
                        Edit Profile
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
                      Create Profile
                    </span>

                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>
            {/* ================= RIGHT SIDE ================= */}

      <div className="col-span-12 xl:col-span-4 space-y-3">

        {/* ================= Profile Picture ================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">

          <h3 className="text-base font-semibold text-blue-600 mb-4">
            Profile Picture
          </h3>

          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src={
                  profileData.profileImage
                    ? profileData.profileImage
                    : profile
                }
                alt="Profile"
                className="
                  w-28
                  h-28
                  rounded-full
                  object-cover
                  border-4
                  border-white
                  shadow-md
                "
              />

              <button
                type="button"
                disabled={profileExists && !isEditing}
                className="
                  absolute
                  bottom-1
                  right-1
                  w-8
                  h-8
                  rounded-full
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-md
                  hover:bg-blue-700
                  transition
                  disabled:bg-slate-300
                  disabled:cursor-not-allowed
                "
              >
                📷
              </button>

            </div>

            <p className="text-[10px] text-slate-500 mt-3">
              JPG, PNG or GIF. Max size 2MB.
            </p>

            <div className="flex items-center gap-3 mt-4">

              <button
                type="button"
                disabled={profileExists && !isEditing}
                className="
                  h-9
                  px-4
                  rounded-lg
                  border
                  border-blue-200
                  bg-blue-50
                  text-blue-600
                  text-[13px]
                  font-medium
                  hover:bg-blue-100
                  transition
                  disabled:bg-slate-100
                  disabled:text-slate-400
                  disabled:border-slate-200
                  disabled:cursor-not-allowed
                "
              >
                Upload Photo
              </button>

              <button
                type="button"
                disabled={
                  (profileExists && !isEditing) ||
                  !profileData.profileImage
                }
                className="
                  h-9
                  px-4
                  rounded-lg
                  border
                  border-red-200
                  bg-red-50
                  text-red-600
                  text-[13px]
                  font-medium
                  hover:bg-red-100
                  transition
                  disabled:bg-slate-100
                  disabled:text-slate-400
                  disabled:border-slate-200
                  disabled:cursor-not-allowed
                "
              >
                Remove
              </button>

            </div>

            {/* ================= Status ================= */}

            <div className="mt-5 w-full">

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">

                <div className="flex items-center justify-between">

                  <span className="text-[13px] text-slate-600">
                    Profile Status
                  </span>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-[11px]
                      font-semibold
                      ${
                        profileExists
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    `}
                  >
                    {profileExists
                      ? "Completed"
                      : "Not Created"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
                {/* ================= Personal Summary ================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">

          <h3 className="text-base font-semibold text-blue-600 mb-4">
            Personal Summary
          </h3>

          <div className="space-y-4">

            {/* Years at University */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Years at University
              </label>

              <input
                type="number"
                name="yearsAtUniversity"
                value={profileData.yearsAtUniversity || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />

            </div>

            {/* Total Credits */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Total Credits Earned
              </label>

              <input
                type="number"
                name="totalCredits"
                value={profileData.totalCredits || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />

            </div>

            {/* CGPA */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Current CGPA
              </label>

              <input
                type="number"
                step="0.01"
                name="currentCGPA"
                value={profileData.currentCGPA || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />

            </div>

            {/* Attendance */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Overall Attendance (%)
              </label>

              <input
                type="number"
                step="0.01"
                name="overallAttendance"
                value={profileData.overallAttendance || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />

            </div>

            {/* Mentor */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Current Mentor
              </label>

              <input
                type="text"
                name="currentMentor"
                value={profileData.currentMentor || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              />

            </div>

            {/* Academic Standing */}

            <div>

              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Academic Standing
              </label>

              <select
                name="academicStanding"
                value={profileData.academicStanding || ""}
                onChange={handleChange}
                disabled={profileExists && !isEditing}
                className="w-full h-9 rounded-lg border border-slate-200 px-3 text-[13px] outline-none disabled:bg-slate-50"
              >
                <option value="">
                  Select Standing
                </option>

                <option value="Excellent">
                  Excellent
                </option>

                <option value="Good">
                  Good
                </option>

                <option value="Average">
                  Average
                </option>

                <option value="Needs Improvement">
                  Needs Improvement
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default PersonalInformationCard;