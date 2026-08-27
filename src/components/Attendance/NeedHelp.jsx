import React from "react";
import { Headphones } from "lucide-react";
import { ArrowRight } from "lucide-react";

const NeedHelp = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-sm p-4 h-[145px] flex flex-col">
      <Headphones
        size={18}
        className="text-blue-600"
      />

      <h3 className="text-[14px] font-semibold text-[#142970] mt-2">
        Need Help?
      </h3>

      <p className="text-[11px] text-slate-500 mt-2">
        Have attendance related queries?
      </p>

      <button className="flex items-center gap-2 text-blue-600 text-[12px] font-semibold mt-3">
        Contact your mentor

        <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default NeedHelp;