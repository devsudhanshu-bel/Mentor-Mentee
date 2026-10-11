import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

import profilePlaceholder from "../../../assets/profile.jpg";

const MentorProfileCard = ({ mentor = {} }) => {
  const mentorName = mentor.fullName || "Unnamed Mentor";

  const designation = mentor.designation || "Designation unavailable";

  const department = mentor.department?.name || "Department unavailable";

  const email = mentor.email || "Email unavailable";

  const phone = mentor.phone || "Phone unavailable";

  const office = mentor.profile?.office || "Office not provided";

  const profileImage = mentor.profile?.profileImage || profilePlaceholder;

  const isActive = mentor.isActive ?? mentor.status === "Active";

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Mentor profile image */}

        <img
          src={profileImage}
          alt={mentorName}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = profilePlaceholder;
          }}
          className="h-[72px] w-[72px] shrink-0 rounded-full border border-slate-200 object-cover"
        />

        {/* Mentor information */}

        <div className="min-w-0 flex-1 space-y-3">
          {/* Name and status */}

          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[18px] font-bold leading-tight text-slate-900">
              {mentorName}
            </h2>

            <span
              className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Designation and department */}

          <div className="space-y-0.5">
            <p className="text-[13px] font-semibold text-slate-700">
              {designation}
            </p>

            <p className="text-[12px] leading-5 text-slate-500">{department}</p>
          </div>

          {/* Contact details */}

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Mail size={14} className="shrink-0 text-slate-400" />

              <span className="truncate" title={email}>
                {email}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Phone size={14} className="shrink-0 text-slate-400" />

              <span className="truncate" title={phone}>
                {phone}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <MapPin size={14} className="shrink-0 text-slate-400" />

              <span className="truncate" title={office}>
                {office}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileCard;
