import React from "react";
import { useParams } from "react-router-dom";

import StudentTableHeader from "./StudentTableHeader";
import StudentTableRow from "./StudentTableRow";
import StudentPagination from "./StudentPagination";

const StudentTable = ({ students = [] }) => {
  const { mentorId } = useParams();

  const validStudents = Array.isArray(students) ? students : [];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <StudentTableHeader />

          <tbody className="divide-y divide-slate-100 bg-white">
            {validStudents.length > 0 ? (
              validStudents.map((student, index) => (
                <StudentTableRow
                  key={student.id ?? student.registerNumber ?? index}
                  student={student}
                  mentorId={mentorId}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No students found for this mentor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <StudentPagination />
    </div>
  );
};

export default StudentTable;
