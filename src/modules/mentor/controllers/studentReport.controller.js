
import PDFDocument from "pdfkit";
import asyncHandler from "../../../utils/asyncHandler.js";
import studentReportService from "../services/studentReport.service.js";

const C = {
  navy: "#173B72",
  blue: "#2563EB",
  lightBlue: "#EFF6FF",
  paleBlue: "#F8FAFC",
  border: "#DCE5F1",
  text: "#243247",
  muted: "#64748B",
  white: "#FFFFFF",
  green: "#15803D",
  lightGreen: "#F0FDF4",
  red: "#B91C1C",
  lightRed: "#FEF2F2",
  amber: "#92400E",
  lightAmber: "#FFFBEB",
};

const M = { left: 42, right: 42, top: 68, bottom: 54 };
const W = 595.28;
const H = 841.89;
const CW = W - M.left - M.right;
const CONTENT_BOTTOM = H - M.bottom;

const valueOrNA = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  if (typeof value === "boolean") return value ? "Yes" : "No";

  return String(value);
};

const fmtNumber = (value, decimals = 2) => {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);

  return number.toFixed(decimals).replace(/\.?0+$/, "");
};

const fmtDate = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fmtDateTime = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const titleCase = (value) => {
  if (!value) return "Not available";

  return String(value)
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const safeFilename = (value) =>
  String(value || "student")
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 70) || "student";

const statusColors = (value) => {
  const status = String(value || "").toUpperCase();

  if (
    status.includes("APPROVED") ||
    status === "COMPLETED" ||
    status === "VERIFIED" ||
    status === "ACTIVE" ||
    status === "CLEARED"
  ) {
    return { bg: C.lightGreen, fg: C.green };
  }

  if (
    status.includes("REJECTED") ||
    status === "FAILED" ||
    status === "CANCELLED"
  ) {
    return { bg: C.lightRed, fg: C.red };
  }

  if (
    status.includes("PENDING") ||
    status.includes("SUBMITTED") ||
    status === "SCHEDULED" ||
    status === "IN_PROGRESS"
  ) {
    return { bg: C.lightAmber, fg: C.amber };
  }

  return { bg: C.lightBlue, fg: C.navy };
};

const meetingDuration = (startAt, endAt) => {
  if (!startAt || !endAt) return "Not available";

  const start = new Date(startAt).getTime();
  const end = new Date(endAt).getTime();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    end < start
  ) {
    return "Not available";
  }

  const minutes = Math.round((end - start) / 60000);

  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
};

const meetingSummary = (meeting) => {
  const points = meeting.mentor_meeting_discussion_points || [];
  const notes = meeting.mentor_meeting_notes;

  const firstPoint = points.find((point) => point?.content?.trim())?.content;

  const noteText = Array.isArray(notes)
    ? notes.map((note) => note?.content).find((text) => text?.trim())
    : notes?.content;

  const summary =
    firstPoint ||
    noteText ||
    meeting.agenda ||
    meeting.description;

  if (!summary) return "No summary recorded";

  const cleaned = String(summary).replace(/\s+/g, " ").trim();

  return cleaned.length > 100
    ? `${cleaned.slice(0, 97).trimEnd()}...`
    : cleaned;
};

class StudentReportController {
  download = asyncHandler(async (req, res) => {
    const report = await studentReportService.getStudentReport(
      req.user?.id,
      req.params.studentId
    );

    const {
      student,
      mentor,
      semesters = [],
      internships = [],
      meetings = [],
    } = report;

    const backlogs = student.academicBacklogs || [];
    const generatedAt = report.generatedAt || new Date();

    const filename = [
      safeFilename(student.fullName),
      safeFilename(student.registerNumber),
      "Report",
      generatedAt.toISOString().slice(0, 10),
    ].join("_") + ".pdf";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");

    const doc = new PDFDocument({
      size: "A4",
      margins: M,
      bufferPages: true,
      info: {
        Title: `Student Report - ${student.fullName}`,
        Author: mentor.fullName || "Mentor-Mentee Management System",
        Subject: "Student Academic and Mentoring Report",
        CreationDate: generatedAt,
      },
    });

    doc.on("error", (error) => {
      console.error("Student report PDF error:", error);

      if (!res.headersSent) {
        res.status(500).end("Unable to generate student report");
      } else {
        res.destroy(error);
      }
    });

    doc.pipe(res);

    // --------------------------------------------------
    // REPEATING HEADER
    // --------------------------------------------------

    const drawHeader = () => {
      doc.save();

      doc.rect(0, 0, W, 7).fill(C.blue);

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(8)
        .text("MENTOR–MENTEE MANAGEMENT SYSTEM", M.left, 23, {
          lineBreak: false,
        });

      doc
        .fillColor(C.muted)
        .font("Helvetica")
        .fontSize(7)
        .text("STUDENT ACADEMIC DOSSIER", M.left, 36);

      doc
        .moveTo(M.left, 52)
        .lineTo(W - M.right, 52)
        .strokeColor(C.border)
        .lineWidth(0.7)
        .stroke();

      doc.restore();
    };

    doc.on("pageAdded", drawHeader);
    drawHeader();

    // --------------------------------------------------
    // LAYOUT HELPERS
    // --------------------------------------------------

    const ensureSpace = (height = 45) => {
      if (doc.y + height > CONTENT_BOTTOM) {
        doc.addPage();
      }
    };

    const section = (title, subtitle = "") => {
      ensureSpace(subtitle ? 58 : 42);

      doc.moveDown(0.45);

      const y = doc.y;

      doc
        .roundedRect(M.left, y, 4, 22, 2)
        .fill(C.blue);

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(12.5)
        .text(title, M.left + 12, y + 2, {
          width: CW - 12,
        });

      doc.y = y + 28;

      if (subtitle) {
        doc
          .fillColor(C.muted)
          .font("Helvetica")
          .fontSize(8)
          .text(subtitle, M.left + 12, doc.y, {
            width: CW - 12,
          });

        doc.moveDown(0.45);
      }

      doc.fillColor(C.text).font("Helvetica").fontSize(8.5);
    };

    const field = (label, value, options = {}) => {
      const x = options.x ?? M.left;
      const width = options.width ?? CW;
      const labelWidth = options.labelWidth ?? 120;
      const fontSize = options.fontSize ?? 8.5;
      const text = valueOrNA(value);
      const valueWidth = Math.max(25, width - labelWidth);

      doc.font("Helvetica").fontSize(fontSize);

      const valueHeight = doc.heightOfString(text, {
        width: valueWidth - 8,
      });

      const height = Math.max(12, valueHeight) + 4;

      ensureSpace(height);

      const y = doc.y;

      doc
        .fillColor(C.muted)
        .font("Helvetica")
        .fontSize(fontSize)
        .text(label, x, y, {
          width: labelWidth - 8,
        });

      doc
        .fillColor(C.text)
        .font("Helvetica")
        .fontSize(fontSize)
        .text(text, x + labelWidth, y, {
          width: valueWidth,
        });

      doc.y = y + height;
    };

    const paragraph = (label, value) => {
      const text = valueOrNA(value);

      doc.font("Helvetica-Bold").fontSize(8.5);
      const labelHeight = doc.heightOfString(label, { width: CW });

      doc.font("Helvetica").fontSize(8.5);
      const textHeight = doc.heightOfString(text, {
        width: CW - 12,
        lineGap: 2,
      });

      ensureSpace(labelHeight + textHeight + 18);

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(8.5)
        .text(label, M.left, doc.y);

      doc.moveDown(0.2);

      doc
        .fillColor(text === "Not available" ? C.muted : C.text)
        .font("Helvetica")
        .fontSize(8.5)
        .text(text, M.left + 5, doc.y, {
          width: CW - 10,
          lineGap: 2,
        });

      doc.moveDown(0.45);
    };

    const pill = (text, x, y) => {
      const label = titleCase(text);
      const colors = statusColors(text);
      const padding = 8;

      doc.font("Helvetica-Bold").fontSize(7.5);

      const width = Math.min(
        doc.widthOfString(label) + padding * 2,
        170
      );

      doc
        .roundedRect(x, y, width, 18, 8)
        .fill(colors.bg);

      doc
        .fillColor(colors.fg)
        .font("Helvetica-Bold")
        .fontSize(7.5)
        .text(label, x + padding, y + 5, {
          width: width - padding * 2,
          lineBreak: false,
          ellipsis: true,
        });

      return width;
    };

    const metricCard = (x, y, width, label, value, accent = C.blue) => {
      doc
        .roundedRect(x, y, width, 61, 8)
        .fillAndStroke(C.white, C.border);

      doc
        .roundedRect(x, y, 4, 61, 2)
        .fill(accent);

      doc
        .fillColor(C.muted)
        .font("Helvetica")
        .fontSize(7)
        .text(label, x + 10, y + 10, {
          width: width - 18,
        });

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(valueOrNA(value), x + 10, y + 29, {
          width: width - 18,
          height: 22,
          ellipsis: true,
        });
    };

    const recordHeader = (title, subtitle = "") => {
      ensureSpace(52);
      doc.moveDown(0.25);

      const y = doc.y;
      const height = subtitle ? 37 : 29;

      doc
        .roundedRect(M.left, y, CW, height, 6)
        .fillAndStroke(C.paleBlue, C.border);

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(title, M.left + 10, y + 6, {
          width: CW - 20,
          ellipsis: true,
        });

      if (subtitle) {
        doc
          .fillColor(C.muted)
          .font("Helvetica")
          .fontSize(7.3)
          .text(subtitle, M.left + 10, y + 21, {
            width: CW - 20,
            ellipsis: true,
          });
      }

      doc.y = y + height + 8;
    };

    // --------------------------------------------------
    // TABLE HELPER
    // --------------------------------------------------

    const table = (columns, rows, options = {}) => {
      if (!rows.length) return;

      const tableWidth = options.width || CW;
      const headerHeight = options.headerHeight || 25;
      const padding = options.padding || 6;
      const fontSize = options.fontSize || 7.5;

      const totalWeight = columns.reduce(
        (sum, column) => sum + column.weight,
        0
      );

      const cols = columns.map((column) => ({
        ...column,
        width: (column.weight / totalWeight) * tableWidth,
      }));

      const drawTableHeader = () => {
        const y = doc.y;

        doc
          .roundedRect(M.left, y, tableWidth, headerHeight, 4)
          .fill(C.navy);

        let x = M.left;

        cols.forEach((column) => {
          doc
            .fillColor(C.white)
            .font("Helvetica-Bold")
            .fontSize(7)
            .text(column.label, x + 5, y + 7, {
              width: column.width - 10,
              height: headerHeight - 8,
              lineBreak: false,
              ellipsis: true,
            });

          x += column.width;
        });

        doc.y = y + headerHeight;
      };

      drawTableHeader();

      rows.forEach((row, index) => {
        const values = cols.map((column) => {
          const raw =
            typeof column.value === "function"
              ? column.value(row)
              : row[column.key];

          return valueOrNA(raw);
        });

        doc.font("Helvetica").fontSize(fontSize);

        const heights = values.map((value, columnIndex) =>
          doc.heightOfString(value, {
            width: cols[columnIndex].width - 10,
            lineGap: 1,
          })
        );

        const rowHeight = Math.max(...heights, 10) + padding * 2;

        if (doc.y + rowHeight > CONTENT_BOTTOM) {
          doc.addPage();
          drawTableHeader();
        }

        const y = doc.y;

        doc
          .rect(M.left, y, tableWidth, rowHeight)
          .fill(index % 2 === 0 ? C.paleBlue : C.white);

        doc
          .moveTo(M.left, y + rowHeight)
          .lineTo(M.left + tableWidth, y + rowHeight)
          .strokeColor(C.border)
          .lineWidth(0.45)
          .stroke();

        let x = M.left;

        cols.forEach((column, columnIndex) => {
          doc
            .fillColor(C.text)
            .font("Helvetica")
            .fontSize(fontSize)
            .text(values[columnIndex], x + 5, y + padding, {
              width: column.width - 10,
              lineGap: 1,
            });

          x += column.width;
        });

        doc.y = y + rowHeight;
      });

      doc.moveDown(0.35);
    };

    // --------------------------------------------------
    // COVER
    // --------------------------------------------------

    doc.moveDown(0.6);

    const coverY = doc.y;

    doc
      .roundedRect(M.left, coverY, CW, 112, 10)
      .fill(C.navy);

    doc
      .fillColor("#BFDBFE")
      .font("Helvetica-Bold")
      .fontSize(8)
      .text("MENTOR–MENTEE MANAGEMENT SYSTEM", M.left + 18, coverY + 16);

    doc
      .fillColor(C.white)
      .font("Helvetica-Bold")
      .fontSize(23)
      .text("Student Report", M.left + 18, coverY + 36);

    doc
      .fillColor("#DBEAFE")
      .font("Helvetica")
      .fontSize(8.5)
      .text(
        "Academic performance • Attendance • Internship • Mentoring",
        M.left + 18,
        coverY + 68,
        { width: CW - 36 }
      );

    doc
      .fillColor(C.white)
      .font("Helvetica")
      .fontSize(7.5)
      .text(`Generated ${fmtDateTime(generatedAt)}`, M.left + 18, coverY + 92);

    doc.y = coverY + 126;

    doc
      .fillColor(C.navy)
      .font("Helvetica-Bold")
      .fontSize(17)
      .text(valueOrNA(student.fullName), M.left, doc.y, {
        width: CW,
      });

    doc.moveDown(0.25);

    doc
      .fillColor(C.muted)
      .font("Helvetica")
      .fontSize(8.5)
      .text(
        `${valueOrNA(student.registerNumber)} • ${valueOrNA(student.programme)}`,
        M.left,
        doc.y,
        { width: CW }
      );

    doc.moveDown(0.5);

    let tagX = M.left;
    const tagY = doc.y;

    const semesterTag = pill(`Semester ${valueOrNA(student.semester)}`, tagX, tagY);
    tagX += semesterTag + 8;
    pill(`Section ${valueOrNA(student.section)}`, tagX, tagY);

    doc.y = tagY + 27;

    // --------------------------------------------------
    // STUDENT AND MENTOR INFORMATION
    // --------------------------------------------------

    section("Student Information");

    const half = (CW - 16) / 2;
    const infoStart = doc.y;

    const drawInfoColumn = (items, x, width) => {
      let y = infoStart;

      items.forEach(([label, value]) => {
        const text = valueOrNA(value);
        const labelWidth = 80;

        doc.font("Helvetica").fontSize(8);

        const valueHeight = doc.heightOfString(text, {
          width: width - labelWidth,
        });

        doc
          .fillColor(C.muted)
          .text(label, x, y, {
            width: labelWidth - 5,
          });

        doc
          .fillColor(C.text)
          .text(text, x + labelWidth, y, {
            width: width - labelWidth,
          });

        y += Math.max(valueHeight, 11) + 7;
      });

      return y;
    };

    const leftEnd = drawInfoColumn(
      [
        ["Register Number", student.registerNumber],
        ["Programme", student.programme],
        ["Current Semester", student.semester],
        ["Section", student.section],
      ],
      M.left,
      half
    );

    const rightEnd = drawInfoColumn(
      [
        ["Email", student.email],
        ["Phone", student.phone],
        ["Academic Standing", student.academicStanding],
        ["Academic Setup", student.academicSetupCompleted],
      ],
      M.left + half + 16,
      half
    );

    doc.y = Math.max(leftEnd, rightEnd) + 3;

    section("Mentor Information");
    field("Mentor Name", mentor.fullName);
    field("Employee Code", mentor.employeeCode);
    field("Mentor Email", mentor.email);

    // --------------------------------------------------
    // ACADEMIC OVERVIEW
    // --------------------------------------------------

    section("Academic Overview", "Summary values recorded in the student profile.");

    const gap = 8;
    const cardWidth = (CW - gap * 3) / 4;
    const cardY = doc.y;

    metricCard(M.left, cardY, cardWidth, "CURRENT CGPA", fmtNumber(student.currentCGPA));
    metricCard(M.left + cardWidth + gap, cardY, cardWidth, "TOTAL CREDITS", fmtNumber(student.totalCredits, 0));
    metricCard(
      M.left + (cardWidth + gap) * 2,
      cardY,
      cardWidth,
      "ATTENDANCE",
      student.overallAttendance == null
        ? "Not available"
        : `${fmtNumber(student.overallAttendance)}%`
    );
    metricCard(
      M.left + (cardWidth + gap) * 3,
      cardY,
      cardWidth,
      "BACKLOG RECORDS",
      backlogs.length,
      C.amber
    );

    doc.y = cardY + 73;

    section("Semester Performance", "Semester-level results and credit summary.");

    if (!semesters.length) {
      paragraph("Academic Records", "No semester records available.");
    } else {
      table(
        [
          { label: "SEM", key: "semesterNumber", weight: 0.55 },
          { label: "STATUS", value: (r) => titleCase(r.status), weight: 1.15 },
          { label: "ENTRY", value: (r) => titleCase(r.entryStatus), weight: 1.15 },
          { label: "SGPA", value: (r) => fmtNumber(r.sgpa), weight: 0.7 },
          { label: "CREDITS", key: "totalCredits", weight: 0.8 },
          { label: "EARNED", key: "creditsEarned", weight: 0.8 },
          { label: "BACKLOGS", key: "backlogs", weight: 0.8 },
        ],
        semesters,
        { fontSize: 7.2, padding: 7 }
      );
    }

    // --------------------------------------------------
    // SUBJECT MARKS AND ATTENDANCE
    // --------------------------------------------------

    section("Subject Results & Attendance", "Subject-level marks, grades, and recorded attendance.");

    if (!semesters.some((semester) => semester.subjects?.length)) {
      paragraph("Subject Records", "No subject records available.");
    }

    for (const semester of semesters) {
      const subjects = semester.subjects || [];
      if (!subjects.length) continue;

      ensureSpace(42);

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`Semester ${semester.semesterNumber}`, M.left, doc.y);

      doc.moveDown(0.35);

      table(
        [
          {
            label: "SUBJECT",
            value: (r) => `${valueOrNA(r.courseCode)}\n${valueOrNA(r.courseName)}`,
            weight: 2.8,
          },
          { label: "CR", key: "credits", weight: 0.45 },
          { label: "CIA 1", key: "cia1", weight: 0.65 },
          { label: "CIA 2", key: "cia2", weight: 0.65 },
          { label: "CIA 3", key: "cia3", weight: 0.65 },
          { label: "MSE", key: "mse", weight: 0.55 },
          { label: "ESE", key: "ese", weight: 0.55 },
          { label: "TOTAL", key: "totalMarksObtained", weight: 0.7 },
          { label: "GRADE", key: "grade", weight: 0.65 },
        ],
        subjects,
        { fontSize: 6.8, padding: 7, headerHeight: 25 }
      );

      table(
        [
          { label: "SUBJECT", key: "courseCode", weight: 2 },
          { label: "GRADE POINT", key: "gradePoint", weight: 0.9 },
          {
            label: "ATTENDANCE",
            value: (r) => {
              const percentage = Number(r.classesHeld) > 0
                ? (Number(r.classesAttended) / Number(r.classesHeld)) * 100
                : r.attendance;

              return percentage == null || percentage === ""
                ? "Not available"
                : `${fmtNumber(percentage)}%`;
            },
            weight: 1,
          },
          { label: "ATTENDED", key: "classesAttended", weight: 0.8 },
          { label: "HELD", key: "classesHeld", weight: 0.7 },
          { label: "MAX MARKS", key: "maximumMarks", weight: 0.85 },
        ],
        subjects,
        { fontSize: 7, padding: 6, headerHeight: 24 }
      );
    }

    // --------------------------------------------------
    // BACKLOG HISTORY
    // --------------------------------------------------

    section("Backlog History");

    if (!backlogs.length) {
      paragraph("Backlog Records", "No backlog records available.");
    } else {
      table(
        [
          {
            label: "SUBJECT",
            value: (r) => `${valueOrNA(r.subjectCode)}\n${valueOrNA(r.subjectName)}`,
            weight: 2.3,
          },
          { label: "SEM", key: "semesterNumber", weight: 0.65 },
          { label: "STATUS", value: (r) => titleCase(r.status), weight: 1 },
          { label: "CLEARED SEM", key: "clearedSemesterNumber", weight: 0.9 },
          { label: "GRADE", key: "clearedGrade", weight: 0.65 },
          { label: "MARKS", key: "clearedMarks", weight: 0.65 },
          { label: "CLEARED ON", value: (r) => fmtDate(r.clearedAt), weight: 1 },
        ],
        backlogs,
        { fontSize: 7, padding: 7 }
      );
    }

    // --------------------------------------------------
    // INTERNSHIP HISTORY
    // --------------------------------------------------

    section("Internship History", "Internship details, verification decisions, and review history.");

    if (!internships.length) {
      paragraph("Internship Records", "No internship records available.");
    }

    for (const internship of internships) {
      recordHeader(
        `${valueOrNA(internship.internshipTitle)} — ${valueOrNA(internship.companyName)}`,
        `${titleCase(internship.internshipType)} • ${titleCase(internship.mode)}`
      );

      pill(internship.status, M.left, doc.y);
      doc.y += 25;

      field("Role", internship.role);
      field("Project", internship.projectName);
      field("Location", internship.location);
      field("Internship Type", titleCase(internship.internshipType));
      field("Start Date", fmtDate(internship.startDate));
      field("End Date", fmtDate(internship.endDate));
      field("Internship Status", titleCase(internship.status));

      ensureSpace(30);

      const initialY = doc.y;

      doc
        .roundedRect(M.left, initialY, CW, 23, 5)
        .fill(C.lightBlue);

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .text("INITIAL VERIFICATION", M.left + 9, initialY + 7);

      pill(internship.verificationStatus, M.left + 175, initialY + 3);

      doc.y = initialY + 29;
      field("Verified On", fmtDate(internship.verifiedAt));

      ensureSpace(30);

      const completionY = doc.y;

      doc
        .roundedRect(M.left, completionY, CW, 23, 5)
        .fill(C.lightBlue);

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .text("COMPLETION VERIFICATION", M.left + 9, completionY + 7);

      pill(
        internship.completionVerificationStatus,
        M.left + 175,
        completionY + 3
      );

      doc.y = completionY + 29;

      field("Completion Verified On", fmtDate(internship.completionVerifiedAt));
      field("Completion Requested", internship.completionRequested);
      field("Completion Requested On", fmtDate(internship.completionRequestedAt));
      field("Rating", internship.rating);

      paragraph("Internship Description", internship.description);
      paragraph("Mentor Remarks", internship.mentorRemark);
      paragraph("Completion Mentor Remarks", internship.completionMentorRemark);

      const reviews = internship.internship_reviews || [];

      if (reviews.length) {
        ensureSpace(35);

        doc
          .fillColor(C.navy)
          .font("Helvetica-Bold")
          .fontSize(9)
          .text("Verification Review History", M.left, doc.y);

        doc.moveDown(0.35);

        table(
          [
            { label: "STAGE", value: (r) => titleCase(r.reviewStage), weight: 0.9 },
            { label: "DECISION", value: (r) => titleCase(r.decision), weight: 1 },
            { label: "REVIEWED ON", value: (r) => fmtDateTime(r.reviewedAt), weight: 1.5 },
            { label: "REMARKS", key: "remarks", weight: 2 },
          ],
          reviews,
          { fontSize: 7, padding: 7, headerHeight: 24 }
        );
      }

      doc.moveDown(0.4);
    }

    // --------------------------------------------------
    // COMPACT MEETING HISTORY TABLE
    // --------------------------------------------------

    section(
      "Mentor Meeting History",
      "A concise overview of meetings associated with this student and mentor."
    );

    if (!meetings.length) {
      paragraph("Meeting Records", "No meeting records available.");
    } else {
      const sortedMeetings = [...meetings].sort(
        (a, b) => new Date(b.startAt || 0) - new Date(a.startAt || 0)
      );

      table(
        [
          {
            label: "DATE & TIME",
            value: (meeting) => fmtDateTime(meeting.startAt),
            weight: 1.45,
          },
          {
            label: "MEETING",
            value: (meeting) => valueOrNA(meeting.title),
            weight: 1.55,
          },
          {
            label: "TYPE",
            value: (meeting) => titleCase(meeting.meetingType),
            weight: 0.8,
          },
          {
            label: "STATUS",
            value: (meeting) => titleCase(meeting.status),
            weight: 0.95,
          },
          {
            label: "DURATION",
            value: (meeting) => meetingDuration(meeting.startAt, meeting.endAt),
            weight: 0.75,
          },
          {
            label: "SUMMARY",
            value: (meeting) => meetingSummary(meeting),
            weight: 2.1,
          },
        ],
        sortedMeetings,
        {
          fontSize: 7,
          padding: 6,
          headerHeight: 27,
        }
      );

      doc.moveDown(0.3);

      doc
        .fillColor(C.muted)
        .font("Helvetica")
        .fontSize(7.5)
        .text(
          `${sortedMeetings.length} meeting record${sortedMeetings.length === 1 ? "" : "s"} included. Summaries use the first available discussion point, note, agenda, or description.`,
          M.left,
          doc.y,
          { width: CW }
        );

      doc.moveDown(0.5);
    }

    // --------------------------------------------------
    // REPORT INFORMATION
    // --------------------------------------------------

    section("Report Information");

    paragraph(
      "Purpose",
      "This report contains information recorded in the Mentor-Mentee Management System at the time of generation."
    );

    paragraph(
      "Data Availability",
      "Fields marked Not available indicate that the corresponding value was not recorded in the database. Values are presented as recorded and are not independently verified by this document."
    );

    field("Generated On", fmtDateTime(generatedAt));
    field("Student", student.fullName);
    field("Register Number", student.registerNumber);
    field("Prepared By", mentor.fullName);
    field("Mentor Employee Code", mentor.employeeCode);

    // --------------------------------------------------
    // PAGE FOOTERS
    // --------------------------------------------------

    const pageRange = doc.bufferedPageRange();

    for (let i = 0; i < pageRange.count; i += 1) {
      doc.switchToPage(pageRange.start + i);
      doc.save();

      const originalBottomMargin = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;

      const footerY = H - 30;

      doc
        .moveTo(M.left, footerY - 8)
        .lineTo(W - M.right, footerY - 8)
        .strokeColor(C.border)
        .lineWidth(0.6)
        .stroke();

      doc
        .fillColor(C.muted)
        .font("Helvetica")
        .fontSize(7)
        .text(
          `${valueOrNA(student.registerNumber)} • Generated ${fmtDate(generatedAt)}`,
          M.left,
          footerY,
          {
            width: CW - 105,
            lineBreak: false,
          }
        );

      doc
        .fillColor(C.navy)
        .font("Helvetica-Bold")
        .fontSize(7)
        .text(
          `PAGE ${i + 1} OF ${pageRange.count}`,
          W - M.right - 100,
          footerY,
          {
            width: 100,
            align: "right",
            lineBreak: false,
          }
        );

      doc.page.margins.bottom = originalBottomMargin;
      doc.restore();
    }

    doc.end();
  });
}

export default new StudentReportController();
