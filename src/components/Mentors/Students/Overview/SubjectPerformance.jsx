import React from "react";

const subjects = [
  {
    subject: "Data Structures",
    grade: "A+",
    score: "9.2",
  },
  {
    subject: "Database Management Systems",
    grade: "A",
    score: "8.6",
  },
  {
    subject: "Discrete Mathematics",
    grade: "A+",
    score: "9.1",
  },
  {
    subject: "Object Oriented Programming",
    grade: "A",
    score: "8.4",
  },
  {
    subject: "Computer Networks",
    grade: "B+",
    score: "7.8",
  },
];

const SubjectPerformance = () => {
  return (
    <div className="col-span-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm h-[258px]">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Subject Performance
        </h3>

        <button className="text-[11px] font-medium text-blue-600 hover:text-blue-700">
          View Details
        </button>
      </div>

      <div className="space-y-3">
        {subjects.map((item) => (
          <div
            key={item.subject}
            className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-slate-700">
                {item.subject}
              </p>
            </div>

            <div className="ml-3 flex items-center gap-6">
              <span
                className={`text-[11px] font-semibold ${
                  item.grade === "A+"
                    ? "text-blue-600"
                    : item.grade === "A"
                    ? "text-slate-700"
                    : "text-amber-600"
                }`}
              >
                {item.grade}
              </span>

              <span className="w-6 text-right text-[11px] font-medium text-slate-500">
                {item.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPerformance;