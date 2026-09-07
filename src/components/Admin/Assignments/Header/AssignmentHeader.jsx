import React from "react";
import { UserPlus, ClipboardList, ArrowLeftRight, Search } from "lucide-react";

// ============================================================
// ASSIGNMENT HEADER
// ============================================================

const AssignmentHeader = ({
  activeTab = "unassigned",
  setActiveTab,
  search = "",
  setSearch,
  studentCount = 0,
  transferCount = 0,
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
    setSearch(event.target.value);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        flex
        min-h-[58px]
        items-center
        justify-between
        gap-4
        border-b
        border-slate-200
        bg-white
        px-4
        py-2
      "
    >
      {/* ======================================================
          LEFT — TABS
          ====================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-1
        "
      >
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
                h-9
                shrink-0
                items-center
                gap-2
                rounded-lg
                px-3
                text-[12px]
                font-medium
                transition-all
                duration-200

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
                    flex
                    min-w-[18px]
                    items-center
                    justify-center
                    rounded-full
                    px-1.5
                    py-0.5
                    text-[9px]
                    font-semibold

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

      {/* ======================================================
          RIGHT — DYNAMIC SEARCH
          ====================================================== */}

      <div className="relative w-[260px] shrink-0">
        <Search
          size={16}
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
          value={search}
          onChange={handleSearchChange}
          placeholder="Search students or mentors..."
          className="
            h-9
            w-full
            rounded-lg
            border
            border-slate-200
            bg-white
            pl-9
            pr-3
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
    </div>
  );
};

export default AssignmentHeader;
