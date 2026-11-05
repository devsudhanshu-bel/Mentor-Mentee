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
     <div className="hidden w-full px-5 pb-6 md:block xl:px-8 xl:pb-6">
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl">
        <div className="grid grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`flex min-w-0 flex-col items-center justify-center px-2 py-4 text-center sm:px-3 sm:py-5 xl:px-4 xl:py-5 ${
                  index !== 0 ? "border-l border-slate-200" : ""
                }`}
              >
                <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:mb-4 sm:h-12 sm:w-12">
                  <Icon size={22} className="text-blue-600 sm:h-6 sm:w-6" strokeWidth={2} />
                </div>

                <h3 className="w-full break-words text-[11px] font-bold leading-4 text-slate-900 sm:text-xs xl:text-sm">
                  {feature.title}
                </h3>

                <p className="mt-2 hidden w-full max-w-[190px] text-[10px] font-medium leading-4 text-slate-500 sm:block xl:text-[11px] xl:leading-5">
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
