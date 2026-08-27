import React from "react";
import { ArrowRight } from "lucide-react";

const applications = [
  {
    company: "Microsoft",
    role: "Software Development Intern",
    date: "15 May 2025",
    status: "In Review",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    company: "Google",
    role: "Machine Learning Intern",
    date: "10 May 2025",
    status: "Shortlisted",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    company: "Amazon",
    role: "Data Analyst Intern",
    date: "05 May 2025",
    status: "In Review",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    company: "Zomato",
    role: "Product Intern",
    date: "28 Apr 2025",
    status: "Applied",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
  },
  {
    company: "Swiggy",
    role: "Marketing Intern",
    date: "20 Apr 2025",
    status: "Applied",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png",
  },
];

const badgeColor = (status) => {
  switch (status) {
    case "Shortlisted":
      return "bg-green-100 text-green-700";

    case "In Review":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-blue-50 text-blue-600";
  }
};

const LatestApplications = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-[300px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
        <h2 className="text-[15px] font-semibold text-[#142970]">
          Latest Applications
        </h2>

        <button className="text-[13px] font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Scrollable List */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {applications.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-5 py-3 border-b border-slate-200 last:border-b-0"
          >
            {/* Left */}
            <div className="flex items-center gap-3 w-[50%]">
              <img
                src={item.logo}
                alt={item.company}
                className="w-8 h-8 object-contain flex-shrink-0"
              />

              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-slate-800 truncate">
                  {item.role}
                </h3>

                <p className="text-[12px] text-slate-500 mt-0.5">
                  {item.company}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="w-[23%]">
              <p className="text-[11px] text-slate-500">
                Applied on
              </p>

              <p className="text-[12px] font-medium text-slate-700 mt-0.5">
                {item.date}
              </p>
            </div>

            {/* Status */}
            <div className="w-[18%] flex justify-end">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${badgeColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-200">
        <button className="flex items-center gap-2 text-blue-600 text-[13px] font-medium hover:text-blue-700">
          View All Applications
          <ArrowRight size={15} />
        </button>
      </div>

      <style>{`
        div::-webkit-scrollbar{
          display:none;
        }
      `}</style>
    </div>
  );
};

export default LatestApplications;