import React from "react";
import {
  ClipboardList,
  UserRoundPlus,
  ArrowUpDown,
  History,
  Search,
  SlidersHorizontal,
  CalendarPlus,
} from "lucide-react";

const tabs = [
  {
    id: "unassigned",
    label: "Unassigned Students",
    count: 32,
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
    count: 3,
    icon: ArrowUpDown,
  },
  {
    id: "history",
    label: "Assignment History",
    count: null,
    icon: History,
  },
];

const AssignmentHeader = ({
  activeTab,
  setActiveTab,
  search,
  setSearch,
  onFiltersClick,
  onBulkAssign,
}) => {
  return (
    <div className="flex min-h-[58px] items-center justify-between border-b border-slate-200 px-4">
      {/* ================= Tabs ================= */}

      <div className="flex h-full items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative
                flex
                h-full
                items-center
                gap-2
                px-3
                text-[12px]
                font-semibold
                transition-all
                duration-200
                ${
                  active
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }
              `}
            >
              <Icon
                size={15}
                strokeWidth={1.8}
              />

              <span className="whitespace-nowrap">
                {tab.label}
              </span>

              {tab.count !== null && (
                <span
                  className={`
                    rounded-md
                    px-1.5
                    py-0.5
                    text-[9px]
                    font-bold
                    ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {tab.count}
                </span>
              )}

              {active && (
                <div
                  className="
                    absolute
                    bottom-0
                    left-2
                    right-2
                    h-[2px]
                    rounded-full
                    bg-blue-600
                  "
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ================= Actions ================= */}

      <div className="flex items-center gap-2">
        {/* ================= Search ================= */}

        <div className="relative">
          <Search
            size={15}
            strokeWidth={1.8}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search students or mentors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-9
              w-[260px]
              rounded-lg
              border
              border-slate-200
              bg-white
              pl-9
              pr-9
              text-[12px]
              font-medium
              text-slate-700
              outline-none
              placeholder:text-slate-400
              transition-all
              duration-200
              hover:border-slate-300
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* ================= Filters ================= */}

        <button
          type="button"
          onClick={onFiltersClick}
          className="
            flex
            h-9
            items-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            text-[12px]
            font-medium
            text-slate-600
            transition-all
            duration-200
            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-800
          "
        >
          <SlidersHorizontal
            size={14}
            strokeWidth={1.8}
          />

          <span>Filters</span>
        </button>

        {/* ================= Bulk Assign ================= */}

        <button
          type="button"
          onClick={onBulkAssign}
          className="
            flex
            h-9
            items-center
            gap-2
            rounded-lg
            bg-blue-600
            px-3.5
            text-[12px]
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-blue-700
            hover:shadow
            active:scale-[0.98]
          "
        >
          <CalendarPlus
            size={14}
            strokeWidth={1.9}
          />

          <span>Bulk Assign</span>
        </button>
      </div>
    </div>
  );
};

export default AssignmentHeader;