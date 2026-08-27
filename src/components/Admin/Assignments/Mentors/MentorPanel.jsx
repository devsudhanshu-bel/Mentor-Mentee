import React from "react";

import { mentors } from "../assignmentData";

import MentorTable from "./MentorTable";
import MentorPagination from "./MentorPagination";

const MentorPanel = ({
  selectedMentor,
  setSelectedMentor,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Available Mentors
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {mentors.length} mentors available
        </p>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <MentorTable
          mentors={mentors}
          selectedMentor={selectedMentor}
          setSelectedMentor={setSelectedMentor}
        />
      </div>

      {/* Footer */}

      <MentorPagination
        total={mentors.length}
      />
    </div>
  );
};

export default MentorPanel;