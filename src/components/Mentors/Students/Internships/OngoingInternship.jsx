import React from "react";

import CompanyHeader from "./CompanyHeader";
import InternshipTimeline from "./InternshipTimeline";
import InternshipInfoGrid from "./InternshipInfoGrid";
import ResponsibilityPanel from "./ResponsibilityPanel";
import MentorNote from "./MentorNote";

const OngoingInternship = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* ================= Header ================= */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-blue-600">
          Ongoing Internship
        </h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">
          Ongoing
        </span>
      </div>

      {/* ================= Main Grid ================= */}

      <div className="grid grid-cols-12 gap-6">
        {/* Left */}

        <div className="col-span-4">
          <CompanyHeader />

          <InternshipTimeline />
        </div>

        {/* Center */}

        <div className="col-span-4 border-l border-r border-slate-100 px-5">
          <InternshipInfoGrid />
        </div>

        {/* Right */}

        <div className="col-span-4">
          <ResponsibilityPanel />
        </div>
      </div>

      {/* ================= Mentor Note ================= */}

      <MentorNote />
    </div>
  );
};

export default OngoingInternship;