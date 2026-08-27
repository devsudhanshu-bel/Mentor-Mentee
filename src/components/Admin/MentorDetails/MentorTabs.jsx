import React from "react";
import {
  House,
  Users,
  CalendarDays,
  FileText,
  FolderOpen,
} from "lucide-react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: House,
  },
  {
    id: "students",
    label: "Students",
    icon: Users,
  },
  {
    id: "meetings",
    label: "Meetings",
    icon: CalendarDays,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
  },
  {
    id: "documents",
    label: "Documents",
    icon: FolderOpen,
  },
];

const MentorTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-1 overflow-x-auto px-3 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`
                flex
                items-center
                gap-2
                whitespace-nowrap
                rounded-lg
                px-3
                py-2
                text-[12px]
                font-medium
                transition-all
                duration-200
                ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <Icon size={15} />

              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MentorTabs;