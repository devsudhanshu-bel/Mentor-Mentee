import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { transferTickets } from "./transferTicketData";

import TicketTable from "./Table/TicketTable";
import TicketPagination from "./Table/TicketPagination";

const TransferTicketsPanel = () => {
  return (
    <div className="overflow-hidden">
      {/* ================= Toolbar ================= */}

      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
        {/* Search */}

        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filters */}

        <button className="ml-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <TicketTable tickets={transferTickets} />
      </div>

      {/* ================= Pagination ================= */}

      <TicketPagination
        total={transferTickets.length}
      />
    </div>
  );
};

export default TransferTicketsPanel;