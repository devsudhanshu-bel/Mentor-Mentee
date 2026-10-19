import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

const AdminStudentTabs = () => {
  const { mentorId, studentId, id } = useParams();
  const location = useLocation();
  const currentStudentId = studentId || id;
  const isDirectAdminRoute = location.pathname.startsWith("/admin/overview/students/");
  const basePath = isDirectAdminRoute
    ? `/admin/overview/students/${currentStudentId}`
    : `/admin/mentor/${mentorId}/student/${currentStudentId}`;

  const tabs = [
    { name: "Overview", path: "" },
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

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex min-w-max items-center px-5">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={
              isDirectAdminRoute
                ? tab.path
                  ? `${basePath}/${tab.path}`
                  : basePath
                : tab.path
                  ? `${basePath}/${tab.path}`
                  : `${basePath}/overview`
            }
            end
            className={({ isActive }) =>
              `border-b-2 px-5 py-4 text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-blue-600"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminStudentTabs;
