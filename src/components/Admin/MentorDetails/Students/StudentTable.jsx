import React from "react";
import { useParams } from "react-router-dom";

import studentData from "./studentData";
import StudentTableHeader from "./StudentTableHeader";
import StudentTableRow from "./StudentTableRow";
import StudentPagination from "./StudentPagination";

const StudentTable = () => {
  const { mentorId } = useParams();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <StudentTableHeader />

          <tbody className="divide-y divide-slate-100 bg-white">
            {studentData.map((student) => (
              <StudentTableRow
                key={student.id}
                student={student}
                mentorId={mentorId}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Pagination ================= */}

      <StudentPagination />
    </div>
  );
};

export default StudentTable;