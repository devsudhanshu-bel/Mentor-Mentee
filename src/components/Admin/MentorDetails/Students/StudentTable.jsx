import React from "react";

import StudentTableHeader from "./StudentTableHeader";
import StudentTableRow from "./StudentTableRow";
import StudentPagination from "./StudentPagination";

const StudentTable = ({ students = [] }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <StudentTableHeader />

          <tbody className="divide-y divide-slate-100 bg-white">
            {students.length > 0 ? (
              students.map((student, index) => (
                <StudentTableRow
                  key={
                    student.id ??
                    student.studentId ??
                    student.registerNumber ??
                    index
                  }
                  student={student}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No students found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <StudentPagination students={students} />
    </div>
  );
};

export default StudentTable;
