import React from "react";
import { Lock, ChevronRight } from "lucide-react";

const Toggle = ({ enabled = false }) => {
  return (
    <button
      className={`relative h-5 w-9 rounded-full transition ${
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

const DataPrivacy = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Lock size={17} className="text-blue-600" />

          <h2 className="text-[15px] font-semibold text-slate-800">
            Data & Privacy
          </h2>
        </div>

        <p className="mt-1 text-[11px] text-slate-500">
          Control your privacy and data visibility.
        </p>
      </div>

      <div className="space-y-4">
        {/* Profile Visibility */}
        <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
          <div>
            <h4 className="text-[12px] font-semibold text-slate-800">
              Profile Visibility
            </h4>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Control who can access your profile.
            </p>
          </div>

          <button className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-blue-600">
            Assigned Students
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Office Hours */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[12px] font-semibold text-slate-800">
              Show Office Hours
            </h4>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Display office hours to your mentees.
            </p>
          </div>

          <Toggle enabled />
        </div>

        {/* Contact Info */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[12px] font-semibold text-slate-800">
              Show Contact Information
            </h4>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Display email address and phone number.
            </p>
          </div>

          <Toggle enabled />
        </div>
      </div>
    </section>
  );
};

export default DataPrivacy;