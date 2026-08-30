import React, { useEffect, useState } from "react";

import {
  BookOpen,
  Loader2,
  AlertCircle,
  Pencil,
  Plus,
  Trash2,
  Save,
  X,
} from "lucide-react";

import {
  getAcademicSemester,
  updateAcademicSemester,
} from "../../api/academic.api";

const createEmptySubject = () => ({
  id: `new-${Date.now()}-${Math.random()}`,

  courseCode: "",
  courseName: "",

  credits: "",

  cia1: "",
  mse: "",
  cia3: "",
  ese: "",

  totalMarksObtained: "",
  maximumMarks: "",

  grade: "",
  gradePoint: "",

  attendance: "",
});

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

      setSemesterData(resolvedSemester);

      setSubjects(Array.isArray(resolvedSubjects) ? resolvedSubjects : []);

      setOriginalSubjects(
        Array.isArray(resolvedSubjects)
          ? JSON.parse(JSON.stringify(resolvedSubjects))
          : [],
      );
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
    let mounted = true;

    const run = async () => {
      if (!mounted) {
        return;
      }

      await fetchSemester();
    };

    run();

    return () => {
      mounted = false;
    };
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
  // UPDATE SUBJECT
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
  // ADD SUBJECT
  // =========================================================

  const handleAddSubject = () => {
    setSubjects((previous) => [...previous, createEmptySubject()]);
  };

  // =========================================================
  // REMOVE SUBJECT
  // =========================================================

  const handleRemoveSubject = (index) => {
    setSubjects((previous) => previous.filter((_, i) => i !== index));
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // -----------------------------------------
      // VALIDATION
      // -----------------------------------------

      for (let index = 0; index < subjects.length; index++) {
        const subject = subjects[index];

        if (!String(subject?.courseCode || "").trim()) {
          setError(`Subject ${index + 1}: Subject Code is required.`);

          setSaving(false);

          return;
        }

        if (!String(subject?.courseName || "").trim()) {
          setError(`Subject ${index + 1}: Subject Name is required.`);

          setSaving(false);

          return;
        }

        if (
          subject?.credits === "" ||
          subject?.credits === null ||
          subject?.credits === undefined
        ) {
          setError(`Subject ${index + 1}: Credits are required.`);

          setSaving(false);

          return;
        }
      }

      // -----------------------------------------
      // CLEAN PAYLOAD
      // -----------------------------------------

      const cleanSubjects = subjects.map((subject) => ({
        ...(subject?.id && !String(subject.id).startsWith("new-")
          ? {
              id: subject.id,
            }
          : {}),

        courseCode: String(subject.courseCode || "").trim(),

        courseName: String(subject.courseName || "").trim(),

        credits: Number(subject.credits),

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

        totalMarksObtained:
          subject.totalMarksObtained === "" ||
          subject.totalMarksObtained === null ||
          subject.totalMarksObtained === undefined
            ? null
            : Number(subject.totalMarksObtained),

        maximumMarks:
          subject.maximumMarks === "" ||
          subject.maximumMarks === null ||
          subject.maximumMarks === undefined
            ? null
            : Number(subject.maximumMarks),

        grade: String(subject.grade || "").trim(),

        gradePoint:
          subject.gradePoint === "" ||
          subject.gradePoint === null ||
          subject.gradePoint === undefined
            ? null
            : Number(subject.gradePoint),

        attendance:
          subject.attendance === "" ||
          subject.attendance === null ||
          subject.attendance === undefined
            ? null
            : Number(subject.attendance),
      }));

      // -----------------------------------------
      // API
      // -----------------------------------------

      const response = await updateAcademicSemester(semesterNumber, {
        semesterNumber: Number(semesterNumber),

        subjects: cleanSubjects,
      });

      console.log("Updated semester:", response);

      setSuccess(`Semester ${semesterNumber} updated successfully.`);

      setIsEditing(false);

      await fetchSemester();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Failed to update semester:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save semester changes.",
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
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#0B63F6]">
            Semester {semesterNumber} Details
          </h2>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-lg bg-[#0B63F6] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <Pencil size={14} />
            Add Semester Details
          </button>
        </div>

        <div className="flex min-h-[220px] items-center justify-center px-6">
          <div className="text-center">
            <BookOpen size={30} className="mx-auto mb-3 text-slate-300" />

            <p className="text-sm font-medium text-slate-500">
              No academic details available for Semester {semesterNumber}.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add subjects and marks to this semester.
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
              Editing only Semester {semesterNumber}
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
          EDIT CONTROLS
         ===================================================== */}

      {isEditing && (
        <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-5 py-3">
          <div>
            <p className="text-xs font-semibold text-blue-700">
              Edit Semester {semesterNumber}
            </p>

            <p className="mt-0.5 text-[10px] text-blue-500">
              You can modify marks, credits, grades and subjects.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddSubject}
            className="flex items-center gap-1.5 rounded-lg bg-[#0B63F6] px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={14} />
            Add Subject
          </button>
        </div>
      )}

      {/* =====================================================
          TABLE
         ===================================================== */}

      <div className="w-full overflow-x-auto scrollbar-hide">
        <table className="w-full border-collapse text-[11px] text-slate-700">
          {/* =================================================
              TABLE HEADER
             ================================================= */}

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

              {isEditing && (
                <th
                  rowSpan="2"
                  className="w-20 border border-slate-200 px-2 py-2 font-semibold"
                >
                  Action
                </th>
              )}
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

          {/* =================================================
              TABLE BODY
             ================================================= */}

          <tbody>
            {subjects.map((subject, index) => {
              const attendance =
                subject.attendance !== null &&
                subject.attendance !== undefined &&
                subject.attendance !== ""
                  ? Number(subject.attendance)
                  : null;

              // =================================================
              // VIEW MODE
              // =================================================

              if (!isEditing) {
                return (
                  <tr
                    key={subject.id || subject.courseCode || index}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="border border-slate-200 px-2 py-3 text-center font-medium">
                      {index + 1}
                    </td>

                    <td className="whitespace-nowrap border border-slate-200 px-2 py-3 text-center font-semibold text-[#0B3B8F]">
                      {displayValue(subject.courseCode || subject.code)}
                    </td>

                    <td className="whitespace-nowrap border border-slate-200 px-3 py-3">
                      {displayValue(subject.courseName || subject.name)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center font-medium">
                      {displayValue(subject.credits)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center">
                      {displayValue(subject.cia1)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center">
                      {displayValue(subject.mse)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center">
                      {displayValue(subject.cia3)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center">
                      {displayValue(subject.ese)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center font-semibold">
                      {displayValue(
                        subject.totalMarksObtained ?? subject.obtained,
                      )}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center">
                      {displayValue(subject.maximumMarks ?? subject.max)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center font-semibold text-[#0B3B8F]">
                      {displayValue(subject.grade)}
                    </td>

                    <td className="border border-slate-200 px-2 py-3 text-center">
                      {displayValue(subject.gradePoint)}
                    </td>

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
              }

              // =================================================
              // EDIT MODE
              // =================================================

              return (
                <tr key={subject.id || index} className="bg-blue-50/30">
                  <td className="border border-slate-200 px-2 py-2 text-center font-medium">
                    {index + 1}
                  </td>

                  {/* COURSE CODE */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      value={subject.courseCode || ""}
                      onChange={(event) =>
                        handleSubjectChange(
                          index,
                          "courseCode",
                          event.target.value.toUpperCase(),
                        )
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* COURSE NAME */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      value={subject.courseName || ""}
                      onChange={(event) =>
                        handleSubjectChange(
                          index,
                          "courseName",
                          event.target.value,
                        )
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* CREDITS */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={subject.credits ?? ""}
                      onChange={(event) =>
                        handleSubjectChange(
                          index,
                          "credits",
                          event.target.value,
                        )
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* CIA 1 */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      type="number"
                      value={subject.cia1 ?? ""}
                      onChange={(event) =>
                        handleSubjectChange(index, "cia1", event.target.value)
                      }
                      className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* MSE */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      type="number"
                      value={subject.mse ?? ""}
                      onChange={(event) =>
                        handleSubjectChange(index, "mse", event.target.value)
                      }
                      className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* CIA 3 */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      type="number"
                      value={subject.cia3 ?? ""}
                      onChange={(event) =>
                        handleSubjectChange(index, "cia3", event.target.value)
                      }
                      className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* ESE */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      type="number"
                      value={subject.ese ?? ""}
                      onChange={(event) =>
                        handleSubjectChange(index, "ese", event.target.value)
                      }
                      className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* TOTAL OBTAINED */}
                  <td className="border border-slate-200 p-1.5">
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
                  </td>

                  {/* MAXIMUM */}
                  <td className="border border-slate-200 p-1.5">
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
                  </td>

                  {/* GRADE */}
                  <td className="border border-slate-200 p-1.5">
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
                  </td>

                  {/* GRADE POINT */}
                  <td className="border border-slate-200 p-1.5">
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
                  </td>

                  {/* ATTENDANCE */}
                  <td className="border border-slate-200 p-1.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={subject.attendance ?? ""}
                      onChange={(event) =>
                        handleSubjectChange(
                          index,
                          "attendance",
                          event.target.value,
                        )
                      }
                      className="w-full rounded border border-slate-200 bg-white px-1 py-1.5 text-center text-[11px] outline-none focus:border-blue-500"
                    />
                  </td>

                  {/* DELETE */}
                  <td className="border border-slate-200 px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(index)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      title="Remove subject"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* =================================================
                TOTAL ROW
               ================================================= */}

            {subjects.length > 0 && (
              <tr className="bg-white font-semibold">
                {/* TOTAL LABEL
                    8 columns:
                    # + Code + Name + Credits +
                    CIA1 + MSE + CIA3 + ESE
                */}

                <td
                  colSpan="8"
                  className="border border-slate-300 px-4 py-3 text-right text-[11px] text-slate-700"
                >
                  <span className="font-bold">Total Marks (In Words):</span>{" "}
                  <span>{totalMarksInWords}</span>
                </td>

                {/* TOTAL OBTAINED */}

                <td className="border border-slate-300 px-2 py-3 text-center text-[11px] font-bold text-slate-800">
                  {totalMarksObtained}
                </td>

                {/* TOTAL MAX */}

                <td className="border border-slate-300 px-2 py-3 text-center text-[11px] font-bold text-slate-800">
                  {maximumMarks}
                </td>

                {/* REMAINING COLUMNS */}

                <td
                  colSpan={isEditing ? "4" : "3"}
                  className="border border-slate-300 px-2 py-3"
                ></td>
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
