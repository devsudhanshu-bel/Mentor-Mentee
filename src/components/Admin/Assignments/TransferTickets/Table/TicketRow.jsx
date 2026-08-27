import React from "react";

import RequesterCell from "../Cells/RequesterCell";
import AssignmentCell from "../Cells/AssignmentCell";
import RecommendedMentorCell from "../Cells/RecommendedMentorCell";
import ReasonCell from "../Cells/ReasonCell";
import DateCell from "../Cells/DateCell";
import ActionMenu from "../Cells/ActionMenu";

import StatusBadge from "../Badges/StatusBadge";
import RequesterTypeBadge from "../Badges/RequesterTypeBadge";

const TicketRow = ({ ticket }) => {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-blue-600">
        {ticket.id}
      </td>

      <td className="px-3 py-3">
        <RequesterCell requester={ticket.requester} />
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <RequesterTypeBadge type={ticket.requester.type} />
      </td>

      <td className="px-3 py-3">
        <AssignmentCell assignment={ticket.currentAssignment} />
      </td>

      <td className="px-3 py-3">
        <RecommendedMentorCell
          mentor={ticket.recommendedMentor}
        />
      </td>

      <td className="px-3 py-3">
        <ReasonCell reason={ticket.reason} />
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <StatusBadge status={ticket.status} />
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <DateCell createdOn={ticket.createdOn} />
      </td>

      <td className="px-3 py-3 text-center">
        <ActionMenu />
      </td>
    </tr>
  );
};

export default TicketRow;