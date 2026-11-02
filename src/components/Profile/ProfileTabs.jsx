import React from "react";
import { UserRound, UsersRound, Phone } from "lucide-react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      shortLabel: "Personal",
      icon: UserRound,
    },
    {
      id: "parent",
      label: "Parent / Guardian Details",
      shortLabel: "Parent / Guardian",
      icon: UsersRound,
    },
    {
      id: "contact",
      label: "Contact Details",
      shortLabel: "Contact",
      icon: Phone,
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <div
        className="
          flex w-full gap-2 overflow-x-auto
          scrollbar-hide
          sm:grid sm:grid-cols-3
        "
        role="tablist"
        aria-label="Profile sections"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`profile-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`profile-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group relative flex shrink-0 items-center justify-center
                gap-2.5 rounded-xl border px-4 py-3
                text-sm font-semibold
                transition-all duration-200 ease-out
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-blue-500
                focus-visible:ring-offset-2

                sm:w-full sm:px-3 sm:py-3.5

                ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "border-transparent bg-slate-50 text-slate-600 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700"
                }
              `}
            >
              <Icon
                size={18}
                strokeWidth={2}
                className={`
                  shrink-0 transition-transform duration-200
                  ${isActive ? "scale-105" : "group-hover:scale-105"}
                `}
              />

              <span className="whitespace-nowrap">
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </span>

              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-white/70 sm:hidden" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;