import React from "react";
import { ShieldCheck } from "lucide-react";

import banner from "../../../assets/banner.png";

const DashboardBanner = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fullName =
    user?.fullName ||
    user?.username ||
    "Administrator";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
      {/* ================= Banner Image ================= */}

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

      {/* ================= Overlay ================= */}

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

      {/* ================= Content ================= */}

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
          Good Morning,
        </p>

        <div className="mt-1 flex items-center gap-2">
          <h1 className="text-[30px] font-bold text-slate-900">
            {fullName}
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