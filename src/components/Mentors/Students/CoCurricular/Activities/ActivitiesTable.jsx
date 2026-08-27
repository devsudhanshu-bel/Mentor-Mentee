import React from "react";
import { Filter } from "lucide-react";

import ActivityRow from "./ActivityRow";

const activities = [
  {
    id: 1,
    title: "TechFest 2025",
    organizer: "Computer Science Association",
    category: "Technical",
    date: "12 Mar 2025",
    status: "Approved",
    feedback: "Excellent initiative and active involvement.",
  },
  {
    id: 2,
    title: "NSS Community Outreach",
    organizer: "National Service Scheme",
    category: "Social",
    date: "24 Feb 2025",
    status: "Approved",
    feedback: "Displayed strong leadership and teamwork.",
  },
  {
    id: 3,
    title: "Leadership Summit",
    organizer: "Student Council",
    category: "Leadership",
    date: "18 Jan 2025",
    status: "Under Review",
    feedback: "Waiting for mentor evaluation.",
  },
  {
    id: 4,
    title: "Cultural Fest",
    organizer: "Department of Humanities",
    category: "Cultural",
    date: "10 Dec 2024",
    status: "Approved",
    feedback: "Excellent stage presence and coordination.",
  },
  {
    id: 5,
    title: "Hackathon",
    organizer: "Innovation Club",
    category: "Technical",
    date: "28 Nov 2024",
    status: "Draft",
    feedback: "",
  },
];

const ActivitiesTable = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm h-[505px]">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="text-[14px] font-semibold text-slate-800">
            Co-Curricular Activities
          </h2>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Student participation across various activities.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50">
          <Filter size={14} />

          Filter
        </button>
      </div>

      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Activity
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Mentor Feedback
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Documents
              </th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <ActivityRow
                key={activity.id}
                activity={activity}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
        <p className="text-[11px] text-slate-500">
          Showing {activities.length} activities
        </p>

        <button className="rounded-lg bg-blue-600 px-3 py-2 text-[11px] font-medium text-white transition hover:bg-blue-700">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivitiesTable;