import React from "react";

import {
  FileText,
  CalendarDays,
  Eye,
  Download,
  Upload,
  Check,
} from "lucide-react";

const ResumeCard = () => {
  const resume = {
    name: "Hitesh_Kakumani_Resume.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadedOn: "24 Aug 2026",
    lastUpdated: "24 Aug 2026",
    status: "Active",
  };

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleView = () => {
    console.log("View resume");
  };

  const handleDownload = () => {
    console.log("Download resume");
  };

  const handleUpdate = () => {
    console.log("Update resume");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
        w-full
        h-[620px]
        bg-white
        border
        border-slate-200
        rounded-[22px]
        shadow-[0_2px_8px_rgba(15,23,42,0.08)]
        overflow-hidden
        flex
        flex-col
      "
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          w-full
          px-7
          py-7
          border-b
          border-slate-200
          flex
          items-start
          shrink-0
        "
      >
        {/* ==================================================
            HEADER TEXT
        ================================================== */}

        <div
          className="
            min-w-0
            flex-1
            pr-2
          "
        >
          <h2
            className="
              text-[20px]
              leading-7
              font-semibold
              text-[#142970]
            "
          >
            My Resume
          </h2>

          <p
            className="
              text-[13px]
              text-[#8aa0c4]
              mt-2
              leading-6
              max-w-[255px]
            "
          >
            Keep your latest resume available for internship
            opportunities.
          </p>
        </div>
      </div>

      {/* ======================================================
          RESUME CONTENT
      ====================================================== */}

      <div
        className="
          w-full
          flex-1
          px-7
          py-7
          flex
          flex-col
        "
      >
        {/* ====================================================
            FILE INFORMATION
        ==================================================== */}

        <div
          className="
            w-full
            flex
            items-center
            gap-5
          "
        >
          {/* ==================================================
              FILE ICON
          ================================================== */}

          <div
            className="
              w-[72px]
              h-[72px]
              rounded-[16px]
              bg-red-50
              border
              border-red-100
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <FileText
              size={36}
              strokeWidth={1.8}
              className="text-red-500"
            />
          </div>

          {/* ==================================================
              FILE DETAILS
          ================================================== */}

          <div
            className="
              min-w-0
              flex-1
              py-1
            "
          >
            {/* FILE NAME */}

            <h3
              className="
                text-[15px]
                sm:text-[16px]
                leading-6
                font-semibold
                text-slate-800
                truncate
              "
              title={resume.name}
            >
              {resume.name}
            </h3>

            {/* =================================================
                TYPE + SIZE
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-2.5
                mt-2.5
              "
            >
              <span
                className="
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                {resume.type}
              </span>

              <span
                className="
                  text-[11px]
                  text-slate-300
                "
              >
                •
              </span>

              <span
                className="
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                {resume.size}
              </span>
            </div>

            {/* =================================================
                UPLOADED DATE
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-1.5
                mt-2
              "
            >
              <CalendarDays
                size={14}
                strokeWidth={1.8}
                className="
                  text-slate-400
                  shrink-0
                "
              />

              <span
                className="
                  text-[11px]
                  text-slate-400
                  whitespace-nowrap
                "
              >
                Uploaded on {resume.uploadedOn}
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================
            ACTION BUTTONS
        ==================================================== */}

        <div
          className="
            w-full
            flex
            items-center
            gap-2
            mt-8
          "
        >
          {/* ==================================================
              VIEW
          ================================================== */}

          <button
            type="button"
            onClick={handleView}
            className="
              h-9
              flex-1
              px-3
              rounded-md
              border
              border-slate-300
              bg-white
              hover:bg-slate-50
              hover:border-slate-400
              text-slate-700
              text-[11px]
              font-medium
              flex
              items-center
              justify-center
              gap-2
              transition
              duration-200
              whitespace-nowrap
            "
          >
            <Eye
              size={14}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span>
              View
            </span>
          </button>

          {/* ==================================================
              DOWNLOAD
          ================================================== */}

          <button
            type="button"
            onClick={handleDownload}
            className="
              h-9
              flex-1
              px-3
              rounded-md
              border
              border-slate-300
              bg-white
              hover:bg-slate-50
              hover:border-slate-400
              text-slate-700
              text-[11px]
              font-medium
              flex
              items-center
              justify-center
              gap-2
              transition
              duration-200
              whitespace-nowrap
            "
          >
            <Download
              size={14}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span>
              Download
            </span>
          </button>

          {/* ==================================================
              REPLACE RESUME
          ================================================== */}

          <button
            type="button"
            onClick={handleUpdate}
            className="
              h-9
              flex-1
              px-3
              rounded-md
              border
              border-blue-300
              bg-white
              hover:bg-blue-50
              hover:border-blue-400
              text-blue-600
              text-[11px]
              font-medium
              flex
              items-center
              justify-center
              gap-2
              transition
              duration-200
              whitespace-nowrap
            "
          >
            <Upload
              size={14}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span>
              Replace Resume
            </span>
          </button>
        </div>

        {/* FLEXIBLE SPACE */}

        <div className="flex-1 min-h-6" />
      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          w-full
          border-t
          border-slate-200
          px-7
          py-6
          flex
          items-center
          justify-between
          gap-4
          shrink-0
        "
      >
        {/* LAST UPDATED */}

        <div className="min-w-0">
          <p
            className="
              text-[11px]
              text-[#8aa0c4]
            "
          >
            Last Updated
          </p>

          <p
            className="
              text-[13px]
              font-semibold
              text-[#142970]
              mt-2
            "
          >
            {resume.lastUpdated}
          </p>
        </div>

        {/* STATUS */}

        <div
          className="
            w-[138px]
            h-[72px]
            px-3
            rounded-[18px]
            bg-green-50
            border
            border-green-100
            flex
            items-center
            justify-center
            gap-3
            shrink-0
          "
        >
          {/* CHECK */}

          <div
            className="
              w-[38px]
              h-[38px]
              rounded-full
              bg-green-500
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Check
              size={20}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>

          {/* STATUS */}

          <span
            className="
              text-[12px]
              font-semibold
              leading-5
              text-green-600
            "
          >
            Resume
            <br />
            Available
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;