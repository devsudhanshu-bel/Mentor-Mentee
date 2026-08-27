import React, { useState } from "react";
import { Bell } from "lucide-react";

const NotificationCard = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
        enabled ? "bg-emerald-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 h-full">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">

        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
          <Bell
            size={16}
            className="text-purple-600"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Notification Preferences
          </h3>

          <p className="text-[10px] text-slate-500">
            Manage how you receive notifications.
          </p>
        </div>

      </div>

      {/* Email */}
      <div className="flex items-center justify-between py-2">

        <div>

          <h4 className="text-xs font-semibold text-slate-800">
            Email Notifications
          </h4>

          <p
            className={`text-[10px] mt-1 ${
              emailNotifications
                ? "text-emerald-600"
                : "text-slate-500"
            }`}
          >
            {emailNotifications ? "Enabled" : "Disabled"}
          </p>

        </div>

        <Toggle
          enabled={emailNotifications}
          onToggle={() =>
            setEmailNotifications(!emailNotifications)
          }
        />

      </div>

      {/* SMS */}
      <div className="flex items-center justify-between py-2 mb-4">

        <div>

          <h4 className="text-xs font-semibold text-slate-800">
            SMS Notifications
          </h4>

          <p
            className={`text-[10px] mt-1 ${
              smsNotifications
                ? "text-emerald-600"
                : "text-slate-500"
            }`}
          >
            {smsNotifications ? "Enabled" : "Disabled"}
          </p>

        </div>

        <Toggle
          enabled={smsNotifications}
          onToggle={() =>
            setSmsNotifications(!smsNotifications)
          }
        />

      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 pt-3">

        <button
          className="
            w-full
            h-9
            rounded-lg
            border
            border-slate-200
            text-xs
            font-medium
            text-blue-600
            hover:bg-blue-50
            hover:border-blue-200
            transition
          "
        >
          Manage Notifications
        </button>

      </div>

    </div>
  );
};

export default NotificationCard;