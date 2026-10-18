
import React, { useEffect, useState } from "react";

import banner from "../../../assets/banner.png";
import api from "../../../api/axios";

/* ==========================================================
   MENTOR WELCOME BANNER
========================================================== */

const WelcomeBanner = ({ mentorName = "" }) => {
  const [displayName, setDisplayName] = useState(
    mentorName?.trim() || ""
  );

  /* ========================================================
     LOAD AUTHENTICATED MENTOR NAME

     Uses the same logic as MentorHeader:
     1. Read the logged-in user from localStorage.
     2. Fetch the mentor dashboard banner API.
     3. Prefer the actual name returned by the API.
  ======================================================== */

  useEffect(() => {
    let cancelled = false;

    const loadMentorName = async () => {
      let storedName = "";

      try {
        const storedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        storedName =
          storedUser.fullName ||
          storedUser.name ||
          "";

        if (!cancelled && storedName.trim()) {
          setDisplayName(storedName.trim());
        }
      } catch (error) {
        console.error(
          "Unable to read mentor name from storage:",
          error
        );
      }

      try {
        const response = await api.get(
          "/mentor/dashboard/banner"
        );

        const teacher = response.data?.data;

        if (cancelled || !teacher) return;

        const actualName =
          teacher.fullName ||
          teacher.name ||
          storedName ||
          mentorName ||
          "";

        if (actualName.trim()) {
          setDisplayName(actualName.trim());
        }
      } catch (error) {
        console.error(
          "Unable to fetch mentor name for welcome banner:",
          error.response?.data?.message || error.message
        );

        if (!cancelled) {
          setDisplayName(
            storedName.trim() ||
              mentorName?.trim() ||
              ""
          );
        }
      }
    };

    loadMentorName();

    return () => {
      cancelled = true;
    };
  }, [mentorName]);

  /* ========================================================
     TIME-BASED GREETING
  ======================================================== */

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <div className="relative h-[165px] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      <img
        src={banner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-center px-5 sm:px-9">
        <p className="mb-1 text-[16px] text-slate-700">
          {greeting},
        </p>

        <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-[30px]">
          {displayName || "Mentor"}! 👋
        </h1>

        <p className="mt-3 text-xs text-slate-600 sm:text-[14px]">
          Welcome back! Keep inspiring, guiding, and helping students grow.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
