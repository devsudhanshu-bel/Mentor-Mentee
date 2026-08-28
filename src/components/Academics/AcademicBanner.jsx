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

  const [showClearedBacklogModal, setShowClearedBacklogModal] = useState(false);

  const [backlogCount, setBacklogCount] = useState(0);

  const [backlogRefreshKey, setBacklogRefreshKey] = useState(0);

  const semesterRecords =
    academicData?.semesters || academicData?.data?.semesters || [];

  const currentSemester = Number(
    academicData?.currentSemester ?? academicData?.data?.currentSemester ?? 1,
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

      setBacklogCount(Number.isFinite(activeCount) ? activeCount : 0);
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
        semester?.semesterNumber ?? semester?.semester ?? 0,
      );

      if (semesterNumber < 1 || semesterNumber >= currentSemester) {
        return;
      }

      if (semester?.hasRecord === false) {
        return;
      }

      const subjects = semester?.subjects || semester?.courses || [];

      let semesterCredits = Number(
        semester?.totalCredits ?? semester?.credits ?? 0,
      );

      if (semesterCredits <= 0 && Array.isArray(subjects)) {
        semesterCredits = subjects.reduce(
          (sum, subject) => sum + Number(subject?.credits || 0),
          0,
        );
      }

      if (semesterCredits <= 0) {
        return;
      }

      let semesterSGPA = semester?.sgpa ?? semester?.SGPA ?? semester?.gpa;

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

      // Existing 10-point records → 4-point scale
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
          semester?.semesterNumber ?? semester?.semester ?? 0,
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
            0,
        );

        if (credits > 0) {
          return total + credits;
        }

        if (Array.isArray(subjects)) {
          return (
            total +
            subjects.reduce(
              (sum, subject) => sum + Number(subject?.credits || 0),
              0,
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

  const getSelectedSemesterSGPA = (subjects) => {
    const semester =
      selectedSemesterData?.semester ||
      selectedSemesterData?.data?.semester ||
      selectedSemesterData?.data ||
      selectedSemesterData;

    const backendSGPA = semester?.sgpa ?? semester?.SGPA ?? semester?.gpa;

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
  // DOWNLOAD MARKS CARD
  // =========================================================

  const handleDownloadTranscript = () => {
    try {
      const subjects = getSelectedSemesterSubjects();

      if (!Array.isArray(subjects) || subjects.length === 0) {
        alert(
          `No academic records found for Semester ${selectedSemesterLabel}.`,
        );

        return;
      }

      const semesterSGPA = getSelectedSemesterSGPA(subjects);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();

      const pageHeight = pdf.internal.pageSize.getHeight();

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

      pdf.setFont("helvetica", "bold");

      pdf.setFontSize(11);

      pdf.setTextColor(8, 43, 115);

      pdf.text("Course Details", 15, y);

      y += 7;

      const tableX = 10;

      const columnWidths = [25, 48, 12, 15, 15, 15, 15, 18, 15, 18];

      const headers = [
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

      pdf.setFillColor(11, 99, 246);

      pdf.rect(tableX, y, tableWidth, rowHeight, "F");

      pdf.setTextColor(255, 255, 255);

      pdf.setFontSize(7);

      let x = tableX;

      headers.forEach((header, index) => {
        pdf.text(header, x + columnWidths[index] / 2, y + 6, {
          align: "center",
        });

        x += columnWidths[index];
      });

      y += rowHeight;

      subjects.forEach((subject, index) => {
        if (y > 270) {
          pdf.addPage();

          y = 20;
        }

        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);

          pdf.rect(tableX, y, tableWidth, rowHeight, "F");
        }

        pdf.setDrawColor(220, 226, 235);

        pdf.rect(tableX, y, tableWidth, rowHeight);

        x = tableX;

        const row = [
          subject?.courseCode || "-",
          subject?.courseName || "-",
          subject?.credits ?? "-",
          subject?.cia1 ?? "-",
          subject?.mse ?? "-",
          subject?.cia3 ?? "-",
          subject?.ese ?? "-",
          subject?.totalMarksObtained ?? subject?.totalMarks ?? "-",
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

          if (cellIndex === 1 && text.length > 25) {
            text = text.substring(0, 23) + "...";
          }

          pdf.text(text, x + columnWidths[cellIndex] / 2, y + 6, {
            align: "center",
          });

          x += columnWidths[cellIndex];
        });

        y += rowHeight;
      });

      y += 12;

      const totalSemesterCredits = subjects.reduce(
        (sum, subject) => sum + Number(subject?.credits || 0),
        0,
      );

      pdf.setFillColor(239, 246, 255);

      pdf.roundedRect(15, y, pageWidth - 30, 28, 3, 3, "F");

      pdf.setTextColor(8, 43, 115);

      pdf.setFont("helvetica", "bold");

      pdf.setFontSize(10);

      pdf.text("Semester Summary", 22, y + 8);

      pdf.setFont("helvetica", "normal");

      pdf.setFontSize(9);

      pdf.text(`Total Subjects: ${subjects.length}`, 22, y + 17);

      pdf.text(`Total Credits: ${totalSemesterCredits}`, 85, y + 17);

      pdf.text(
        `SGPA: ${semesterSGPA !== null ? semesterSGPA.toFixed(2) : "--"} / 4`,
        150,
        y + 17,
      );

      pdf.setDrawColor(220, 226, 235);

      pdf.line(15, pageHeight - 18, pageWidth - 15, pageHeight - 18);

      pdf.setFontSize(7);

      pdf.setTextColor(120, 130, 145);

      pdf.text(
        "Generated from Mentor-Mentee Academic Information System",
        pageWidth / 2,
        pageHeight - 11,
        {
          align: "center",
        },
      );

      pdf.save(`Semester_${activeSemester}_Marks_Card.pdf`);
    } catch (error) {
      console.error("Failed to generate marks card:", error);

      alert("Unable to generate the marks card. Please try again.");
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5">
        <div className="flex items-center justify-between gap-6">
          {/* LEFT */}
          <div className="flex items-center flex-1 gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-[2px] border-white shadow shrink-0">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-[22px] font-bold text-[#082B73] leading-tight">
                Sudhanshu Sreedhara Belavarthy
              </h1>

              <div className="flex items-center gap-3 mt-1 text-[13px] text-slate-600">
                <span>2362177</span>
                <span>•</span>
                <span>B.Tech - AI & Data Science Engineering</span>
                <span>•</span>
                <span>Semester {currentSemesterLabel}</span>
              </div>

              <div className="flex items-center mt-5">
                {/* CGPA */}
                <div className="flex items-start gap-2 pr-6">
                  <GraduationCap size={16} className="text-blue-600 mt-0.5" />

                  <div>
                    <p className="text-[10px] text-slate-500">CGPA</p>

                    <div className="flex items-end gap-1">
                      <span className="text-[15px] font-bold text-[#082B73]">
                        {displayedCGPA}
                      </span>

                      <span className="text-[12px] text-slate-500">/4</span>
                    </div>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-200 mx-5" />

                {/* Credits */}
                <div className="flex items-start gap-2 pr-6">
                  <BookOpen size={16} className="text-blue-600 mt-0.5" />

                  <div>
                    <p className="text-[10px] text-slate-500">Credits Earned</p>

                    <span className="text-[15px] font-bold text-[#082B73]">
                      {creditsEarned}
                    </span>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-200 mx-5" />

                {/* Backlogs */}
                <div className="flex items-start gap-2 pr-6">
                  <CalendarCheck size={16} className="text-blue-600 mt-0.5" />

                  <div>
                    <p className="text-[10px] text-slate-500">Backlogs</p>

                    <span className="text-[15px] font-bold text-[#082B73]">
                      {backlogCount}
                    </span>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-200 mx-5" />

                {/* Standing */}
                <div className="flex items-start gap-2">
                  <ShieldCheck size={16} className="text-blue-600 mt-0.5" />

                  <div>
                    <p className="text-[10px] text-slate-500">
                      Academic Standing
                    </p>

                    <span className="inline-flex items-center px-3 py-0.5 mt-1 rounded-full text-[11px] font-semibold bg-green-100 text-green-700">
                      {academicStanding}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="w-[255px] rounded-xl border border-slate-200 p-5 shrink-0">
            <h2 className="text-[17px] font-semibold text-[#082B73] mb-5">
              Quick Links
            </h2>

            <div className="space-y-4">
              {/* DOWNLOAD */}
              <button
                type="button"
                onClick={handleDownloadTranscript}
                className="w-full flex items-center justify-between text-slate-700 hover:text-blue-600 transition"
              >
                <div className="flex items-center gap-2.5">
                  <Download size={15} />

                  <span className="text-[14px]">Download Transcript</span>
                </div>

                <ChevronRight size={15} />
              </button>

              {/* BACKLOGS */}
              <button
                type="button"
                onClick={() => setShowBacklogModal(true)}
                className="w-full flex items-center justify-between text-slate-700 hover:text-blue-600 transition"
              >
                <div className="flex items-center gap-2.5">
                  <AlertCircle size={15} />

                  <span className="text-[14px]">Backlogs</span>
                </div>

                <ChevronRight size={15} />
              </button>

              {/* CLEARED BACKLOGS */}
              <button
                type="button"
                onClick={() => setShowClearedBacklogModal(true)}
                className="w-full flex items-center justify-between text-slate-700 hover:text-green-600 transition"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-green-600" />

                  <span className="text-[14px]">Cleared Backlogs</span>
                </div>

                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* NOTE */}
        <div className="mt-5 rounded-xl bg-blue-600 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Info size={15} className="text-white" />
            </div>

            <p className="text-[12px] leading-5 text-white">
              <span className="font-semibold">Note:</span> If you have any
              backlogs, please enter the corresponding backlog details in the{" "}
              <span className="font-semibold">Backlogs</span> section provided
              alongside.
            </p>
          </div>
        </div>
      </div>

      {/* NORMAL BACKLOG MODAL */}
      <BacklogModal
        isOpen={showBacklogModal}
        onClose={() => setShowBacklogModal(false)}
        onBacklogChange={handleBacklogChange}
      />

      {/* COMPLETELY SEPARATE CLEARED MODAL */}
      <ClearedBacklogModal
        isOpen={showClearedBacklogModal}
        onClose={() => setShowClearedBacklogModal(false)}
        onBacklogChange={handleBacklogChange}
      />
    </>
  );
};

export default AcademicBanner;
