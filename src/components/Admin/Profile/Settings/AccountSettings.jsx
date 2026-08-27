import React, { useState } from "react";
import {
  Bell,
  LockKeyhole,
} from "lucide-react";

const AccountSettings = () => {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center gap-2">
        <Bell
          size={18}
          className="text-blue-600"
        />

        <h2 className="text-[18px] font-semibold text-slate-900">
          Account Settings
        </h2>
      </div>

      {/* ================= Change Password ================= */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
        <div className="flex items-center gap-3">
          <LockKeyhole
            size={18}
            className="text-slate-500"
          />

          <div>
            <h3 className="text-[13px] font-semibold text-slate-800">
              Password
            </h3>

            <p className="text-[12px] text-slate-500">
              Update your account password
            </p>
          </div>
        </div>

        <button className="rounded-lg border border-blue-600 px-3 py-1.5 text-[12px] font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white">
          Change
        </button>
      </div>

      {/* ================= Email Notifications ================= */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 p-3">
        <div>
          <h3 className="text-[13px] font-semibold text-slate-800">
            Email Notifications
          </h3>

          <p className="text-[12px] text-slate-500">
            Receive updates via email
          </p>
        </div>

        <button
          onClick={() =>
            setEmailNotifications(!emailNotifications)
          }
          className={`relative h-6 w-11 rounded-full transition ${
            emailNotifications
              ? "bg-blue-600"
              : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
              emailNotifications
                ? "left-5"
                : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;