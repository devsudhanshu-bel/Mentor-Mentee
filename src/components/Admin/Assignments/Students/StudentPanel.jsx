import React from "react";

import { students } from "../assignmentData";

import StudentTable from "./StudentTable";
import StudentPagination from "./StudentPagination";

const StudentPanel = ({
  search,
  selectedStudents,
  setSelectedStudents,
}) => {
  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.usn
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((item) => item !== id)
      );
    } else {
      setSelectedStudents([
        ...selectedStudents,
        id,
      ]);
    }
  };

  const toggleAll = () => {
    if (
      filteredStudents.length > 0 &&
      selectedStudents.length ===
        filteredStudents.length
    ) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(
        filteredStudents.map(
          (student) => student.id
        )
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Header ================= */}

      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Unassigned Students
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {filteredStudents.length} students available
        </p>
      </div>

      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <StudentTable
          students={filteredStudents}
          selectedStudents={selectedStudents}
          toggleStudent={toggleStudent}
          allSelected={
            filteredStudents.length > 0 &&
            selectedStudents.length ===
              filteredStudents.length
          }
          toggleAll={toggleAll}
        />
      </div>

      {/* ================= Footer ================= */}

      <StudentPagination
        total={filteredStudents.length}
      />
    </div>
  );
};

export default StudentPanel;