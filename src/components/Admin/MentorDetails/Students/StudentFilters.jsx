import React, { useMemo, useState } from "react";
import { Search, Download } from "lucide-react";

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

const getAcademicYear = (student) => {
  const value =
    student.academicYear ??
    student.academicYearLabel ??
    student.student_enrollments?.[0]?.academicYear;

  return value == null ? "" : String(value).trim();
};

const getYearLabel = (year) => {
  const labels = {
    1: "1st Year",
    2: "2nd Year",
    3: "3rd Year",
    4: "4th Year",
  };

  return labels[year] || "";
};

const escapeCsv = (value) => {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

const StudentFilters = ({ students = [], onFiltersChange }) => {
  const [search, setSearch] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const academicYears = useMemo(
    () => [...new Set(students.map(getAcademicYear).filter(Boolean))].sort(),
    [students],
  );

  const years = useMemo(
    () =>
      [...new Set(students.map(getStudentYear).filter(Boolean))].sort(
        (a, b) => a - b,
      ),
    [students],
  );

  const sections = useMemo(() => {
    return [
      ...new Set(
        students
          .filter((student) => {
            return !year || String(getStudentYear(student)) === year;
          })
          .map(getStudentSection)
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [students, year]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const studentName = String(
        student.fullName ?? student.name ?? "",
      ).toLowerCase();

      const registerNumber = String(student.registerNumber ?? "").toLowerCase();

      const email = String(student.email ?? "").toLowerCase();

      const matchesSearch =
        !query ||
        studentName.includes(query) ||
        registerNumber.includes(query) ||
        email.includes(query);

      const matchesAcademicYear =
        !academicYear || getAcademicYear(student) === academicYear;

      const studentYear = getStudentYear(student);

      const matchesYear = !year || String(studentYear) === year;

      const matchesSection = !section || getStudentSection(student) === section;

      return (
        matchesSearch && matchesAcademicYear && matchesYear && matchesSection
      );
    });
  }, [students, search, academicYear, year, section]);

  React.useEffect(() => {
    onFiltersChange?.({
      search,
      academicYear,
      year,
      section,
      filteredStudents,
    });
  }, [search, academicYear, year, section, filteredStudents, onFiltersChange]);

  const exportStudents = () => {
    if (filteredStudents.length === 0) {
      return;
    }

    const columns = [
      ["Register Number", (student) => student.registerNumber],
      ["Student Name", (student) => student.fullName ?? student.name],
      ["Email", (student) => student.email],
      ["Programme", (student) => student.programme],
      ["Academic Year", getAcademicYear],
      ["Year of Study", (student) => getYearLabel(getStudentYear(student))],
      ["Section", getStudentSection],
      [
        "Semester",
        (student) =>
          student.semesterNumber ??
          student.semester ??
          student.student_enrollments?.[0]?.semesterNumber,
      ],
      ["Status", (student) => student.status],
    ];

    const csv = [
      columns.map(([heading]) => escapeCsv(heading)).join(","),
      ...filteredStudents.map((student) =>
        columns.map(([, getValue]) => escapeCsv(getValue(student))).join(","),
      ),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "assigned-students.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const selectClass =
    "h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Search */}

          <div className="relative min-w-[240px] flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student..."
              aria-label="Search students"
              className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Academic Year */}

          <select
            value={academicYear}
            onChange={(event) => setAcademicYear(event.target.value)}
            aria-label="Filter by academic year"
            className={selectClass}
          >
            <option value="">Academic Year</option>

            {academicYears.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Year */}

          <select
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
              setSection("");
            }}
            aria-label="Filter by year"
            className={selectClass}
          >
            <option value="">Year</option>

            {years.map((item) => (
              <option key={item} value={String(item)}>
                {getYearLabel(item)}
              </option>
            ))}
          </select>

          {/* Section */}

          <select
            value={section}
            onChange={(event) => setSection(event.target.value)}
            aria-label="Filter by section"
            className={selectClass}
          >
            <option value="">Section</option>

            {sections.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Export */}

        <button
          type="button"
          onClick={exportStudents}
          disabled={filteredStudents.length === 0}
          className="flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={14} />
          Export
        </button>
      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Showing {filteredStudents.length} of {students.length} students
      </p>
    </div>
  );
};

export default StudentFilters;
