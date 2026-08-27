import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import profile from "../../../assets/profile.jpg";

const MentorProfileCard = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}

        <img
          src={profile}
          alt="Mentor"
          className="h-[72px] w-[72px] rounded-full border border-slate-200 object-cover shrink-0"
        />

        {/* Right */}

        <div className="flex-1 min-w-0 space-y-3">
          {/* Name */}

          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[18px] font-bold text-slate-900 leading-none">
              Dr. Arjun Mehta
            </h2>

            <span className="rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              Active
            </span>
          </div>

          {/* Role */}

          <div className="space-y-0.5">
            <p className="text-[13px] font-semibold text-slate-700">
              Associate Professor
            </p>

            <p className="text-[12px] text-slate-500 leading-5">
              Department of Computer Science &
              Engineering
            </p>
          </div>

          {/* Contact */}

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Mail
                size={14}
                className="text-slate-400"
              />

              <span className="truncate">
                arjun.mehta@christuniversity.in
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <Phone
                size={14}
                className="text-slate-400"
              />

              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <MapPin
                size={14}
                className="text-slate-400"
              />

              <span className="truncate">
                Faculty Block 2, Room 304
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileCard;