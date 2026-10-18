
import React from "react";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";

import profile from "../../../assets/profile.jpg";

const MentorProfileCard = ({ mentor }) => {
  if (!mentor) {
    return null;
  }

  const image =
    mentor.profile?.profileImage ||
    mentor.teacher_profiles?.profileImage ||
    mentor.teacherProfile?.profileImage ||
    mentor.profileImage ||
    profile;

  const office =
    mentor.profile?.office ||
    mentor.teacher_profiles?.office ||
    mentor.teacherProfile?.office ||
    mentor.office ||
    "Office not available";

  const status =
    mentor.status ||
    (mentor.isActive ? "Active" : "Inactive");

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Mentor Profile Picture */}
        <img
          src={image}
          alt={`${mentor.fullName || "Mentor"} profile`}
          className="h-[72px] w-[72px] shrink-0 rounded-full border border-slate-200 object-cover"
          onError={(event) => {
            if (
              event.currentTarget.dataset.fallbackApplied === "true"
            ) {
              return;
            }

            event.currentTarget.dataset.fallbackApplied = "true";
            event.currentTarget.src = profile;
          }}
        />

        <div className="min-w-0 flex-1 space-y-3">
          {/* Name and Status */}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[18px] font-bold leading-none text-slate-900">
              {mentor.fullName || "Mentor"}
            </h2>

            <span
              className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                mentor.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {status}
            </span>
          </div>

          {/* Designation */}
          <div>
            <p className="text-[13px] font-semibold text-slate-700">
              {mentor.designation || "Faculty Mentor"}
            </p>
          </div>

          {/* Contact and Office Details */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Mail
                size={14}
                className="shrink-0 text-slate-400"
              />

              <span className="truncate">
                {mentor.email || "No email"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Phone
                size={14}
                className="shrink-0 text-slate-400"
              />

              <span className="truncate">
                {mentor.phone || "No phone"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Briefcase
                size={14}
                className="shrink-0 text-slate-400"
              />

              <span className="truncate">
                {mentor.employeeCode || "No employee code"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <MapPin
                size={14}
                className="shrink-0 text-slate-400"
              />

              <span className="truncate">{office}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileCard;
