import React from "react";
import { UserRound } from "lucide-react";

const AboutMe = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-3 flex items-center gap-2">
        <UserRound
          size={18}
          className="text-blue-600"
        />

        <h2 className="text-[18px] font-semibold text-slate-900">
          About Me
        </h2>
      </div>

      {/* ================= Content ================= */}
      <p className="text-[13px] leading-6 text-slate-600">
        I am the Head of the Department of Computer Science &
        Engineering with over 17 years of academic and research
        experience. My interests include Artificial Intelligence,
        Machine Learning, and Data Analytics. I enjoy mentoring
        faculty members and helping students excel in their
        academic and professional journeys.
      </p>
    </div>
  );
};

export default AboutMe;