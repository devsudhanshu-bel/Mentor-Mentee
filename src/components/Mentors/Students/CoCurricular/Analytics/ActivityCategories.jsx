import React from "react";

const categories = [
  {
    name: "Technical",
    count: 2,
    percentage: "28.6%",
    color: "#2563EB",
  },
  {
    name: "Social",
    count: 2,
    percentage: "28.6%",
    color: "#10B981",
  },
  {
    name: "Leadership",
    count: 1,
    percentage: "14.3%",
    color: "#FB923C",
  },
  {
    name: "Cultural",
    count: 1,
    percentage: "14.3%",
    color: "#8B5CF6",
  },
  {
    name: "Others",
    count: 1,
    percentage: "14.3%",
    color: "#94A3B8",
  },
];

const ActivityCategories = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <h3 className="text-[14px] font-semibold text-slate-800">
        Activity Categories
      </h3>

      {/* Content */}

      <div className="mt-5 flex items-center justify-between gap-6">
        {/* Donut */}

        <div className="relative flex items-center justify-center">
          <div
            className="h-32 w-32 rounded-full"
            style={{
              background: `
                conic-gradient(
                  #2563EB 0% 28.6%,
                  #10B981 28.6% 57.2%,
                  #FB923C 57.2% 71.5%,
                  #8B5CF6 71.5% 85.8%,
                  #94A3B8 85.8% 100%
                )
              `,
            }}
          />

          <div className="absolute h-16 w-16 rounded-full bg-white" />
        </div>

        {/* Legend */}

        <div className="flex-1 space-y-3">
          {categories.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-[11px] text-slate-600">
                  {item.name}
                </span>
              </div>

              <span className="text-[11px] font-medium text-slate-500">
                {item.count} ({item.percentage})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityCategories;