import React from "react";
import {
  ShieldCheck,
  CalendarCheck2,
  CalendarDays,
  UserRound,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

const AttendanceBanner = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-7 py-5">
      <div className="flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-6">
          {/* Profile */}
          <img
            src={profile}
            alt="Profile"
            className="w-[88px] h-[88px] rounded-full border-4 border-slate-100 object-cover"
          />

          {/* Details */}
          <div>
            <h2 className="text-[16px] font-semibold text-[#142970]">
              Sudhanshu Sreedhara Belavarthy
            </h2>

            <div className="flex items-center gap-3 mt-1 text-[12px] text-slate-500">
              <span>2362177</span>
              <span>•</span>
              <span>B.Tech - AI & Data Science Engineering</span>
              <span>•</span>
              <span>Semester V</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 mt-5">
              <Info
                icon={<ShieldCheck size={16} />}
                title="Overall Attendance"
                value="94%"
              />

              <Info
                icon={<CalendarCheck2 size={16} />}
                title="Classes Attended"
                value="324"
              />

              <Info
                icon={<CalendarDays size={16} />}
                title="Classes Held"
                value="344"
              />

              <Info
                icon={<UserRound size={16} />}
                title="Mentor"
                value="Dr. Arjun Sharma"
                blue
              />

              <div>
                <div className="flex items-center gap-2 text-[12px] text-slate-500">
                  <BadgeCheck size={16} className="text-blue-600" />
                  <span>Academic Standing</span>
                </div>

                <span className="inline-block mt-2 px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                  Excellent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="border border-slate-200 rounded-xl px-4 py-3 w-[240px]">
          <p className="text-[12px] text-slate-500 mb-3">
            Attendance for
          </p>

          <button className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">
            2024 - 2025 (Odd)

            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, title, value, blue }) => (
  <div>
    <div className="flex items-center gap-2 text-[12px] text-slate-500">
      <div className="text-blue-600">{icon}</div>

      <span>{title}</span>
    </div>

    <p
      className={`mt-2 text-[14px] font-semibold ${
        blue ? "text-blue-600" : "text-[#142970]"
      }`}
    >
      {value}
    </p>
  </div>
);

export default AttendanceBanner;