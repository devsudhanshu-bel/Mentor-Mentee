import React from "react";
import {
  BadgeHelp,
  MessageCircle,
  Bug,
  ChevronRight,
} from "lucide-react";

const HelpSupportCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 h-full">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
          <BadgeHelp
            size={18}
            className="text-amber-500"
            strokeWidth={2.3}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Help & Support
          </h3>

          <p className="text-[10px] text-slate-500">
            Need help? We're here for you.
          </p>
        </div>

      </div>

      {/* FAQs */}
      <button className="w-full flex items-center justify-between px-1 py-2.5 rounded-md hover:bg-slate-50 transition border-b border-slate-100">

        <div className="flex items-center gap-2.5">

          <BadgeHelp
            size={15}
            className="text-amber-500"
            strokeWidth={2.3}
          />

          <div className="text-left">
            <h4 className="text-xs font-medium text-slate-800">
              FAQs
            </h4>

            <p className="text-[10px] text-slate-500">
              Browse common questions.
            </p>
          </div>

        </div>

        <ChevronRight
          size={15}
          className="text-slate-400"
        />

      </button>

      {/* Contact */}
      <button className="w-full flex items-center justify-between px-1 py-2.5 rounded-md hover:bg-slate-50 transition border-b border-slate-100">

        <div className="flex items-center gap-2.5">

          <MessageCircle
            size={15}
            className="text-emerald-500"
            strokeWidth={2.3}
          />

          <div className="text-left">
            <h4 className="text-xs font-medium text-slate-800">
              Contact Support
            </h4>

            <p className="text-[10px] text-slate-500">
              Chat or email us.
            </p>
          </div>

        </div>

        <ChevronRight
          size={15}
          className="text-slate-400"
        />

      </button>

      {/* Report Issue */}
      <button className="w-full flex items-center justify-between px-1 py-2.5 rounded-md hover:bg-slate-50 transition">

        <div className="flex items-center gap-2.5">

          <Bug
            size={15}
            className="text-orange-500"
            strokeWidth={2.3}
          />

          <div className="text-left">
            <h4 className="text-xs font-medium text-slate-800">
              Report Issue
            </h4>

            <p className="text-[10px] text-slate-500">
              Report a bug or problem.
            </p>
          </div>

        </div>

        <ChevronRight
          size={15}
          className="text-slate-400"
        />

      </button>

    </div>
  );
};

export default HelpSupportCard;