import React from "react";
import { ArrowRight, CalendarDays } from "lucide-react";

const deadlines = [
  {
    company: "Google",
    role: "Software Engineering Intern",
    deadline: "31 May 2025",
    daysLeft: 7,
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    company: "Microsoft",
    role: "Explore Microsoft Intern",
    deadline: "05 Jun 2025",
    daysLeft: 12,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    company: "Adobe",
    role: "Research Intern",
    deadline: "10 Jun 2025",
    daysLeft: 17,
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_logo.svg",
  },
  {
    company: "Flipkart",
    role: "Business Analyst Intern",
    deadline: "15 Jun 2025",
    daysLeft: 22,
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg",
  },
];

const UpcomingDeadlines = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-[300px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
        <h2 className="text-[15px] font-semibold text-[#142970]">
          Upcoming Deadlines
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
        {deadlines.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-5 py-3 border-b border-slate-200 last:border-b-0"
          >
            {/* Left */}
            <div className="flex items-center gap-3 flex-1">
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

                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                  <CalendarDays size={11} />
                  <span>Deadline:</span>
                  <span className="font-medium">{item.deadline}</span>
                </div>
              </div>
            </div>

            {/* Days Left */}
            <div className="ml-3 flex flex-col items-center justify-center bg-green-50 rounded-lg w-11 h-11 flex-shrink-0">
              <span className="text-[18px] font-bold text-green-600 leading-none">
                {item.daysLeft}
              </span>

              <span className="text-[9px] text-slate-500 leading-none mt-1">
                Days Left
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-200">
        <button className="flex items-center gap-2 text-blue-600 text-[13px] font-medium hover:text-blue-700">
          View All Opportunities
          <ArrowRight size={15} />
        </button>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default UpcomingDeadlines;