
import React, { useMemo, useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Users,
} from "lucide-react";

// ==========================================================
// YEAR LABEL HELPER
// Missing or invalid year/semester values go into "Other".
// ==========================================================

const getYearLabel = (student) => {
  const candidates = [
    student.yearsAtUniversity,
    student.year,
    student.studyYear,
  ];

  const rawYear = candidates.find((value) => {
    if (value === null || value === undefined) {
      return false;
    }

    const normalized = String(value).trim().toLowerCase();

    return (
      normalized !== "" &&
      normalized !== "null" &&
      normalized !== "undefined" &&
      normalized !== "nan"
    );
  });

  if (rawYear !== undefined) {
    const value = String(rawYear).trim();

    if (value.toLowerCase().includes("year")) {
      return value;
    }

    const match = value.match(/\d+/);

    if (match) {
      const year = Number(match[0]);

      if (year > 0) {
        return `${year}${getOrdinal(year)} Year`;
      }
    }
  }

  // Fall back to semester if year data is unavailable.
  const semesterValue = student.semester;
  const semester = Number(semesterValue);

  const validSemester =
    semesterValue !== null &&
    semesterValue !== undefined &&
    String(semesterValue).trim() !== "" &&
    String(semesterValue).trim().toLowerCase() !== "null" &&
    String(semesterValue).trim().toLowerCase() !== "undefined" &&
    Number.isFinite(semester) &&
    semester > 0;

  if (validSemester) {
    const year = Math.ceil(semester / 2);
    return `${year}${getOrdinal(year)} Year`;
  }

  // Missing year and semester: group under Other.
  return "Other";
};

const getOrdinal = (number) => {
  if (number % 100 >= 11 && number % 100 <= 13) {
    return "th";
  }

  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// ==========================================================
// STUDENT HIERARCHY
// ==========================================================

const StudentHierarchy = ({
  students = [],
  selectedGroup = null,
  onGroupSelect = () => {},
}) => {
  const [expandedYears, setExpandedYears] = useState(
    () => new Set()
  );

  // Build hierarchy from assigned students only.
  const hierarchy = useMemo(() => {
    const years = new Map();

    for (const student of students) {
      const yearLabel = getYearLabel(student);

      const rawSection = student.section;
      const normalizedSection =
        rawSection === null || rawSection === undefined
          ? ""
          : String(rawSection).trim();

      const section =
        normalizedSection &&
        normalizedSection.toLowerCase() !== "null" &&
        normalizedSection.toLowerCase() !== "undefined"
          ? normalizedSection
          : "Other";

      if (!years.has(yearLabel)) {
        years.set(yearLabel, new Map());
      }

      const sections = years.get(yearLabel);

      if (!sections.has(section)) {
        sections.set(section, []);
      }

      sections.get(section).push(student);
    }

    return [...years.entries()]
      .map(([year, sections]) => ({
        year,
        count: [...sections.values()].reduce(
          (total, group) => total + group.length,
          0
        ),
        sections: [...sections.entries()]
          .map(([section, records]) => ({
            section,
            count: records.length,
          }))
          .sort((a, b) => a.section.localeCompare(b.section)),
      }))
      .sort((a, b) => {
        // Keep Other at the bottom.
        if (a.year === "Other") return 1;
        if (b.year === "Other") return -1;

        const aNumber = Number(a.year.match(/\d+/)?.[0]);
        const bNumber = Number(b.year.match(/\d+/)?.[0]);

        if (
          Number.isFinite(aNumber) &&
          Number.isFinite(bNumber)
        ) {
          return aNumber - bNumber;
        }

        return a.year.localeCompare(b.year);
      });
  }, [students]);

  const toggleYear = (year) => {
    setExpandedYears((previous) => {
      const next = new Set(previous);

      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }

      return next;
    });
  };

  const isSelected = (type, value) =>
    selectedGroup?.type === type &&
    selectedGroup?.value === value;

  const selectGroup = (type, value) => {
    onGroupSelect(
      isSelected(type, value) ? null : { type, value }
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        Student Hierarchy
      </h3>

      <div className="space-y-1 text-[12px]">
        {/* All assigned students */}
        <button
          type="button"
          onClick={() => selectGroup("all", "all")}
          className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition ${
            !selectedGroup || selectedGroup.type === "all"
              ? "bg-blue-50 text-blue-700"
              : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          <span className="flex items-center gap-2">
            <ChevronDown
              size={14}
              className="text-slate-500"
            />

            <FolderOpen
              size={15}
              className="text-blue-600"
            />

            <span className="font-medium">
              All Assigned Students
            </span>
          </span>

          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {students.length}
          </span>
        </button>

        {/* Dynamic years */}
        {hierarchy.length === 0 ? (
          <div className="px-3 py-5 text-center text-xs text-slate-500">
            No assigned students to group.
          </div>
        ) : (
          <div className="ml-3 space-y-1 border-l border-slate-200 pl-3">
            {hierarchy.map((yearGroup) => {
              const expanded = expandedYears.has(yearGroup.year);

              const yearSelected = isSelected(
                "year",
                yearGroup.year
              );

              return (
                <div key={yearGroup.year}>
                  <div
                    className={`flex items-center gap-1 rounded-lg pr-2 transition ${
                      yearSelected
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleYear(yearGroup.year)}
                      className="rounded p-1 text-slate-500 hover:bg-slate-100"
                      aria-label={`${
                        expanded ? "Collapse" : "Expand"
                      } ${yearGroup.year}`}
                    >
                      {expanded ? (
                        <ChevronDown size={13} />
                      ) : (
                        <ChevronRight size={13} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        selectGroup("year", yearGroup.year)
                      }
                      className="flex min-w-0 flex-1 items-center justify-between gap-2 py-2 text-left"
                    >
                      {expanded ? (
                        <FolderOpen
                          size={14}
                          className="shrink-0 text-amber-500"
                        />
                      ) : (
                        <Folder
                          size={14}
                          className="shrink-0 text-amber-500"
                        />
                      )}

                      <span className="flex-1 text-slate-700">
                        {yearGroup.year}
                      </span>

                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                        {yearGroup.count}
                      </span>
                    </button>
                  </div>

                  {/* Dynamic sections */}
                  {expanded && (
                    <div className="ml-4 space-y-1 border-l border-slate-200 pl-3">
                      {yearGroup.sections.map((sectionGroup) => {
                        const sectionValue =
                          `${yearGroup.year}::${sectionGroup.section}`;

                        const sectionSelected = isSelected(
                          "section",
                          sectionValue
                        );

                        return (
                          <button
                            type="button"
                            key={sectionGroup.section}
                            onClick={() =>
                              selectGroup("section", sectionValue)
                            }
                            className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition ${
                              sectionSelected
                                ? "bg-blue-50 text-blue-600"
                                : "text-slate-700 hover:bg-slate-50"
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

                              <span className="truncate">
                                {sectionGroup.section === "Other"
                                  ? "Other"
                                  : `Section ${sectionGroup.section}`}
                              </span>
                            </span>

                            <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 shadow-sm">
                              {sectionGroup.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
        <Users size={13} />

        <span>
          Counts reflect this mentor's assigned students only.
        </span>
      </div>
    </div>
  );
};

export default StudentHierarchy;
