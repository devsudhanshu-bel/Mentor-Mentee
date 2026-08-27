import React from "react";
import {
  Settings2,
  Mail,
  Bell,
  CalendarClock,
  Eye,
  ChevronDown,
} from "lucide-react";

const preferences = [
  {
    icon: Mail,
    title: "Email Notifications",
    subtitle: "Receive meeting updates and reminders",
  },
  {
    icon: Bell,
    title: "Meeting Reminders",
    subtitle: "Receive reminders before meetings",
  },
  {
    icon: CalendarClock,
    title: "Weekly Summary",
    subtitle: "Receive weekly mentoring summary",
  },
];

const Toggle = () => (
  <button className="relative h-6 w-11 rounded-full bg-blue-600 transition">
    <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow" />
  </button>
);

const AccountPreferences = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 p-4">
        <Settings2
          size={16}
          className="text-blue-600"
        />

        <h2 className="text-[16px] font-semibold text-slate-900">
          Account Preferences
        </h2>
      </div>

      {/* Preferences */}
      <div className="space-y-5 p-4">
        {preferences.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="flex items-start gap-3">
                <Icon
                  size={16}
                  className="mt-0.5 text-slate-500"
                />

                <div>
                  <h3 className="text-[12px] font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-500">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <Toggle />
            </div>
          );
        })}

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Profile Visibility */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Eye
              size={16}
              className="mt-0.5 text-slate-500"
            />

            <div>
              <h3 className="text-[12px] font-semibold text-slate-800">
                Profile Visibility
              </h3>

              <p className="text-[11px] text-slate-500">
                Visible to assigned mentees only
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 hover:bg-slate-50">
            Assigned Mentees
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPreferences;