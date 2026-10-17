
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
    <aside className="min-h-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-3 sm:p-4">
      {/* Heading */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-800">
          Workspace
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Manage your mentorship meeting.
        </p>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Meeting workspace navigation"
        className="space-y-1.5"
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
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-3 text-left text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
              }`}
            >
              <Icon
                size={17}
                className="shrink-0"
              />

              <span className="min-w-0 break-words">
                {item.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Meeting guidance */}
      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <MessageCircle
            size={17}
            className="shrink-0 text-blue-600"
          />

          <h4 className="text-sm font-semibold text-blue-800">
            Meeting Notes
          </h4>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-600">
          Record important discussions, provide meaningful feedback,
          and schedule a follow-up when needed.
        </p>

        <p className="mt-3 border-t border-blue-100 pt-3 text-xs leading-5 text-slate-500">
          Remember to save your changes before ending the meeting.
        </p>
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
