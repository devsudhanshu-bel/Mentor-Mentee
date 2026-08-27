import React from "react";
import { Quote } from "lucide-react";

const MentorNote = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-2">
        <Quote
          size={16}
          className="text-blue-600"
        />

        <h3 className="text-[14px] font-semibold text-slate-800">
          Mentor Note
        </h3>
      </div>

      {/* Note */}

      <p className="mt-4 text-[12px] leading-6 text-slate-600">
        Aarav participates consistently in a wide range of
        co-curricular activities. He shows strong leadership
        qualities and a willingness to contribute to community
        initiatives. Encourage him to take up more leadership
        roles and mentor junior students in upcoming events.
      </p>

      {/* Footer */}

      <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Mentor"
          className="h-11 w-11 rounded-full object-cover"
        />

        <div>
          <h4 className="text-[13px] font-semibold text-slate-800">
            Dr. Arjun Mehta
          </h4>

          <p className="text-[11px] text-slate-500">
            Last updated: 10 May 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorNote;