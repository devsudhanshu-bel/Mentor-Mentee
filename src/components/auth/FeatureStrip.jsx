import React from "react";
import {
  Users,
  CalendarDays,
  FileText,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Strong Mentorship",
    description: "Build lasting mentor-mentee relationships",
  },
  {
    icon: CalendarDays,
    title: "Track Progress",
    description: "Monitor meetings, tasks and goals",
  },
  {
    icon: FileText,
    title: "Share & Collaborate",
    description: "Exchange ideas and resources",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Achieve Goals",
    description: "Stay motivated and achieve together",
  },
];

const FeatureStrip = () => {
  return (
    <div className="w-full px-8 pb-6">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl">
        <div className="grid grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`flex flex-col items-center px-5 py-6 text-center ${
                  index !== features.length - 1
                    ? "border-r border-slate-200"
                    : ""
                }`}
              >
                {/* Icon */}

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Icon
                    size={24}
                    className="text-blue-600"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}

                <h3 className="text-[15px] font-bold leading-6 text-slate-800">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="mt-2 text-[13px] leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureStrip;