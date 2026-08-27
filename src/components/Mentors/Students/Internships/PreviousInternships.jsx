import React from "react";

import InternshipHistoryCard from "./InternshipHistoryCard";

const internships = [
  {
    id: 1,
    logo: "https://placehold.co/80x80?text=CC",
    position: "Software Engineering Intern",
    company: "CodeCraft Technologies",
    location: "Pune, Maharashtra",
    duration: "May 2024 - Jul 2024",
    durationText: "3 Months",
    role: "Software Intern",
    rating: 5,
  },
  {
    id: 2,
    logo: "https://placehold.co/80x80?text=INFY",
    position: "Data Analytics Intern",
    company: "Infosys Springboard",
    location: "Bangalore, Karnataka",
    duration: "Dec 2023 - Jan 2024",
    durationText: "2 Months",
    role: "Data Analyst Intern",
    rating: 4,
  },
];

const PreviousInternships = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* ================= Header ================= */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800">
            Previous Internships
          </h2>

          <p className="mt-1 text-[11px] text-slate-500">
            Internship history completed by the student
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-600">
          {internships.length} Completed
        </span>
      </div>

      {/* ================= Cards ================= */}

      <div className="space-y-4">
        {internships.map((internship) => (
          <InternshipHistoryCard
            key={internship.id}
            {...internship}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousInternships;