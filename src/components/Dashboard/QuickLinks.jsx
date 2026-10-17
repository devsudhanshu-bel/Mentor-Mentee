import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  FileText,
  GraduationCap,
  ClipboardCheck,
  CalendarDays,
  BriefcaseBusiness,
  FlaskConical,
  Trophy,
} from "lucide-react";

const quickLinks = [
  {
    title: "My Profile",
    icon: UserRound,
    path: "/student/profile",
  },
  {
    title: "My Documents",
    icon: FileText,
    path: "/student/documents",
  },
  {
    title: "Academic Records",
    icon: GraduationCap,
    path: "/student/academics",
  },
  {
    title: "Attendance",
    icon: ClipboardCheck,
    path: "/student/attendance",
  },
  {
    title: "Meetings",
    icon: CalendarDays,
    path: "/student/mentor-meetings",
  },
  {
    title: "Internships",
    icon: BriefcaseBusiness,
    path: "/student/internships",
  },
  {
    title: "Research",
    icon: FlaskConical,
    path: "/student/research",
  },
  {
    title: "Co-Curricular",
    icon: Trophy,
    path: "/student/co-curricular",
  },
];

const QuickLinks = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Quick Links
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Quickly access your student portal pages
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
        {quickLinks.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => navigate(item.path)}
              aria-label={`Open ${item.title}`}
              className="flex flex-col items-center justify-start group transition-all duration-300 rounded-xl p-2 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:shadow-lg group-hover:-translate-y-0.5">
                <Icon
                  size={24}
                  strokeWidth={1.8}
                  className="text-blue-600 transition-colors duration-300 group-hover:text-white"
                />
              </div>

              {/* Label */}
              <span className="mt-2 text-xs font-medium text-slate-700 text-center leading-4 group-hover:text-blue-700">
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