import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

const MentorCard = ({ mentorData, loading = false }) => {
  const navigate = useNavigate();

  const mentor = mentorData?.mentor;

  // ==========================================================
  // LOADING STATE
  // ==========================================================
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

  // ==========================================================
  // NO MENTOR ASSIGNED
  // ==========================================================
  if (!mentorData?.assigned || !mentor) {
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

  // ==========================================================
  // MENTOR DETAILS
  // ==========================================================
  const mentorImage = mentor.profile?.profileImage || profile;

  const department =
    mentor.department?.name || "Department not available";

  const handleViewProfile = () => {
    if (!mentor.id) return;

    navigate(`/mentors/profile/${mentor.id}`);
  };

  // ==========================================================
  // RENDER
  // ==========================================================
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <UserRound size={15} className="text-blue-600" />

        <h3 className="text-[14px] font-semibold text-blue-600">
          Your Mentor
        </h3>
      </div>

      {/* Body */}
      <div className="flex gap-4 items-start min-h-[180px]">
        {/* Profile Image */}
        <img
          src={mentorImage}
          alt={mentor.fullName || "Mentor"}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = profile;
          }}
          className="w-16 h-16 rounded-full object-cover border border-slate-200 flex-shrink-0"
        />

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Name */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[16px] font-bold text-[#142970] leading-tight break-words">
              {mentor.fullName || "Name unavailable"}
            </h2>

            <span className="px-2 py-[2px] rounded-full bg-green-100 text-green-700 text-[9px] font-medium">
              Mentor
            </span>
          </div>

          {/* Designation */}
          {mentor.designation && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
              <BriefcaseBusiness
                size={12}
                className="flex-shrink-0"
              />

              <span>{mentor.designation}</span>
            </div>
          )}

          {/* Department */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 leading-5">
            <Building2 size={12} className="flex-shrink-0" />

            <span>{department}</span>
          </div>

          {/* Contact Details */}
          <div className="mt-3 space-y-2">
            {mentor.email && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600 min-w-0">
                <Mail size={13} className="flex-shrink-0" />

                <span className="truncate" title={mentor.email}>
                  {mentor.email}
                </span>
              </div>
            )}

            {mentor.phone && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600 min-w-0">
                <Phone size={13} className="flex-shrink-0" />

                <span className="truncate" title={mentor.phone}>
                  {mentor.phone}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;