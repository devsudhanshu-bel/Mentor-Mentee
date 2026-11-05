import React from "react";
import {
  User,
  Briefcase,
  FileText,
  Share2,
} from "lucide-react";

const tabItems = [
  {
    key: "Personal",
    label: "Personal",
    icon: User,
  },
  {
    key: "Professional",
    label: "Professional",
    icon: Briefcase,
  },
  {
    key: "About",
    label: "About",
    icon: FileText,
  },
  {
    key: "Social Links",
    label: "Social Links",
    icon: Share2,
  },
];

const EditProfileTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="border-b border-slate-200 bg-white px-3 sm:px-5 lg:px-7">
      <div className="flex gap-2 overflow-x-auto py-3 sm:py-4">
        {tabItems.map((tab) => {
          const Icon = tab.icon;

          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key)
              }
              className={`
                flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200
                sm:px-5 sm:py-3 sm:text-sm

                ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <Icon size={17} className="shrink-0" />

              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EditProfileTabs;
