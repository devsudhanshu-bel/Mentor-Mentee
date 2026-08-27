import React from "react";
import profile from "../../../assets/profile.jpg";

const StudentProfileCard = () => {
  return (
    <div className="w-[380px] rounded-2xl border border-slate-200 bg-white px-8 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Profile */}
        <img
          src={profile}
          alt="Student"
          className="h-16 w-16 rounded-full border border-slate-200 object-cover"
        />

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-[16px] font-bold leading-tight text-[#153E90]">
            Sudhanshu Sreedhara Belavarthy
          </h3>

          <p className="mt-1 text-[13px] text-slate-600">
            B.Tech - AI & Data Science Engineering
          </p>

          <div className="mt-1 flex items-center gap-2 text-[13px] text-slate-500">
            <span>Semester IV</span>

            <span>•</span>

            <span>Reg. No. 2362177</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>

            <span className="text-[13px] font-medium text-slate-700">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;