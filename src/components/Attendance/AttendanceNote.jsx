
import React from "react";
import { ShieldCheck } from "lucide-react";

const AttendanceNote = () => {
  return (
    <div className="w-full min-h-[145px] bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col">
      <ShieldCheck
        size={18}
        className="text-blue-600 shrink-0"
      />

      <h3 className="text-[14px] font-semibold text-[#142970] mt-2">
        Note
      </h3>

      <p className="text-[11px] sm:text-xs text-slate-500 mt-2 leading-5">
        Attendance below 75% in any subject may lead to detention as per the
        university guidelines.
      </p>
    </div>
  );
};

export default AttendanceNote;
