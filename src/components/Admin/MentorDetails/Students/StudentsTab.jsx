import React, { useCallback, useEffect, useMemo, useState } from "react";

import StudentHierarchy from "./StudentHierarchy";
import StudentFilters from "./StudentFilters";
import StudentTable from "./StudentTable";

const getStudentYear = (student) => {
  const explicitYear =
    student.year ?? student.academicYearOfStudy ?? student.yearOfStudy;

  if (explicitYear !== undefined && explicitYear !== null) {
    const value = String(explicitYear).trim();

    if (/^[1-4]$/.test(value)) {
      return Number(value);
    }

    const match = value.match(/([1-4])/);

    if (match && /year|yr/i.test(value)) {
      return Number(match[1]);
    }
  }

  const semester = Number(
    student.semesterNumber ??
      student.semester ??
      student.student_enrollments?.[0]?.semesterNumber,
  );

  return Number.isFinite(semester) && semester > 0
    ? Math.min(Math.ceil(semester / 2), 4)
    : null;
};

const getStudentSection = (student) => {
  const value =
    student.section ??
    student.sectionName ??
    student.sectionCode ??
    student.student_enrollments?.[0]?.section;

  return value == null || String(value).trim() === ""
    ? ""
    : String(value)
        .trim()
        .replace(/^section\s+/i, "");
};

const StudentsTab = ({ students = [] }) => {
  const [selectedGroup, setSelectedGroup] = useState({
    type: "all",
    value: "all",
  });

  const [filterResults, setFilterResults] = useState(null);

  const hierarchyFilteredStudents = useMemo(() => {
    if (selectedGroup.type === "all") {
      return students;
    }

    if (selectedGroup.type === "year") {
      if (selectedGroup.value === "unknown") {
        return students.filter((student) => getStudentYear(student) === null);
      }

      return students.filter(
        (student) =>
          String(getStudentYear(student)) === String(selectedGroup.value),
      );
    }

    if (selectedGroup.type === "section") {
      const [yearValue, ...sectionParts] = String(selectedGroup.value).split(
        ":",
      );

      const sectionValue = sectionParts.join(":");

      return students.filter((student) => {
        const studentYear =
          getStudentYear(student) === null
            ? "unknown"
            : String(getStudentYear(student));

        return (
          studentYear === yearValue &&
          getStudentSection(student) === sectionValue
        );
      });
    }

    return students;
  }, [students, selectedGroup]);

  useEffect(() => {
    setFilterResults(null);
  }, [hierarchyFilteredStudents]);

  const handleHierarchySelect = useCallback((group) => {
    setSelectedGroup(group);
    setFilterResults(null);
  }, []);

  const handleFiltersChange = useCallback(({ filteredStudents: result }) => {
    setFilterResults(result);
  }, []);

  const displayedStudents = filterResults ?? hierarchyFilteredStudents;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Assigned Students
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Students currently assigned to this mentor.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="xl:col-span-3">
            <StudentHierarchy
              students={students}
              onGroupSelect={handleHierarchySelect}
            />
          </div>

          <div className="space-y-4 xl:col-span-9">
            <StudentFilters
              students={hierarchyFilteredStudents}
              onFiltersChange={handleFiltersChange}
            />

            <StudentTable students={displayedStudents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;
