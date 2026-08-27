import React from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import ContactItem from "./ContactItem";

const ProfileCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm h-[240px]" >
      {/* ================= Top ================= */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src="https://i.pravatar.cc/180?img=12"
            alt="Profile"
            className="h-14 w-14 rounded-full border object-cover"
          />

          <button
            className="
              absolute
              -bottom-1
              -right-1
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <Camera size={11} />
          </button>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-slate-900">
              Dr. Arjun Mehta
            </h2>

            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              Active
            </span>
          </div>

          <p className="mt-1 text-[12px] leading-4 text-slate-500">
            Head of Department - Computer Science & Engineering
          </p>

          <span className="mt-2 inline-flex rounded-md bg-blue-100 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
            EMP ID : HOD-CSE-001
          </span>
        </div>
      </div>

      {/* ================= Bottom ================= */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Contact */}
        <div className="space-y-2">
          <ContactItem
            icon={Mail}
            text="arjun.mehta@christuniversity.in"
          />

          <ContactItem
            icon={Phone}
            text="+91 98765 43210"
          />

          <ContactItem
            icon={MapPin}
            text="Faculty Block 2, Room 304"
          />
        </div>

        {/* Department */}
        <div className="space-y-1.5 border-l border-slate-200 pl-3">
          <p className="text-[12px] leading-4 text-slate-600">
            Department of Computer Science &
            Engineering
          </p>

          <p className="text-[12px] leading-4 text-slate-600">
            School of Engineering and Technology
          </p>

          <p className="text-[12px] leading-4 text-slate-600">
            CHRIST (Deemed to be University)
          </p>

          <p className="text-[12px] leading-4 text-slate-600">
            Bangalore, India
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;