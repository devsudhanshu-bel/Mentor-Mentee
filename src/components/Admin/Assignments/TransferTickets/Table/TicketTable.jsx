import React from "react";

import TicketTableHeader from "./TicketTableHeader";
import TicketRow from "./TicketRow";

const TicketTable = ({ tickets }) => {
  return (
    <table className="min-w-full table-fixed">
      <TicketTableHeader />

      <tbody className="divide-y divide-slate-100 bg-white">
        {tickets.map((ticket) => (
          <TicketRow
            key={ticket.id}
            ticket={ticket}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;