import React from "react";
import { Settings2 } from "lucide-react";

const ApplicationPreferences = () => {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {/* Header */}
      <div className="mb-4 min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <Settings2 size={17} className="shrink-0 text-blue-600" />

          <h2 className="break-words text-[15px] font-semibold text-slate-800">
            Application Preferences
          </h2>
        </div>

        <p className="mt-1 text-[11px] text-slate-500">
          Customize your application experience.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Default Dashboard */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-semibold text-slate-700">
            Default Dashboard
          </label>

          <p className="mb-2 text-[10px] text-slate-500">
            Choose your landing page.
          </p>

          <select className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Dashboard</option>
            <option>My Students</option>
            <option>Meetings</option>
          </select>
        </div>

        {/* Items Per Page */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-semibold text-slate-700">
            Items Per Page
          </label>

          <p className="mb-2 text-[10px] text-slate-500">
            Number of records displayed.
          </p>

          <select className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        {/* Theme */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-semibold text-slate-700">
            Theme
          </label>

          <p className="mb-2 text-[10px] text-slate-500">
            Select your preferred theme.
          </p>

          <select className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>

        {/* Timezone */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-semibold text-slate-700">
            Timezone
          </label>

          <p className="mb-2 text-[10px] text-slate-500">
            Choose your timezone.
          </p>

          <select className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>(GMT+05:30) Asia/Kolkata</option>
            <option>(GMT+00:00) UTC</option>
            <option>(GMT-05:00) New York</option>
            <option>(GMT+01:00) London</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ApplicationPreferences;
