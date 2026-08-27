import React from "react";
import { Plus } from "lucide-react";

import CertificateFilter from "./CertificateFilter";
import CertificateCard from "./CertificateCard";

import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";
import certificate3 from "../../assets/certificate3.jpg";
import certificate4 from "../../assets/certificate4.jpg";
import certificate5 from "../../assets/certificate5.png";

const certificates = [
  {
    id: 1,
    image: certificate1,
    title: "Google Data Analytics Professional Certificate",
    category: "Data Science",
    issuer: "Issued by Google via Coursera",
    status: "Verified",
    date: "15 Apr 2024",
  },
  {
    id: 2,
    image: certificate2,
    title: "IBM Machine Learning with Python",
    category: "Machine Learning",
    issuer: "Issued by IBM via Coursera",
    status: "Verified",
    date: "22 Mar 2024",
  },
  {
    id: 3,
    image: certificate3,
    title: "Microsoft Azure Fundamentals (AZ-900)",
    category: "Cloud Computing",
    issuer: "Issued by Microsoft via Microsoft Learn",
    status: "Pending",
    date: "10 Feb 2024",
  },
  {
    id: 4,
    image: certificate4,
    title: "Python Programming",
    category: "Programming",
    issuer: "Issued by Infosys Springboard",
    status: "Verified",
    date: "05 Jan 2024",
  },
  {
    id: 5,
    image: certificate5,
    title: "Introduction to Operating Systems",
    category: "Computer Science",
    issuer: "Issued by NPTEL (IIT Kharagpur)",
    status: "Verified",
    date: "18 Dec 2023",
  },
];

const CertificateList = ({ onUploadClick }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-lg font-semibold">
          Your Certificates
        </h2>

        <div className="flex items-center gap-2">

          <CertificateFilter />

          <button
            onClick={onUploadClick}
            className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-2 transition"
          >
            <Plus size={15} />
            Upload Certificate
          </button>

        </div>

      </div>

      <div className="space-y-2.5">

        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
          />
        ))}

      </div>

      <div className="flex justify-center mt-5">

        <button className="w-72 h-10 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold">
          View All Certificates
        </button>

      </div>

    </div>
  );
};

export default CertificateList;