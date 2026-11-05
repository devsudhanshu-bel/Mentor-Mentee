import React from "react";
import {
  UserPlus,
  Users,
  ClipboardList,
  ArrowLeftRight,
  Search,
  Upload,
} from "lucide-react";

// ============================================================
// ASSIGNMENT HEADER
// ============================================================

const AssignmentHeader = ({
  activeTab = "unassigned",
  setActiveTab,
  search = "",
  setSearch,
  studentCount = 0,
  assignedCount = 0,
  transferCount = 0,
  onBulkAssign,
}) => {
  // ============================================================
  // TABS
  // ============================================================

  const tabs = [
    {
      id: "unassigned",
      label: "Unassigned Students",
      icon: UserPlus,
      count: studentCount,
    },
    {
      id: "assigned",
      label: "Assigned Students",
      icon: Users,
      count: assignedCount,
    },
    {
      id: "all",
      label: "All Assignments",
      icon: ClipboardList,
    },
    {
      id: "transfer",
      label: "Transfer Requests",
      icon: ArrowLeftRight,
      count: transferCount,
    },
  ];

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchChange = (event) => {
    setSearch?.(event.target.value);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="flex min-w-0 flex-col gap-3 border-b border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-3">
      {/* TABS */}

      <div className="grid w-full min-w-0 grid-cols-2 gap-1 sm:flex sm:flex-wrap sm:items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab?.(tab.id)}
              className={`
                inline-flex min-w-0 h-9 w-full items-center justify-center gap-1.5
                rounded-lg px-2 text-[11px] font-medium transition-all duration-200
                sm:w-auto sm:justify-start sm:gap-2 sm:px-3 sm:text-[12px]
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }
              `}
            >
              <Icon className="shrink-0" size={15} strokeWidth={1.8} />

              <span className="min-w-0 truncate sm:whitespace-nowrap">{tab.label}</span>

              {typeof tab.count === "number" && (
                <span
                  className={`
                    flex min-w-[18px] shrink-0 items-center justify-center
                    rounded-full px-1.5 py-0.5 text-[9px] font-semibold
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BULK ASSIGN AND SEARCH */}

      <div className="flex min-w-0 flex-col gap-2 min-[480px]:flex-row min-[480px]:items-center">
        <button
          type="button"
          onClick={onBulkAssign}
          className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 min-[480px]:w-auto"
        >
          <Upload size={14} />
          Bulk Assign
        </button>

        <div className="relative w-full min-w-0 flex-1 min-[480px]:ml-auto min-[480px]:max-w-[260px]">
          <Search
            size={16}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search students or mentors..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[12px] font-medium text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentHeader;
