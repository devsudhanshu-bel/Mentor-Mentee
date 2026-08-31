import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FilterSelect = ({ label, value, options, onChange }) => {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label className="text-[11px] font-semibold leading-none text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
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
            text-slate-700
            outline-none
            transition-all
            duration-200
            hover:border-blue-300
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
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

const AssignmentFilters = () => {
  const [filters, setFilters] = useState({
    academicYear: "2026-27",
    term: "Odd Semester 2026",
    department: "Computer Science & Engg.",
    year: "3rd Year",
    section: "All Sections",
    view: "assign",
  });

  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

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
      <div className="grid grid-cols-6 gap-4">
        {/* ================= Academic Year ================= */}

        <FilterSelect
          label="Academic Year"
          value={filters.academicYear}
          onChange={(value) =>
            updateFilter("academicYear", value)
          }
          options={[
            "2026-27",
            "2025-26",
            "2024-25",
            "2023-24",
          ]}
        />

        {/* ================= Term ================= */}

        <FilterSelect
          label="Term"
          value={filters.term}
          onChange={(value) =>
            updateFilter("term", value)
          }
          options={[
            "Odd Semester 2026",
            "Even Semester 2026",
            "Odd Semester 2025",
            "Even Semester 2025",
          ]}
        />

        {/* ================= Department ================= */}

        <FilterSelect
          label="Department"
          value={filters.department}
          onChange={(value) =>
            updateFilter("department", value)
          }
          options={[
            "Computer Science & Engg.",
            "Information Science",
            "Electronics & Communication",
            "Mechanical Engineering",
          ]}
        />

        {/* ================= Year ================= */}

        <FilterSelect
          label="Year"
          value={filters.year}
          onChange={(value) =>
            updateFilter("year", value)
          }
          options={[
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
          ]}
        />

        {/* ================= Section ================= */}

        <FilterSelect
          label="Section"
          value={filters.section}
          onChange={(value) =>
            updateFilter("section", value)
          }
          options={[
            "All Sections",
            "A",
            "B",
            "C",
            "D",
          ]}
        />

        {/* ================= View ================= */}

        <div className="flex min-w-0 flex-col gap-1.5">
          <label className="text-[11px] font-semibold leading-none text-slate-700">
            View
          </label>

          <div
            className="
              flex
              h-9
              w-full
              overflow-hidden
              rounded-lg
              border
              border-slate-200
              bg-white
            "
          >
            <button
              type="button"
              onClick={() => updateFilter("view", "assign")}
              className={`
                flex-1
                text-[12px]
                font-medium
                transition-all
                duration-200
                ${
                  filters.view === "assign"
                    ? `
                      border
                      border-blue-500
                      bg-white
                      text-blue-600
                    `
                    : `
                      border-transparent
                      text-slate-600
                      hover:bg-slate-50
                    `
                }
              `}
            >
              Assign
            </button>

            <button
              type="button"
              onClick={() => updateFilter("view", "review")}
              className={`
                flex-1
                text-[12px]
                font-medium
                transition-all
                duration-200
                ${
                  filters.view === "review"
                    ? `
                      border
                      border-blue-500
                      bg-white
                      text-blue-600
                    `
                    : `
                      border-transparent
                      text-slate-600
                      hover:bg-slate-50
                    `
                }
              `}
            >
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentFilters;