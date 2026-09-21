import React, { useEffect, useMemo, useState } from "react";

import banner from "../../../assets/banner.png";

import { getDashboardBanner } from "../../../api/dashboard.api";

const WelcomeBanner = () => {
  /* ==========================================================
     MENTOR DATA
  ========================================================== */

  const [mentor, setMentor] = useState({
    fullName: "",
    designation: "",
    department: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);

  /* ==========================================================
     FETCH DASHBOARD BANNER DATA
  ========================================================== */

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getDashboardBanner();

        console.log(
          "Dashboard banner response:",
          data
        );

        setMentor({
          fullName: data?.fullName || "",
          designation: data?.designation || "",
          department: data?.department || "",
          profileImage:
            data?.profileImage || null,
        });
      } catch (error) {
        console.error(
          "Failed to fetch dashboard banner:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  /* ==========================================================
     CURRENT DATE / TIME
  ========================================================== */

  const now = useMemo(
    () => new Date(),
    []
  );

  /* ==========================================================
     GREETING
  ========================================================== */

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

  /* ==========================================================
     TODAY
  ========================================================== */

  const today = useMemo(() => {
    return now.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }, [now]);

  /* ==========================================================
     LOADING STATE
  ========================================================== */

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

  /* ==========================================================
     BANNER
  ========================================================== */

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
      {/* ======================================================
          BACKGROUND BANNER
      ====================================================== */}

      <img
        src={banner}
        alt="Mentor Dashboard Banner"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
        draggable={false}
      />

      {/* ======================================================
          OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-white/95
          via-white/70
          to-transparent
        "
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          items-center
          px-10
        "
      >
        <div className="max-w-xl">

          {/* ==================================================
              GREETING
          ================================================== */}

          <p className="text-[16px] font-medium text-slate-700">
            {greeting},
          </p>

          {/* ==================================================
              MENTOR NAME
          ================================================== */}

          <h1
            className="
              mt-1
              text-[24px]
              font-bold
              leading-none
              text-slate-900
            "
          >
            {mentor.fullName || "Mentor"} 👋
          </h1>

          {/* ==================================================
              DEPARTMENT + DESIGNATION
          ================================================== */}

          {(mentor.department ||
            mentor.designation) && (
            <div
              className="
                mt-3
                flex
                items-center
                gap-3
                text-[12px]
                text-slate-600
              "
            >
              {/* Department */}

              {mentor.department && (
                <span>
                  {mentor.department}
                </span>
              )}

              {/* Separator */}

              {mentor.department &&
                mentor.designation && (
                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-slate-400
                    "
                  />
                )}

              {/* Designation */}

              {mentor.designation && (
                <span>
                  {mentor.designation}
                </span>
              )}
            </div>
          )}

          {/* ==================================================
              TODAY
          ================================================== */}

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