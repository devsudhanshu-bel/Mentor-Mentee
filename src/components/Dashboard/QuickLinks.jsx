import React from "react";
import {
  UserRound,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Users,
  CalendarDays,
  Bot,
  CircleHelp,
} from "lucide-react";

const quickLinks = [
  {
    title: "My Profile",
    icon: UserRound,
  },
  {
    title: "My Documents",
    icon: FileText,
  },
  {
    title: "Academic Records",
    icon: GraduationCap,
  },
  {
    title: "Attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Mentor Details",
    icon: Users,
  },
  {
    title: "Meeting History",
    icon: CalendarDays,
  },
  {
    title: "Career AI",
    icon: Bot,
  },
  {
    title: "Help Center",
    icon: CircleHelp,
  },
];

const QuickLinks = () => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-5
        h-full
      "
    >
      {/* Header */}
      <h2 className="text-2l font-bold text-slate-900 mb-6">
        Quick Links
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-x-5 gap-y-6">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className="
                flex
                flex-col
                items-center
                group
                transition-all
                duration-300
              "
            >
              {/* Icon Box */}
              <div
                className="
                  w-14
                  h-14
                  rounded-xl
                  border
                  border-blue-200
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  group-hover:bg-blue-600
                  group-hover:border-blue-600
                  group-hover:shadow-lg
                "
              >
                <Icon
                  size={24}
                  className="
                    text-blue-600
                    transition-colors
                    duration-300
                    group-hover:text-white
                    cursor-pointer
                  "
                />
              </div>

              {/* Label */}
              <span
                className="
                  mt-2
                  text-[10px]
                  font-medium
                  text-slate-700
                  text-center
                  leading-4
                "
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;