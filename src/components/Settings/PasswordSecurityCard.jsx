import React from "react";
import {
  Lock,
  ShieldCheck,
} from "lucide-react";

const PasswordSecurityCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 h-full">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
          <Lock
            size={16}
            className="text-emerald-600"
          />
        </div>

        <div>

          <h3 className="text-sm font-semibold text-slate-800">
            Password & Security
          </h3>

          <p className="text-[10px] text-slate-500">
            Keep your account secure.
          </p>

        </div>

      </div>

      {/* Last Password Change */}
      <div className="mb-4">

        <p className="text-[10px] text-slate-500">
          Last password change
        </p>

        <p className="text-base font-semibold text-slate-800 mt-1">
          25 Apr 2024
        </p>

      </div>

      {/* Security Status */}
      <div className="flex items-center gap-2 mb-4">

        <ShieldCheck
          size={14}
          className="text-emerald-500"
        />

        <span className="text-xs font-medium text-emerald-600">
          Account Protected
        </span>

      </div>

      {/* Button */}
      <button
        className="
          w-full
          h-9
          rounded-md
          bg-blue-600
          hover:bg-blue-700
          text-white
          text-xs
          font-medium
          transition
        "
      >
        Change Password
      </button>

    </div>
  );
};

export default PasswordSecurityCard;