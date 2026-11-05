import React from "react";

import { Users, ClipboardCheck } from "lucide-react";

import profile from "../../../assets/profile.jpg";

const MentorWorkloadOverview = ({ mentors = [] }) => {
  return (
    <div className="h-full rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      {/* ================= Header ================= */}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-5">
        <h2 className="text-[16px] font-semibold text-slate-800 sm:text-[18px]">
          Mentor Workload Overview
        </h2>

        <button
          type="button"
          className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* ================= Mentor List ================= */}

      <div className="divide-y divide-slate-100">
        {mentors.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-400 sm:py-12">
            No mentor workload data available.
          </div>
        ) : (
          mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="flex min-w-0 flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              {/* ================= Left ================= */}

              <div className="flex min-w-0 items-center gap-3 sm:min-w-[240px]">
                <img
                  src={mentor.profileImage || profile}
                  alt={mentor.name}
                  className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
                  onError={(event) => {
                    event.currentTarget.src = profile;
                  }}
                />

                <div className="min-w-0">
                  <h3 className="break-words text-[13px] font-semibold text-slate-800">
                    {mentor.name}
                  </h3>

                  <p className="break-words text-[11px] text-slate-500">
                    {mentor.designation || "Faculty Mentor"}
                  </p>
                </div>
              </div>

              {/* ================= Metrics ================= */}

              <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 sm:flex-1 sm:justify-center sm:gap-8">
                {/* Students */}

                <div className="flex items-center gap-2">
                  <Users size={16} className="shrink-0 text-blue-600" />

                  <span className="text-[15px] font-bold text-slate-800">
                    {mentor.students}
                  </span>

                  <span className="text-[11px] text-slate-500">Students</span>
                </div>

                {/* Pending transfers */}

                <div className="flex items-center gap-2">
                  <ClipboardCheck size={16} className="shrink-0 text-orange-500" />

                  <span className="text-[15px] font-bold text-slate-800">
                    {mentor.pendingTransfers}
                  </span>

                  <span className="text-[11px] text-slate-500">
                    Pending transfers
                  </span>
                </div>
              </div>

              {/* ================= Status ================= */}

              <div className="flex justify-start sm:min-w-[100px] sm:justify-end">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    mentor.status === "High"
                      ? "bg-red-100 text-red-700"
                      : mentor.status === "Moderate"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {mentor.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorWorkloadOverview;
