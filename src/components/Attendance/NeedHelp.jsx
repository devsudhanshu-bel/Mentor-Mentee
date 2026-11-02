
import React from "react";
import { Headphones, ArrowRight } from "lucide-react";

const NeedHelp = () => {
  return (
    <div
      className="
        w-full
        min-h-[145px]
        bg-blue-50
        border
        border-blue-100
        rounded-2xl
        shadow-sm
        p-4
        flex
        flex-col
      "
    >
      <Headphones
        size={18}
        className="text-blue-600 shrink-0"
      />

      <h3 className="text-[14px] font-semibold text-[#142970] mt-2">
        Need Help?
      </h3>

      <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
        Have attendance related queries?
      </p>

      <button
        type="button"
        className="
          flex
          items-center
          gap-2
          text-blue-600
          text-[12px]
          font-semibold
          mt-3
          w-fit
          max-w-full
          hover:text-blue-800
          transition-colors
        "
      >
        Contact your mentor

        <ArrowRight size={14} className="shrink-0" />
      </button>
    </div>
  );
};

export default NeedHelp;
