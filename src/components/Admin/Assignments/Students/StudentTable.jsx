import React from "react";

import StudentTableHeader from "./StudentTableHeader";
import StudentRow from "./StudentRow";

const StudentTable = ({
  students,
  selectedStudents,
  toggleStudent,
  allSelected,
  toggleAll,
}) => {
  return (
    <table className="w-full">
      <StudentTableHeader
        allSelected={allSelected}
        onSelectAll={toggleAll}
      />

      <tbody>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            selectedStudents={selectedStudents}
            toggleStudent={toggleStudent}
          />
        ))}

        {students.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="py-8 text-center text-sm text-slate-500"
            >
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;