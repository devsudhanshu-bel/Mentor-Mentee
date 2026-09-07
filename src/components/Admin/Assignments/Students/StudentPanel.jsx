import React, { useEffect, useMemo, useState } from "react";

import StudentTable from "./StudentTable";
import StudentPagination from "./StudentPagination";

const StudentPanel = ({
  students = [],
  search = "",
  selectedStudents = [],
  setSelectedStudents,
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

  const filteredStudents = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return students;
    }

    return students.filter((student) => {
      const name = student.fullName || student.name || "";

      const registerNumber =
        student.registerNumber || student.usn || student.regNo || "";

      return (
        name.toLowerCase().includes(value) ||
        registerNumber.toLowerCase().includes(value)
      );
    });
  }, [students, search]);

  // ============================================================
  // RESET PAGE ONLY WHEN SEARCH CHANGES
  // ============================================================

  useEffect(() => {
    setPage(1);
  }, [search]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / ITEMS_PER_PAGE),
  );

  const safePage = Math.min(page, totalPages);

  const paginatedStudents = filteredStudents.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  // ============================================================
  // SELECT STUDENT
  // ============================================================

  const toggleStudent = (id) => {
    setSelectedStudents((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  };

  // ============================================================
  // SELECT ALL
  // ============================================================

  const toggleAll = () => {
    const visibleIds = filteredStudents.map((student) => student.id);

    if (visibleIds.length === 0) {
      return;
    }

    setSelectedStudents((previous) => {
      const allSelected = visibleIds.every((id) => previous.includes(id));

      if (allSelected) {
        return previous.filter((id) => !visibleIds.includes(id));
      }

      return Array.from(new Set([...previous, ...visibleIds]));
    });
  };

  // ============================================================
  // ALL SELECTED
  // ============================================================

  const allSelected =
    filteredStudents.length > 0 &&
    filteredStudents.every((student) => selectedStudents.includes(student.id));

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
          Unassigned Students
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {loading
            ? "Updating students..."
            : `${filteredStudents.length} ${
                filteredStudents.length === 1 ? "student" : "students"
              } available`}
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <StudentTable
          students={paginatedStudents}
          selectedStudents={selectedStudents}
          toggleStudent={toggleStudent}
          allSelected={allSelected}
          toggleAll={toggleAll}
        />
      </div>

      {/* PAGINATION */}

      <StudentPagination
        total={filteredStudents.length}
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default StudentPanel;
