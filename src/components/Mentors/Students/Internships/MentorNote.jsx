import React from "react";
import { MessageSquareQuote } from "lucide-react";

const MentorNote = () => {
  return (
    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
          <MessageSquareQuote
            size={18}
            className="text-blue-600"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-[11px] font-semibold text-slate-700">
            Mentor Note
          </h3>

          <p className="mt-2 text-[10px] leading-5 text-slate-600">
            Aarav has demonstrated excellent technical abilities and adapts
            quickly to new technologies. His communication with the development
            team has improved significantly over the past month. Continue
            focusing on code quality and documentation to further enhance
            professional growth.
          </p>

          <p className="mt-3 text-[10px] text-slate-500">
            Last Updated • 10 May 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorNote;