
import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

/* ==========================================================
   STUDENT PROFILE TABS
========================================================== */

const StudentTabs = () => {
  const { id, mentorId, studentId } = useParams();
  const location = useLocation();

  /* ========================================================
     ROUTE CONFIGURATION
  ======================================================== */

  const isAdminRoute = location.pathname.startsWith("/admin/");

  const resolvedStudentId = isAdminRoute
    ? studentId || id
    : id;

  const basePath = isAdminRoute
    ? mentorId && studentId
      ? `/admin/mentor/${mentorId}/student/${studentId}`
      : `/admin/overview/students/${resolvedStudentId}`
    : `/mentor/students/${resolvedStudentId}`;

  /* ========================================================
     TAB CONFIGURATION
  ======================================================== */

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Academics", path: "academics" },
    { name: "Attendance", path: "attendance" },
    { name: "Internships", path: "internships" },
    { name: "Research", path: "research" },
    { name: "Co-Curricular", path: "co-curricular" },
    { name: "Extra Curricular", path: "extra-curricular" },
    { name: "Awards & Achievements", path: "awards-achievements" },
    { name: "Documents", path: "documents" },
    { name: "Certificates", path: "certificates" },
  ];

  /* ========================================================
     ROUTE MATCHING
  ======================================================== */

  const normalizePath = (path) =>
    path.replace(/\/+$/, "") || "/";

  const currentPath = normalizePath(location.pathname);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <nav
        aria-label="Student profile sections"
        className="flex min-w-max items-center px-5"
      >
        {tabs.map((tab) => {
          const targetPath = `${basePath}/${tab.path}`;
          const normalizedTarget = normalizePath(targetPath);

          const isActive =
            currentPath === normalizedTarget ||
            currentPath.startsWith(`${normalizedTarget}/`);

          return (
            <NavLink
              key={tab.path}
              to={targetPath}
              end
              aria-current={isActive ? "page" : undefined}
              className={() =>
                [
                  "relative whitespace-nowrap border-b-2 px-5 py-4",
                  "text-[13px] font-medium transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-inset focus-visible:ring-blue-500",
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:text-blue-600",
                ].join(" ")
              }
            >
              {tab.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default StudentTabs;
