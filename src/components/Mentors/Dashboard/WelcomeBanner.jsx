import React, { useEffect, useMemo, useState } from "react";
import banner from "../../../assets/banner.png";

import { getDashboardBanner } from "../../../api/dashboard.api";

const WelcomeBanner = () => {
  const [mentor, setMentor] = useState({
    fullName: "",
    designation: "",
    department: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getDashboardBanner();
        setMentor(data);
      } catch (error) {
        console.error("Failed to fetch dashboard banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const now = useMemo(() => new Date(), []);

  const greeting = useMemo(() => {
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    }

    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "Good Evening";
    }

    return "Good Night";
  }, [now]);

  const today = useMemo(() => {
    return now.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [now]);

  if (loading) {
    return (
      <div
        className="
          h-[180px]
          w-full
          animate-pulse
          rounded-3xl
          border
          border-slate-200
          bg-slate-100
        "
      />
    );
  }

  return (
    <div
      className="
        relative
        h-[180px]
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Banner */}
      <img
        src={banner}
        alt="Mentor Dashboard Banner"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-10">
        <div className="max-w-xl">
          <p className="text-[16px] font-medium text-slate-700">
            {greeting},
          </p>

          <h1 className="mt-1 text-[24px] font-bold leading-none text-slate-900">
            {mentor.fullName} 👋
          </h1>

          <div className="mt-3 flex items-center gap-3 text-[12px] text-slate-600">
            <span>{mentor.department}</span>

            <span className="h-1 w-1 rounded-full bg-slate-400" />

            <span>{mentor.designation}</span>
          </div>

          <p className="mt-5 text-[12px] text-slate-600">
            Today is{" "}
            <span className="font-semibold text-slate-800">
              {today}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;