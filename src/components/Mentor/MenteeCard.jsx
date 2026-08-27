import React from "react";
import { UserRound, Mail, Phone } from "lucide-react";
import profile from "../../assets/profile.jpg";

const MenteeCard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <UserRound size={15} className="text-blue-600" />

        <h3 className="text-[14px] font-semibold text-blue-600">
          You (Mentee)
        </h3>
      </div>

      {/* Body */}
      <div className="flex gap-4 items-start">
        {/* Profile Image */}
        <img
          src={profile}
          alt="Mentee"
          className="w-16 h-16 rounded-full object-cover border border-slate-200 flex-shrink-0"
        />

        {/* Details */}
        <div className="flex-1 flex flex-col">
          {/* Name */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[16px] font-bold text-[#142970] leading-tight">
              Sudhanshu Sreedhara Belavarthy
            </h2>

            <span className="px-2 py-[2px] rounded-full bg-blue-100 text-blue-700 text-[9px] font-medium">
              Mentee
            </span>
          </div>

          {/* Academic Details */}
          <p className="text-[11px] text-slate-500 mt-1">
            B.Tech - AI & Data Science Engineering
          </p>

          <p className="text-[11px] text-slate-500 leading-5">
            Semester V &nbsp; • &nbsp; Reg. No. 2362177
          </p>

          {/* Contact */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Mail size={13} />
              <span>sudhanshu.belavarthy@christuniversity.in</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Phone size={13} />
              <span>+91 98765 43210</span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-7 flex justify-end">
            <button
              className="
                px-4
                py-1.5
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

export default MenteeCard;