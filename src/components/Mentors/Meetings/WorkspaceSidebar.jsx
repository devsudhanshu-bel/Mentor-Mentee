import React from "react";
import {
  FileText,
  MessageCircle,
  Star,
  CalendarClock,
} from "lucide-react";

const workspaceTabs = [
  {
    id: "notes",
    title: "Meeting Notes",
    icon: FileText,
    description: "Record meeting notes",
  },
  {
    id: "discussion",
    title: "Discussion Points",
    icon: MessageCircle,
    description: "Manage discussion topics",
  },
  {
    id: "feedback",
    title: "Mentor Feedback",
    icon: Star,
    description: "Save mentor feedback",
  },
  {
    id: "followup",
    title: "Follow-up",
    icon: CalendarClock,
    description: "Schedule the next meeting",
  },
];

const WorkspaceSidebar = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside className="min-h-0 min-w-0 overflow-x-hidden border-b border-slate-200 bg-slate-50 p-3 sm:p-4 lg:overflow-y-auto lg:overflow-x-hidden lg:border-b-0 lg:border-r">
      {/* Heading */}
      <div className="mb-3 sm:mb-5">
        <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
          Workspace
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Manage your mentorship meeting.
        </p>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Meeting workspace navigation"
        className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:gap-2 lg:mx-0 lg:flex-col lg:space-y-1.5 lg:overflow-x-visible lg:px-0 lg:pb-0"
      >
        {workspaceTabs.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              aria-current={isActive ? "page" : undefined}
              title={item.description}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[12px] font-medium transition-all duration-200 sm:gap-2.5 sm:py-3 sm:text-[13px] lg:w-full ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
              }`}
            >
              <Icon
                size={17}
                className="shrink-0"
              />

              <span className="whitespace-nowrap lg:min-w-0 lg:whitespace-normal lg:break-words">
                {item.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Meeting guidance */}
      <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3 sm:mt-6 sm:p-4">
        <div className="flex items-center gap-2">
          <MessageCircle
            size={17}
            className="shrink-0 text-blue-600"
          />

          <h4 className="text-sm font-semibold text-blue-800">
            Meeting Notes
          </h4>
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3">
          Record important discussions, provide meaningful feedback,
          and schedule a follow-up when needed.
        </p>

        <p className="mt-2 border-t border-blue-100 pt-2 text-xs leading-5 text-slate-500 sm:mt-3 sm:pt-3">
          Remember to save your changes before ending the meeting.
        </p>
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
