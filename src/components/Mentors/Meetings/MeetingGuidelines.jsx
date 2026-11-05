import React from "react";
import { Check } from "lucide-react";

import illustration from "../../../assets/meeting-guidelines.png";

const guidelines = [
  "Be prepared and come on time for meetings.",
  "Use the meeting time effectively to discuss progress and challenges.",
  "Notes and action items will be shared after every meeting.",
  "Reschedule in advance if you are unable to attend.",
];

const MeetingGuidelines = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
        {/* Left */}
        <div className="min-w-0 flex-1 self-stretch">
          <h2 className="mb-3 text-[15px] font-semibold text-slate-800 sm:text-[16px]">
            Meeting Guidelines
          </h2>

          <div className="space-y-3">
            {guidelines.map((item, index) => (
              <div
                key={index}
                className="flex min-w-0 items-start gap-2"
              >
                <Check
                  size={14}
                  strokeWidth={3}
                  className="mt-1 flex-shrink-0 text-emerald-500"
                />

                <p className="min-w-0 break-words text-[12px] leading-5 text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex w-full flex-shrink-0 items-center justify-center sm:w-[130px]">
          <img
            src={illustration}
            alt="Meeting Guidelines"
            className="h-[76px] w-auto max-w-full object-contain sm:h-[95px]"
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingGuidelines;
