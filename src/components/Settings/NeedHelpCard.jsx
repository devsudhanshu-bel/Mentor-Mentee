import React from "react";
import {
  Headphones,
  ChevronRight,
} from "lucide-react";

const NeedHelpCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Headphones
            size={18}
            className="text-blue-600"
            strokeWidth={2.2}
          />
        </div>

        <div>

          <h2 className="text-base font-semibold text-slate-800">
            Need Help?
          </h2>

          <p className="text-[11px] text-slate-500 mt-0.5">
            If you have any issues with your account,
            we're here to help.
          </p>

        </div>

      </div>

      {/* Contact Support */}
      <button
        className="
          w-full
          flex
          items-center
          justify-between
          rounded-lg
          border
          border-slate-200
          px-3
          py-3
          hover:bg-slate-50
          transition
        "
      >
        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Headphones
              size={15}
              className="text-emerald-600"
            />
          </div>

          <div className="text-left">

            <p className="text-xs font-semibold text-slate-800">
              Contact Support
            </p>

            <p className="text-[10px] text-slate-500">
              Chat or email our support team.
            </p>

          </div>

        </div>

        <ChevronRight
          size={16}
          className="text-slate-400"
        />

      </button>

    </div>
  );
};

export default NeedHelpCard;