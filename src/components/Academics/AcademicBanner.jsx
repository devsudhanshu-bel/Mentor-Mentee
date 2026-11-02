
import React, { useEffect, useMemo, useState } from "react";

import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  CalendarCheck,
  Download,
  AlertCircle,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";

import { jsPDF } from "jspdf";

import profile from "../../assets/profile.jpg";

import BacklogModal from "./BacklogModal";
import ClearedBacklogModal from "./ClearedBacklogModal";

import { getBacklogs } from "../../api/academic.api";

const AcademicBanner = ({
  academicData = null,
  selectedSemesterData = null,
  activeSemester = 1,
}) => {
  const [showBacklogModal, setShowBacklogModal] = useState(false);
  const [showClearedBacklogModal, setShowClearedBacklogModal] =
    useState(false);

  const [backlogCount, setBacklogCount] = useState(0);
  const [backlogRefreshKey, setBacklogRefreshKey] = useState(0);

  const semesterRecords =
    academicData?.semesters || academicData?.data?.semesters || [];

  const currentSemester = Number(
    academicData?.currentSemester ??
      academicData?.data?.currentSemester ??
      1
  );

  const semesterRomanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
  ];

  const currentSemesterLabel =
    semesterRomanNumerals[currentSemester - 1] || currentSemester;

  const selectedSemesterLabel =
    semesterRomanNumerals[Number(activeSemester) - 1] || activeSemester;

  // =========================================================
  // LOAD ACTIVE BACKLOG COUNT
  // =========================================================

  const loadBacklogCount = async () => {
    try {
      const response = await getBacklogs();

      const data = response?.data ?? response;

      const activeCount = Number(data?.activeCount ?? 0);

      setBacklogCount(
        Number.isFinite(activeCount) ? activeCount : 0
      );
    } catch (error) {
      console.error("Failed to load backlog count:", error);
      setBacklogCount(0);
    }
  };

  useEffect(() => {
    loadBacklogCount();
  }, [backlogRefreshKey]);

  const handleBacklogChange = () => {
    setBacklogRefreshKey((value) => value + 1);
  };

  // =========================================================
  // CGPA / 4
  // =========================================================

  const cgpa = useMemo(() => {
    if (!Array.isArray(semesterRecords) || semesterRecords.length === 0) {
      return null;
    }

    let totalWeightedPoints = 0;
    let totalCredits = 0;

    semesterRecords.forEach((semester) => {
      const semesterNumber = Number(
        semester?.semesterNumber ?? semester?.semester ?? 0
      );

      if (semesterNumber < 1 || semesterNumber >= currentSemester) {
        return;
      }

      if (semester?.hasRecord === false) {
        return;
      }

      const subjects = semester?.subjects || semester?.courses || [];

      let semesterCredits = Number(
        semester?.totalCredits ?? semester?.credits ?? 0
      );

      if (semesterCredits <= 0 && Array.isArray(subjects)) {
        semesterCredits = subjects.reduce(
          (sum, subject) => sum + Number(subject?.credits || 0),
          0
        );
      }

      if (semesterCredits <= 0) {
        return;
      }

      let semesterSGPA =
        semester?.sgpa ?? semester?.SGPA ?? semester?.gpa;

      if (
        semesterSGPA === null ||
        semesterSGPA === undefined ||
        semesterSGPA === ""
      ) {
        if (!Array.isArray(subjects) || subjects.length === 0) {
          return;
        }

        let weightedPoints = 0;
        let credits = 0;

        subjects.forEach((subject) => {
          const subjectCredits = Number(subject?.credits || 0);
          const gradePoint = Number(subject?.gradePoint || 0);

          if (subjectCredits > 0) {
            credits += subjectCredits;
            weightedPoints += subjectCredits * gradePoint;
          }
        });

        if (credits <= 0) {
          return;
        }

        semesterSGPA = weightedPoints / credits;
      }

      semesterSGPA = Number(semesterSGPA);

      if (!Number.isFinite(semesterSGPA)) {
        return;
      }

      if (semesterSGPA > 4) {
        semesterSGPA = (semesterSGPA / 10) * 4;
      }

      totalWeightedPoints += semesterSGPA * semesterCredits;
      totalCredits += semesterCredits;
    });

    if (totalCredits <= 0) {
      return null;
    }

    return totalWeightedPoints / totalCredits;
  }, [semesterRecords, currentSemester]);

  const displayedCGPA = cgpa !== null ? cgpa.toFixed(2) : "--";

  // =========================================================
  // CREDITS EARNED
  // =========================================================

  const creditsEarned = useMemo(() => {
    if (!Array.isArray(semesterRecords)) {
      return 0;
    }

    return semesterRecords
      .filter((semester) => {
        const semesterNumber = Number(
          semester?.semesterNumber ?? semester?.semester ?? 0
        );

        return (
          semesterNumber > 0 &&
          semesterNumber < currentSemester &&
          semester?.hasRecord !== false
        );
      })
      .reduce((total, semester) => {
        const subjects = semester?.subjects || semester?.courses || [];

        const credits = Number(
          semester?.creditsEarned ??
            semester?.totalCredits ??
            semester?.credits ??
            0
        );

        if (credits > 0) {
          return total + credits;
        }

        if (Array.isArray(subjects)) {
          return (
            total +
            subjects.reduce(
              (sum, subject) => sum + Number(subject?.credits || 0),
              0
            )
          );
        }

        return total;
      }, 0);
  }, [semesterRecords, currentSemester]);

  // =========================================================
  // ACADEMIC STANDING
  // =========================================================

  const academicStanding =
    cgpa === null
      ? "Not Available"
      : cgpa >= 3.5
        ? "Excellent"
        : cgpa >= 3.0
          ? "Very Good"
          : cgpa >= 2.5
            ? "Good"
            : cgpa >= 2.0
              ? "Satisfactory"
              : "Needs Improvement";

  // =========================================================
  // SELECTED SEMESTER SUBJECTS
  // =========================================================

  const getSelectedSemesterSubjects = () => {
    const semester =
      selectedSemesterData?.semester ||
      selectedSemesterData?.data?.semester ||
      selectedSemesterData?.data ||
      selectedSemesterData;

    return (
      semester?.subjects ||
      semester?.courses ||
      selectedSemesterData?.subjects ||
      []
    );
  };

  // =========================================================
  // SELECTED SEMESTER SGPA
  // =========================================================

  const getSelectedSemesterSGPA = (subjects) => {
    const semester =
      selectedSemesterData?.semester ||
      selectedSemesterData?.data?.semester ||
      selectedSemesterData?.data ||
      selectedSemesterData;

    const backendSGPA =
      semester?.sgpa ?? semester?.SGPA ?? semester?.gpa;

    if (
      backendSGPA !== null &&
      backendSGPA !== undefined &&
      backendSGPA !== ""
    ) {
      let value = Number(backendSGPA);

      if (value > 4) {
        value = (value / 10) * 4;
      }

      return value;
    }

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return null;
    }

    let weightedPoints = 0;
    let totalCredits = 0;

    subjects.forEach((subject) => {
      const credits = Number(subject?.credits || 0);
      const gradePoint = Number(subject?.gradePoint || 0);

      if (credits > 0) {
        weightedPoints += credits * gradePoint;
        totalCredits += credits;
      }
    });

    if (totalCredits <= 0) {
      return null;
    }

    let value = weightedPoints / totalCredits;

    if (value > 4) {
      value = (value / 10) * 4;
    }

    return value;
  };

  // =========================================================
  // NUMBER TO WORDS
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
  // DOWNLOAD SELECTED SEMESTER MARKS CARD
  // =========================================================

  const handleDownloadTranscript = () => {
    try {
      const subjects = getSelectedSemesterSubjects();

      if (!Array.isArray(subjects) || subjects.length === 0) {
        alert(
          `No academic records found for Semester ${selectedSemesterLabel}.`
        );
        return;
      }

      const semesterSGPA = getSelectedSemesterSGPA(subjects);

      const totalMarksObtained = subjects.reduce((total, subject) => {
        const value = Number(
          subject?.totalMarksObtained ??
            subject?.totalMarks ??
            subject?.obtained ??
            0
        );

        return total + (Number.isFinite(value) ? value : 0);
      }, 0);

      const maximumMarks = subjects.reduce((total, subject) => {
        const value = Number(
          subject?.maximumMarks ?? subject?.max ?? 0
        );

        return total + (Number.isFinite(value) ? value : 0);
      }, 0);

      const totalMarksInWords = numberToWords(totalMarksObtained);

      const totalSemesterCredits = subjects.reduce(
        (sum, subject) => sum + Number(subject?.credits || 0),
        0
      );

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // HEADER

      pdf.setFillColor(8, 43, 115);
      pdf.rect(0, 0, pageWidth, 32, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);

      pdf.text("ACADEMIC MARKS CARD", pageWidth / 2, 13, {
        align: "center",
      });

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");

      pdf.text(`Semester ${selectedSemesterLabel}`, pageWidth / 2, 21, {
        align: "center",
      });

      let y = 43;

      // STUDENT INFORMATION

      pdf.setTextColor(8, 43, 115);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);

      pdf.text("Student Information", 15, y);

      y += 8;

      pdf.setDrawColor(220, 226, 235);
      pdf.line(15, y, pageWidth - 15, y);

      y += 8;

      pdf.setFontSize(9);
      pdf.setTextColor(70, 80, 100);
      pdf.setFont("helvetica", "bold");

      pdf.text("Student Name:", 15, y);

      pdf.setFont("helvetica", "normal");
      pdf.text("Sudhanshu Sreedhara Belavarthy", 48, y);

      pdf.setFont("helvetica", "bold");
      pdf.text("Register No.:", 120, y);

      pdf.setFont("helvetica", "normal");
      pdf.text("2362177", 151, y);

      y += 7;

      pdf.setFont("helvetica", "bold");
      pdf.text("Programme:", 15, y);

      pdf.setFont("helvetica", "normal");
      pdf.text("B.Tech - AI & Data Science Engineering", 48, y);

      y += 7;

      pdf.setFont("helvetica", "bold");
      pdf.text("Semester:", 15, y);

      pdf.setFont("helvetica", "normal");
      pdf.text(`Semester ${selectedSemesterLabel}`, 48, y);

      y += 12;

      // COURSE DETAILS

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(8, 43, 115);

      pdf.text("Course Details", 15, y);

      y += 7;

      const tableX = 10;

      const columnWidths = [
        10, 23, 43, 10, 14, 14, 14, 14, 17, 14, 17,
      ];

      const headers = [
        "Sl No.",
        "Code",
        "Course",
        "Cr.",
        "CIA 1",
        "MSE",
        "CIA 3",
        "ESE",
        "Total",
        "Grade",
        "GP",
      ];

      const rowHeight = 9;

      const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

      // TABLE HEADER

      const drawTableHeader = () => {
        pdf.setFillColor(11, 99, 246);
        pdf.rect(tableX, y, tableWidth, rowHeight, "F");

        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7);

        let headerX = tableX;

        headers.forEach((header, index) => {
          pdf.text(
            header,
            headerX + columnWidths[index] / 2,
            y + 6,
            { align: "center" }
          );

          headerX += columnWidths[index];
        });

        y += rowHeight;
      };

      drawTableHeader();

      // SUBJECT ROWS

      subjects.forEach((subject, index) => {
        if (y > 250) {
          pdf.addPage();
          y = 20;
          drawTableHeader();
        }

        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(tableX, y, tableWidth, rowHeight, "F");
        }

        pdf.setDrawColor(220, 226, 235);
        pdf.rect(tableX, y, tableWidth, rowHeight);

        let x = tableX;

        const row = [
          index + 1,
          subject?.courseCode || subject?.code || "-",
          subject?.courseName || subject?.name || "-",
          subject?.credits ?? "-",
          subject?.cia1 ?? "-",
          subject?.mse ?? "-",
          subject?.cia3 ?? "-",
          subject?.ese ?? "-",
          subject?.totalMarksObtained ??
            subject?.totalMarks ??
            subject?.obtained ??
            "-",
          subject?.grade || "-",
          subject?.gradePoint ?? "-",
        ];

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(6.5);
        pdf.setTextColor(50, 60, 75);

        row.forEach((value, cellIndex) => {
          if (cellIndex > 0) {
            pdf.line(x, y, x, y + rowHeight);
          }

          let text = String(value);

          if (cellIndex === 2 && text.length > 25) {
            text = text.substring(0, 23) + "...";
          }

          pdf.text(
            text,
            x + columnWidths[cellIndex] / 2,
            y + 6,
            { align: "center" }
          );

          x += columnWidths[cellIndex];
        });

        y += rowHeight;
      });

      // TOTAL MARKS ROW

      y += 4;

      const totalRowHeight = 11;

      pdf.setFillColor(248, 250, 252);
      pdf.rect(tableX, y, tableWidth, totalRowHeight, "F");

      pdf.setDrawColor(180, 190, 205);
      pdf.rect(tableX, y, tableWidth, totalRowHeight);

      const totalLabelWidth = columnWidths
        .slice(0, 7)
        .reduce((a, b) => a + b, 0);

      pdf.setTextColor(50, 60, 75);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7);

      pdf.text("Total Marks (In Words):", tableX + 3, y + 7);

      pdf.setFont("helvetica", "normal");
      pdf.text(totalMarksInWords, tableX + 43, y + 7);

      pdf.line(
        tableX + totalLabelWidth,
        y,
        tableX + totalLabelWidth,
        y + totalRowHeight
      );

      const obtainedX = tableX + totalLabelWidth;

      pdf.setFont("helvetica", "bold");

      pdf.text(
        String(totalMarksObtained),
        obtainedX + columnWidths[7] / 2,
        y + 7,
        { align: "center" }
      );

      pdf.line(
        obtainedX + columnWidths[7],
        y,
        obtainedX + columnWidths[7],
        y + totalRowHeight
      );

      const maxX = obtainedX + columnWidths[7];

      pdf.text(
        String(maximumMarks),
        maxX + columnWidths[8] / 2,
        y + 7,
        { align: "center" }
      );

      pdf.line(
        maxX + columnWidths[8],
        y,
        maxX + columnWidths[8],
        y + totalRowHeight
      );

      // MARKS SUMMARY

      y += totalRowHeight + 8;

      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(15, y, pageWidth - 30, 25, 3, 3, "F");

      pdf.setTextColor(8, 43, 115);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);

      pdf.text("Marks Summary", 22, y + 8);

      pdf.setFontSize(8.5);
      pdf.setFont("helvetica", "normal");

      pdf.text(
        `Total Marks: ${totalMarksObtained} / ${maximumMarks}`,
        22,
        y + 17
      );

      pdf.text(
        `In Words: ${totalMarksInWords}`,
        95,
        y + 17
      );

      // SEMESTER SUMMARY

      y += 34;

      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(15, y, pageWidth - 30, 30, 3, 3, "F");

      pdf.setTextColor(8, 43, 115);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);

      pdf.text("Semester Summary", 22, y + 8);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);

      pdf.text(`Total Subjects: ${subjects.length}`, 22, y + 18);

      pdf.text(
        `Total Credits: ${totalSemesterCredits}`,
        85,
        y + 18
      );

      pdf.text(
        `SGPA: ${semesterSGPA !== null ? semesterSGPA.toFixed(2) : "--"} / 4`,
        150,
        y + 18
      );

      pdf.setFont("helvetica", "bold");
      pdf.text(`CGPA: ${displayedCGPA} / 4`, 22, y + 25);

      // FOOTER

      pdf.setDrawColor(220, 226, 235);
      pdf.line(15, pageHeight - 18, pageWidth - 15, pageHeight - 18);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(120, 130, 145);

      pdf.text(
        "Generated from Mentor-Mentee Academic Information System",
        pageWidth / 2,
        pageHeight - 11,
        { align: "center" }
      );

      // SAVE PDF

      pdf.save(`Semester_${activeSemester}_Marks_Card.pdf`);
    } catch (error) {
      console.error("Failed to generate marks card:", error);
      alert("Unable to generate the marks card. Please try again.");
    }
  };

  // =========================================================
  // REUSABLE METRIC CARD
  // =========================================================

  const MetricCard = ({ icon: Icon, label, children }) => (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 sm:border-0 sm:bg-transparent sm:p-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
          {label}
        </p>
        <div className="mt-0.5 min-w-0 text-sm font-bold text-[#082B73] sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );

  // =========================================================
  // QUICK LINK
  // =========================================================

  const QuickLink = ({ icon: Icon, label, onClick, color = "blue" }) => (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full min-w-0 items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            color === "green"
              ? "bg-green-50 text-green-600"
              : color === "red"
                ? "bg-red-50 text-red-600"
                : "bg-blue-50 text-blue-600"
          }`}
        >
          <Icon size={16} />
        </span>

        <span className="truncate text-sm font-medium text-slate-700 transition group-hover:text-blue-700">
          {label}
        </span>
      </span>

      <ChevronRight
        size={16}
        className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600"
      />
    </button>
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 lg:p-6">

        {/* ===================================================
            PROFILE + QUICK LINKS
        =================================================== */}

        <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_270px] xl:gap-7">

          {/* STUDENT INFORMATION */}

          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">

            {/* PROFILE IMAGE */}

            <div className="flex shrink-0 justify-center sm:justify-start">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md sm:h-24 sm:w-24">
                <img
                  src={profile}
                  alt="Student profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* STUDENT DETAILS */}

            <div className="min-w-0 flex-1 text-center sm:text-left">

              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h1 className="break-words text-xl font-bold leading-tight tracking-tight text-[#082B73] sm:text-2xl">
                  Sudhanshu Sreedhara Belavarthy
                </h1>

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-blue-600"
                />
              </div>

              {/* BASIC DETAILS */}

              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-500 sm:justify-start sm:text-sm">
                <span className="font-medium text-slate-700">
                  2362177
                </span>

                <span className="hidden text-slate-300 sm:inline">•</span>

                <span className="break-words">
                  B.Tech - AI & Data Science Engineering
                </span>

                <span className="hidden text-slate-300 sm:inline">•</span>

                <span>Semester {currentSemesterLabel}</span>
              </div>

              {/* ACADEMIC METRICS */}

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">

                <MetricCard icon={GraduationCap} label="CGPA">
                  <span>{displayedCGPA}</span>
                  <span className="ml-1 text-xs font-medium text-slate-400">
                    /4
                  </span>
                </MetricCard>

                <MetricCard icon={BookOpen} label="Credits Earned">
                  {creditsEarned}
                </MetricCard>

                <MetricCard icon={CalendarCheck} label="Backlogs">
                  <span
                    className={
                      backlogCount > 0
                        ? "text-red-600"
                        : "text-[#082B73]"
                    }
                  >
                    {backlogCount}
                  </span>
                </MetricCard>

                <MetricCard icon={ShieldCheck} label="Academic Standing">
                  <span
                    className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${
                      academicStanding === "Needs Improvement"
                        ? "bg-amber-50 text-amber-700"
                        : academicStanding === "Not Available"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-green-50 text-green-700"
                    }`}
                  >
                    {academicStanding}
                  </span>
                </MetricCard>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}

          <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 xl:p-4">
            <div className="mb-2 flex items-center justify-between gap-3 px-3 pt-1">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Shortcuts
                </p>
                <h2 className="mt-1 text-base font-bold text-[#082B73]">
                  Quick Links
                </h2>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <QuickLink
                icon={Download}
                label="Download Transcript"
                onClick={handleDownloadTranscript}
              />

              <QuickLink
                icon={AlertCircle}
                label="Backlogs"
                onClick={() => setShowBacklogModal(true)}
                color="red"
              />

              <QuickLink
                icon={CheckCircle2}
                label="Cleared Backlogs"
                onClick={() => setShowClearedBacklogModal(true)}
                color="green"
              />
            </div>
          </aside>
        </div>

        {/* ===================================================
            NOTE
        =================================================== */}

        <div className="mt-5 rounded-xl border border-blue-500 bg-blue-600 px-3 py-3 sm:px-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Info size={16} className="text-white" />
            </div>

            <p className="min-w-0 pt-0.5 text-xs leading-5 text-blue-50 sm:text-sm">
              <span className="font-semibold text-white">Note:</span>{" "}
              If you have any backlogs, please enter the corresponding backlog
              details in the{" "}
              <span className="font-semibold text-white">Backlogs</span>{" "}
              section provided alongside.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          NORMAL BACKLOG MODAL
      ===================================================== */}

      <BacklogModal
        isOpen={showBacklogModal}
        onClose={() => setShowBacklogModal(false)}
        onBacklogChange={handleBacklogChange}
      />

      {/* =====================================================
          CLEARED BACKLOG MODAL
      ===================================================== */}

      <ClearedBacklogModal
        isOpen={showClearedBacklogModal}
        onClose={() => setShowClearedBacklogModal(false)}
        onBacklogChange={handleBacklogChange}
      />
    </>
  );
};

export default AcademicBanner;
