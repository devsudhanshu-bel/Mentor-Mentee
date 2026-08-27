import React from "react";
import {
  Download,
  FileText,
} from "lucide-react";

const responsibilities = [
  "Developing and maintaining web applications",
  "Building RESTful APIs",
  "Database design and optimization",
  "Testing and bug fixing",
];

const technologies = [
  "React",
  "Node.js",
  "PostgreSQL",
  "Docker",
];

const documents = [
  "Offer Letter",
  "Internship Agreement",
  "Weekly Report (Latest)",
];

const ResponsibilityPanel = () => {
  return (
    <div className="flex h-full flex-col">
      {/* ================= Responsibilities ================= */}

      <div>
        <h3 className="text-[11px] font-semibold text-slate-700">
          Key Responsibilities
        </h3>

        <ul className="mt-3 space-y-2">
          {responsibilities.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[10px] leading-5 text-slate-600"
            >
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= Technologies ================= */}

      <div className="mt-6">
        <h3 className="text-[11px] font-semibold text-slate-700">
          Technologies Used
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ================= Documents ================= */}

      <div className="mt-6 flex-1">
        <h3 className="text-[11px] font-semibold text-slate-700">
          Documents
        </h3>

        <div className="mt-3 space-y-3">
          {documents.map((doc) => (
            <div
              key={doc}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <FileText
                  size={13}
                  className="text-slate-500"
                />

                <span className="text-[10px] text-slate-600">
                  {doc}
                </span>
              </div>

              <button className="rounded-md p-1 transition hover:bg-blue-50">
                <Download
                  size={13}
                  className="text-blue-600"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsibilityPanel;