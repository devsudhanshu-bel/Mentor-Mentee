import React from "react";
import { UserRound, UsersRound, Phone } from "lucide-react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      icon: UserRound,
    },
    {
      id: "parent",
      label: "Parent / Guardian Details",
      icon: UsersRound,
    },
    {
      id: "contact",
      label: "Contact Details",
      icon: Phone,
    },
  ];

  return (
    <div className="grid w-full grid-cols-3 gap-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              px-4
              py-3
              text-[13px]
              font-medium
              transition-all
              duration-200
              ${
                isActive
                  ? "border-blue-500 bg-blue-600 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
          >
            <Icon size={17} strokeWidth={2} />

            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
