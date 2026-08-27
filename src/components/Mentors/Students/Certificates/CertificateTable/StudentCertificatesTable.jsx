import React from "react";
import {
  Search,
  Filter,
} from "lucide-react";

import CertificateRow from "./CertificateRow";

const certificates = [
  {
    id: 1,
    image: "certificate1",
    name: "Python for Data Science",
    description: "Professional certification in Python and Data Science",
    category: "Data Science",
    issuedBy: "Coursera",
    issuedOn: "12 Mar 2025",
    status: "Verified",
  },
  {
    id: 2,
    image: "certificate2",
    name: "AWS Cloud Practitioner",
    description: "Cloud fundamentals certification",
    category: "Cloud Computing",
    issuedBy: "Amazon Web Services",
    issuedOn: "28 Feb 2025",
    status: "Verified",
  },
  {
    id: 3,
    image: "certificate3",
    name: "Machine Learning Foundations",
    description: "Introduction to Machine Learning",
    category: "Machine Learning",
    issuedBy: "Google",
    issuedOn: "15 Feb 2025",
    status: "Pending",
  },
  {
    id: 4,
    image: "certificate4",
    name: "Competitive Programming",
    description: "Problem Solving & Algorithms",
    category: "Programming",
    issuedBy: "CodeChef",
    issuedOn: "04 Jan 2025",
    status: "Verified",
  },
  {
    id: 5,
    image: "certificate5",
    name: "Computer Networks",
    description: "Networking fundamentals certification",
    category: "Computer Science",
    issuedBy: "Cisco",
    issuedOn: "18 Dec 2024",
    status: "Verified",
  },
];

const StudentCertificatesTable = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800">
            Student Certificates
          </h2>

          <p className="mt-1 text-[11px] text-slate-500">
            View all certificates uploaded by the student.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50">
            <Search size={14} />
            Search
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50">
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
              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Certificate
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Issued By
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-right text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((certificate) => (
              <CertificateRow
                key={certificate.id}
                certificate={certificate}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
        <p className="text-[10px] text-slate-500">
          Showing {certificates.length} certificates
        </p>

        <button className="rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-medium text-white transition hover:bg-blue-700">
          View All Certificates
        </button>
      </div>
    </div>
  );
};

export default StudentCertificatesTable;