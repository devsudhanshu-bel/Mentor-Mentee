import React from "react";
import { ArrowLeft } from "lucide-react";
import StudentProfileCard from "./StudentProfileCard";

const MeetingHeader = () => {
  return (
    <div className="flex items-start justify-between gap-8">
      {/* Left Section */}
      <div className="max-w-xl">
        {/* Back Button */}
        <button className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-[#163D8C] transition hover:text-blue-700 cursor-pointer">
          <ArrowLeft size={15} strokeWidth={2.2} />
          Back to Student Dashboard
        </button>

        {/* Page Title */}
        <h1 className="text-[28px] font-bold leading-tight text-[#0F172A]">
          Meetings
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-[15px] leading-6 text-slate-500">
          Schedule and manage your meetings with{" "}
          <span className="font-semibold text-[#2563EB]">
            Sudhanshu Sreedhara Belavarthy
          </span>
          .
        </p>
      </div>

      {/* Student Profile */}
      <StudentProfileCard />
    </div>
  );
};

export default MeetingHeader;