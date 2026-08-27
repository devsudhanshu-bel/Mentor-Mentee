import React from "react";
import {
  CalendarDays,
  FilePenLine,
  Upload,
  ListTodo,
  Download,
} from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <button className="flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 text-[12px] font-medium text-blue-700 transition hover:bg-blue-100">
        <CalendarDays size={15} />
        Schedule Meeting
      </button>

      <button className="flex h-9 items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 text-[12px] font-medium text-orange-700 transition hover:bg-orange-100">
        <FilePenLine size={15} />
        Add Remarks
      </button>

      <button className="flex h-9 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-[12px] font-medium text-emerald-700 transition hover:bg-emerald-100">
        <Upload size={15} />
        Upload Resource
      </button>

      <button className="flex h-9 items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-4 text-[12px] font-medium text-violet-700 transition hover:bg-violet-100">
        <ListTodo size={15} />
        Assign Task
      </button>

      <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[12px] font-medium text-blue-700 transition hover:bg-slate-50">
        <Download size={15} />
        Download Report
      </button>
    </div>
  );
};

export default ActionButtons;