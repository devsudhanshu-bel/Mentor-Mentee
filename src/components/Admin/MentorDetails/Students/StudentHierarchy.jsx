import React, { useMemo, useState } from "react";

import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";

const getStudentYear = (student) => {
  const explicitYear =
    student.year ?? student.academicYear ?? student.yearOfStudy;

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

  if (Number.isFinite(semester) && semester > 0) {
    return Math.min(Math.ceil(semester / 2), 4);
  }

  return null;
};

const getStudentSection = (student) => {
  const section =
    student.section ??
    student.sectionName ??
    student.sectionCode ??
    student.student_enrollments?.[0]?.section;

  if (section === undefined || section === null) {
    return null;
  }

  const value = String(section).trim();

  if (!value) {
    return null;
  }

  const match = value.match(/section\s+(.+)/i);

  return match ? match[1].trim() : value;
};

const getYearLabel = (year) => {
  const labels = {
    1: "1st Year",
    2: "2nd Year",
    3: "3rd Year",
    4: "4th Year",
  };

  return labels[year] || "Unknown Year";
};

const StudentHierarchy = ({ students = [], onGroupSelect }) => {
  const [expandedYears, setExpandedYears] = useState(() => new Set([1, 2]));

  const [expandedSections, setExpandedSections] = useState(
    () => new Set(["2:A"]),
  );

  const [selectedGroup, setSelectedGroup] = useState({
    type: "all",
    value: "all",
  });

  const hierarchy = useMemo(() => {
    const years = new Map();

    students.forEach((student) => {
      const year = getStudentYear(student);
      const section = getStudentSection(student);

      const yearKey = year ?? "unknown";

      if (!years.has(yearKey)) {
        years.set(yearKey, {
          year,
          label: year ? getYearLabel(year) : "Year Not Available",
          students: [],
          sections: new Map(),
        });
      }

      const yearGroup = years.get(yearKey);

      yearGroup.students.push(student);

      const sectionKey = section || "unknown";
      const sectionLabel = section || "Section Not Available";

      if (!yearGroup.sections.has(sectionKey)) {
        yearGroup.sections.set(sectionKey, {
          key: sectionKey,
          label: sectionLabel,
          students: [],
        });
      }

      yearGroup.sections.get(sectionKey).students.push(student);
    });

    return Array.from(years.values()).sort((a, b) => {
      if (a.year === null) return 1;
      if (b.year === null) return -1;

      return a.year - b.year;
    });
  }, [students]);

  const toggleYear = (yearKey) => {
    setExpandedYears((previous) => {
      const next = new Set(previous);

      if (next.has(yearKey)) {
        next.delete(yearKey);
      } else {
        next.add(yearKey);
      }

      return next;
    });
  };

  const toggleSection = (key) => {
    setExpandedSections((previous) => {
      const next = new Set(previous);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  const selectGroup = (group) => {
    setSelectedGroup(group);

    if (onGroupSelect) {
      onGroupSelect(group);
    }
  };

  const isSelected = (type, value) =>
    selectedGroup.type === type && selectedGroup.value === value;

  const countBadge =
    "rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        Student Hierarchy
      </h3>

      <div className="space-y-1 text-[12px]">
        {/* All students */}

        <button
          type="button"
          onClick={() =>
            selectGroup({
              type: "all",
              value: "all",
            })
          }
          className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition ${
            isSelected("all", "all") ? "bg-blue-50" : "hover:bg-slate-50"
          }`}
        >
          <span className="flex items-center gap-2">
            <FolderOpen size={15} className="text-blue-600" />

            <span
              className={`font-medium ${
                isSelected("all", "all") ? "text-blue-600" : "text-slate-700"
              }`}
            >
              All Students
            </span>
          </span>

          <span className={countBadge}>{students.length}</span>
        </button>

        {/* Year groups */}

        {hierarchy.map((yearGroup) => {
          const yearKey = yearGroup.year ?? "unknown";
          const yearExpanded = expandedYears.has(yearKey);

          const yearSelected = isSelected("year", String(yearKey));

          return (
            <div
              key={String(yearKey)}
              className="ml-3 border-l border-slate-200 pl-2"
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleYear(yearKey)}
                  aria-label={
                    yearExpanded
                      ? `Collapse ${yearGroup.label}`
                      : `Expand ${yearGroup.label}`
                  }
                  className="rounded p-1 text-slate-500 hover:bg-slate-100"
                >
                  {yearExpanded ? (
                    <ChevronDown size={13} />
                  ) : (
                    <ChevronRight size={13} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectGroup({
                      type: "year",
                      value: String(yearKey),
                    })
                  }
                  className={`flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition ${
                    yearSelected ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {yearExpanded ? (
                      <FolderOpen
                        size={14}
                        className="shrink-0 text-amber-500"
                      />
                    ) : (
                      <Folder size={14} className="shrink-0 text-amber-500" />
                    )}

                    <span
                      className={`truncate ${
                        yearSelected
                          ? "font-medium text-blue-600"
                          : "text-slate-700"
                      }`}
                    >
                      {yearGroup.label}
                    </span>
                  </span>

                  <span className={countBadge}>
                    {yearGroup.students.length}
                  </span>
                </button>
              </div>

              {/* Sections */}

              {yearExpanded && (
                <div className="ml-4 space-y-1 border-l border-slate-200 pl-2">
                  {Array.from(yearGroup.sections.values()).map(
                    (sectionGroup) => {
                      const sectionKey = `${yearKey}:${sectionGroup.key}`;

                      const sectionExpanded = expandedSections.has(sectionKey);

                      const sectionSelected = isSelected("section", sectionKey);

                      return (
                        <div key={sectionKey}>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleSection(sectionKey)}
                              aria-label={
                                sectionExpanded
                                  ? `Collapse ${sectionGroup.label}`
                                  : `Expand ${sectionGroup.label}`
                              }
                              className="rounded p-1 text-slate-500 hover:bg-slate-100"
                            >
                              {sectionExpanded ? (
                                <ChevronDown size={12} />
                              ) : (
                                <ChevronRight size={12} />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                selectGroup({
                                  type: "section",
                                  value: sectionKey,
                                  year: yearKey,
                                  section: sectionGroup.key,
                                })
                              }
                              className={`flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition ${
                                sectionSelected
                                  ? "bg-blue-50"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-2">
                                <Folder
                                  size={14}
                                  className={
                                    sectionSelected
                                      ? "shrink-0 text-blue-600"
                                      : "shrink-0 text-slate-500"
                                  }
                                />

                                <span
                                  className={`truncate ${
                                    sectionSelected
                                      ? "font-medium text-blue-600"
                                      : "text-slate-700"
                                  }`}
                                >
                                  {sectionGroup.label ===
                                  "Section Not Available"
                                    ? sectionGroup.label
                                    : `Section ${sectionGroup.label}`}
                                </span>
                              </span>

                              <span
                                className={
                                  sectionSelected
                                    ? "rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-blue-600 shadow-sm"
                                    : countBadge
                                }
                              >
                                {sectionGroup.students.length}
                              </span>
                            </button>
                          </div>

                          {sectionExpanded && (
                            <div className="ml-7 border-l border-slate-200 py-1 pl-3">
                              {sectionGroup.students.map((student) => (
                                <div
                                  key={student.id}
                                  className="truncate py-1 text-[11px] text-slate-500"
                                  title={
                                    student.fullName ||
                                    student.name ||
                                    student.registerNumber ||
                                    ""
                                  }
                                >
                                  {student.fullName ||
                                    student.name ||
                                    student.registerNumber ||
                                    "Unnamed Student"}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}

        {students.length === 0 && (
          <p className="px-2 py-4 text-center text-xs text-slate-500">
            No students are assigned to this mentor.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentHierarchy;
