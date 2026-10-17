import React from "react";

const MeetingHeader = () => {
  return (
    <div className="py-2">
      {/* Page Title */}
      <h1 className="text-[28px] font-bold leading-tight text-[#0F172A]">
        Meetings
      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-[15px] leading-6 text-slate-500">
        Schedule and manage meetings for your students.
      </p>
    </div>
  );
};

export default MeetingHeader;