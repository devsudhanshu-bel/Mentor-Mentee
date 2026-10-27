import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import banner from "../../../assets/banner.png";
import { getAdminProfile } from "../../../api/profile.api";

const DashboardBanner = () => {
  const [adminName, setAdminName] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      return (
        user?.fullName ||
        user?.username ||
        "Administrator"
      );
    } catch {
      return "Administrator";
    }
  });

  // --------------------------------------------------
  // FETCH ACTUAL ADMIN NAME FROM DATABASE
  // GET /api/admin/profile
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const fetchAdminProfile = async () => {
      try {
        const result = await getAdminProfile();
        const profile = result?.profile;

        if (cancelled || !profile) return;

        const actualName =
          profile.fullName?.trim() ||
          profile.username?.trim() ||
          profile.email?.trim() ||
          "Administrator";

        setAdminName(actualName);
      } catch (error) {
        console.error(
          "Unable to fetch admin name for dashboard banner:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchAdminProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // GREETING
  // --------------------------------------------------

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning,"
      : hour < 17
        ? "Good Afternoon,"
        : "Good Evening,";

  // --------------------------------------------------
  // CURRENT DATE
  // --------------------------------------------------

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <section
      className="
        relative
        w-full
        h-[170px]
        rounded-3xl
        overflow-hidden
        border
        border-slate-200
        shadow-sm
      "
    >
      {/* BANNER IMAGE */}

      <img
        src={banner}
        alt="Dashboard Banner"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-white/95
          via-white/60
          to-transparent
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          h-full
          flex
          flex-col
          justify-center
          px-9
        "
      >
        <p className="text-[15px] font-medium text-slate-700">
          {greeting}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <h1 className="text-[30px] font-bold text-slate-900">
            {adminName}
          </h1>

          <ShieldCheck
            size={24}
            className="text-blue-600"
          />
        </div>

        <p className="mt-2 text-[14px] text-slate-600">
          Welcome back to the Mentoring Administration Portal.
          Manage mentors, assignments and student progress with ease.
        </p>

        <div className="mt-4 flex items-center gap-6">
          <p className="text-[13px] text-slate-500">
            📅 {today}
          </p>

          <p className="text-[13px] italic text-blue-600">
            "Empowering mentors. Inspiring students."
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardBanner;