import React from "react";
import { Plus } from "lucide-react";

import ExtraCurricularStatusFilter from "./ExtraCurricularStatusFilter";
import ExtraCurricularActivityCard from "./ExtraCurricularActivityCard";

const activities = [
  {
    id: 1,
    title: "Photography – Passion Project",
    category: "Photography",
    date: "May 2025",
    type: "pdf",
    status: "Approved",
  },
  {
    id: 2,
    title: "Blog Writing – Tech & Beyond",
    category: "Writing",
    date: "April 2025",
    type: "docx",
    status: "Under Review",
  },
  {
    id: 3,
    title: "Music – Guitar Performance",
    category: "Music",
    date: "March 2025",
    type: "pptx",
    status: "Draft",
  },
  {
    id: 4,
    title: "Social Media Content Creator",
    category: "Content Creation",
    date: "February 2025",
    type: "pdf",
    status: "Approved",
  },
  {
    id: 5,
    title: "Chess Club – Tournament Participation",
    category: "Games",
    date: "January 2025",
    type: "docx",
    status: "Approved",
  },
];

const ExtraCurricularActivityList = ({ onUploadClick }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-semibold text-slate-800">
          My Extra Curricular Activities
        </h2>

        <div className="flex items-center gap-2">

          <ExtraCurricularStatusFilter />

          <button
            type="button"
            onClick={onUploadClick}
            className="h-9 px-3 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition"
          >
            <Plus size={15} />
            Upload Activity
          </button>

        </div>

      </div>

      {/* Activities */}
      <div className="space-y-2.5">

        {activities.map((activity) => (
          <ExtraCurricularActivityCard
            key={activity.id}
            activity={activity}
          />
        ))}

      </div>

    </div>
  );
};

export default ExtraCurricularActivityList;