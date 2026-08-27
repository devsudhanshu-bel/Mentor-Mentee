import React from "react";

const TicketTableHeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200">
        <th className="w-[90px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Ticket ID
        </th>

        <th className="w-[180px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Requester
        </th>

        <th className="w-[120px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Requester Type
        </th>

        <th className="w-[170px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Current Assignment
        </th>

        <th className="w-[170px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Recommended Mentor
        </th>

        <th className="w-[130px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Reason
        </th>

        <th className="w-[110px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Status
        </th>

        <th className="w-[120px] px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Created On
        </th>

        <th className="w-[60px] px-3 py-3 text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TicketTableHeader;