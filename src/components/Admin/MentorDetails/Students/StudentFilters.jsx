
import React from "react";

import {
  Search,
  Download,
} from "lucide-react";

const StudentFilters = ({
  search = "",
  onSearchChange = () => {},
  year = "",
  onYearChange = () => {},
  section = "",
  onSectionChange = () => {},
  students = [],
  onExport = null,
}) => {
  // Build year options from the assigned students.
  const years = [
    ...new Set(
      students
        .map((student) => {
          const value =
            student.yearsAtUniversity ??
            student.year ??
            student.studyYear;

          if (
            value == null ||
            ["", "null", "undefined"].includes(
              String(value).trim().toLowerCase()
            )
          ) {
            const semester = Number(student.semester);

            if (
              student.semester != null &&
              String(student.semester).trim() !== "" &&
              Number.isFinite(semester) &&
              semester > 0
            ) {
              const number = Math.ceil(semester / 2);
              const suffix =
                number % 100 >= 11 && number % 100 <= 13
                  ? "th"
                  : number % 10 === 1
                    ? "st"
                    : number % 10 === 2
                      ? "nd"
                      : number % 10 === 3
                        ? "rd"
                        : "th";

              return `${number}${suffix} Year`;
            }

            return "Other";
          }

          const text = String(value).trim();

          if (text.toLowerCase().includes("year")) {
            return text;
          }

          const match = text.match(/\d+/);

          if (match && Number(match[0]) > 0) {
            const number = Number(match[0]);
            const suffix =
              number % 100 >= 11 && number % 100 <= 13
                ? "th"
                : number % 10 === 1
                  ? "st"
                  : number % 10 === 2
                    ? "nd"
                    : number % 10 === 3
                      ? "rd"
                      : "th";

            return `${number}${suffix} Year`;
          }

          return text;
        })
    ),
  ].sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  const sections = [
    ...new Set(
      students.map((student) => {
        const value = student.section;

        return value == null ||
          ["", "null", "undefined"].includes(
            String(value).trim().toLowerCase()
          )
          ? "Other"
          : String(value).trim();
      })
    ),
  ].sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  const exportStudents = () => {
    if (onExport) {
      onExport();
      return;
    }

    if (students.length === 0) return;

    const columns = [
      ["Register Number", "registerNumber"],
      ["Name", "name"],
      ["Email", "email"],
      ["Semester", "semester"],
      ["Section", "section"],
      ["Attendance", "attendance"],
      ["CGPA", "currentCGPA"],
      ["Status", "status"],
    ];

    const escapeCsv = (value) => {
      const text = value == null ? "" : String(value);
      return `"${text.replace(/"/g, '""')}"`;
    };

    const csv = [
      columns.map(([label]) => escapeCsv(label)).join(","),
      ...students.map((student) =>
        columns
          .map(([, key]) => escapeCsv(student[key]))
          .join(",")
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search student..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Year */}
          <select
            value={year}
            onChange={(event) => onYearChange(event.target.value)}
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="">All Years</option>

            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Section */}
          <select
            value={section}
            onChange={(event) =>
              onSectionChange(event.target.value)
            }
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="">All Sections</option>

            {sections.map((item) => (
              <option key={item} value={item}>
                {item === "Other" ? "Other" : `Section ${item}`}
              </option>
            ))}
          </select>
        </div>

        {/* Export */}
        <button
          type="button"
          onClick={exportStudents}
          disabled={students.length === 0}
          className="flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={14} />
          Export
        </button>
      </div>
    </div>
  );
};

export default StudentFilters;
