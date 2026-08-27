import React from "react";
import { CalendarDays } from "lucide-react";

import CategoryBadge from "./CategoryBadge";
import StatusBadge from "./StatusBadge";
import FeedbackCell from "./FeedbackCell";
import TableActions from "./TableActions";

const ActivityRow = ({ activity }) => {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* ================= Activity ================= */}

      <td className="px-4 py-3">
        <div>
          <h4 className="text-[11px] font-semibold text-slate-800">
            {activity.title}
          </h4>

          <p className="mt-0.5 text-[10px] text-slate-500">
            {activity.organizer}
          </p>
        </div>
      </td>

      {/* ================= Category ================= */}

      <td className="px-4 py-3">
        <CategoryBadge category={activity.category} />
      </td>

      {/* ================= Date ================= */}

      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <CalendarDays
            size={12}
            className="text-slate-400"
          />

          <span className="text-[10px] text-slate-600">
            {activity.date}
          </span>
        </div>
      </td>

      {/* ================= Status ================= */}

      <td className="px-4 py-3">
        <StatusBadge status={activity.status} />
      </td>

      {/* ================= Mentor Feedback ================= */}

      <td className="px-4 py-3">
        <FeedbackCell feedback={activity.feedback} />
      </td>

      {/* ================= Documents ================= */}

      <td className="px-4 py-3 text-right">
        <TableActions />
      </td>
    </tr>
  );
};

export default ActivityRow;