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
    <div className="border-b border-slate-200 bg-white px-7">
      <div className="flex gap-2 py-4">
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
                flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200

                ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <Icon size={17} />

              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EditProfileTabs;