
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
    <div className="
      w-full
      px-4 pb-5
      sm:px-6 sm:pb-7
      xl:px-8 xl:pb-8
    ">

      <div className="
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-xl
        sm:rounded-[24px]
      ">

        <div className="grid grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`
                  flex flex-col
                  items-center justify-center
                  text-center

                  px-4 py-8
                  sm:px-5 sm:py-9
                  xl:px-5 xl:py-10
                  2xl:px-6 2xl:py-11

                  ${
                    index % 2 === 0
                      ? "border-r border-slate-200"
                      : ""
                  }

                  ${
                    index < 2
                      ? "border-b border-slate-200 xl:border-b-0"
                      : ""
                  }

                  ${
                    index === 1
                      ? "xl:border-r xl:border-slate-200"
                      : ""
                  }
                `}
              >

                {/* ICON */}

                <div className="
                  mb-5
                  flex h-16 w-16
                  shrink-0 items-center justify-center
                  rounded-full bg-blue-50

                  sm:h-[72px] sm:w-[72px]

                  xl:mb-6
                  xl:h-20 xl:w-20
                ">

                  <Icon
                    size={36}
                    className="text-blue-600"
                    strokeWidth={2}
                  />

                </div>

                {/* TITLE */}

                <h3 className="
                  w-full
                  text-[20px]
                  font-bold
                  leading-snug
                  text-slate-900

                  sm:text-[22px]

                  xl:text-[22px]
                  2xl:text-2xl
                ">

                  {feature.title}

                </h3>

                {/* DESCRIPTION */}

                <p className="
                  mt-3
                  w-full max-w-[260px]
                  text-[14px]
                  font-medium
                  leading-6
                  text-slate-600

                  sm:text-[15px]
                  sm:leading-7

                  xl:mt-4
                  xl:text-base
                  xl:leading-7

                  2xl:text-[17px]
                  2xl:leading-8
                ">

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
