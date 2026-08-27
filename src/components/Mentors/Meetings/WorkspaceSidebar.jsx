import React from "react";
import { sidebarItems } from "./WorkspaceConstants";

const WorkspaceSidebar = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="border-r border-slate-200 bg-slate-50 p-4">

      {/* Heading */}

      <h3 className="mb-4 text-base font-semibold text-slate-700">
        Workspace
      </h3>

      {/* Navigation */}

      <div className="space-y-1.5">

        {sidebarItems.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-white hover:shadow-sm"
              }`}
            >

              <Icon size={17} />

              <span>{item.title}</span>

            </button>

          );

        })}

      </div>

      {/* Progress Card */}

      <div className="mt-8 rounded-xl bg-blue-50 p-4">

        <h4 className="text-[15px] font-semibold text-blue-700">
          Meeting Progress
        </h4>

        <div className="mt-4">

          <div className="mb-2 flex items-center justify-between text-[11px]">

            <span>Completion</span>

            <span>72%</span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-blue-100">

            <div className="h-full w-[72%] rounded-full bg-blue-600" />

          </div>

          <p className="mt-4 text-[12px] leading-5 text-slate-600">

            Continue documenting discussion,
            assign action items and schedule the
            follow-up meeting.

          </p>

        </div>

      </div>

    </div>
  );
};

export default WorkspaceSidebar;