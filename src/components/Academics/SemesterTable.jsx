import React, { useEffect, useState } from "react";

import { BookOpen, Loader2, AlertCircle, Pencil, Save, X } from "lucide-react";

import {
  getAcademicSemester,
  updateAcademicSemester,
} from "../../api/academic.api";

// =========================================================
// NUMBER → WORDS
// =========================================================

const numberToWords = (number) => {
  const num = Math.round(Number(number) || 0);

  if (num === 0) {
    return "Zero";
  }

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convertBelowThousand = (value) => {
    let result = "";

    if (value >= 100) {
      result += ones[Math.floor(value / 100)] + " Hundred";

      value %= 100;

      if (value > 0) {
        result += " and ";
      }
    }

    if (value >= 20) {
      result += tens[Math.floor(value / 10)];

      value %= 10;

      if (value > 0) {
        result += " " + ones[value];
      }
    } else if (value > 0) {
      result += ones[value];
    }

    return result;
  };

  if (num < 1000) {
    return convertBelowThousand(num);
  }

  if (num < 1000000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    let result = convertBelowThousand(thousands) + " Thousand";

    if (remainder > 0) {
      result += " " + convertBelowThousand(remainder);
    }

    return result;
  }

  if (num < 100000000) {
    const lakhs = Math.floor(num / 100000);
    const remainder = num % 100000;

    let result = convertBelowThousand(lakhs) + " Lakh";

    if (remainder > 0) {
      result += " " + numberToWords(remainder);
    }

    return result;
  }

  return String(num);
};

// =========================================================
// COMPONENT
// =========================================================

const SemesterTable = ({ semesterNumber = 1 }) => {
  const [semesterData, setSemesterData] = useState(null);

  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [originalSubjects, setOriginalSubjects] = useState([]);

  // =========================================================
  // FETCH SEMESTER
  // =========================================================

  const fetchSemester = async () => {
    if (!semesterNumber) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setIsEditing(false);

      const response = await getAcademicSemester(semesterNumber);

      console.log(`Semester ${semesterNumber} response:`, response);

      const resolvedSemester =
        response?.semester ||
        response?.data?.semester ||
        response?.data ||
        response;

      const resolvedSubjects =
        resolvedSemester?.subjects ||
        response?.subjects ||
        response?.data?.subjects ||
        [];

      const safeSubjects = Array.isArray(resolvedSubjects)
        ? resolvedSubjects
        : [];

      setSemesterData(resolvedSemester);

      setSubjects(safeSubjects);

      setOriginalSubjects(JSON.parse(JSON.stringify(safeSubjects)));
    } catch (err) {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemester();
  }, [semesterNumber]);

  // =========================================================
  // DISPLAY VALUE
  // =========================================================

  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  // =========================================================
  // TOTAL MARKS
  // =========================================================

  const totalMarksObtained = subjects.reduce((total, subject) => {
    const value = Number(subject?.totalMarksObtained ?? subject?.obtained ?? 0);

    return total + (Number.isFinite(value) ? value : 0);
  }, 0);

  const maximumMarks = subjects.reduce((total, subject) => {
    const value = Number(subject?.maximumMarks ?? subject?.max ?? 0);

    return total + (Number.isFinite(value) ? value : 0);
  }, 0);

  const totalMarksInWords = numberToWords(totalMarksObtained);

  // =========================================================
  // START EDITING
  // =========================================================

  const handleStartEdit = () => {
    setError("");
    setSuccess("");

    setOriginalSubjects(JSON.parse(JSON.stringify(subjects)));

    setIsEditing(true);
  };

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancelEdit = () => {
    setSubjects(JSON.parse(JSON.stringify(originalSubjects)));

    setIsEditing(false);

    setError("");
    setSuccess("");
  };

  // =========================================================
  // UPDATE ONLY ACADEMIC FIELDS
  // =========================================================

  const handleSubjectChange = (index, field, value) => {
    setSubjects((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        semesterNumber: Number(semesterNumber),

        subjects: subjects.map((subject) => ({
          /*
           * ID ONLY identifies the existing
           * subject in the database.
           */

          id: subject.id,

          /*
           * ACADEMIC FIELDS ONLY
           */

          cia1:
            subject.cia1 === "" ||
            subject.cia1 === null ||
            subject.cia1 === undefined
              ? null
              : Number(subject.cia1),

          mse:
            subject.mse === "" ||
            subject.mse === null ||
            subject.mse === undefined
              ? null
              : Number(subject.mse),

          cia3:
            subject.cia3 === "" ||
            subject.cia3 === null ||
            subject.cia3 === undefined
              ? null
              : Number(subject.cia3),

          ese:
            subject.ese === "" ||
            subject.ese === null ||
            subject.ese === undefined
              ? null
              : Number(subject.ese),

          maximumMarks:
            subject.maximumMarks === "" ||
            subject.maximumMarks === null ||
            subject.maximumMarks === undefined
              ? null
              : Number(subject.maximumMarks),

          totalMarksObtained:
            subject.totalMarksObtained === "" ||
            subject.totalMarksObtained === null ||
            subject.totalMarksObtained === undefined
              ? null
              : Number(subject.totalMarksObtained),

          grade: subject.grade
            ? String(subject.grade).trim().toUpperCase()
            : null,

          gradePoint:
            subject.gradePoint === "" ||
            subject.gradePoint === null ||
            subject.gradePoint === undefined
              ? null
              : Number(subject.gradePoint),
        })),
      };

      console.log("ACADEMIC MARKS ONLY PAYLOAD:", payload);

      const response = await updateAcademicSemester(semesterNumber, payload);

      console.log("Academic update response:", response);

      setSuccess("Academic marks updated successfully.");

      setIsEditing(false);

      await fetchSemester();
    } catch (err) {
      console.error("Failed to update academic marks:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save academic marks.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0B63F6]">
            <BookOpen size={19} />
            Semester {semesterNumber} Details
          </h2>
        </div>

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
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#0B63F6]">
            Semester {semesterNumber} Details
          </h2>
        </div>

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
  // EMPTY
  // =========================================================

  if (!subjects.length && !isEditing) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#0B63F6]">
            Semester {semesterNumber} Details
          </h2>
        </div>

        <div className="flex min-h-[220px] items-center justify-center px-6">
          <div className="text-center">
            <BookOpen size={30} className="mx-auto mb-3 text-slate-300" />

            <p className="text-sm font-medium text-slate-500">
              No academic details available for Semester {semesterNumber}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-[#0B63F6]">
            Semester {semesterNumber} Details
          </h2>

          {isEditing && (
            <p className="mt-1 text-[11px] text-blue-500">
              Editing academic marks only
            </p>
          )}
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleStartEdit}
            className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
          >
            <Pencil size={14} />
            Edit Semester
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <X size={14} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#0B63F6] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {success && (
        <div className="mx-5 mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
          {success}
        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      {/* =====================================================
          EDIT NOTICE
      ===================================================== */}

      {isEditing && (
        <div className="border-b border-blue-100 bg-blue-50 px-5 py-3">
          <p className="text-xs font-semibold text-blue-700">
            Academic marks editing
          </p>

          <p className="mt-0.5 text-[10px] text-blue-500">
            Course details, credits and attendance are managed from the
            Attendance page and cannot be changed here.
          </p>
        </div>
      )}

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="w-full overflow-x-auto scrollbar-hide">
        <table className="w-full border-collapse text-[11px] text-slate-700">
          <thead className="bg-white">
            <tr className="text-slate-700">
              <th
                rowSpan="2"
                className="w-10 border border-slate-200 px-2 py-2 font-semibold"
              >
                #
              </th>

              <th
                rowSpan="2"
                className="w-28 border border-slate-200 px-2 py-2 font-semibold"
              >
                Course Code
              </th>

              <th
                rowSpan="2"
                className="min-w-[210px] border border-slate-200 px-3 py-2 font-semibold"
              >
                Course Name
              </th>

              <th
                rowSpan="2"
                className="w-16 border border-slate-200 px-2 py-2 font-semibold"
              >
                Credits
              </th>

              <th
                colSpan="3"
                className="border border-slate-200 px-2 py-2 text-center font-semibold"
              >
                CIA Marks
              </th>

              <th
                rowSpan="2"
                className="w-14 border border-slate-200 px-2 py-2 font-semibold"
              >
                ESE
              </th>

              <th
                colSpan="2"
                className="border border-slate-200 px-2 py-2 text-center font-semibold"
              >
                Total Marks
              </th>

              <th
                rowSpan="2"
                className="w-14 border border-slate-200 px-2 py-2 font-semibold"
              >
                Grade
              </th>

              <th
                rowSpan="2"
                className="w-16 border border-slate-200 px-2 py-2 font-semibold"
              >
                Grade Point
              </th>

              <th
                rowSpan="2"
                className="w-24 border border-slate-200 px-2 py-2 font-semibold"
              >
                Attendance (%)
              </th>
            </tr>

            <tr>
              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                CIA 1
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                MSE
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                CIA 3
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                Obtained
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                Max
              </th>
            </tr>
          </thead>

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
                  className={
                    isEditing
                      ? "bg-blue-50/20"
                      : "transition-colors hover:bg-slate-50"
                  }
                >
                  {/* # */}
                  <td className="border border-slate-200 px-2 py-3 text-center font-medium">
                    {index + 1}
                  </td>

                  {/* =================================================
                        COURSE CODE — READ ONLY
                    ================================================= */}

                  <td className="border border-slate-200 px-2 py-3 text-center font-semibold text-[#0B3B8F]">
                    {displayValue(subject.courseCode || subject.code)}
                  </td>

                  {/* =================================================
                        COURSE NAME — READ ONLY
                    ================================================= */}

                  <td className="border border-slate-200 px-3 py-3">
                    {displayValue(subject.courseName || subject.name)}
                  </td>

                  {/* =================================================
                        CREDITS — READ ONLY / FROM ATTENDANCE
                    ================================================= */}

                  <td className="border border-slate-200 px-2 py-3 text-center font-semibold">
                    {displayValue(subject.credits)}
                  </td>

                  {/* =================================================
                        CIA 1 — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        type="number"
                        value={subject.cia1 ?? ""}
                        onChange={(event) =>
                          handleSubjectChange(index, "cia1", event.target.value)
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center">
                        {displayValue(subject.cia1)}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        MSE — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        type="number"
                        value={subject.mse ?? ""}
                        onChange={(event) =>
                          handleSubjectChange(index, "mse", event.target.value)
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center">
                        {displayValue(subject.mse)}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        CIA 3 — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        type="number"
                        value={subject.cia3 ?? ""}
                        onChange={(event) =>
                          handleSubjectChange(index, "cia3", event.target.value)
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center">
                        {displayValue(subject.cia3)}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        ESE — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        type="number"
                        value={subject.ese ?? ""}
                        onChange={(event) =>
                          handleSubjectChange(index, "ese", event.target.value)
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center">
                        {displayValue(subject.ese)}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        TOTAL OBTAINED — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        type="number"
                        value={subject.totalMarksObtained ?? ""}
                        onChange={(event) =>
                          handleSubjectChange(
                            index,
                            "totalMarksObtained",
                            event.target.value,
                          )
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center font-semibold">
                        {displayValue(
                          subject.totalMarksObtained ?? subject.obtained,
                        )}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        MAXIMUM — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        type="number"
                        value={subject.maximumMarks ?? ""}
                        onChange={(event) =>
                          handleSubjectChange(
                            index,
                            "maximumMarks",
                            event.target.value,
                          )
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center">
                        {displayValue(subject.maximumMarks ?? subject.max)}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        GRADE — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        value={subject.grade || ""}
                        onChange={(event) =>
                          handleSubjectChange(
                            index,
                            "grade",
                            event.target.value.toUpperCase(),
                          )
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center font-semibold text-[#0B3B8F]">
                        {displayValue(subject.grade)}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        GRADE POINT — EDITABLE
                    ================================================= */}

                  <td className="border border-slate-200 p-1.5">
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        value={subject.gradePoint ?? ""}
                        onChange={(event) =>
                          handleSubjectChange(
                            index,
                            "gradePoint",
                            event.target.value,
                          )
                        }
                        className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-2 py-2 text-center">
                        {displayValue(subject.gradePoint)}
                      </div>
                    )}
                  </td>

                  {/* =================================================
                        ATTENDANCE — ALWAYS READ ONLY
                    ================================================= */}

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

            {/* =================================================
                TOTAL ROW
            ================================================= */}

            {subjects.length > 0 && (
              <tr className="bg-white font-semibold">
                <td
                  colSpan="8"
                  className="border border-slate-300 px-4 py-3 text-right text-[11px] text-slate-700"
                >
                  <span className="font-bold">Total Marks (In Words):</span>{" "}
                  <span>{totalMarksInWords}</span>
                </td>

                <td className="border border-slate-300 px-2 py-3 text-center text-[11px] font-bold text-slate-800">
                  {totalMarksObtained}
                </td>

                <td className="border border-slate-300 px-2 py-3 text-center text-[11px] font-bold text-slate-800">
                  {maximumMarks}
                </td>

                <td colSpan="3" className="border border-slate-300 px-2 py-3" />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          FOOTER
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
