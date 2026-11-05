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
    <div className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        {/* Mentor Profile Picture */}
        <img
          src={image}
          alt={`${mentor.fullName || "Mentor"} profile`}
          className="h-16 w-16 shrink-0 rounded-full border border-slate-200 object-cover sm:h-[72px] sm:w-[72px]"
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

        <div className="min-w-0 w-full flex-1 space-y-3 sm:w-auto">
          {/* Name and Status */}
          <div className="flex min-w-0 flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h2 className="max-w-full break-words text-[17px] font-bold leading-tight text-slate-900 sm:text-[18px]">
              {mentor.fullName || "Mentor"}
            </h2>

            <span
              className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${
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
            <p className="break-words text-[12px] font-semibold text-slate-700 sm:text-[13px]">
              {mentor.designation || "Faculty Mentor"}
            </p>
          </div>

          {/* Contact and Office Details */}
          <div className="space-y-2 pt-1 text-left">
            <div className="flex min-w-0 items-start gap-2 text-[12px] text-slate-600">
              <Mail
                size={14}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <span className="min-w-0 break-all">
                {mentor.email || "No email"}
              </span>
            </div>

            <div className="flex min-w-0 items-start gap-2 text-[12px] text-slate-600">
              <Phone
                size={14}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <span className="min-w-0 break-words">
                {mentor.phone || "No phone"}
              </span>
            </div>

            <div className="flex min-w-0 items-start gap-2 text-[12px] text-slate-600">
              <Briefcase
                size={14}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <span className="min-w-0 break-words">
                {mentor.employeeCode || "No employee code"}
              </span>
            </div>

            <div className="flex min-w-0 items-start gap-2 text-[12px] text-slate-600">
              <MapPin
                size={14}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <span className="min-w-0 break-words">{office}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileCard;
