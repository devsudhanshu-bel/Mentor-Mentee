import React, { useEffect, useMemo, useState } from "react";

import MentorTable from "./MentorTable";
import MentorPagination from "./MentorPagination";

const MentorPanel = ({
  mentors = [],
  search = "",
  selectedMentor,
  setSelectedMentor,
  loading = false,
}) => {
  // ============================================================
  // PAGINATION
  // ============================================================

  const ITEMS_PER_PAGE = 10;

  const [page, setPage] = useState(1);

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredMentors = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return mentors;
    }

    return mentors.filter((mentor) => {
      const name = mentor.fullName || mentor.name || "";

      const employeeCode = mentor.employeeCode || "";

      const email = mentor.email || "";

      return (
        name.toLowerCase().includes(value) ||
        employeeCode.toLowerCase().includes(value) ||
        email.toLowerCase().includes(value)
      );
    });
  }, [mentors, search]);

  // ============================================================
  // RESET PAGE WHEN SEARCH CHANGES
  // ============================================================

  useEffect(() => {
    setPage(1);
  }, [search]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMentors.length / ITEMS_PER_PAGE),
  );

  const safePage = Math.min(page, totalPages);

  const paginatedMentors = filteredMentors.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* HEADER */}

      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Available Mentors
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {loading
            ? "Updating mentors..."
            : `${filteredMentors.length} ${
                filteredMentors.length === 1 ? "mentor" : "mentors"
              } available`}
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <MentorTable
          mentors={paginatedMentors}
          selectedMentor={selectedMentor}
          setSelectedMentor={setSelectedMentor}
        />
      </div>

      {/* PAGINATION */}

      <MentorPagination
        total={filteredMentors.length}
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MentorPanel;
