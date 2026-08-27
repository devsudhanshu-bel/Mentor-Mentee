import React from "react";
import { ChevronDown } from "lucide-react";

const FilterSelect = ({
  label,
  value,
  options,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          defaultValue={value}
          className="
            h-12
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            pr-10
            text-sm
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
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="
            pointer-events-none
            absolute
            right-3
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
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div className="grid grid-cols-6 gap-5">
        <FilterSelect
          label="Academic Year"
          value="2024-25"
          options={[
            "2024-25",
            "2023-24",
            "2022-23",
          ]}
        />

        <FilterSelect
          label="Department"
          value="Computer Science & Engineering"
          options={[
            "Computer Science & Engineering",
            "Information Science",
            "ECE",
            "Mechanical",
          ]}
        />

        <FilterSelect
          label="Year"
          value="2nd Year"
          options={[
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
          ]}
        />

        <FilterSelect
          label="Section"
          value="All Sections"
          options={[
            "All Sections",
            "A",
            "B",
            "C",
          ]}
        />

        <FilterSelect
          label="Mentor"
          value="All Mentors"
          options={[
            "All Mentors",
            "Dr. Arjun Mehta",
            "Dr. Neha Sharma",
            "Prof. Vivek Singh",
          ]}
        />

        <FilterSelect
          label="Assignment Status"
          value="All"
          options={[
            "All",
            "Assigned",
            "Unassigned",
            "Transferred",
          ]}
        />
      </div>
    </div>
  );
};

export default AssignmentFilters;