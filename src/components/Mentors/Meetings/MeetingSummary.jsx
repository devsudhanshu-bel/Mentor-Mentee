import React from "react";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  NotebookText,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

const MeetingSummary = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-[16px] font-semibold text-slate-800">
        Meeting Summary
      </h2>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <SummaryCard
          icon={CalendarDays}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          title="Total Meetings"
          value="8"
          subtitle="All Time"
        />

        <SummaryCard
          icon={CircleCheck}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          title="Completed"
          value="7"
          subtitle="Meetings"
        />

        <SummaryCard
          icon={Clock3}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
          title="Upcoming"
          value="1"
          subtitle="Meetings"
        />

        <SummaryCard
          icon={NotebookText}
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
          title="Total Notes"
          value="12"
          subtitle="Shared Notes"
        />
      </div>
    </div>
  );
};

export default MeetingSummary;