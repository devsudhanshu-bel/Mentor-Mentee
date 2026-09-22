import { jsPDF } from "jspdf";

/* ==========================================================
   HELPERS
========================================================== */

const formatPercentage = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0.00%";
  }

  return `${number.toFixed(2)}%`;
};

const getAttendanceStatus = (percentage) => {
  const value = Number(percentage) || 0;

  if (value >= 95) {
    return "Excellent";
  }

  if (value >= 85) {
    return "Good";
  }

  if (value >= 75) {
    return "At Risk";
  }

  return "Critical";
};

const getStatusColor = (percentage) => {
  const value = Number(percentage) || 0;

  if (value >= 95) {
    return [22, 163, 74];
  }

  if (value >= 85) {
    return [37, 99, 235];
  }

  if (value >= 75) {
    return [234, 88, 12];
  }

  return [220, 38, 38];
};

const getRomanSemester = (semester) => {
  const roman = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
  };

  return roman[Number(semester)] || String(semester);
};

/* ==========================================================
   DRAW SECTION TITLE
========================================================== */

const drawSectionTitle = (doc, title, y) => {
  doc.setFillColor(20, 41, 112);

  doc.rect(40, y - 12, 515, 25, "F");

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(10);

  doc.text(title, 50, y + 4);

  return y + 25;
};

/* ==========================================================
   DRAW LABEL / VALUE
========================================================== */

const drawInfoRow = (doc, label, value, x, y, labelWidth = 90) => {
  doc.setFont("helvetica", "bold");

  doc.setFontSize(9);

  doc.setTextColor(80, 80, 80);

  doc.text(label, x, y);

  doc.setFont("helvetica", "normal");

  doc.setTextColor(30, 30, 30);

  doc.text(String(value || "—"), x + labelWidth, y);
};

/* ==========================================================
   DRAW TABLE
========================================================== */

const drawAttendanceTable = (doc, subjects, startY) => {
  const x = 40;

  const columnWidths = [32, 82, 180, 70, 70, 81];

  const headers = [
    "Sl No.",
    "Code",
    "Course",
    "Held",
    "Attended",
    "Attendance",
  ];

  const rowHeight = 28;

  let y = startY;

  /* ========================================================
     HEADER
  ======================================================== */

  doc.setFillColor(239, 243, 249);

  doc.rect(x, y, 515, rowHeight, "F");

  doc.setDrawColor(210, 218, 230);

  doc.rect(x, y, 515, rowHeight);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(8);

  doc.setTextColor(45, 55, 72);

  let currentX = x;

  headers.forEach((header, index) => {
    const width = columnWidths[index];

    doc.text(header, currentX + width / 2, y + 17, {
      align: "center",
    });

    if (index < headers.length - 1) {
      doc.line(currentX + width, y, currentX + width, y + rowHeight);
    }

    currentX += width;
  });

  y += rowHeight;

  /* ========================================================
     ROWS
  ======================================================== */

  doc.setFont("helvetica", "normal");

  doc.setFontSize(8);

  subjects.forEach((subject, index) => {
    /* ----------------------------------------------------
         PAGE BREAK
      ---------------------------------------------------- */

    if (y > 760) {
      doc.addPage();

      y = 50;

      doc.setFillColor(239, 243, 249);

      doc.rect(x, y, 515, rowHeight, "F");

      doc.rect(x, y, 515, rowHeight);

      doc.setFont("helvetica", "bold");

      doc.setFontSize(8);

      let headerX = x;

      headers.forEach((header, headerIndex) => {
        const width = columnWidths[headerIndex];

        doc.text(header, headerX + width / 2, y + 17, {
          align: "center",
        });

        if (headerIndex < headers.length - 1) {
          doc.line(headerX + width, y, headerX + width, y + rowHeight);
        }

        headerX += width;
      });

      y += rowHeight;

      doc.setFont("helvetica", "normal");

      doc.setFontSize(8);
    }

    /* ----------------------------------------------------
         DATA
      ---------------------------------------------------- */

    const held = Number(subject.classesHeld || 0);

    const attended = Number(subject.classesAttended || 0);

    const hasClassData = held > 0;

    const stored = Number(subject.storedAttendance);

    const percentage = hasClassData
      ? Number(subject.percentage || 0)
      : Number.isFinite(stored)
        ? stored
        : Number(subject.percentage || 0);

    const values = [
      String(index + 1),
      subject.courseCode || "—",
      subject.subjectName || "—",
      String(held),
      String(attended),
      formatPercentage(percentage),
    ];

    /* ----------------------------------------------------
         ROW BORDER
      ---------------------------------------------------- */

    doc.setDrawColor(220, 226, 234);

    doc.rect(x, y, 515, rowHeight);

    /* ----------------------------------------------------
         CELLS
      ---------------------------------------------------- */

    currentX = x;

    values.forEach((value, valueIndex) => {
      const width = columnWidths[valueIndex];

      const center =
        valueIndex === 0 ||
        valueIndex === 3 ||
        valueIndex === 4 ||
        valueIndex === 5;

      if (valueIndex === 5) {
        const [r, g, b] = getStatusColor(percentage);

        doc.setFillColor(r, g, b);

        doc.roundedRect(currentX + 10, y + 8, width - 20, 13, 6, 6, "F");

        doc.setTextColor(255, 255, 255);

        doc.setFont("helvetica", "bold");

        doc.text(value, currentX + width / 2, y + 17, {
          align: "center",
        });
      } else {
        doc.setTextColor(40, 50, 65);

        doc.setFont("helvetica", valueIndex === 1 ? "bold" : "normal");

        const text =
          valueIndex === 2 ? doc.splitTextToSize(value, width - 12) : value;

        if (center) {
          doc.text(text, currentX + width / 2, y + 17, {
            align: "center",
          });
        } else {
          doc.text(text, currentX + 6, y + 17);
        }
      }

      if (valueIndex < values.length - 1) {
        doc.setDrawColor(220, 226, 234);

        doc.line(currentX + width, y, currentX + width, y + rowHeight);
      }

      currentX += width;
    });

    y += rowHeight;
  });

  return y;
};

/* ==========================================================
   MAIN PDF GENERATOR
========================================================== */

export const generateAttendanceReport = (attendanceData) => {
  if (!attendanceData) {
    return;
  }

  const doc = new jsPDF({
    orientation: "portrait",

    unit: "pt",

    format: "a4",
  });

  const student = attendanceData.student || {};

  const subjects = Array.isArray(attendanceData.subjects)
    ? attendanceData.subjects
    : [];

  const summary = attendanceData.summary || {};

  const semester = Number(attendanceData.semester) || 1;

  /* ========================================================
       SUMMARY VALUES
    ======================================================== */

  const held = Number(summary.classesHeld || 0);

  const attended = Number(summary.classesAttended || 0);

  const storedPercentage = Number(summary.percentage);

  const percentage = Number.isFinite(storedPercentage)
    ? storedPercentage
    : held > 0
      ? (attended / held) * 100
      : 0;

  const missed = Math.max(held - attended, 0);

  /* ========================================================
       HEADER
    ======================================================== */

  doc.setTextColor(20, 41, 112);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(18);

  doc.text("CHRIST (DEEMED TO BE UNIVERSITY)", 297.64, 48, {
    align: "center",
  });

  doc.setFontSize(9);

  doc.setFont("helvetica", "normal");

  doc.setTextColor(90, 90, 90);

  doc.text("Bengaluru, Karnataka", 297.64, 65, {
    align: "center",
  });

  /* ========================================================
       TITLE
    ======================================================== */

  doc.setDrawColor(20, 41, 112);

  doc.line(40, 80, 555, 80);

  doc.setTextColor(20, 41, 112);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(16);

  doc.text("ACADEMIC ATTENDANCE REPORT", 297.64, 108, {
    align: "center",
  });

  doc.setFontSize(11);

  doc.text(`Semester ${getRomanSemester(semester)}`, 297.64, 126, {
    align: "center",
  });

  let y = 160;

  /* ========================================================
       STUDENT INFORMATION
    ======================================================== */

  y = drawSectionTitle(doc, "Student Information", y);

  drawInfoRow(doc, "Student Name:", student.fullName, 50, y + 22);

  drawInfoRow(doc, "Register No.:", student.registerNumber, 50, y + 42);

  drawInfoRow(doc, "Programme:", student.programme, 50, y + 62);

  drawInfoRow(
    doc,
    "Semester:",
    `Semester ${getRomanSemester(semester)}`,
    50,
    y + 82,
  );

  y += 115;

  /* ========================================================
       ATTENDANCE DETAILS
    ======================================================== */

  y = drawSectionTitle(doc, "Attendance Details", y);

  y += 15;

  y = drawAttendanceTable(doc, subjects, y);

  /* ========================================================
       SUMMARY
    ======================================================== */

  y += 25;

  if (y > 690) {
    doc.addPage();

    y = 55;
  }

  y = drawSectionTitle(doc, "Attendance Summary", y);

  y += 25;

  /* --------------------------------------------------------
       SUMMARY BOXES
    -------------------------------------------------------- */

  const boxWidth = 115;

  const boxHeight = 65;

  const boxGap = 12;

  const startX = 50;

  const summaryItems = [
    {
      label: "Classes Held",
      value: held,
    },
    {
      label: "Classes Attended",
      value: attended,
    },
    {
      label: "Classes Missed",
      value: missed,
    },
    {
      label: "Overall Attendance",
      value: formatPercentage(percentage),
    },
  ];

  summaryItems.forEach((item, index) => {
    const x = startX + index * (boxWidth + boxGap);

    doc.setFillColor(248, 250, 252);

    doc.setDrawColor(215, 222, 232);

    doc.roundedRect(x, y, boxWidth, boxHeight, 6, 6, "FD");

    doc.setFont("helvetica", "normal");

    doc.setFontSize(8);

    doc.setTextColor(90, 100, 115);

    doc.text(item.label, x + 10, y + 19);

    doc.setFont("helvetica", "bold");

    doc.setFontSize(13);

    if (item.label === "Overall Attendance") {
      const [r, g, b] = getStatusColor(percentage);

      doc.setTextColor(r, g, b);
    } else {
      doc.setTextColor(20, 41, 112);
    }

    doc.text(String(item.value), x + 10, y + 43);
  });

  y += 90;

  /* ========================================================
       STATUS
    ======================================================== */

  const status = getAttendanceStatus(percentage);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(10);

  doc.setTextColor(80, 80, 80);

  doc.text("Attendance Status:", 50, y);

  const [r, g, b] = getStatusColor(percentage);

  doc.setTextColor(r, g, b);

  doc.text(status, 145, y);

  /* ========================================================
       FOOTER
    ======================================================== */

  const pageCount = doc.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);

    const pageHeight = doc.internal.pageSize.height;

    doc.setDrawColor(220, 225, 232);

    doc.line(40, pageHeight - 55, 555, pageHeight - 55);

    doc.setFont("helvetica", "normal");

    doc.setFontSize(8);

    doc.setTextColor(120, 120, 120);

    doc.text(
      "Generated from Mentor-Mentee Academic Information System",
      40,
      pageHeight - 38,
    );

    doc.text(`Page ${page} of ${pageCount}`, 555, pageHeight - 38, {
      align: "right",
    });
  }

  /* ========================================================
       DOWNLOAD
    ======================================================== */

  const safeName = String(student.fullName || "Student")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "_");

  doc.save(
    `Attendance_Report_Semester_${getRomanSemester(semester)}_${safeName}.pdf`,
  );
};

export default generateAttendanceReport;
