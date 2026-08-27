import React from "react";
import {
  Users,
  CalendarDays,
  ClipboardCheck,
} from "lucide-react";

import profile from "../../../assets/profile.jpg";

const mentors = [
  {
    id: 1,
    name: "Dr. Arjun Mehta",
    students: 24,
    meetings: 18,
    pending: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Neha Sharma",
    students: 22,
    meetings: 16,
    pending: 5,
    status: "Active",
  },
  {
    id: 3,
    name: "Prof. Vivek Singh",
    students: 21,
    meetings: 14,
    pending: 7,
    status: "Moderate",
  },
  {
    id: 4,
    name: "Dr. Meera Reddy",
    students: 20,
    meetings: 13,
    pending: 2,
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Karan Patel",
    students: 19,
    meetings: 12,
    pending: 6,
    status: "Moderate",
  },
];

const MentorWorkloadOverview = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 h-full">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-semibold text-slate-800">
          Mentor Workload Overview
        </h2>

        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
          View All
        </button>
      </div>

      {/* ================= Mentor List ================= */}

      <div className="divide-y divide-slate-100">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="flex items-center justify-between py-3"
          >
            {/* ================= Left ================= */}

            <div className="flex items-center gap-3 min-w-[240px]">
              <img
                src={profile}
                alt={mentor.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />

              <div>
                <h3 className="text-[13px] font-semibold text-slate-800">
                  {mentor.name}
                </h3>

                <p className="text-[11px] text-slate-500">
                  Faculty Mentor
                </p>
              </div>
            </div>

            {/* ================= Metrics ================= */}

            <div className="flex items-center gap-8 flex-1 justify-center">
              {/* Students */}

              <div className="flex items-center gap-2">
                <Users
                  size={16}
                  className="text-blue-600"
                />

                <span className="text-[15px] font-bold text-slate-800">
                  {mentor.students}
                </span>

                <span className="text-[11px] text-slate-500">
                  Students
                </span>
              </div>

              {/* Meetings */}

              <div className="flex items-center gap-2">
                <CalendarDays
                  size={16}
                  className="text-indigo-600"
                />

                <span className="text-[15px] font-bold text-slate-800">
                  {mentor.meetings}
                </span>

                <span className="text-[11px] text-slate-500">
                  Meetings
                </span>
              </div>

              {/* Pending */}

              <div className="flex items-center gap-2">
                <ClipboardCheck
                  size={16}
                  className="text-orange-500"
                />

                <span className="text-[15px] font-bold text-slate-800">
                  {mentor.pending}
                </span>

                <span className="text-[11px] text-slate-500">
                  Pending
                </span>
              </div>
            </div>

            {/* ================= Status ================= */}

            <div className="min-w-[100px] flex justify-end">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                  mentor.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {mentor.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorWorkloadOverview;