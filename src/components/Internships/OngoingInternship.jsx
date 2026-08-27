import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
} from "lucide-react";

const OngoingInternship = () => {
  return (
    <div className="bg-green-50/40 border border-green-100 rounded-2xl p-5 shadow-sm h-[350px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-green-700">
          Ongoing Internship
        </h2>

        <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-3 py-1 rounded-full">
          In Progress
        </span>
      </div>

      {/* Internship Details */}
      <div className="flex items-center gap-4 mt-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
          alt="IBM"
          className="w-12 h-12 object-contain"
        />

        <div>
          <h3 className="text-[16px] font-semibold text-[#142970]">
            AI Research Intern
          </h3>

          <p className="text-[13px] text-slate-500">
            IBM India Pvt. Ltd.
          </p>
        </div>
      </div>

      {/* Information */}
      <div className="grid grid-cols-5 gap-3 mt-6">
        <div className="text-center">
          <CalendarDays
            size={14}
            className="mx-auto text-slate-500 mb-1"
          />
          <p className="text-[11px] text-slate-500">
            Start Date
          </p>
          <p className="text-[12px] font-semibold mt-1">
            01 May 2025
          </p>
        </div>

        <div className="text-center">
          <CalendarDays
            size={14}
            className="mx-auto text-slate-500 mb-1"
          />
          <p className="text-[11px] text-slate-500">
            End Date
          </p>
          <p className="text-[12px] font-semibold mt-1">
            31 Jul 2025
          </p>
        </div>

        <div className="text-center">
          <Clock3
            size={14}
            className="mx-auto text-slate-500 mb-1"
          />
          <p className="text-[11px] text-slate-500">
            Duration
          </p>
          <p className="text-[12px] font-semibold mt-1">
            3 Months
          </p>
        </div>

        <div className="text-center">
          <MapPin
            size={14}
            className="mx-auto text-slate-500 mb-1"
          />
          <p className="text-[11px] text-slate-500">
            Location
          </p>
          <p className="text-[12px] font-semibold mt-1">
            Bengaluru
          </p>
        </div>

        <div className="text-center">
          <Monitor
            size={14}
            className="mx-auto text-slate-500 mb-1"
          />
          <p className="text-[11px] text-slate-500">
            Mode
          </p>
          <p className="text-[12px] font-semibold mt-1">
            Hybrid
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-green-100 my-5"></div>

      {/* Project */}
      <div>
        <h4 className="text-[13px] font-semibold text-slate-700">
          Project
        </h4>

        <p className="text-[12px] text-slate-600 leading-6 mt-2">
          Building a sentiment analysis model for customer feedback using NLP
          techniques.
        </p>
      </div>

      {/* Button */}
      <div className="mt-auto pt-5">
        <button className="border border-green-500 text-green-700 text-[12px] font-semibold px-5 py-2 rounded-lg hover:bg-green-500 hover:text-white transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default OngoingInternship; 