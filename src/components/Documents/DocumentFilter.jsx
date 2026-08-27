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
    <div className="relative">

      <Filter
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />

      <select
        value={value}
        onChange={handleChange}
        className="h-9 pl-9 pr-8 rounded-md border border-slate-300 bg-white text-sm text-slate-600 outline-none cursor-pointer hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none"
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

      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
        ▼
      </span>

    </div>
  );
};

export default DocumentFilter;