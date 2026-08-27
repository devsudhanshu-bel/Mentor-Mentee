import React from "react";
import { ExternalLink } from "lucide-react";

const StudentInfoCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-50 via-white to-white p-5 shadow-sm">
      {/* Avatar */}
      <div className="flex justify-center">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Student"
          className="h-20 w-20 rounded-full border-4 border-white object-cover shadow"
        />
      </div>

      {/* Student Details */}
      <div className="mt-4 text-center">
        <h2 className="text-[15px] font-semibold text-slate-800">
          Aarav Sharma
        </h2>

        <span className="mt-1 inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
          Active
        </span>

        <div className="mt-4 space-y-1 text-[12px] text-slate-600">
          <p>
            <span className="font-medium text-slate-500">Reg. No:</span>{" "}
            23CS1001
          </p>

          <p>BCA – Computer Science</p>

          <p>Semester IV</p>
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-[12px] font-medium text-blue-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50">
        <ExternalLink size={14} />
        View Full Profile
      </button>
    </div>
  );
};

export default StudentInfoCard;