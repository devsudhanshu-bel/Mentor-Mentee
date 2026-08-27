import React, { useEffect, useState } from "react";
import { Mail, Phone, Camera } from "lucide-react";

import profile from "../../../assets/profile.jpg";

import { getMentorProfile } from "../../../api/profile.api";

const MentorProfileCard = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMentorProfile();

        if (response.profileExists) {
          setMentor(response.profile);
        }
      } catch (error) {
        console.error("Failed to fetch mentor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-[300px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
    );
  }

  if (!mentor) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <p className="text-sm text-slate-500">
          Mentor profile not found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm h-[220px]">
      {/* Top */}
      <div className="flex gap-2 p-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={
              mentor.profileImage && mentor.profileImage.trim() !== ""
                ? mentor.profileImage
                : profile
            }
            alt={mentor.fullName}
            className="h-20 w-20 rounded-full border-4 border-slate-100 object-cover"
          />

          <button
            className="
              absolute
              -bottom-1
              -right-1
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <Camera
              size={13}
              className="text-emerald-600"
            />
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-1 justify-between">
          <div>
            <h2 className="text-[18px] font-bold leading-tight text-slate-900">
              {mentor.fullName}
            </h2>

            <p className="mt-1 text-[13px] text-slate-500">
              {mentor.designation}
            </p>

            <div className="mt-3 inline-flex rounded-md bg-blue-50 px-3 py-1.5">
              <span className="text-xs font-semibold text-blue-700">
                EMP ID : {mentor.employeeId}
              </span>
            </div>
          </div>

          <span
            className={`h-fit rounded-full px-3 py-1 text-[11px] font-semibold ${
              mentor.isActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {mentor.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-2 border-t border-slate-200">
        {/* Left */}
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <Mail
              size={15}
              className="text-slate-400"
            />

            <span className="truncate text-[12px] text-slate-700">
              {mentor.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone
              size={15}
              className="text-slate-400"
            />

            <span className="text-[12px] text-slate-700">
              {mentor.phone || "Not Available"}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="border-l border-slate-200 p-4">
          <p className="text-[12px] font-semibold leading-5 text-slate-800">
            {mentor.department}
          </p>

          <p className="mt-2 text-[12px] leading-5 text-slate-500">
            {mentor.school}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileCard;