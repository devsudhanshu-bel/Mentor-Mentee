import React, { useState } from "react";
import { CalendarDays } from "lucide-react";

const PersonalInformationCard = () => {
  const [bio, setBio] = useState(
    "Computer Science student passionate about AI, Machine Learning and Full Stack Development."
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">

        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Personal Information
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Update your personal details and profile information.
          </p>
        </div>

        <div className="flex gap-2">

          <button className="px-4 h-9 rounded-lg border border-slate-300 text-xs font-medium hover:bg-slate-50 transition">
            Cancel
          </button>

          <button className="px-4 h-9 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition">
            Save Changes
          </button>

        </div>

      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4">

        {/* Full Name */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Admin User"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* Register Number */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Register Number
          </label>

          <input
            type="text"
            defaultValue="2362177"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* Email */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Email
          </label>

          <input
            type="email"
            defaultValue="admin@christuniversity.in"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* Phone */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Phone Number
          </label>

          <div className="flex gap-2">

            <select className="w-20 h-10 rounded-lg border border-slate-300 px-2 text-sm outline-none">
              <option>+91</option>
            </select>

            <input
              type="text"
              defaultValue="98765 43210"
              className="flex-1 h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            />

          </div>

        </div>

        {/* Department */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Department
          </label>

          <select className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none">

            <option>Computer Science and Engineering</option>
            <option>Information Technology</option>
            <option>Electronics</option>

          </select>

        </div>

        {/* Class */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Class & Section
          </label>

          <select className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none">

            <option>7 BTCS AIML A</option>
            <option>7 BTCS AIML B</option>

          </select>

        </div>

        {/* DOB */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Date of Birth
          </label>

          <div className="relative">

            <CalendarDays
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              defaultValue="15 Jan 2004"
              className="w-full h-10 rounded-lg border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
            />

          </div>

        </div>

        {/* Gender */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Gender
          </label>

          <select className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none">

            <option>Male</option>
            <option>Female</option>
            <option>Other</option>

          </select>

        </div>

      </div>

      {/* Bio */}
      <div className="mt-5">

        <label className="block text-xs font-medium text-slate-700 mb-1">
          Bio
        </label>

        <textarea
          rows={4}
          maxLength={200}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm resize-none outline-none focus:border-blue-500"
        />

        <div className="text-right text-[11px] text-slate-400 mt-1">
          {bio.length}/200
        </div>

      </div>

    </div>
  );
};

export default PersonalInformationCard;