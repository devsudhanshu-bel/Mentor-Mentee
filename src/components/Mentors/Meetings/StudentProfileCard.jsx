import React from "react";
import profile from "../../../assets/profile.jpg";

const StudentProfileCard = () => {
  return (
    <div className="w-full max-w-[380px] min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-4 md:px-8">
      <div className="flex min-w-0 flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
        {/* Profile */}
        <img
          src={profile}
          alt="Student"
          className="h-16 w-16 shrink-0 rounded-full border border-slate-200 object-cover"
        />

        {/* Details */}
        <div className="min-w-0 w-full flex-1">
          <h3 className="break-words text-[15px] font-bold leading-tight text-[#153E90] sm:text-[16px]">
            Sudhanshu Sreedhara Belavarthy
          </h3>

          <p className="mt-1 break-words text-[12px] text-slate-600 sm:text-[13px]">
            B.Tech - AI & Data Science Engineering
          </p>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-slate-500 sm:justify-start sm:text-[13px]">
            <span>Semester IV</span>

            <span className="hidden sm:inline">•</span>

            <span>Reg. No. 2362177</span>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
            <span className="h-2 w-2 shrink-0 rounded-full bg-green-500"></span>

            <span className="text-[12px] font-medium text-slate-700 sm:text-[13px]">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
