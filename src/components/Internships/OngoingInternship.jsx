import React from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
  Eye,
  FileText,
  Flag,
  CheckCircle2,
} from "lucide-react";

// ==========================================================
// DUMMY INTERNSHIP DATA
// ==========================================================
//
// This is intentionally static for now.
//
// Later this entire object will come from the backend API.
//
// ==========================================================

const internship = {
  companyName: "IBM India Pvt. Ltd.",

  internshipTitle: "AI Research Intern",

  companyLogo: null,

  startDate: "01 May 2025",

  endDate: "31 Jul 2025",

  duration: "3 Months",

  location: "Bengaluru",

  mode: "Hybrid",

  project:
    "Building a sentiment analysis model for customer feedback using NLP techniques.",

  verificationStatus: "Approved",

  mentorRemark:
    "Your internship details have been reviewed and approved. You may proceed with your internship.",

  verifiedDate: "10 May 2025",

  supportingDocument: "Internship_Offer_Letter.pdf",

  completionRequested: false,
};

// ==========================================================
// COMPONENT
// ==========================================================

const OngoingInternship = () => {
  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

        <div>

          <h2 className="text-[15px] font-semibold text-slate-800">
            Ongoing Internship
          </h2>

          <p className="text-[11px] text-slate-400 mt-0.5">
            Your currently active internship
          </p>

        </div>

        {/* VERIFICATION STATUS */}

        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 border border-green-100 text-[10px] font-semibold px-3 py-1.5 rounded-full">

          <CheckCircle2 size={12} />

          {internship.verificationStatus}

        </span>

      </div>

      {/* ====================================================
          INTERNSHIP CONTENT
      ==================================================== */}

      <div className="p-5">

        {/* ==================================================
            COMPANY
        ================================================== */}

        <div className="flex items-center gap-4">

          {/* COMPANY LOGO / FALLBACK */}
          
          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">

            {internship.companyLogo ? (

              <img
                src={internship.companyLogo}
                alt={internship.companyName}
                className="w-10 h-10 object-contain"
              />

            ) : (

              <span className="text-lg font-bold text-[#142970]">
                IBM
              </span>

            )}

          </div>

          {/* COMPANY DETAILS */}

          <div className="min-w-0">

            <h3 className="text-[16px] font-semibold text-[#142970]">
              {internship.companyName}
            </h3>

            <p className="text-[13px] text-slate-500 mt-0.5">
              {internship.internshipTitle}
            </p>

          </div>

        </div>

        {/* ==================================================
            INFORMATION GRID
        ================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">

          {/* START DATE */}

          <div className="bg-slate-50 rounded-lg px-3 py-3">

            <div className="flex items-center gap-1.5 mb-1.5">

              <CalendarDays
                size={13}
                className="text-slate-400"
              />

              <p className="text-[10px] text-slate-500">
                Start Date
              </p>

            </div>

            <p className="text-[11px] font-semibold text-slate-700">
              {internship.startDate}
            </p>

          </div>

          {/* END DATE */}

          <div className="bg-slate-50 rounded-lg px-3 py-3">

            <div className="flex items-center gap-1.5 mb-1.5">

              <CalendarDays
                size={13}
                className="text-slate-400"
              />

              <p className="text-[10px] text-slate-500">
                End Date
              </p>

            </div>

            <p className="text-[11px] font-semibold text-slate-700">
              {internship.endDate}
            </p>

          </div>

          {/* DURATION */}

          <div className="bg-slate-50 rounded-lg px-3 py-3">

            <div className="flex items-center gap-1.5 mb-1.5">

              <Clock3
                size={13}
                className="text-slate-400"
              />

              <p className="text-[10px] text-slate-500">
                Duration
              </p>

            </div>

            <p className="text-[11px] font-semibold text-slate-700">
              {internship.duration}
            </p>

          </div>

          {/* LOCATION */}

          <div className="bg-slate-50 rounded-lg px-3 py-3">

            <div className="flex items-center gap-1.5 mb-1.5">

              <MapPin
                size={13}
                className="text-slate-400"
              />

              <p className="text-[10px] text-slate-500">
                Location
              </p>

            </div>

            <p className="text-[11px] font-semibold text-slate-700">
              {internship.location}
            </p>

          </div>

          {/* MODE */}

          <div className="bg-slate-50 rounded-lg px-3 py-3">

            <div className="flex items-center gap-1.5 mb-1.5">

              <Monitor
                size={13}
                className="text-slate-400"
              />

              <p className="text-[10px] text-slate-500">
                Mode
              </p>

            </div>

            <p className="text-[11px] font-semibold text-slate-700">
              {internship.mode}
            </p>

          </div>

        </div>

        {/* ==================================================
            PROJECT
        ================================================== */}

        <div className="mt-5">

          <h4 className="text-[12px] font-semibold text-slate-700">
            Internship Description
          </h4>

          <p className="text-[12px] text-slate-500 leading-5 mt-1.5">
            {internship.project}
          </p>

        </div>

        {/* ==================================================
            MENTOR REMARK
        ================================================== */}

        <div className="mt-5 bg-green-50 border border-green-100 rounded-lg px-4 py-3">

          <div className="flex items-start gap-3">

            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">

              <CheckCircle2
                size={14}
                className="text-green-600"
              />

            </div>

            <div className="min-w-0">

              <p className="text-[11px] font-semibold text-green-700">
                Mentor Remark
              </p>

              <p className="text-[11px] text-slate-600 leading-5 mt-1">
                {internship.mentorRemark}
              </p>

              <p className="text-[10px] text-slate-400 mt-1">
                Verified on {internship.verifiedDate}
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================
            DOCUMENT + ACTIONS
        ================================================== */}

        <div className="flex flex-wrap items-center justify-between gap-3 mt-5">

          {/* SUPPORTING DOCUMENT */}

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">

              <FileText
                size={15}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-[10px] text-slate-400">
                Supporting Document
              </p>

              <p className="text-[11px] font-medium text-slate-700">
                {internship.supportingDocument}
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">

            {/* VIEW DETAILS */}

            <button
              type="button"
              className="h-9 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-medium flex items-center gap-2 transition"
            >

              <Eye size={14} />

              View Details

            </button>

            {/* REQUEST COMPLETION */}

            {!internship.completionRequested && (
              <button
                type="button"
                className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium flex items-center gap-2 transition"
              >

                <Flag size={14} />

                Request Completion

              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default OngoingInternship;