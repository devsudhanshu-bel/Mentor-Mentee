import React from "react";
import { Users, CalendarDays } from "lucide-react";

// ==========================================================
// TAB CONFIGURATION
// ==========================================================

const tabs = [
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
];

// ==========================================================
// MENTOR TABS
// ==========================================================

const MentorTabs = ({ activeTab, setActiveTab }) => {
  const currentTab = tabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : "students";

  const handleTabChange = (tabId) => {
    if (
      tabs.some((tab) => tab.id === tabId) &&
      typeof setActiveTab === "function"
    ) {
      setActiveTab(tabId);
    }
  };

  const handleKeyDown = (event, currentIndex) => {
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (currentIndex - 1 + tabs.length) % tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    const nextTab = tabs[nextIndex];

    handleTabChange(nextTab.id);

    document
      .getElementById(`mentor-tab-${nextTab.id}`)
      ?.focus();
  };

  return (
    <nav
      aria-label="Mentor details sections"
      className="rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        role="tablist"
        aria-label="Mentor information"
        className="flex items-center gap-1 overflow-x-auto p-2"
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const active = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`mentor-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`mentor-panel-${tab.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => handleTabChange(tab.id)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
              className={`
                inline-flex shrink-0 items-center justify-center
                gap-2 rounded-xl px-4 py-2.5
                text-sm font-medium
                transition-all duration-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500
                focus-visible:ring-offset-2
                ${
                  active
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              <Icon
                size={17}
                strokeWidth={active ? 2.2 : 1.8}
                aria-hidden="true"
              />

              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MentorTabs;