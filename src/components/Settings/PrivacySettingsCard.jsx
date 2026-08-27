import React, { useState } from "react";
import {
  Eye,
  Shield,
  Activity,
} from "lucide-react";

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
      enabled ? "bg-emerald-500" : "bg-slate-300"
    }`}
  >
    <span
      className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
        enabled ? "translate-x-[18px]" : "translate-x-0"
      }`}
    />
  </button>
);

const PrivacySettingsCard = () => {
  const [activityStatus, setActivityStatus] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">

      {/* Header */}
      <div className="mb-4">

        <h2 className="text-base font-semibold text-slate-800">
          Privacy Settings
        </h2>

        <p className="text-[10px] text-slate-500 mt-0.5">
          Control your profile visibility and privacy preferences.
        </p>

      </div>

      {/* Profile Visibility */}
      <div className="flex items-center justify-between py-3 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
            <Eye
              size={16}
              strokeWidth={2.2}
              className="text-blue-600"
            />
          </div>

          <div>

            <h4 className="text-xs font-semibold text-slate-800">
              Profile Visibility
            </h4>

            <p className="text-[10px] text-slate-500">
              Choose who can view your profile.
            </p>

          </div>

        </div>

        <select className="w-40 h-8 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-blue-500">
          <option>Everyone</option>
          <option>Only Mentors</option>
          <option>Only Faculty</option>
          <option>Private</option>
        </select>

      </div>

      {/* Data Sharing */}
      <div className="flex items-center justify-between py-3 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
            <Shield
              size={16}
              strokeWidth={2.2}
              className="text-purple-600"
            />
          </div>

          <div>

            <h4 className="text-xs font-semibold text-slate-800">
              Data Sharing
            </h4>

            <p className="text-[10px] text-slate-500">
              Allow anonymous analytics and insights.
            </p>

          </div>

        </div>

        <select className="w-40 h-8 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-blue-500">
          <option>Enabled</option>
          <option>Disabled</option>
        </select>

      </div>

      {/* Activity Status */}
      <div className="flex items-center justify-between py-3">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
            <Activity
              size={16}
              strokeWidth={2.2}
              className="text-emerald-600"
            />
          </div>

          <div>

            <h4 className="text-xs font-semibold text-slate-800">
              Activity Status
            </h4>

            <p className="text-[10px] text-slate-500">
              Show when you're active on the platform.
            </p>

          </div>

        </div>

        <Toggle
          enabled={activityStatus}
          onToggle={() => setActivityStatus(!activityStatus)}
        />

      </div>

    </div>
  );
};

export default PrivacySettingsCard;