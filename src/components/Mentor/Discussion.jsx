import React from "react";
import { Send } from "lucide-react";

const Discussion = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-blue-600">
          Discussion
        </h3>

        <button className="text-[12px] font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      {/* ================= Mentor Message ================= */}
      <div className="flex items-start gap-3 mb-5">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[11px] font-semibold text-blue-600 flex-shrink-0">
          AS
        </div>

        {/* Message */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-[12px] font-semibold text-[#142970]">
              Dr. Arjun Sharma
            </h4>

            <div className="text-right">
              <p className="text-[10px] text-slate-500">
                12 May 2025
              </p>

              <p className="text-[10px] text-slate-500">
                10:15 AM
              </p>
            </div>
          </div>

          <p className="mt-1 text-[11px] leading-5 text-slate-600">
            Great work on the project! Let's discuss the implementation
            approach in our next meeting.
          </p>
        </div>
      </div>

      {/* ================= Student Message ================= */}
      <div className="flex items-start gap-3 mb-5">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[11px] font-semibold text-blue-600 flex-shrink-0">
          SS
        </div>

        {/* Message */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-[12px] font-semibold text-[#142970]">
              You
            </h4>

            <div className="text-right">
              <p className="text-[10px] text-slate-500">
                12 May 2025
              </p>

              <p className="text-[10px] text-slate-500">
                10:20 AM
              </p>
            </div>
          </div>

          <p className="mt-1 text-[11px] leading-5 text-slate-600">
            Thank you, sir! I have completed the initial model.
            Sharing the updates soon.
          </p>
        </div>
      </div>

      {/* ================= Input ================= */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Write a message..."
          className="
            flex-1
            border
            border-slate-200
            rounded-lg
            px-3
            py-2
            text-[12px]
            outline-none
            focus:border-blue-500
          "
        />

        <button
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            rounded-lg
            text-[12px]
            font-medium
            transition
          "
        >
          <Send size={14} />
          Send
        </button>
      </div>
    </div>
  );
};

export default Discussion;