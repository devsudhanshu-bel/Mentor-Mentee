import React from "react";

import TicketTableHeader from "./TicketTableHeader";
import TicketRow from "./TicketRow";

const TicketTable = ({ tickets }) => {
  return (
    <div className="w-full min-w-0 overflow-x-auto"><table className="min-w-full table-fixed">
      <TicketTableHeader />

      <tbody className="divide-y divide-slate-100 bg-white">
        {tickets.map((ticket) => (
          <TicketRow
            key={ticket.id}
            ticket={ticket}
          />
        ))}
      </tbody>
    </table></div>
  );
};

export default TicketTable;