import React from "react";

import mentors from "./mentorData";

import MentorTableHeader from "./MentorTableHeader";
import MentorTableRow from "./MentorTableRow";
import MentorPagination from "./MentorPagination";

const MentorTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <MentorTableHeader />

          <tbody>
            {mentors.map((mentor) => (
              <MentorTableRow
                key={mentor.id}
                mentor={mentor}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Pagination ================= */}

      <MentorPagination />
    </div>
  );
};

export default MentorTable;