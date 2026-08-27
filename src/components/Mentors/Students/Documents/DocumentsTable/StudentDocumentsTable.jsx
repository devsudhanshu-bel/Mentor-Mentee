import React from "react";
import { Search, Filter } from "lucide-react";

import DocumentRow from "./DocumentRow";

const documents = [
  {
    id: 1,
    name: "Semester 5 Marks Card",
    description: "Official University Marks Statement",
    category: "Academics",
    type: "PDF",
    uploadedOn: "12 Mar 2025",
    size: "1.8 MB",
  },
  {
    id: 2,
    name: "Internship Completion Certificate",
    description: "ABC Technologies Pvt. Ltd.",
    category: "Internships",
    type: "PDF",
    uploadedOn: "02 Mar 2025",
    size: "2.3 MB",
  },
  {
    id: 3,
    name: "Research Paper",
    description: "IEEE Conference Publication",
    category: "Research",
    type: "PDF",
    uploadedOn: "18 Feb 2025",
    size: "3.7 MB",
  },
  {
    id: 4,
    name: "Hackathon Certificate",
    description: "National Level Hackathon",
    category: "Certificates",
    type: "PNG",
    uploadedOn: "30 Jan 2025",
    size: "950 KB",
  },
  {
    id: 5,
    name: "Resume",
    description: "Latest Placement Resume",
    category: "Personal",
    type: "DOCX",
    uploadedOn: "10 Jan 2025",
    size: "420 KB",
  },
  {
    id: 6,
    name: "Project Report",
    description: "Final Year Capstone Project",
    category: "Projects",
    type: "PDF",
    uploadedOn: "05 Jan 2025",
    size: "5.4 MB",
  },
];

const StudentDocumentsTable = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800">
            Student Documents
          </h2>

          <p className="mt-1 text-[11px] text-slate-500">
            View all uploaded student documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50">
            <Search size={14} />
            Search
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50">
            <Filter size={14} />
            Filter
          </button>
        </div>
      </div>

      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Document
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Uploaded
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Size
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => (
              <DocumentRow
                key={document.id}
                document={document}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
        <p className="text-[11px] text-slate-500">
          Showing {documents.length} documents
        </p>

        <button className="rounded-lg bg-blue-600 px-3 py-2 text-[11px] font-medium text-white transition hover:bg-blue-700">
          View All Documents
        </button>
      </div>
    </div>
  );
};

export default StudentDocumentsTable;