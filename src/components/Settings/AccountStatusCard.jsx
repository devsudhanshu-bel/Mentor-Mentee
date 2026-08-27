import React from "react";
import { ShieldCheck } from "lucide-react";

const AccountStatusCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* Header */}
      <h2 className="text-sm font-semibold text-slate-800 text-center">
        Account Status
      </h2>

      {/* Status Icon */}
      <div className="flex justify-center my-3">

        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">

          <ShieldCheck
            size={28}
            strokeWidth={2.3}
            className="text-emerald-600"
          />

        </div>

      </div>

      {/* Status */}
      <h3 className="text-center text-xs font-semibold text-emerald-600">
        Your account is active
      </h3>

      <p className="text-center text-[11px] text-slate-500 mt-1">
        Last login
      </p>

      <p className="text-center text-[11px] font-medium text-slate-700">
        13 May 2024 • 10:30 AM
      </p>

    </div>
  );
};

export default AccountStatusCard;