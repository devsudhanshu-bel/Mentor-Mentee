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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-6">
        {/* Left */}
        <div className="flex-1">
          <h2 className="mb-3 text-[16px] font-semibold text-slate-800">
            Meeting Guidelines
          </h2>

          <div className="space-y-3">
            {guidelines.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <Check
                  size={14}
                  strokeWidth={3}
                  className="mt-1 flex-shrink-0 text-emerald-500"
                />

                <p className="text-[12px] leading-5 text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex w-[130px] flex-shrink-0 items-center justify-center">
          <img
            src={illustration}
            alt="Meeting Guidelines"
            className="h-[95px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingGuidelines;