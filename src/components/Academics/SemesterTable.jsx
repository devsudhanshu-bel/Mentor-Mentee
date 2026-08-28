import React, { useEffect, useState } from "react";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";

import { getAcademicSemester } from "../../api/academic.api";

const SemesterTable = ({ semesterNumber = 1 }) => {
  const [semesterData, setSemesterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // Fetch selected semester whenever semesterNumber changes
  // =========================================================
  useEffect(() => {
    let isMounted = true;

    const fetchSemester = async () => {
      if (!semesterNumber) {
        return;
      }

      try {
        setLoading(true);
        setError("");
        setSemesterData(null);

        const response = await getAcademicSemester(semesterNumber);

        console.log(`Semester ${semesterNumber} response:`, response);

        if (isMounted) {
          setSemesterData(response);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        console.error(`Failed to load Semester ${semesterNumber}:`, err);

        const status = err?.response?.status;

        if (status === 403) {
          setError("This semester is currently locked.");
        } else if (status === 404) {
          setError(
            "Academic details for this semester have not been entered yet.",
          );
        } else {
          setError(
            err?.response?.data?.message || "Failed to load semester details.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSemester();

    return () => {
      isMounted = false;
    };
  }, [semesterNumber]);

  // =========================================================
  // Handle different possible API response structures
  // =========================================================
  const semester =
    semesterData?.semester ||
    semesterData?.data?.semester ||
    semesterData?.data ||
    semesterData;

  // =========================================================
  // Subjects
  // =========================================================
  const subjects =
    semester?.subjects ||
    semesterData?.subjects ||
    semesterData?.data?.subjects ||
    [];

  // =========================================================
  // Safe display helper
  // =========================================================
  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  // =========================================================
  // Loading state
  // =========================================================
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0B63F6]">
            <BookOpen size={19} />
            Semester {semesterNumber} Details
          </h2>
        </div>

        {/* Loading */}
        <div className="flex min-h-[220px] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Loader2 size={18} className="animate-spin text-[#0B63F6]" />
            Loading Semester {semesterNumber} details...
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Error state
  // =========================================================
  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#0B63F6]">
            Semester {semesterNumber} Details
          </h2>
        </div>

        {/* Error */}
        <div className="flex min-h-[220px] items-center justify-center px-6">
          <div className="flex max-w-md flex-col items-center text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
              <AlertCircle size={22} className="text-slate-500" />
            </div>

            <p className="text-sm font-medium text-slate-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // No subjects
  // =========================================================
  if (!subjects.length) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#0B63F6]">
            Semester {semesterNumber} Details
          </h2>
        </div>

        {/* Empty */}
        <div className="flex min-h-[220px] items-center justify-center px-6">
          <div className="text-center">
            <BookOpen size={30} className="mx-auto mb-3 text-slate-300" />

            <p className="text-sm font-medium text-slate-500">
              No academic details available for Semester {semesterNumber}.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Enter the semester details to display them here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Main table
  // =========================================================
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* =====================================================
          Header
         ===================================================== */}
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-[#0B63F6]">
          Semester {semesterNumber} Details
        </h2>
      </div>

      {/* =====================================================
          Table wrapper
         ===================================================== */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[11px] text-slate-700">
          {/* =================================================
              Table Header
             ================================================= */}
          <thead className="bg-white">
            {/* -----------------------------------------------
                Header Row 1
               ----------------------------------------------- */}
            <tr className="text-slate-700">
              {/* # */}
              <th
                rowSpan="2"
                className="w-10 border border-slate-200 px-2 py-2 font-semibold"
              >
                #
              </th>

              {/* Course Code */}
              <th
                rowSpan="2"
                className="w-24 border border-slate-200 px-2 py-2 font-semibold"
              >
                Course Code
              </th>

              {/* Course Name */}
              <th
                rowSpan="2"
                className="min-w-[210px] border border-slate-200 px-3 py-2 font-semibold"
              >
                Course Name
              </th>

              {/* Credits */}
              <th
                rowSpan="2"
                className="w-16 border border-slate-200 px-2 py-2 font-semibold"
              >
                Credits
              </th>

              {/* CIA Marks */}
              <th
                colSpan="3"
                className="border border-slate-200 px-2 py-2 text-center font-semibold"
              >
                CIA Marks
              </th>

              {/* ESE */}
              <th
                rowSpan="2"
                className="w-14 border border-slate-200 px-2 py-2 font-semibold"
              >
                ESE
              </th>

              {/* Total Marks */}
              <th
                colSpan="2"
                className="border border-slate-200 px-2 py-2 text-center font-semibold"
              >
                Total Marks
              </th>

              {/* Grade */}
              <th
                rowSpan="2"
                className="w-14 border border-slate-200 px-2 py-2 font-semibold"
              >
                Grade
              </th>

              {/* Grade Point */}
              <th
                rowSpan="2"
                className="w-16 border border-slate-200 px-2 py-2 font-semibold"
              >
                Grade Point
              </th>

              {/* Attendance */}
              <th
                rowSpan="2"
                className="w-24 border border-slate-200 px-2 py-2 font-semibold"
              >
                Attendance (%)
              </th>
            </tr>

            {/* -----------------------------------------------
                Header Row 2
               ----------------------------------------------- */}
            <tr>
              {/* CIA 1 */}
              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                CIA 1
              </th>

              {/* MSE */}
              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                MSE
              </th>

              {/* CIA 3 */}
              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                CIA 3
              </th>

              {/* Obtained */}
              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                Obtained
              </th>

              {/* Maximum */}
              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                Max
              </th>
            </tr>
          </thead>

          {/* =================================================
              Table Body
             ================================================= */}
          <tbody>
            {subjects.map((subject, index) => {
              const attendance =
                subject.attendance !== null &&
                subject.attendance !== undefined &&
                subject.attendance !== ""
                  ? Number(subject.attendance)
                  : null;

              return (
                <tr
                  key={subject.id || subject.courseCode || index}
                  className="transition-colors duration-150 hover:bg-slate-50"
                >
                  {/* # */}
                  <td className="border border-slate-200 px-2 py-3 text-center font-medium">
                    {index + 1}
                  </td>

                  {/* Course Code */}
                  <td className="whitespace-nowrap border border-slate-200 px-2 py-3 text-center font-semibold text-[#0B3B8F]">
                    {displayValue(subject.courseCode || subject.code)}
                  </td>

                  {/* Course Name */}
                  <td className="whitespace-nowrap border border-slate-200 px-3 py-3">
                    {displayValue(subject.courseName || subject.name)}
                  </td>

                  {/* Credits */}
                  <td className="border border-slate-200 px-2 py-3 text-center font-medium">
                    {displayValue(subject.credits)}
                  </td>

                  {/* CIA 1 */}
                  <td className="border border-slate-200 px-2 py-3 text-center">
                    {displayValue(subject.cia1)}
                  </td>

                  {/* MSE */}
                  <td className="border border-slate-200 px-2 py-3 text-center">
                    {displayValue(subject.mse)}
                  </td>

                  {/* CIA 3 */}
                  <td className="border border-slate-200 px-2 py-3 text-center">
                    {displayValue(subject.cia3)}
                  </td>

                  {/* ESE */}
                  <td className="border border-slate-200 px-2 py-3 text-center">
                    {displayValue(subject.ese)}
                  </td>

                  {/* Total Marks Obtained */}
                  <td className="border border-slate-200 px-2 py-3 text-center font-semibold">
                    {displayValue(
                      subject.totalMarksObtained ?? subject.obtained,
                    )}
                  </td>

                  {/* Maximum Marks */}
                  <td className="border border-slate-200 px-2 py-3 text-center">
                    {displayValue(subject.maximumMarks ?? subject.max)}
                  </td>

                  {/* Grade */}
                  <td className="border border-slate-200 px-2 py-3 text-center font-semibold text-[#0B3B8F]">
                    {displayValue(subject.grade)}
                  </td>

                  {/* Grade Point */}
                  <td className="border border-slate-200 px-2 py-3 text-center">
                    {displayValue(subject.gradePoint)}
                  </td>

                  {/* Attendance */}
                  <td className="border border-slate-200 px-2 py-3 text-center">
                    {attendance !== null ? (
                      <span
                        className={`inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-[10px] font-semibold ${
                          attendance >= 90
                            ? "bg-green-100 text-green-700"
                            : attendance >= 85
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {attendance}%
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          Footer
         ===================================================== */}
      <div className="border-t border-slate-200 bg-white px-5 py-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span>CIA - Continuous Internal Assessment</span>

          <span className="text-slate-300">|</span>

          <span>MSE - Mid Semester Examination</span>

          <span className="text-slate-300">|</span>

          <span>ESE - End Semester Examination</span>
        </div>
      </div>
    </div>
  );
};

export default SemesterTable;
