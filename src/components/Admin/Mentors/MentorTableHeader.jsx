import React from "react";
import { ArrowUpDown } from "lucide-react";

const headers = [
  "Mentor",
  "Department",
  "Designation",
  "Students Assigned",
  "Meetings",
  "Attendance",
  "Status",
  "Actions",
];

const MentorTableHeader = () => {
  return (
    <thead className="bg-slate-50 border-b border-slate-200">
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className="px-5 py-3 text-left text-[12px] font-semibold text-slate-600 whitespace-nowrap"
          >
            <div className="flex items-center gap-1">
              <span>{header}</span>

              {header !== "Actions" && (
                <ArrowUpDown
                  size={11}
                  className="text-slate-400"
                  strokeWidth={2}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default MentorTableHeader;