import React from "react";
import { NavLink, useParams } from "react-router-dom";

const AdminStudentTabs = () => {
  const { mentorId, studentId } = useParams();

  const basePath = `/admin/mentor/${mentorId}/student/${studentId}`;

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Academics", path: "academics" },
    { name: "Attendance", path: "attendance" },
    { name: "Internships", path: "internships" },
    { name: "Research", path: "research" },
    { name: "Co-Curricular", path: "co-curricular" },
    { name: "Documents", path: "documents" },
    { name: "Certificates", path: "certificates" },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex min-w-max items-center px-5">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={`${basePath}/${tab.path}`}
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