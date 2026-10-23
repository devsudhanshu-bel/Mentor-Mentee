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
    <div className="flex min-h-[58px] flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2">
      {/* LEFT — TABS */}

      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab?.(tab.id)}
              className={`
                flex h-9 shrink-0 items-center gap-2 rounded-lg
                px-3 text-[12px] font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }
              `}
            >
              <Icon size={15} strokeWidth={1.8} />

              <span>{tab.label}</span>

              {typeof tab.count === "number" && (
                <span
                  className={`
                    flex min-w-[18px] items-center justify-center
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

      {/* BULK ASSIGN — PRESERVED */}

      <button
        type="button"
        onClick={onBulkAssign}
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <Upload size={14} />
        Bulk Assign
      </button>

      {/* SEARCH — PRESERVED */}

      <div className="relative w-full shrink-0 sm:w-[220px] lg:w-[260px]">
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
  );
};

export default AssignmentHeader;
