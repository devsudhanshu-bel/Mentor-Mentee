import React from "react";
import {
  TriangleAlert,
  CircleCheckBig,
  Clock3,
  Award,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Attendance Warning",
    description: "Computer Networks attendance is 74%.",
    icon: TriangleAlert,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 2,
    title: "Outstanding Performance",
    description: "CGPA above 8.5 maintained.",
    icon: Award,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "Assignment Due",
    description: "Mini Project report due in 3 days.",
    icon: Clock3,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "No Backlogs",
    description: "All semester courses completed.",
    icon: CircleCheckBig,
    color: "bg-green-100 text-green-600",
  },
];

const AcademicAlerts = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Academic Alerts
        </h3>

        <p className="text-[10px] text-slate-500">
          Latest academic notifications
        </p>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.id}
              className="flex items-start gap-2 rounded-lg border border-slate-100 p-2"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${alert.color}`}
              >
                <Icon size={15} />
              </div>

              <div className="min-w-0">
                <h4 className="text-[11px] font-semibold text-slate-800">
                  {alert.title}
                </h4>

                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-[11px] font-medium text-blue-600 transition hover:bg-slate-50">
        View All Alerts
      </button>
    </div>
  );
};

export default AcademicAlerts; 