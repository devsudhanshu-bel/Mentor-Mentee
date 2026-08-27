import React from "react";
import {
  CircleCheck,
  TriangleAlert,
  Info,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    icon: CircleCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Great! Attendance is above 90%",
    description: "Keep it up!",
  },
  {
    id: 2,
    icon: TriangleAlert,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Operating Systems attendance is lowest",
    description: "Encourage more participation.",
  },
  {
    id: 3,
    icon: Info,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "No backlogs due to attendance",
    description: "Well done!",
  },
];

const AttendanceAlerts = () => {
  return (
    <div className="h-[380px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col">
      {/* ================= Header ================= */}

      <h2 className="mb-4 text-[13px] font-semibold text-blue-600">
        Alerts & Insights
      </h2>

      {/* ================= Alerts ================= */}

      <div className="flex flex-1 flex-col gap-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-slate-50"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${alert.iconBg}`}
              >
                <Icon
                  size={15}
                  className={alert.iconColor}
                />
              </div>

              <div>
                <h3 className="text-[11px] font-medium leading-4 text-slate-700">
                  {alert.title}
                </h3>

                <p className="mt-1 text-[10px] text-slate-500">
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceAlerts;