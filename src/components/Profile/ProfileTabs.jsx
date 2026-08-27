import React from "react";
import {
  User,
  Users,
  Phone,
  BookOpen,
} from "lucide-react";

const tabs = [
  {
    id: "personal",
    label: "Personal Information",
    icon: User,
  },
  {
    id: "parent",
    label: "Parent / Guardian Details",
    icon: Users,
  },
  {
    id: "contact",
    label: "Contact Details",
    icon: Phone,
  },
  {
    id: "academic",
    label: "Academic Information",
    icon: BookOpen,
  },
];

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`
              h-10
              rounded-xl
              border
              flex
              items-center
              justify-center
              gap-2
              transition-all
              duration-300
              cursor-pointer

              ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 border-blue-600 text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
              }
            `}
          >
            <Icon
              size={15}
              strokeWidth={2}
            />

            <span className="text-[13px] font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;