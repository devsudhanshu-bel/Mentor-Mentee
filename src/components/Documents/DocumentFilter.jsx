import React from "react";
import { Filter } from "lucide-react";

const DocumentFilter = ({
  value = "ALL",
  onChange,
}) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="relative w-full min-w-0 sm:w-auto sm:min-w-[180px]">

      {/* FILTER ICON */}

      <Filter
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      {/* CATEGORY SELECT */}

      <select
        value={value}
        onChange={handleChange}
        className="h-10 w-full appearance-none rounded-md border border-slate-300 bg-white pl-9 pr-9 text-xs text-slate-600 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer sm:h-9 sm:text-sm"
      >
        <option value="ALL">
          All Categories
        </option>

        <option value="ACADEMICS">
          Academics
        </option>

        <option value="CERTIFICATES">
          Certificates
        </option>

        <option value="INTERNSHIPS">
          Internships
        </option>

        <option value="PROJECTS">
          Projects
        </option>

        <option value="RESEARCH">
          Research
        </option>

        <option value="CO_CURRICULAR">
          Co-Curricular
        </option>

        <option value="EXTRA_CURRICULAR">
          Extra-Curricular
        </option>

        <option value="AWARDS">
          Awards
        </option>

        <option value="PERSONAL">
          Personal
        </option>

        <option value="OTHER">
          Other
        </option>
      </select>

      {/* DROPDOWN ARROW */}

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
        ▼
      </span>

    </div>
  );
};

export default DocumentFilter;
