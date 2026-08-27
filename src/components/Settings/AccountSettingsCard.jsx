import React from "react";
import {
  Languages,
  Globe,
  CalendarDays,
} from "lucide-react";

const AccountSettingsCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">

      {/* Header */}
      <div className="mb-3">

        <h2 className="text-base font-semibold text-slate-800">
          Account Settings
        </h2>

        <p className="text-[11px] text-slate-500 mt-0.5">
          Manage your account preferences.
        </p>

      </div>

      {/* Language */}
      <div className="flex items-center justify-between py-3 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
            <Languages
              size={17}
              className="text-blue-600"
            />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-slate-800">
              Language
            </h4>

            <p className="text-[10px] text-slate-500">
              Choose your preferred language.
            </p>

          </div>

        </div>

        <select className="w-44 h-9 rounded-md border border-slate-300 px-2.5 text-xs outline-none focus:border-blue-500">
          <option>English</option>
          <option>Hindi</option>
          <option>Kannada</option>
        </select>

      </div>

      {/* Timezone */}
      <div className="flex items-center justify-between py-3 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
            <Globe
              size={17}
              className="text-emerald-600"
            />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-slate-800">
              Timezone
            </h4>

            <p className="text-[10px] text-slate-500">
              Select your timezone.
            </p>

          </div>

        </div>

        <select className="w-44 h-9 rounded-md border border-slate-300 px-2.5 text-xs outline-none focus:border-blue-500">
          <option>(GMT+05:30) Asia/Kolkata</option>
          <option>(GMT+00:00) UTC</option>
          <option>(GMT-05:00) New York</option>
        </select>

      </div>

      {/* Date Format */}
      <div className="flex items-center justify-between py-3">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
            <CalendarDays
              size={17}
              className="text-purple-600"
            />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-slate-800">
              Date Format
            </h4>

            <p className="text-[10px] text-slate-500">
              Choose your preferred date format.
            </p>

          </div>

        </div>

        <select className="w-44 h-9 rounded-md border border-slate-300 px-2.5 text-xs outline-none focus:border-blue-500">
          <option>DD MMM YYYY</option>
          <option>DD/MM/YYYY</option>
          <option>MM/DD/YYYY</option>
          <option>YYYY-MM-DD</option>
        </select>

      </div>

    </div>
  );
};

export default AccountSettingsCard;