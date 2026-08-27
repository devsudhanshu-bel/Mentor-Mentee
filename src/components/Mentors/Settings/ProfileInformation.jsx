import React from "react";
import { User, Camera } from "lucide-react";

const ProfileInformation = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <User size={18} className="text-blue-600" />
            <h2 className="text-[16px] font-semibold text-slate-800">
              Profile Information
            </h2>
          </div>

          <p className="mt-1 text-[12px] text-slate-500">
            Update your personal and professional information.
          </p>
        </div>

        <button className="flex h-9 items-center gap-2 rounded-lg border border-blue-600 px-4 text-[13px] font-medium text-blue-600 transition hover:bg-blue-50">
          <Camera size={15} />
          Change Photo
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Dr. Arjun Mehta"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Employee ID
          </label>

          <input
            type="text"
            defaultValue="CUF10023"
            disabled
            className="h-10 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 text-[13px] text-slate-500"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Designation
          </label>

          <select className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Associate Professor</option>
            <option>Assistant Professor</option>
            <option>Professor</option>
            <option>Head of Department</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Department
          </label>

          <select className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-600">
            <option>Computer Science & Engineering</option>
            <option>Information Science</option>
            <option>Electronics & Communication</option>
            <option>Mechanical Engineering</option>
            <option>Civil Engineering</option>
          </select>
        </div>

        {/* Qualification */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Qualification
          </label>

          <input
            type="text"
            defaultValue="Ph.D. in Computer Science"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Office Location */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Office Location
          </label>

          <input
            type="text"
            defaultValue="Faculty Block 2, Room 304"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            defaultValue="arjun.mehta@christuniversity.in"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-[12px] font-medium text-slate-700">
            Phone Number
          </label>

          <input
            type="text"
            defaultValue="+91 98765 43210"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Office Hours */}
        <div className="lg:col-span-2">
          <label className="mb-0 block text-[12px] font-medium text-slate-700">
            Office Hours
          </label>

          <input
            type="text"
            defaultValue="Monday - Friday, 10:00 AM - 4:00 PM"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-600"
          />

          <p className="mt-1.5 text-[11px] text-slate-500">
            These office hours will be visible to your assigned mentees while
            scheduling meetings.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-1 flex justify-end gap-3 border-t border-slate-100 pt-5">
        <button className="h-9 rounded-lg border border-slate-300 px-5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50">
          Cancel
        </button>

        <button className="h-9 rounded-lg bg-blue-600 px-6 text-[13px] font-medium text-white transition hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default ProfileInformation;