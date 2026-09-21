import React, { useEffect, useState } from "react";

import {
  Users,
  CalendarCheck2,
} from "lucide-react";

import {
  getMentorOverview,
} from "../../../api/profile.api";

/* ==========================================================
   MENTORING OVERVIEW
========================================================== */

const MentoringOverview = () => {
  const [assignedStudents, setAssignedStudents] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ==========================================================
     FETCH MENTOR OVERVIEW
  ========================================================== */

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMentorOverview();

      console.log(
        "Mentor overview response:",
        response
      );

      setAssignedStudents(
        response?.assignedStudents ?? 0
      );
    } catch (error) {
      console.error(
        "Failed to fetch mentor overview:",
        error
      );

      setError(
        "Unable to load assigned students."
      );

      setAssignedStudents(0);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    fetchOverview();
  }, []);

  /* ==========================================================
     STATS
  ========================================================== */

  const stats = [
    {
      title: "Assigned Students",
      value: loading
        ? null
        : assignedStudents,
      subtitle: "Active mentees",
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },

    {
      title: "Completed Meetings",
      value: "48",
      subtitle: "This Academic Year",
      icon: CalendarCheck2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
  ];

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-4 flex items-center gap-2">

        <Users
          size={17}
          className="text-blue-600"
        />

        <h2 className="text-[16px] font-semibold text-slate-900">
          Mentoring Overview
        </h2>

      </div>

      {/* ======================================================
          CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-3">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
            >

              {/* =================================================
                  TOP
              ================================================= */}

              <div className="flex items-center gap-2">

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <Icon
                    size={18}
                    className={item.color}
                  />
                </div>

                <p className="text-[12px] font-medium leading-5 text-slate-600">
                  {item.title}
                </p>

              </div>

              {/* =================================================
                  NUMBER
              ================================================= */}

              <div className="mt-5">

                {item.value === null ? (
                  <div className="h-7 w-12 animate-pulse rounded-md bg-slate-100" />
                ) : (
                  <h3 className="text-[28px] font-bold leading-none text-slate-900">
                    {item.value}
                  </h3>
                )}

              </div>

              {/* =================================================
                  SUBTITLE
              ================================================= */}

              <p className="mt-2 text-[11px] text-slate-500">
                {item.subtitle}
              </p>

            </div>
          );
        })}

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <p className="mt-3 text-[11px] text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default MentoringOverview;