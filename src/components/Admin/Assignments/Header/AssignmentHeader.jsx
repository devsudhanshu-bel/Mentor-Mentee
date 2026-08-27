import React from "react";
import {
  ClipboardList,
  UserRoundPlus,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const tabs = [
  {
    id: "unassigned",
    label: "Unassigned Students",
    count: 14,
    icon: UserRoundPlus,
  },
  {
    id: "all",
    label: "All Assignments",
    count: null,
    icon: ClipboardList,
  },
  {
    id: "transfer",
    label: "Transfer Requests",
    count: 2,
    icon: ArrowUpDown,
  },
];

const AssignmentHeader = ({
  activeTab,
  setActiveTab,
  search,
  setSearch,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-2">
      {/* ================= Tabs ================= */}

      <div className="flex items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex h-12 items-center gap-2 px-4 text-[13px] font-semibold transition-all ${
                active
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon size={16} />

              <span>{tab.label}</span>

              {tab.count !== null && (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  {tab.count}
                </span>
              )}

              {active && (
                <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* ================= Search ================= */}

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-9
              w-64
              rounded-lg
              border
              border-slate-200
              bg-white
              pl-9
              pr-4
              text-[13px]
              outline-none
              transition-all
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        <button
          className="
            flex
            h-9
            items-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-4
            text-[13px]
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
          "
        >
          <SlidersHorizontal size={15} />

          Filters
        </button>
      </div>
    </div>
  );
};

export default AssignmentHeader;