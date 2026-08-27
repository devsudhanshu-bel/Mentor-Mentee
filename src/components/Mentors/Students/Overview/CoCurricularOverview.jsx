import React from "react";
import {
  Users,
  Star,
  ChevronRight,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "CodeChef Campus Chapter",
    role: "Executive Member",
    icon: Users,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 2,
    title: "NSS Volunteer",
    role: "Active Member",
    icon: Star,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const CoCurricularOverview = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Co-Curricular Activities
        </h3>

        <button className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* ================= Activities ================= */}
      <div className="flex-1 space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activity.iconBg}`}
              >
                <Icon
                  size={16}
                  className={activity.iconColor}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-[12px] font-semibold text-slate-800">
                  {activity.title}
                </h4>

                <p className="mt-1 text-[10px] text-slate-500">
                  {activity.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= Footer ================= */}
      <button className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
        View All Activities
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default CoCurricularOverview;