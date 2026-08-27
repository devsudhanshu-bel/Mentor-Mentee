import React, { useState } from "react";
import { Download } from "lucide-react";

import SemesterTabs from "./Academic/SemesterTabs";
import AcademicTable from "./Academic/AcademicTable";
import SemesterSummary from "./Academic/SemesterSummary";
import GradeDistribution from "./Academic/GradeDistribution";
import PerformanceTrend from "./Academic/PerformanceTrend";
import CourseStatus from "./Academic/CourseStatus";
import FooterNote from "./Academic/FooterNote";

const AcademicInformationCard = () => {
  const [activeSemester, setActiveSemester] = useState("Semester V");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">

      {/* ================= Header ================= */}

      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-lg font-semibold text-blue-600">
            Academic Information
          </h2>

          <p className="text-[13px] text-slate-500 mt-1">
            View semester-wise academic performance and course details.
          </p>

        </div>

        <button
          className="
            h-9
            px-4
            rounded-lg
            border
            border-slate-200
            bg-white
            text-[13px]
            font-medium
            text-blue-600
            flex
            items-center
            gap-2
            hover:bg-slate-50
            transition
          "
        >
          <Download size={15} />

          Download Transcript

        </button>

      </div>

      {/* ================= Semester Tabs ================= */}

      <SemesterTabs
        activeSemester={activeSemester}
        setActiveSemester={setActiveSemester}
      />

      {/* ================= Academic Table ================= */}

      <AcademicTable
        activeSemester={activeSemester}
      />

      {/* ================= Analytics ================= */}

      <div className="grid grid-cols-12 gap-4 mt-5">

        <div className="col-span-12 xl:col-span-3">
          <SemesterSummary />
        </div>

        <div className="col-span-12 xl:col-span-3">
          <GradeDistribution />
        </div>

        <div className="col-span-12 xl:col-span-3">
          <PerformanceTrend />
        </div>

        <div className="col-span-12 xl:col-span-3">
          <CourseStatus />
        </div>

      </div>

      {/* ================= Footer ================= */}

      <FooterNote />

    </div>
  );
};

export default AcademicInformationCard;