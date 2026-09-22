import React from "react";

import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

import profile from "../../../assets/profile.jpg";

const MentorProfileCard = ({ mentor }) => {
  if (!mentor) {
    return null;
  }

  const image = mentor.profile?.profileImage || profile;

  const department = mentor.department?.name || "Department not assigned";

  const office = mentor.profile?.office || "Office not available";

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={mentor.fullName}
          className="h-[72px] w-[72px] shrink-0 rounded-full border border-slate-200 object-cover"
          onError={(event) => {
            event.currentTarget.src = profile;
          }}
        />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[18px] font-bold leading-none text-slate-900">
              {mentor.fullName}
            </h2>

            <span
              className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                mentor.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {mentor.status}
            </span>
          </div>

          <div className="space-y-0.5">
            <p className="text-[13px] font-semibold text-slate-700">
              {mentor.designation || "Faculty Mentor"}
            </p>

            <p className="text-[12px] leading-5 text-slate-500">{department}</p>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Mail size={14} className="text-slate-400" />

              <span className="truncate">{mentor.email || "No email"}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Phone size={14} className="text-slate-400" />

              <span>{mentor.phone || "No phone"}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Briefcase size={14} className="text-slate-400" />

              <span>{mentor.employeeCode}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <MapPin size={14} className="text-slate-400" />

              <span className="truncate">{office}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileCard;
