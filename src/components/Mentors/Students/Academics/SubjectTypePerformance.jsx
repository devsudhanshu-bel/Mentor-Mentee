import React from "react";

const subjects = [
  {
    type: "Core Subjects",
    average: "8.68",
    performance: "Excellent",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    type: "Elective Subjects",
    average: "8.54",
    performance: "Excellent",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    type: "Practical / Lab",
    average: "8.92",
    performance: "Excellent",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    type: "Foundation Courses",
    average: "8.15",
    performance: "Good",
    color: "bg-blue-100 text-blue-700",
  },
  {
    type: "Skill Enhancement",
    average: "8.40",
    performance: "Good",
    color: "bg-blue-100 text-blue-700",
  },
];

const SubjectTypePerformance = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm h-[400px]">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Performance by Subject Type
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-slate-100">
        {/* Heading */}
        <div className="grid grid-cols-12 border-b border-slate-100 bg-slate-50 px-3 py-2">
          <div className="col-span-6 text-[10px] font-semibold text-slate-500">
            Subject Type
          </div>

          <div className="col-span-3 text-center text-[10px] font-semibold text-slate-500">
            Avg.
          </div>

          <div className="col-span-3 text-center text-[10px] font-semibold text-slate-500">
            Performance
          </div>
        </div>

        {/* Rows */}
        {subjects.map((item) => (
          <div
            key={item.type}
            className="grid grid-cols-12 items-center border-b border-slate-100 px-3 py-2 last:border-0"
          >
            <div className="col-span-6">
              <p className="text-[10px] font-medium text-slate-700">
                {item.type}
              </p>
            </div>

            <div className="col-span-3 text-center">
              <span className="text-[11px] font-semibold text-slate-800">
                {item.average}
              </span>
            </div>

            <div className="col-span-3 flex justify-center">
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${item.color}`}
              >
                {item.performance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectTypePerformance;