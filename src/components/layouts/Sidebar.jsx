import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import studentProjectsApi from "../../api/studentProjects.api";

import {
  LayoutDashboard,
  User,
  GraduationCap,
  ClipboardCheck,
  Users,
  Briefcase,
  FolderKanban,
  Microscope,
  Trophy,
  Star,
  Award,
  BadgeCheck,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";

// ==========================================================
// STUDENT NAVIGATION
// ==========================================================

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
    title: "Projects",
    path: "/student/projects",
    icon: FolderKanban,
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
];

// ==========================================================
// HELPERS
// ==========================================================

const formatRole = (role) => {
  if (!role || typeof role !== "string") {
    return "";
  }

  return role
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

// ==========================================================
// SIDEBAR
// ==========================================================

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [unreadProjects, setUnreadProjects] = useState(0);

  // ========================================================
  // LOAD LOGGED-IN USER
  // ========================================================

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");

        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Failed to load sidebar user:", error);
        setUser(null);
      }
    };

    loadUser();

    // Keep the sidebar synchronized when another tab updates the user.
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // Refresh the unread-project badge periodically. Newly assigned projects
  // remain unread until the student opens the Projects page.
  useEffect(() => {
    let active = true;
    const refreshUnreadProjects = async () => {
      try {
        const count = await studentProjectsApi.getUnreadCount();
        if (active) setUnreadProjects(count);
      } catch (error) {
        // Keep the sidebar usable if the badge endpoint is temporarily unavailable.
        if (active) console.warn("Could not refresh unread project count:", error);
      }
    };

    refreshUnreadProjects();
    const intervalId = window.setInterval(refreshUnreadProjects, 30000);
    const onFocus = () => refreshUnreadProjects();
    const onProjectsRead = () => refreshUnreadProjects();
    window.addEventListener("focus", onFocus);
    window.addEventListener("student-projects-read", onProjectsRead);
    return () => {
      active = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("student-projects-read", onProjectsRead);
    };
  }, [location.pathname]);

  // ========================================================
  // LOGOUT — SAME LOGIC AS MENTOR SIDEBAR
  // ========================================================

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");

    navigate("/login", {
      replace: true,
    });
  };

  // ========================================================
  // USER DISPLAY
  // ========================================================

  const fullName =
    user?.fullName ||
    user?.student?.fullName ||
    user?.profile?.fullName ||
    "Student";

  const role = formatRole(user?.role);

  const initial = fullName.trim().charAt(0).toUpperCase() || "S";

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-50 flex w-[290px] flex-col overflow-hidden border-r border-gray-200 bg-white shadow-xl">
      {/* LOGO */}

      <div className="flex h-24 shrink-0 items-center justify-center border-b border-gray-100 px-6">
        <img
          src={logo}
          alt="CHRIST University"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* NAVIGATION */}

      <nav className="scrollbar-thin flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={`
                group relative flex items-center justify-between
                rounded-[18px] px-4 py-3
                transition-all duration-300 hover:translate-x-1
                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200"
                    : "text-gray-600 hover:bg-slate-100"
                }
              `}
            >
              {active && (
                <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white" />
              )}

              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    transition-all duration-300 group-hover:scale-110
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
                {item.path === "/student/projects" && unreadProjects > 0 && (
                  <span
                    aria-label={`${unreadProjects} unread project assignments`}
                    title={`${unreadProjects} new project${unreadProjects === 1 ? "" : "s"}`}
                    className={`ml-auto inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold ${active ? "bg-white text-indigo-700" : "bg-red-500 text-white"}`}
                  >
                    {unreadProjects > 99 ? "99+" : unreadProjects}
                  </span>
                )}
              </div>

              <ChevronRight
                size={16}
                className={`
                  transition-all duration-300
                  ${
                    active
                      ? "opacity-100"
                      : "translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-60"
                  }
                `}
              />
            </NavLink>
          );
        })}
      </nav>

      {/* USER PROFILE & LOGOUT */}

      <div className="shrink-0 border-t border-gray-100 bg-white p-3">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-3 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            {/* USER INITIAL */}

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-lg font-semibold text-white shadow-md">
              {initial}
            </div>

            {/* USER INFORMATION */}

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {fullName}
              </h3>

              <p className="mt-0.5 text-xs font-medium text-gray-500">
                {role}
              </p>
            </div>
          </div>

          <div className="my-3 h-px bg-gray-200" />

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-50 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        {/* FOOTER */}

        <div className="mt-3 text-center">
          <p className="text-[11px] text-gray-400">
            Mentor Mentee Management System
          </p>

          <p className="mt-1 text-[10px] text-gray-300">
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;