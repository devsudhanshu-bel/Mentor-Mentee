import React, { useEffect, useState } from "react";

import StudentTableHeader from "./StudentTableHeader";
import StudentTableRow from "./StudentTableRow";
import StudentPagination from "./StudentPagination";

const PAGE_SIZE = 8;

const StudentTable = ({ students = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to the first page whenever the filtered student list changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [students]);

  const totalPages = Math.max(
    1,
    Math.ceil(students.length / PAGE_SIZE),
  );

  const visibleStudents = students.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Keep pagination valid if the list becomes shorter.
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <StudentTableHeader />

          <tbody className="divide-y divide-slate-100 bg-white">
            {visibleStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No students found in this selection.
                </td>
              </tr>
            ) : (
              visibleStudents.map((student) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Pagination ================= */}

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          {students.length === 0
            ? "No students found"
            : `Showing ${
                (currentPage - 1) * PAGE_SIZE + 1
              } to ${Math.min(
                currentPage * PAGE_SIZE,
                students.length,
              )} of ${students.length} assigned students`}
        </p>

        <StudentPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default StudentTable;