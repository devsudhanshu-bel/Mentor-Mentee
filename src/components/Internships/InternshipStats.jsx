import React from "react";

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Flag,
} from "lucide-react";

// ==========================================================
// STATS
// ==========================================================
//
// These values are temporary frontend values.
//
// Once the internship backend is completed,
// these will be fetched dynamically from the API.
//
// ==========================================================

const stats = [
  {
    title: "Total Internships",
    value: 3,
    subtitle: "All internship records",
    icon: BriefcaseBusiness,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },

  {
    title: "Ongoing Internship",
    value: 2,
    subtitle: "Currently pursuing",
    icon: Building2,
    bg: "bg-green-50",
    color: "text-green-600",
  },

  {
    title: "Completed Internships",
    value: 3,
    subtitle: "Successfully completed",
    icon: CheckCircle2,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },

  {
    title: "Pending Verification",
    value: 1,
    subtitle: "Awaiting mentor review",
    icon: Clock3,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },

  {
    title: "Completion Requests",
    value: 0,
    subtitle: "Awaiting completion approval",
    icon: Flag,
    bg: "bg-red-50",
    color: "text-red-500",
  },
];

// ==========================================================
// COMPONENT
// ==========================================================

const InternshipStats = () => {
  return (
    <div className="space-y-4">

      {/* ====================================================
          PAGE HEADING
      ==================================================== */}

      <div>

        <h1 className="text-[22px] font-bold text-[#142970]">
          Internships
        </h1>

        <p className="text-[13px] text-slate-500 mt-1">
          Manage your internship experience and track your
          internship journey.
        </p>

      </div>

      {/* ====================================================
          STAT CARDS
      ==================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                px-4
                py-4
                flex
                items-center
                gap-3
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
              "
            >

              {/* ==================================================
                  ICON
              ================================================== */}

              <div
                className={`
                  w-11
                  h-11
                  rounded-full
                  ${item.bg}
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                `}
              >

                <Icon
                  className={`
                    w-5
                    h-5
                    ${item.color}
                  `}
                />

              </div>

              {/* ==================================================
                  CONTENT
              ================================================== */}

              <div className="min-w-0 leading-tight">

                <p className="text-[12px] font-medium text-slate-500 truncate">
                  {item.title}
                </p>

                <h2 className="text-[24px] font-bold text-[#142970] mt-1">
                  {item.value}
                </h2>

                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {item.subtitle}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default InternshipStats;