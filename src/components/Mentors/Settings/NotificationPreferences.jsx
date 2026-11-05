import React from "react";
import { Bell, ChevronRight } from "lucide-react";

const Toggle = ({ enabled = false }) => {
  return (
    <button
      className={`relative h-5 w-9 shrink-0 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-[18px]" : "left-0.5"
        }`}
      />
    </button>
  );
};

const NotificationPreferences = () => {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {/* Header */}
      <div className="mb-4 min-w-0">
        <div className="flex items-center gap-2">
          <Bell size={17} className="shrink-0 text-blue-600" />

          <h2 className="text-[15px] font-semibold text-slate-800">
            Notification Preferences
          </h2>
        </div>

        <p className="mt-1 text-[11px] text-slate-500">
          Choose how you want to receive notifications.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Security Card */}
        <div className="min-w-0 rounded-lg border border-slate-200 p-3">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-[12px] font-semibold text-slate-800">
                Change Password
              </h4>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Update your password regularly
              </p>
            </div>

            <ChevronRight size={15} className="shrink-0 text-slate-400" />
          </div>

          <div className="mt-4 flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-[12px] font-semibold text-slate-800">
                Two-Factor Authentication
              </h4>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Extra security for your account
              </p>
            </div>

            <Toggle enabled />
          </div>
        </div>

        {/* Notifications Card */}
        <div className="min-w-0 rounded-lg border border-slate-200 p-3">
          <div className="space-y-3">
            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-[12px] font-semibold text-slate-800">
                  Meeting Reminders
                </h4>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Upcoming meeting alerts
                </p>
              </div>

              <Toggle enabled />
            </div>

            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-[12px] font-semibold text-slate-800">
                  Student Updates
                </h4>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Receive mentee updates
                </p>
              </div>

              <Toggle enabled />
            </div>

            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-[12px] font-semibold text-slate-800">
                  System Announcements
                </h4>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Important platform updates
                </p>
              </div>

              <Toggle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationPreferences;
