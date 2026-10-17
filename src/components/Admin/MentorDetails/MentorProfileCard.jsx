
import React from "react";
import { Mail, Phone, MapPin, UserRound } from "lucide-react";

import profile from "../../../assets/profile.jpg";

const MentorProfileCard = ({ mentor, loading = false }) => {
  const name = mentor?.fullName || "Mentor";
  const designation = mentor?.designation || "Designation unavailable";
  const department =
    mentor?.department?.name || "Department unavailable";
  const email = mentor?.email;
  const phone = mentor?.phone;
  const office = mentor?.profile?.office;
  const profileImage = mentor?.profile?.profileImage;
  const isActive = mentor?.isActive;

  if (loading) {
    return (
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-pulse">
        <div className="flex items-start gap-4">
          <div className="h-[72px] w-[72px] shrink-0 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-4 w-48 rounded bg-slate-200" />
            <div className="h-4 w-40 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={profileImage || profile}
          alt={name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = profile;
          }}
          className="h-[72px] w-[72px] rounded-full border border-slate-200 object-cover shrink-0"
        />

        {/* Right */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Name and status */}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[18px] font-bold text-slate-900 leading-tight">
              {name}
            </h2>

            <span
              className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
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

            <p className="text-[12px] text-slate-500 leading-5">
              {department}
            </p>
          </div>

          {/* Contact information */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Mail size={14} className="shrink-0 text-slate-400" />
              <span className="truncate">
                {email || "Email unavailable"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Phone size={14} className="shrink-0 text-slate-400" />
              <span>{phone || "Phone unavailable"}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <MapPin size={14} className="shrink-0 text-slate-400" />
              <span className="truncate">
                {office || "Office location unavailable"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileCard;
