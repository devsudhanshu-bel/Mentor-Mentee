import React from "react";
import { ChevronDown } from "lucide-react";

// ============================================================
// GENERIC FILTER SELECT
// ============================================================

const FilterSelect = ({
  label,
  value,
  options = [],
  onChange,
  disabled = false,
  placeholder = "Select",
}) => {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label className="text-[11px] font-semibold leading-none text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className={`
            h-9
            w-full
            appearance-none
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            pr-8
            text-[12px]
            font-medium
            outline-none
            transition-all
            duration-200
            ${
              disabled
                ? "cursor-not-allowed bg-slate-50 text-slate-400"
                : "text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          `}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          strokeWidth={1.8}
          className="
            pointer-events-none
            absolute
            right-2.5
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>
    </div>
  );
};

// ============================================================
// SEMESTER → YEAR LABEL
// ============================================================

const getYearLabel = (semester) => {
  const value = Number(semester);

  if (!Number.isFinite(value)) {
    return `Semester ${semester}`;
  }

  if (value === 1 || value === 2) {
    return "1st Year";
  }

  if (value === 3 || value === 4) {
    return "2nd Year";
  }

  if (value === 5 || value === 6) {
    return "3rd Year";
  }

  if (value === 7 || value === 8) {
    return "4th Year";
  }

  return `Semester ${value}`;
};

// ============================================================
// ASSIGNMENT FILTERS
// ============================================================

const AssignmentFilters = ({ filters = {}, filterOptions = {}, onChange }) => {
  const {
    academicYears = [],
    terms = [],
    departments = [],
    years = [],
    sections = [],
  } = filterOptions;

  // ============================================================
  // ACADEMIC YEAR OPTIONS
  // ============================================================

  const academicYearOptions = academicYears.map((year) => ({
    value: year.id,
    label: year.name,
  }));

  // ============================================================
  // TERM OPTIONS
  // ============================================================

  const termOptions = terms.map((term) => ({
    value: term.id,
    label: term.name,
  }));

  // ============================================================
  // DEPARTMENT OPTIONS
  // ============================================================

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  // ============================================================
  // YEAR OPTIONS
  // ============================================================

  const yearOptions = years
    .map((semester) => ({
      value: String(semester),
      label: getYearLabel(semester),
    }))
    .filter(
      (option, index, array) =>
        array.findIndex((item) => item.label === option.label) === index,
    );

  // ============================================================
  // SECTION OPTIONS
  // ============================================================

  const sectionOptions = sections.map((section) => ({
    value: section,
    label: section,
  }));

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleAcademicYearChange = (value) => {
    const selected = academicYears.find((year) => year.id === value);

    onChange("academicYearId", value, selected);
  };

  const handleTermChange = (value) => {
    onChange("termId", value);
  };

  const handleDepartmentChange = (value) => {
    onChange("departmentId", value);
  };

  const handleYearChange = (value) => {
    onChange("semesterNumber", value);
  };

  const handleSectionChange = (value) => {
    onChange("section", value);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3.5
        py-2.5
        shadow-sm
      "
    >
      <div className="grid grid-cols-5 gap-4">
        {/* ======================================================
            1. ACADEMIC YEAR
            ====================================================== */}

        <FilterSelect
          label="Academic Year"
          value={filters.academicYearId}
          options={academicYearOptions}
          onChange={handleAcademicYearChange}
          disabled={academicYearOptions.length === 0}
          placeholder={
            academicYearOptions.length > 0
              ? "Select Academic Year"
              : "No academic years"
          }
        />

        {/* ======================================================
            2. TERM
            ====================================================== */}

        <FilterSelect
          label="Term"
          value={filters.termId}
          options={termOptions}
          onChange={handleTermChange}
          disabled={!filters.academicYearId || termOptions.length === 0}
          placeholder={
            !filters.academicYearId
              ? "Select Academic Year"
              : termOptions.length > 0
                ? "Select Term"
                : "No terms"
          }
        />

        {/* ======================================================
            3. DEPARTMENT
            ====================================================== */}

        <FilterSelect
          label="Department"
          value={filters.departmentId}
          options={departmentOptions}
          onChange={handleDepartmentChange}
          disabled={!filters.termId || departmentOptions.length === 0}
          placeholder={
            !filters.termId
              ? "Select Term"
              : departmentOptions.length > 0
                ? "Select Department"
                : "No departments"
          }
        />

        {/* ======================================================
            4. YEAR
            ====================================================== */}

        <FilterSelect
          label="Year"
          value={filters.semesterNumber}
          options={yearOptions}
          onChange={handleYearChange}
          disabled={!filters.departmentId || yearOptions.length === 0}
          placeholder={
            !filters.departmentId
              ? "Select Department"
              : yearOptions.length > 0
                ? "Select Year"
                : "No years"
          }
        />

        {/* ======================================================
            5. SECTION
            ====================================================== */}

        <FilterSelect
          label="Section"
          value={filters.section}
          options={sectionOptions}
          onChange={handleSectionChange}
          disabled={!filters.semesterNumber || sectionOptions.length === 0}
          placeholder="All Sections"
        />
      </div>
    </div>
  );
};

export default AssignmentFilters;
