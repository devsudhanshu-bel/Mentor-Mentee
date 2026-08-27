import React from "react";
import {
  CalendarRange,
  UserRound,
  MapPinned,
  CircleCheck,
  Star,
} from "lucide-react";

const details = [
  {
    icon: CalendarRange,
    label: "Internship Type",
    value: "Full-time",
  },
  {
    icon: UserRound,
    label: "Student Role",
    value: "Software Developer Intern",
  },
  {
    icon: MapPinned,
    label: "Company Mentor",
    value: "Ms. Priya Nair",
    subValue: "Senior Developer",
  },
];

const InternshipInfoGrid = () => {
  return (
    <div className="flex h-full flex-col">
      {/* ================= Basic Details ================= */}

      <div className="space-y-5">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-start gap-3"
            >
              <div className="mt-0.5">
                <Icon
                  size={14}
                  className="text-slate-500"
                />
              </div>

              <div className="flex-1">
                <p className="text-[10px] text-slate-500">
                  {item.label}
                </p>

                <p className="mt-1 text-[11px] font-medium text-slate-700">
                  {item.value}
                </p>

                {item.subValue && (
                  <p className="text-[10px] text-slate-500">
                    {item.subValue}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= Weekly Progress ================= */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3">
          <CircleCheck
            size={14}
            className="text-slate-500"
          />

          <div>
            <p className="text-[10px] text-slate-500">
              Weekly Progress
            </p>

            <p className="mt-1 text-[11px] font-medium text-green-600">
              Good
            </p>
          </div>
        </div>
      </div>

      {/* ================= Rating ================= */}

      <div className="mt-5 flex items-start justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3">
          <Star
            size={14}
            className="text-slate-500"
          />

          <div>
            <p className="text-[10px] text-slate-500">
              Performance Rating
            </p>

            <div className="mt-1 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={`${
                    star <= 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-yellow-200 text-yellow-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-700">
          4.5 / 5
        </span>
      </div>
    </div>
  );
};

export default InternshipInfoGrid;