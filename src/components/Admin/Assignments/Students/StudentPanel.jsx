import React, { useEffect, useMemo, useState } from "react";

import StudentTable from "./StudentTable";
import StudentPagination from "./StudentPagination";
import { deleteStudent } from "../../../../api/student.api";

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
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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

  const handleDeleteStudent = async () => {
    if (!studentToDelete || deleting) return;
    try {
      setDeleting(true);
      setDeleteError("");
      await deleteStudent(studentToDelete.id);
      setStudentToDelete(null);
      setSelectedStudents((previous) => previous.filter((id) => id !== studentToDelete.id));
      // Refresh the context from the parent so counts and student rows stay in sync.
      if (typeof onRefresh === "function") await onRefresh();
    } catch (error) {
      setDeleteError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to delete this student.",
      );
    } finally {
      setDeleting(false);
    }
  };

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
          onDeleteStudent={setStudentToDelete}
        />
      </div>

      {/* PAGINATION */}

      <StudentPagination
        total={filteredStudents.length}
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {studentToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-student-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.9 1.9 18.2A2 2 0 0 0 3.6 21h16.8a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                </svg>
              </div>
              <div>
                <h3 id="delete-student-title" className="text-lg font-semibold text-slate-900">Delete this student?</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You are about to delete <strong>{studentToDelete.fullName || studentToDelete.name || "this student"}</strong>
                  {" "}({studentToDelete.registerNumber || studentToDelete.usn || studentToDelete.regNo || "USN unavailable"}).
                  This action cannot be undone. Continue only if this entry is incorrect.
                </p>
              </div>
            </div>
            {deleteError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{deleteError}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" disabled={deleting} onClick={() => { setStudentToDelete(null); setDeleteError(""); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Cancel</button>
              <button type="button" disabled={deleting} onClick={handleDeleteStudent} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">{deleting ? "Deleting..." : "Delete Student"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPanel;
