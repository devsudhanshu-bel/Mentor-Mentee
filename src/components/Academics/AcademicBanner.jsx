import React from "react";
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  CalendarCheck,
  Download,
  BarChart3,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

const AcademicBanner = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex items-center justify-between gap-6">
      {/* LEFT */}
      <div className="flex items-center flex-1 gap-5">
        {/* Profile */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-[2px] border-white shadow shrink-0">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Student Details */}
        <div className="flex-1">
          <h1 className="text-[22px] font-bold text-[#082B73] leading-tight">
            Sudhanshu Sreedhara Belavarthy
          </h1>

          <div className="flex items-center gap-3 mt-1 text-[13px] text-slate-600">
            <span>2362177</span>
            <span>•</span>
            <span>B.Tech - AI & Data Science Engineering</span>
            <span>•</span>
            <span>Semester V</span>
          </div>

          {/* Stats */}
          <div className="flex items-center mt-5">
            {/* CGPA */}
            <div className="flex items-start gap-2 pr-6">
              <GraduationCap size={16} className="text-blue-600 mt-0.5" />

              <div>
                <p className="text-[10px] text-slate-500">CGPA</p>

                <div className="flex items-end gap-1">
                  <span className="text-[15px] font-bold text-[#082B73]">
                    8.92
                  </span>

                  <span className="text-[12px] text-slate-500">/10</span>
                </div>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 mx-5" />

            {/* Credits */}
            <div className="flex items-start gap-2 pr-6">
              <BookOpen size={16} className="text-blue-600 mt-0.5" />

              <div>
                <p className="text-[10px] text-slate-500">
                  Credits Earned
                </p>

                <span className="text-[15px] font-bold text-[#082B73]">
                  104
                </span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 mx-5" />

            {/* Backlogs */}
            <div className="flex items-start gap-2 pr-6">
              <CalendarCheck size={16} className="text-blue-600 mt-0.5" />

              <div>
                <p className="text-[10px] text-slate-500">Backlogs</p>

                <span className="text-[15px] font-bold text-[#082B73]">
                  0
                </span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 mx-5" />

            {/* Standing */}
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-blue-600 mt-0.5" />

              <div>
                <p className="text-[10px] text-slate-500">
                  Academic Standing
                </p>

                <span className="inline-flex items-center px-3 py-0.5 mt-1 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">
                  Excellent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[255px] rounded-xl border border-slate-200 p-5 shrink-0">
        <h2 className="text-[17px] font-semibold text-[#082B73] mb-5">
          Quick Links
        </h2>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between text-slate-700 hover:text-blue-600 transition">
            <div className="flex items-center gap-2.5">
              <Download size={15} />
              <span className="text-[14px]">
                Download Transcript
              </span>
            </div>

            <ChevronRight size={15} />
          </button>

          <button className="w-full flex items-center justify-between text-slate-700 hover:text-blue-600 transition">
            <div className="flex items-center gap-2.5">
              <BarChart3 size={15} />
              <span className="text-[14px]">
                Grade Analytics
              </span>
            </div>

            <ChevronRight size={15} />
          </button>

          <button className="w-full flex items-center justify-between text-slate-700 hover:text-blue-600 transition">
            <div className="flex items-center gap-2.5">
              <AlertCircle size={15} />
              <span className="text-[14px]">
                Backlogs
              </span>
            </div>

            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicBanner;