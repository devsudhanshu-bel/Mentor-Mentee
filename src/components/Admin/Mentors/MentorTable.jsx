import React from "react";

import MentorTableHeader from "./MentorTableHeader";
import MentorRow from "./MentorTableRow";
import MentorPagination from "./MentorPagination";

const MentorTable = ({
  mentors = [],
  loading = false,
  totalMentors = 0,
  currentPage = 1,
  totalPages = 1,
  rowsPerPage = 8,
  setRowsPerPage,
  setCurrentPage,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <MentorTableHeader />

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  Loading mentors...
                </td>
              </tr>
            ) : mentors.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  No mentors found.
                </td>
              </tr>
            ) : (
              mentors.map((mentor) => (
                <MentorRow key={mentor.id} mentor={mentor} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <MentorPagination
        totalMentors={totalMentors}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MentorTable;
