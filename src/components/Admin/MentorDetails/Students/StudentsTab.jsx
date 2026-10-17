import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  getMentorDetails,
  getMentorAssignedStudents,
} from "../../../../api/mentor.api";

import StudentHierarchy from "./StudentHierarchy";
import StudentFilters from "./StudentFilters";
import StudentTable from "./StudentTable";

// ==========================================================
// HELPERS
// ==========================================================

const getOrdinal = (number) => {
  if (number % 100 >= 11 && number % 100 <= 13) {
    return "th";
  }

  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const isMissingValue = (value) => {
  if (value === null || value === undefined) {
    return true;
  }

  const normalized = String(value).trim().toLowerCase();

  return (
    normalized === "" ||
    normalized === "null" ||
    normalized === "undefined" ||
    normalized === "nan"
  );
};

const getYearLabel = (student) => {
  const candidates = [
    student.yearsAtUniversity,
    student.year,
    student.studyYear,
  ];

  const rawYear = candidates.find(
    (value) => !isMissingValue(value)
  );

  if (rawYear !== undefined) {
    const value = String(rawYear).trim();

    if (value.toLowerCase().includes("year")) {
      return value;
    }

    const match = value.match(/\d+/);

    if (match) {
      const year = Number(match[0]);

      if (year > 0) {
        return `${year}${getOrdinal(year)} Year`;
      }
    }
  }

  if (!isMissingValue(student.semester)) {
    const semester = Number(student.semester);

    if (Number.isFinite(semester) && semester > 0) {
      const year = Math.ceil(semester / 2);

      return `${year}${getOrdinal(year)} Year`;
    }
  }

  return "Other";
};

const getSectionLabel = (student) => {
  return isMissingValue(student.section)
    ? "Other"
    : String(student.section).trim();
};

const getMentorName = (mentor) => {
  if (!mentor) return "N/A";

  const directName = mentor.fullName ?? mentor.name;

  if (!isMissingValue(directName)) {
    return String(directName);
  }

  const combinedName = [
    mentor.firstName,
    mentor.lastName,
  ]
    .filter((part) => !isMissingValue(part))
    .join(" ");

  return combinedName || "N/A";
};

const getDepartmentName = (mentor) => {
  const department =
    mentor?.department?.name ??
    mentor?.departmentName ??
    mentor?.department;

  if (typeof department === "string") {
    return department || "N/A";
  }

  return department?.name ?? "N/A";
};

const formatPDFValue = (value) => {
  return isMissingValue(value) ? "N/A" : String(value);
};

// ==========================================================
// STUDENTS TAB
// ==========================================================

const StudentsTab = () => {
  const { mentorId } = useParams();

  const [students, setStudents] = useState([]);
  const [mentor, setMentor] = useState(null);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [loading, setLoading] = useState(true);
  const [mentorLoading, setMentorLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================================
  // LOAD ASSIGNED STUDENTS
  // ========================================================

  useEffect(() => {
    let mounted = true;

    const loadStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMentorAssignedStudents(mentorId);

        if (!mounted) return;

        const normalizedStudents = (
          Array.isArray(result) ? result : []
        ).map((student) => ({
          ...student,

          name:
            student.name ??
            student.fullName ??
            "Unknown Student",

          attendance:
            student.attendance ??
            student.overallAttendance ??
            null,
        }));

        setStudents(normalizedStudents);
      } catch (err) {
        console.error("Failed to load assigned students:", err);

        if (mounted) {
          setStudents([]);

          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load assigned students."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (!mentorId) {
      setStudents([]);
      setError("Mentor ID is missing.");
      setLoading(false);

      return () => {
        mounted = false;
      };
    }

    loadStudents();

    return () => {
      mounted = false;
    };
  }, [mentorId]);

  // ========================================================
  // LOAD MENTOR DETAILS FOR THE PDF
  // ========================================================

  useEffect(() => {
    let mounted = true;

    const loadMentor = async () => {
      try {
        setMentorLoading(true);

        const response = await getMentorDetails(mentorId);

        // Supports either an Axios response or an unwrapped API result.
        const body = response?.data ?? response;
        const payload = body?.data ?? body;

        if (mounted) {
          setMentor(payload?.mentor ?? payload ?? null);
        }
      } catch (err) {
        console.error("Failed to load mentor details:", err);

        if (mounted) {
          setMentor(null);
        }
      } finally {
        if (mounted) {
          setMentorLoading(false);
        }
      }
    };

    if (!mentorId) {
      setMentor(null);
      setMentorLoading(false);

      return () => {
        mounted = false;
      };
    }

    loadMentor();

    return () => {
      mounted = false;
    };
  }, [mentorId]);

  // ========================================================
  // RESET FILTERS WHEN MENTOR CHANGES
  // ========================================================

  useEffect(() => {
    setSelectedGroup(null);
    setSearch("");
    setSelectedYear("");
    setSelectedSection("");
  }, [mentorId]);

  // ========================================================
  // HIERARCHY FILTER
  // ========================================================

  const hierarchyFilteredStudents = useMemo(() => {
    if (!selectedGroup || selectedGroup.type === "all") {
      return students;
    }

    if (selectedGroup.type === "year") {
      return students.filter(
        (student) =>
          getYearLabel(student) === selectedGroup.value
      );
    }

    if (selectedGroup.type === "section") {
      const separatorIndex = selectedGroup.value.indexOf("::");

      if (separatorIndex === -1) {
        return students;
      }

      const groupYear = selectedGroup.value.slice(
        0,
        separatorIndex
      );

      const groupSection = selectedGroup.value.slice(
        separatorIndex + 2
      );

      return students.filter(
        (student) =>
          getYearLabel(student) === groupYear &&
          getSectionLabel(student) === groupSection
      );
    }

    return students;
  }, [students, selectedGroup]);

  // ========================================================
  // DYNAMIC FILTER OPTIONS
  // ========================================================

  const availableYears = useMemo(() => {
    return [
      ...new Set(students.map((student) => getYearLabel(student))),
    ].sort((a, b) => {
      if (a === "Other") return 1;
      if (b === "Other") return -1;

      return a.localeCompare(b, undefined, { numeric: true });
    });
  }, [students]);

  const availableSections = useMemo(() => {
    const relevantStudents = selectedYear
      ? students.filter(
          (student) => getYearLabel(student) === selectedYear
        )
      : students;

    return [
      ...new Set(
        relevantStudents.map((student) => getSectionLabel(student))
      ),
    ].sort((a, b) => {
      if (a === "Other") return 1;
      if (b === "Other") return -1;

      return a.localeCompare(b, undefined, { numeric: true });
    });
  }, [students, selectedYear]);

  // ========================================================
  // COMBINED FILTERS
  // ========================================================

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return hierarchyFilteredStudents.filter((student) => {
      const matchesSearch =
        !query ||
        [
          student.name,
          student.fullName,
          student.registerNumber,
          student.email,
          student.semester,
          student.section,
        ].some(
          (value) =>
            !isMissingValue(value) &&
            String(value).toLowerCase().includes(query)
        );

      const matchesYear =
        !selectedYear ||
        getYearLabel(student) === selectedYear;

      const matchesSection =
        !selectedSection ||
        getSectionLabel(student) === selectedSection;

      return matchesSearch && matchesYear && matchesSection;
    });
  }, [
    hierarchyFilteredStudents,
    search,
    selectedYear,
    selectedSection,
  ]);

  // ========================================================
  // EXPORT COMPLETE MENTOR REPORT AS PDF
  // ========================================================

  const handleExportPDF = () => {
    // Export all assigned students, not only filtered rows.
    if (students.length === 0) {
      alert("There are no assigned students to export.");
      return;
    }

    if (mentorLoading) {
      alert("Please wait while mentor details are loading.");
      return;
    }

    if (!mentor) {
      alert(
        "Mentor details could not be loaded. Please refresh and try again."
      );
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const navy = [18, 59, 112];
      const blue = [37, 99, 166];
      const muted = [82, 101, 122];
      const border = [216, 226, 238];

      const mentorName = getMentorName(mentor);

      const designation =
        mentor.designation ??
        mentor.profile?.designation ??
        mentor.teacher_profiles?.designation ??
        mentor.title ??
        mentor.role ??
        "N/A";

      const department = getDepartmentName(mentor);

      const email = mentor.email ?? "N/A";

      const phone =
        mentor.phone ??
        mentor.phoneNumber ??
        mentor.contactNumber ??
        "N/A";

      const generatedAt = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      // ------------------------------------------------------
      // REPORT HEADER
      // ------------------------------------------------------

      pdf.setFillColor(...navy);
      pdf.rect(0, 0, pageWidth, 37, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("MENTOR–MENTEE SYSTEM", 14, 10);

      pdf.setFontSize(20);
      pdf.text("Mentor Details", 14, 21);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(
        "Department Student Assignment Report",
        14,
        29
      );

      pdf.setFontSize(8);
      pdf.text(
        `Generated: ${generatedAt}`,
        pageWidth - 14,
        15,
        { align: "right" }
      );

      // ------------------------------------------------------
      // MENTOR INFORMATION
      // ------------------------------------------------------

      pdf.setTextColor(...navy);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Mentor Information", 14, 47);

      autoTable(pdf, {
        startY: 52,
        theme: "grid",
        margin: { left: 14, right: 14 },

        head: [[
          "Field",
          "Details",
          "Field",
          "Details",
        ]],

        body: [
          [
            "Mentor Name",
            mentorName,
            "Designation",
            formatPDFValue(designation),
          ],
          [
            "Department",
            department,
            "Assigned Students",
            String(students.length),
          ],
          [
            "Email",
            formatPDFValue(email),
            "Phone",
            formatPDFValue(phone),
          ],
        ],

        styles: {
          font: "helvetica",
          fontSize: 8,
          cellPadding: 3,
          textColor: [30, 41, 59],
          lineColor: border,
          lineWidth: 0.2,
          overflow: "linebreak",
        },

        headStyles: {
          fillColor: blue,
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor: [247, 250, 253],
        },

        columnStyles: {
          0: { cellWidth: 30, fontStyle: "bold" },
          1: { cellWidth: 85 },
          2: { cellWidth: 30, fontStyle: "bold" },
          3: { cellWidth: "auto" },
        },
      });

      // ------------------------------------------------------
      // STUDENT TABLE
      // ------------------------------------------------------

      const tableStartY = pdf.lastAutoTable.finalY + 12;

      pdf.setTextColor(...navy);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Assigned Students", 14, tableStartY);

      const studentRows = students.map((student, index) => [
        index + 1,
        formatPDFValue(student.registerNumber),
        formatPDFValue(student.name ?? student.fullName),
        formatPDFValue(student.email),
        formatPDFValue(student.semester),
        formatPDFValue(student.section),
        isMissingValue(
          student.attendance ?? student.overallAttendance
        )
          ? "N/A"
          : `${student.attendance ?? student.overallAttendance}%`,
        formatPDFValue(student.currentCGPA),
        formatPDFValue(student.status),
      ]);

      autoTable(pdf, {
        startY: tableStartY + 5,

        head: [[
          "#",
          "Register No.",
          "Student Name",
          "Email",
          "Semester",
          "Section",
          "Attendance",
          "CGPA",
          "Status",
        ]],

        body: studentRows,

        theme: "grid",

        margin: {
          top: 14,
          left: 10,
          right: 10,
          bottom: 17,
        },

        showHead: "everyPage",

        styles: {
          font: "helvetica",
          fontSize: 7,
          cellPadding: 2.5,
          overflow: "linebreak",
          textColor: [30, 41, 59],
          lineColor: border,
          lineWidth: 0.2,
          valign: "middle",
        },

        headStyles: {
          fillColor: navy,
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor: [247, 250, 253],
        },

        columnStyles: {
          0: { cellWidth: 8, halign: "center" },
          1: { cellWidth: 26 },
          2: { cellWidth: 39 },
          3: { cellWidth: 47 },
          4: { cellWidth: 17 },
          5: { cellWidth: 17 },
          6: { cellWidth: 23 },
          7: { cellWidth: 15 },
          8: { cellWidth: 24 },
        },

        didDrawPage: () => {
          pdf.setDrawColor(...border);
          pdf.setLineWidth(0.3);

          pdf.line(
            10,
            pageHeight - 12,
            pageWidth - 10,
            pageHeight - 12
          );

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);
          pdf.setTextColor(...muted);

          pdf.text(
            "Mentor–Mentee System | Department Report",
            10,
            pageHeight - 7
          );

          pdf.text(
            `Page ${pdf.internal.getNumberOfPages()}`,
            pageWidth - 10,
            pageHeight - 7,
            { align: "right" }
          );
        },
      });

      // ------------------------------------------------------
      // DOWNLOAD PDF
      // ------------------------------------------------------

      const safeName = mentorName
        .replace(/[^a-z0-9_-]+/gi, "_")
        .replace(/^_+|_+$/g, "");

      pdf.save(
        `Mentor_Report_${safeName || mentorId}.pdf`
      );
    } catch (err) {
      console.error("Failed to generate mentor PDF:", err);
      alert("Unable to generate the PDF. Please try again.");
    }
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Assigned Students
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Students currently assigned to this mentor.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          {/* STUDENT HIERARCHY */}
          <div className="xl:col-span-3">
            {loading ? (
              <div className="animate-pulse rounded-xl border border-slate-200 p-5">
                <div className="mb-4 h-4 w-32 rounded bg-slate-200" />
                <div className="h-9 rounded bg-slate-100" />
              </div>
            ) : (
              <StudentHierarchy
                students={students}
                selectedGroup={selectedGroup}
                onGroupSelect={setSelectedGroup}
              />
            )}
          </div>

          {/* FILTERS AND STUDENT TABLE */}
          <div className="space-y-4 xl:col-span-9">
            <StudentFilters
              search={search}
              onSearchChange={setSearch}
              year={selectedYear}
              onYearChange={(value) => {
                setSelectedYear(value);
                setSelectedSection("");
              }}
              section={selectedSection}
              onSectionChange={setSelectedSection}
              years={availableYears}
              sections={availableSections}
              students={filteredStudents}
              onExport={handleExportPDF}
            />

            {loading ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                Loading assigned students...
              </div>
            ) : error ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                Unable to load assigned students.
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span>
                    Showing{" "}
                    <span className="font-semibold text-slate-800">
                      {filteredStudents.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-800">
                      {students.length}
                    </span>{" "}
                    assigned students
                  </span>

                  {(search ||
                    selectedYear ||
                    selectedSection ||
                    selectedGroup) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSelectedYear("");
                        setSelectedSection("");
                        setSelectedGroup(null);
                      }}
                      className="font-medium text-blue-600 transition hover:text-blue-800"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                <StudentTable students={filteredStudents} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;