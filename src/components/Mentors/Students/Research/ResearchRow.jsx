import React from "react";

import StatusBadge from "./StatusBadge";
import ResearchTypeBadge from "./ResearchTypeBadge";
import TableActions from "./TableActions";

const ResearchRow = ({ item }) => {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <p className="text-[12px] font-semibold text-slate-800">
          {item.title}
        </p>

        <p className="mt-1 text-[11px] text-slate-500">
          {item.guide}
        </p>
      </td>

      <td className="px-5 py-4">
        <ResearchTypeBadge type={item.type} />
      </td>

      <td className="px-5 py-4 text-[12px] text-slate-600">
        {item.date}
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={item.status} />
      </td>

      <td className="px-5 py-4 text-right">
        <TableActions />
      </td>
    </tr>
  );
};

export default ResearchRow;