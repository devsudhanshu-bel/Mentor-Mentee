import React from "react";
import { User, Camera } from "lucide-react";

const ProfileInformation = () => {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-5 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <User size={18} className="shrink-0 text-blue-600" />
            <h2 className="text-[16px] font-semibold text-slate-800">
              Profile Information
            </h2>
          </div>

          <p className="mt-1 text-[12px] text-slate-500">
            Update your personal and professional information.
          </p>
        </div>

        <button className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 text-[13px] font-medium text-blue-600 transition hover:bg-blue-50 sm:w-auto">
          <Camera size={15} />
          Change Photo
        </button>
      </div>

      {/* Form */}
      <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
        {/* Full Name */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Dr. Arjun Mehta"
            className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Employee ID */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Employee ID
          </label>

          <input
            type="text"
            defaultValue="CUF10023"
            disabled
            className="h-10 w-full min-w-0 cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 text-[13px] text-slate-500"
          />
        </div>

        {/* Designation */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Designation
          </label>

          <select className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Associate Professor</option>
            <option>Assistant Professor</option>
            <option>Professor</option>
            <option>Head of Department</option>
          </select>
        </div>

        {/* Department */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Department
          </label>

          <select className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Computer Science & Engineering</option>
            <option>Information Science</option>
            <option>Electronics & Communication</option>
            <option>Mechanical Engineering</option>
            <option>Civil Engineering</option>
          </select>
        </div>

        {/* Qualification */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Qualification
          </label>

          <input
            type="text"
            defaultValue="Ph.D. in Computer Science"
            className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Office Location */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Office Location
          </label>

          <input
            type="text"
            defaultValue="Faculty Block 2, Room 304"
            className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Email */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            defaultValue="arjun.mehta@christuniversity.in"
            className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Phone */}
        <div className="min-w-0">
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Phone Number
          </label>

          <input
            type="text"
            defaultValue="+91 98765 43210"
            className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Office Hours */}
        <div className="min-w-0 lg:col-span-2">
          <label className="mb-0 block text-[12px] font-medium text-slate-700">
            Office Hours
          </label>

          <input
            type="text"
            defaultValue="Monday - Friday, 10:00 AM - 4:00 PM"
            className="h-10 w-full min-w-0 rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />

          <p className="mt-1.5 text-[11px] text-slate-500">
            These office hours will be visible to your assigned mentees while
            scheduling meetings.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-1 flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:gap-3 sm:pt-5">
        <button className="h-9 w-full rounded-lg border border-slate-300 px-5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto">
          Cancel
        </button>

        <button className="h-9 w-full rounded-lg bg-blue-600 px-6 text-[13px] font-medium text-white transition hover:bg-blue-700 sm:w-auto">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default ProfileInformation;
