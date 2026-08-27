import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const StudentProfileSidebar = () => {
  return (
    <aside className="w-[260px] shrink-0 space-y-3">
      {/* ================= Profile Card ================= */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Cover */}
        <div className="relative h-20 bg-gradient-to-r from-sky-100 via-slate-50 to-sky-100">
          <img
            src="https://i.pravatar.cc/180?img=12"
            alt="Student"
            className="absolute left-1/2 top-full h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover shadow"
          />
        </div>

        {/* Body */}
        <div className="px-4 pb-4 pt-10 text-center">
          <h2 className="text-[18px] font-semibold text-slate-900">
            Aarav Sharma
          </h2>

          <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
            Active
          </span>

          <div className="mt-4 space-y-1 text-[12px] text-slate-600">
            <p>
              <span className="font-semibold">Reg. No:</span> 23CS1001
            </p>

            <p>BCA – Computer Science</p>

            <p>Semester IV</p>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Mail size={13} className="text-slate-400" />

                <span className="truncate">
                  aarav.sharma@christuniversity.in
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Phone size={13} className="text-slate-400" />

                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <MapPin size={13} className="text-slate-400" />

                <span>Bangalore, Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Academic Snapshot ================= */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-[14px] font-semibold text-slate-900">
          Academic Snapshot
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">CGPA</span>

            <span className="text-[13px] font-semibold text-blue-600">
              8.72
              <span className="text-[11px] text-slate-400"> /10</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Credits Earned
            </span>

            <span className="text-[13px] font-semibold text-slate-800">
              88
              <span className="text-[11px] text-slate-400"> /120</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Backlogs
            </span>

            <span className="text-[13px] font-semibold text-slate-800">
              0
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Academic Standing
            </span>

            <span className="text-[12px] font-semibold text-emerald-600">
              Excellent
            </span>
          </div>
        </div>
      </div>

      {/* ================= Mentor Information ================= */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-[14px] font-semibold text-slate-900">
          Mentor Information
        </h3>

        <div className="space-y-3">
          <div>
            <p className="text-[10px] text-slate-500">
              Mentor
            </p>

            <p className="text-[12px] font-medium text-blue-600">
              Dr. Arjun Mehta
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500">
              Department
            </p>

            <p className="text-[12px] text-slate-700">
              Computer Science
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500">
              Designation
            </p>

            <p className="text-[12px] text-slate-700">
              Associate Professor
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500">
              Mentorship Start Date
            </p>

            <p className="text-[12px] text-slate-700">
              01 Aug 2024
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StudentProfileSidebar;