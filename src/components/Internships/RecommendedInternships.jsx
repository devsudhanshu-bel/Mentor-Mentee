import React from "react";
import { ArrowRight, Bookmark, MapPin } from "lucide-react";

const recommendations = [
  {
    company: "Samsung R&D Institute",
    role: "NLP Intern",
    location: "Bengaluru, India",
    match: "92%",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  },
  {
    company: "Tata Consultancy Services",
    role: "Data Science Intern",
    location: "Hyderabad, India",
    match: "88%",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
  },
  {
    company: "Zoho Corporation",
    role: "Web Development Intern",
    location: "Chennai, India",
    match: "85%",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/ZOHO_logo_2023.svg",
  },
];

const RecommendedInternships = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-[340px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <h2 className="text-[15px] font-semibold text-[#142970]">
          Top Recommended for You
        </h2>

        <button className="text-[13px] font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 border-b border-slate-200 last:border-b-0"
          >
            {/* Left */}
            <div className="flex items-center gap-3 flex-1">
              <img
                src={item.logo}
                alt={item.company}
                className="w-10 h-10 object-contain flex-shrink-0"
              />

              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-slate-800 truncate">
                  {item.role}
                </h3>

                <p className="text-[12px] text-slate-600 truncate">
                  {item.company}
                </p>

                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                  <MapPin size={11} />
                  {item.location}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 ml-3">
              <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-2 py-1 rounded-md whitespace-nowrap">
                Match: {item.match}
              </span>

              <Bookmark
                size={18}
                className="text-blue-600 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-200">
        <button className="flex items-center gap-2 text-[13px] font-medium text-blue-600 hover:text-blue-700">
          Explore More Opportunities
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default RecommendedInternships;