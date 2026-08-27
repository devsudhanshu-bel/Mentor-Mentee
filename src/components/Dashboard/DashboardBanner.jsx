import React from "react";
import banner from "../../assets/banner.png";

const DashboardBanner = () => {
  return (
    <div
      className="
        relative
        w-full
        h-[165px]
        rounded-3xl
        overflow-hidden
        shadow-sm
        border
        border-slate-200
      "
    >
      {/* Banner Image */}
      <img
        src={banner}
        alt="Dashboard Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent" />

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col justify-center px-9">
        <p className="text-[16spx] text-slate-700 mb-1">
          Good Morning,
        </p>

        <h1 className="text-[30px] font-bold text-slate-900 leading-tight">
          Sudhanshu Sreedhara! 👋
        </h1>

        <p className="mt-3 text-[14px] text-slate-600">
          Welcome back! You're doing great. Keep up the good work.
        </p>
      </div>
    </div>
  );
};

export default DashboardBanner;