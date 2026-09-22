import React from "react";
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

const MentorCard = ({ mentorData, loading = false }) => {
  const mentor = mentorData?.mentor;

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
        <div className="flex items-center gap-2 mb-3">
          <UserRound size={15} className="text-blue-600" />

          <h3 className="text-[14px] font-semibold text-blue-600">
            Your Mentor
          </h3>
        </div>

        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
        <div className="flex items-center gap-2 mb-3">
          <UserRound size={15} className="text-blue-600" />

          <h3 className="text-[14px] font-semibold text-blue-600">
            Your Mentor
          </h3>
        </div>

        <div className="min-h-[180px] flex flex-col items-center justify-center text-center">
          <UserRound size={38} className="text-slate-300 mb-3" />

          <h4 className="text-[14px] font-semibold text-[#142970]">
            No Mentor Assigned
          </h4>

          <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
            You currently do not have an active mentor assignment.
          </p>
        </div>
      </div>
    );
  }

  const mentorImage = mentor.profile?.profileImage || profile;

  const department = mentor.department?.name || "Department not available";

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <UserRound size={15} className="text-blue-600" />

        <h3 className="text-[14px] font-semibold text-blue-600">Your Mentor</h3>
      </div>

      {/* Body */}
      <div className="flex gap-4 items-start min-h-[180px]">
        {/* Profile */}
        <img
          src={mentorImage}
          alt={mentor.fullName}
          className="w-16 h-16 rounded-full object-cover border border-slate-200 flex-shrink-0"
        />

        {/* Details */}
        <div className="flex-1 flex flex-col h-full">
          {/* Name */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[16px] font-bold text-[#142970] leading-tight">
              {mentor.fullName}
            </h2>

            <span className="px-2 py-[2px] rounded-full bg-green-100 text-green-700 text-[9px] font-medium">
              Mentor
            </span>
          </div>

          {/* Designation */}
          {mentor.designation && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
              <BriefcaseBusiness size={12} />

              <span>{mentor.designation}</span>
            </div>
          )}

          {/* Department */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 leading-5">
            <Building2 size={12} />

            <span>{department}</span>
          </div>

          {/* Contact */}
          <div className="mt-3 space-y-2">
            {mentor.email && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Mail size={13} />

                <span className="truncate">{mentor.email}</span>
              </div>
            )}

            {mentor.phone && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Phone size={13} />

                <span>{mentor.phone}</span>
              </div>
            )}
          </div>

          {/* Button */}
          <div className="mt-auto pt-5 flex justify-end">
            <button
              type="button"
              className="
                px-4
                py-2
                text-[12px]
                font-medium
                text-blue-600
                border
                border-blue-500
                rounded-lg
                hover:bg-blue-50
                transition-all
              "
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
