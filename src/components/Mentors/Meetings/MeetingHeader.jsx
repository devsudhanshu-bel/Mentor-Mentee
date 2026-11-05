import React from "react";

const MeetingHeader = () => {
  return (
    <div className="min-w-0 py-2">
      {/* Page Title */}
      <h1 className="break-words text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[28px]">
        Meetings
      </h1>

      {/* Subtitle */}
      <p className="mt-2 break-words text-[13px] leading-5 text-slate-500 sm:text-[15px] sm:leading-6">
        Schedule and manage meetings for your students.
      </p>
    </div>
  );
};

export default MeetingHeader;
