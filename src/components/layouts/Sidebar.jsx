import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";

import { logout } from "../../api/auth.api";

import {
  LayoutDashboard,
  User,
  GraduationCap,
  ClipboardCheck,
  Users,
  Briefcase,
  Microscope,
  Trophy,
  Star,
  Award,
  BadgeCheck,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    path: "/student/profile",
    icon: User,
  },
  {
    title: "Academics",
    path: "/student/academics",
    icon: GraduationCap,
  },
  {
    title: "Attendance",
    path: "/student/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Mentor & Meetings",
    path: "/student/mentor-meetings",
    icon: Users,
  },
  {
    title: "Internships",
    path: "/student/internships",
    icon: Briefcase,
  },
  {
    title: "Research",
    path: "/student/research",
    icon: Microscope,
  },
  {
    title: "Co-Curricular",
    path: "/student/co-curricular",
    icon: Trophy,
  },
  {
    title: "Extra Curricular",
    path: "/student/extra-curricular",
    icon: Star,
  },
  {
    title: "Awards & Achievements",
    path: "/student/awards",
    icon: Award,
  },
  {
    title: "Certificates",
    path: "/student/certificates",
    icon: BadgeCheck,
  },
  {
    title: "Documents",
    path: "/student/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    path: "/student/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[290px] bg-white border-r border-gray-200 shadow-xl flex flex-col overflow-hidden z-50">
      {/* Logo */}

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-24 px-6 flex items-center justify-center border-b border-gray-100 shrink-0">
          <img
            src={logo}
            alt="CHRIST University"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
                    {menuItems.map((item) => {
            const Icon = item.icon;

            const active = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={`
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  rounded-[18px]
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:translate-x-1
                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200"
                      : "text-gray-600 hover:bg-slate-100"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-white" />
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`
                      h-10
                      w-10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      group-hover:scale-110
                      ${
                        active
                          ? "bg-white/20"
                          : "group-hover:bg-white group-hover:shadow-md"
                      }
                    `}
                  >
                    <Icon size={19} />
                  </div>

                  <span className="text-[14px] font-medium">
                    {item.title}
                  </span>
                </div>

                <ChevronRight
                  size={16}
                  className={`
                    transition-all
                    duration-300
                    ${
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-60 group-hover:translate-x-1"
                    }
                  `}
                />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Profile */}

      <div className="border-t border-gray-100 bg-white p-3 shrink-0">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-3 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                {user?.fullName || "Loading..."}
              </h3>

              <p className="text-xs text-gray-500">
                {user?.role || ""}
              </p>
            </div>
          </div>

          <div className="my-3 h-px bg-gray-200" />

          <button
            onClick={handleLogout}
            className="w-full h-11 rounded-xl flex items-center justify-center gap-2 bg-red-50 text-red-600 text-sm font-medium transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
                <div className="mt-3 text-center">
          <p className="text-[11px] text-gray-400">
            Mentor Mentee Management System
          </p>

          <p className="text-[10px] text-gray-300 mt-1">
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;