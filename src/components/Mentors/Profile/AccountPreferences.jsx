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
  <button className="relative h-6 w-11 shrink-0 rounded-full bg-blue-600 transition">
    <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow" />
  </button>
);

const AccountPreferences = () => {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 p-3 sm:p-4">
        <Settings2
          size={16}
          className="shrink-0 text-blue-600"
        />

        <h2 className="text-[15px] font-semibold text-slate-900 sm:text-[16px]">
          Account Preferences
        </h2>
      </div>

      {/* Preferences */}
      <div className="space-y-4 p-3 sm:space-y-5 sm:p-4">
        {preferences.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex min-w-0 items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                <Icon
                  size={16}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <div className="min-w-0">
                  <h3 className="text-[12px] font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="break-words text-[11px] text-slate-500">
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
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
            <Eye
              size={16}
              className="mt-0.5 shrink-0 text-slate-500"
            />

            <div className="min-w-0">
              <h3 className="text-[12px] font-semibold text-slate-800">
                Profile Visibility
              </h3>

              <p className="break-words text-[11px] text-slate-500">
                Visible to assigned mentees only
              </p>
            </div>
          </div>

          <button className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 hover:bg-slate-50 sm:w-auto sm:justify-center">
            Assigned Mentees
            <ChevronDown size={14} className="shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPreferences;
