import React from "react";
import banner from "../../../assets/banner.png";

const WelcomeBanner = ({ mentorName = "" }) => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : "Good Evening";

  const displayName = mentorName?.trim() || "Mentor";

  return (
    <div className="relative w-full h-[165px] rounded-3xl overflow-hidden shadow-sm border border-slate-200">
      <img
        src={banner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-9">
        <p className="text-[16px] text-slate-700 mb-1">
          {greeting},
        </p>

        <h1 className="text-2xl sm:text-[30px] font-bold text-slate-900 leading-tight">
          {displayName}! 👋
        </h1>

        <p className="mt-3 text-xs sm:text-[14px] text-slate-600">
          Welcome back! Keep inspiring, guiding, and helping students grow.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;