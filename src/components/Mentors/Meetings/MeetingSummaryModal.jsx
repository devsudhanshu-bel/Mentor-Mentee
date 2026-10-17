import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Download,
  MapPin,
  Video,
  FileText,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

import StudentDetailsCard from "./StudentDetailsCard";
import MeetingSummaryCard from "./MeetingSummaryCard";
import meetingsService from "../../../services/meetingsService";

// =========================================================
// HELPERS
// =========================================================

const firstValue = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getStatusLabel = (status) => {
  const labels = {
    SCHEDULED: "Scheduled",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    CANCELED: "Cancelled",
    NO_SHOW: "No Show",
  };

  const normalized = normalizeStatus(status);

  return labels[normalized] || normalized.replace(/_/g, " ");
};

const getStatusClasses = (status) => {
  const normalized = normalizeStatus(status);

  if (normalized === "COMPLETED") {
    return "bg-green-100 text-green-700";
  }

  if (normalized === "IN_PROGRESS") {
    return "bg-blue-100 text-blue-700";
  }

  if (
    normalized === "CANCELLED" ||
    normalized === "CANCELED" ||
    normalized === "NO_SHOW"
  ) {
    return "bg-red-100 text-red-700";
  }

  return "bg-amber-100 text-amber-700";
};

const unwrapMeetingResponse = (response) => {
  let result = response;

  for (let i = 0; i < 5; i += 1) {
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      result.data !== undefined &&
      (
        result.success !== undefined ||
        result.message !== undefined ||
        Object.keys(result).length === 1
      )
    ) {
      result = result.data;
    } else {
      break;
    }
  }

  return result?.meeting ?? result;
};

const toValidDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value) => {
  const date = toValidDate(value);

  if (!date) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  const date = toValidDate(value);

  if (!date) return "";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateDuration = (startValue, endValue) => {
  const start = toValidDate(startValue);
  const end = toValidDate(endValue);

  if (!start || !end || end <= start) return null;

  const totalSeconds = Math.floor(
    (end.getTime() - start.getTime()) / 1000
  );

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

const getMeetingId = (meeting) =>
  meeting?.id ??
  meeting?.meetingId ??
  meeting?.meeting_id ??
  meeting?.rawMeeting?.id ??
  null;

const getText = (value) => {
  if (typeof value === "string") return value.trim();

  if (typeof value === "number") return String(value);

  if (value && typeof value === "object") {
    return String(
      value.content ??
        value.text ??
        value.notes ??
        value.remarks ??
        value.description ??
        ""
    ).trim();
  }

  return "";
};

// =========================================================
// STUDENT HELPERS
// =========================================================

const getStudentName = (student) => {
  if (!student || typeof student !== "object") return "";

  const directName = firstValue(
    student.fullName,
    student.name,
    student.studentName,
    student.displayName,
    student.user?.fullName,
    student.user?.name,
    student.userAccount?.fullName,
    student.userAccount?.name
  );

  if (
    typeof directName === "string" &&
    directName.trim()
  ) {
    return directName.trim();
  }

  return [
    firstValue(student.firstName, student.first_name),
    firstValue(student.lastName, student.last_name),
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
};

const getStudentObject = (meeting) => {
  const candidate = firstValue(
    meeting?.student,
    meeting?.students,
    meeting?.mentee,
    meeting?.studentDetails,
    meeting?.student_details
  );

  if (Array.isArray(candidate)) {
    return candidate[0] ?? {};
  }

  return candidate && typeof candidate === "object"
    ? candidate
    : {};
};

const getDepartmentName = (student) => {
  const department = firstValue(
    student?.department,
    student?.departments
  );

  if (typeof department === "string") return department;

  return firstValue(
    department?.name,
    department?.departmentName,
    student?.departmentName,
    student?.department_name,
    ""
  );
};

const getMentorName = (meeting, student) => {
  const teacherValue = meeting?.teachers;

  const teacher = Array.isArray(teacherValue)
    ? teacherValue[0]
    : teacherValue;

  const mentorValue = firstValue(
    meeting?.mentor,
    meeting?.mentorTeacher,
    meeting?.mentor_teacher,
    student?.mentor,
    student?.assignedMentor,
    student?.assigned_mentor,
    teacher
  );

  const mentor = Array.isArray(mentorValue)
    ? mentorValue[0]
    : mentorValue;

  if (typeof mentor === "string") return mentor;

  return firstValue(
    mentor?.fullName,
    mentor?.name,
    mentor?.teacher?.fullName,
    mentor?.teacher?.name,
    mentor?.user?.fullName,
    mentor?.userAccount?.fullName,
    teacher?.fullName,
    teacher?.name,
    meeting?.mentorName,
    meeting?.mentor_name,
    student?.mentorName,
    ""
  );
};

// =========================================================
// NOTES AND DISCUSSION POINTS
// =========================================================

const getNotesContent = (meeting) => {
  const candidates = [
    meeting?.notes,
    meeting?.meetingNotes,
    meeting?.meeting_notes,
    meeting?.workspace?.notes,
    meeting?.mentorMeetingNotes,
    meeting?.mentor_meeting_notes,
    meeting?.rawMeeting?.notes,
    meeting?.rawMeeting?.mentor_meeting_notes,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      const content = candidate
        .map((record) => getText(record))
        .filter(Boolean);

      if (content.length > 0) {
        return content.join("\n\n");
      }

      continue;
    }

    const text = getText(candidate);

    if (text) return text;
  }

  return "";
};

const getDiscussionPoints = (meeting) => {
  const candidates = [
    meeting?.discussionPoints,
    meeting?.discussion_points,
    meeting?.discussion,
    meeting?.workspace?.discussionPoints,
    meeting?.mentor_meeting_discussion_points,
    meeting?.rawMeeting?.discussionPoints,
    meeting?.rawMeeting?.mentor_meeting_discussion_points,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      const points = candidate
        .map((point) => getText(point))
        .filter(Boolean);

      if (points.length > 0) return points;

      continue;
    }

    if (typeof candidate === "string" && candidate.trim()) {
      return [candidate.trim()];
    }
  }

  return [];
};

// =========================================================
// MENTOR FEEDBACK AND RATING
// =========================================================

const getFeedbackRecord = (meeting) => {
  if (!meeting || typeof meeting !== "object") {
    return null;
  }

  const candidates = [
    meeting.mentor_meeting_feedback,
    meeting.mentorMeetingFeedback,
    meeting.mentor_feedback,
    meeting.mentorFeedback,
    meeting.feedback,
    meeting.rawMeeting?.mentor_meeting_feedback,
    meeting.rawMeeting?.mentorMeetingFeedback,
    meeting.rawMeeting?.mentor_feedback,
    meeting.rawMeeting?.mentorFeedback,
    meeting.rawMeeting?.feedback,
    meeting.evaluation,
  ];

  for (const value of candidates) {
    if (Array.isArray(value)) {
      const record = value.find(
        (item) => item && typeof item === "object"
      );

      if (record) return record;

      continue;
    }

    if (value && typeof value === "object") {
      return value;
    }
  }

  return null;
};

const getValidRating = (feedback) => {
  if (!feedback) return null;

  const value = feedback.rating;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const rating = Number(value);

  return Number.isInteger(rating) &&
    rating >= 1 &&
    rating <= 5
    ? rating
    : null;
};

const getFeedbackText = (meeting) => {
  const feedback = getFeedbackRecord(meeting);

  return getText(
    feedback?.feedback ??
      feedback?.comments ??
      feedback?.comment ??
      feedback?.remarks ??
      feedback?.content ??
      ""
  );
};

const getRemarks = (meeting) => {
  const feedback = getFeedbackRecord(meeting);

  return getText(
    meeting?.remarks ??
      meeting?.mentorRemarks ??
      meeting?.mentor_remarks ??
      meeting?.rawMeeting?.remarks ??
      feedback?.remarks ??
      feedback?.comments ??
      feedback?.comment ??
      feedback?.feedback ??
      ""
  );
};

// =========================================================
// MEETING SUMMARY MODAL
// =========================================================

const MeetingSummaryModal = ({ open, onClose, meeting }) => {
  const meetingId = getMeetingId(
    meeting?.rawMeeting ?? meeting
  );

  const [reportMeeting, setReportMeeting] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");

  // Fetch the latest saved meeting details.
  useEffect(() => {
    if (!open || !meetingId) return undefined;

    let cancelled = false;

    const fetchMeeting = async () => {
      setReportLoading(true);
      setReportError("");
      setReportMeeting(null);

      try {
        const response =
          await meetingsService.getMeeting(meetingId);

        const result = unwrapMeetingResponse(response);

        if (!result || typeof result !== "object") {
          throw new Error(
            "The server returned no meeting details."
          );
        }

        if (!cancelled) {
          setReportMeeting(result);
        }
      } catch (error) {
        if (!cancelled) {
          setReportError(
            error?.message ||
              "Unable to fetch the latest meeting details."
          );
        }
      } finally {
        if (!cancelled) {
          setReportLoading(false);
        }
      }
    };

    fetchMeeting();

    return () => {
      cancelled = true;
    };
  }, [open, meetingId]);

  /*
   * Prefer the latest API result, but preserve the original
   * meeting as a fallback when the request fails.
   */
  const viewMeeting =
    reportMeeting ??
    meeting?.rawMeeting ??
    meeting;

  const student = useMemo(() => {
    const source = getStudentObject(viewMeeting);
    const department = getDepartmentName(source);

    const activeAssignment = Array.isArray(
      source.mentor_assignments
    )
      ? source.mentor_assignments.find(
          (assignment) =>
            String(assignment?.status ?? "").toUpperCase() ===
            "ACTIVE"
        )
      : null;

    const academicSemesters = Array.isArray(
      source.academicSemesters
    )
      ? source.academicSemesters
      : [];

    const currentAcademicSemester =
      academicSemesters.find(
        (item) =>
          String(item?.status ?? "").toUpperCase() ===
          "CURRENT"
      ) ?? academicSemesters[0];

    return {
      ...source,

      id: firstValue(
        source.id,
        viewMeeting?.studentId,
        viewMeeting?.student_id,
        null
      ),

      name:
        getStudentName(source) ||
        firstValue(
          viewMeeting?.studentName,
          viewMeeting?.student_name,
          ""
        ) ||
        "Student details unavailable",

      registrationNumber: firstValue(
        source.registrationNumber,
        source.registerNumber,
        source.register_number,
        source.rollNumber,
        source.rollNo,
        viewMeeting?.registrationNumber,
        viewMeeting?.registerNumber,
        ""
      ),

      department: department || "Not available",

      semester:
        firstValue(
          source.semester,
          currentAcademicSemester?.semesterNumber,
          activeAssignment?.academic_terms?.semesterNumber,
          viewMeeting?.studentSemester,
          ""
        ) || "Not available",

      year: "Not available",

      email: firstValue(
        source.email,
        source.user?.email,
        source.userAccount?.email,
        viewMeeting?.studentEmail,
        viewMeeting?.student_email,
        ""
      ),

      phone: firstValue(
        source.phone,
        source.phoneNumber,
        source.phone_number,
        viewMeeting?.studentPhone,
        ""
      ),

      mentor:
        getMentorName(viewMeeting, source) ||
        "Not available",
    };
  }, [viewMeeting]);

  const notes = getNotesContent(viewMeeting);
  const discussionPoints = getDiscussionPoints(viewMeeting);
  const remarks = getRemarks(viewMeeting);

  // Always derive the rating from the persisted feedback record.
  const feedbackRecord = getFeedbackRecord(viewMeeting);
  const rating = getValidRating(feedbackRecord);
  const feedbackText = getFeedbackText(viewMeeting);

  /*
   * Pass rating and comments directly into MeetingSummaryCard.
   * Keep existing summary properties so its current layout remains.
   */
  const summary = useMemo(() => {
    const actualSummary = firstValue(
      viewMeeting?.summary,
      viewMeeting?.meetingSummary,
      viewMeeting?.meeting_summary,
      null
    );

    const feedback = getFeedbackRecord(viewMeeting);
    const validRating = getValidRating(feedback);

    const comments = getFeedbackText(viewMeeting);

    return {
      ...(actualSummary &&
      typeof actualSummary === "object"
        ? actualSummary
        : {}),

      rating: validRating,
      feedback: comments || null,
      comments: comments || null,

      mentor_meeting_feedback: feedback,
      mentorMeetingFeedback: feedback,
    };
  }, [viewMeeting]);

  if (!open || !meeting) return null;

  const status = normalizeStatus(viewMeeting?.status);

  const startAt = firstValue(
    viewMeeting?.startedAt,
    viewMeeting?.startAt,
    viewMeeting?.startTime,
    viewMeeting?.scheduledAt,
    viewMeeting?.scheduledStart,
    viewMeeting?.start_time,
    meeting?.startedAt,
    meeting?.startAt,
    null
  );

  const endAt = firstValue(
    viewMeeting?.endedAt,
    viewMeeting?.endAt,
    viewMeeting?.endTime,
    viewMeeting?.scheduledEnd,
    viewMeeting?.end_time,
    meeting?.endedAt,
    meeting?.endAt,
    null
  );

  const startTime = formatTime(startAt);
  const endTime = formatTime(endAt);

  const duration =
    viewMeeting?.duration ??
    calculateDuration(startAt, endAt);

  const mode = String(
    firstValue(viewMeeting?.mode, meeting?.mode, "")
  )
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  const isOnline = mode === "ONLINE";

  const venue = isOnline
    ? firstValue(
        viewMeeting?.meetingLink,
        viewMeeting?.meeting_link,
        meeting?.meetingLink,
        ""
      )
    : firstValue(
        viewMeeting?.venue,
        meeting?.venue,
        ""
      );

  const agenda = firstValue(
    viewMeeting?.agenda,
    meeting?.agenda,
    ""
  );

  const description = firstValue(
    viewMeeting?.description,
    meeting?.description,
    ""
  );

  // =======================================================
  // DOWNLOAD / PRINT REPORT
  // =======================================================

  const handleDownloadReport = () => {
    const escapeHtml = (value) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const meetingTitle =
      viewMeeting?.title || "Mentorship Meeting";

    const meetingRows = [
      ["Meeting", meetingTitle],
      ["Meeting ID", meetingId ?? "Unavailable"],
      ["Status", getStatusLabel(status)],
      ["Date", formatDate(startAt)],
      [
        "Time",
        [startTime, endTime].filter(Boolean).join(" – ") ||
          "Unavailable",
      ],
      ["Duration", duration || "Unavailable"],
      ["Student", student.name],
      ["Registration Number", student.registrationNumber],
      ["Department", student.department],
      ["Semester", student.semester],
      ["Email", student.email],
      ["Assigned Mentor", student.mentor],
      [
        "Meeting Mode",
        isOnline
          ? "Online"
          : mode === "IN_PERSON"
            ? "In Person"
            : "Unavailable",
      ],
      ["Location / Meeting Link", venue || "Not provided"],
      ["Agenda", agenda || "Not provided"],
      ["Description", description || "Not provided"],
      [
        "Mentor Rating",
        rating !== null ? `${rating}/5` : "Not rated",
      ],
      ["Feedback Comments", feedbackText || "Not provided"],
    ];

    const makeRows = (rows) =>
      rows
        .map(
          ([label, value]) => `
            <tr>
              <th>${escapeHtml(label)}</th>
              <td>${escapeHtml(value || "Not provided")}</td>
            </tr>
          `
        )
        .join("");

    const makeContentSection = (
      title,
      content,
      type = "text"
    ) => {
      let body;

      if (type === "list") {
        body = content.length
          ? `
              <ul>
                ${content
                  .map(
                    (point) =>
                      `<li>${escapeHtml(point)}</li>`
                  )
                  .join("")}
              </ul>
            `
          : `<p class="empty">No discussion points were recorded.</p>`;
      } else {
        body = content
          ? `<p class="content-text">${escapeHtml(content)}</p>`
          : `<p class="empty">No ${escapeHtml(
              title.toLowerCase()
            )} recorded.</p>`;
      }

      return `
        <section class="content-section">
          <h3>${escapeHtml(title)}</h3>
          <div class="section-content">
            ${body}
          </div>
        </section>
      `;
    };

    const discussionFeedbackHtml = [
      makeContentSection("Meeting Notes", notes),
      makeContentSection(
        "Discussion Points",
        discussionPoints,
        "list"
      ),
      makeContentSection("Feedback & Remarks", remarks),
    ].join("");

    const reportWindow = window.open(
      "",
      "_blank",
      "width=1000,height=800"
    );

    if (!reportWindow) {
      window.alert(
        "The report window was blocked. Allow pop-ups for this site and try again."
      );
      return;
    }

    reportWindow.document.open();

    reportWindow.document.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>${escapeHtml(meetingTitle)} - Meeting Report</title>

          <style>
            :root {
              --primary: #2563eb;
              --primary-light: #eff6ff;
              --heading: #0f172a;
              --text: #334155;
              --muted: #64748b;
              --border: #dbe5f1;
              --surface: #f8fafc;
            }

            * { box-sizing: border-box; }

            body {
              margin: 0;
              padding: 36px;
              background: var(--surface);
              color: var(--text);
              font-family: Inter, ui-sans-serif, system-ui,
                -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 13px;
              line-height: 1.65;
            }

            .report {
              max-width: 1000px;
              margin: 0 auto;
              padding: 38px;
              background: #fff;
              border: 1px solid var(--border);
              border-radius: 16px;
              box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
            }

            .report-header {
              padding-bottom: 24px;
              border-bottom: 2px solid var(--primary);
            }

            .eyebrow {
              margin: 0 0 8px;
              color: var(--primary);
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 1.6px;
              text-transform: uppercase;
            }

            h1 {
              margin: 0;
              color: var(--heading);
              font-size: 28px;
              line-height: 1.3;
              overflow-wrap: anywhere;
            }

            .subtitle {
              margin: 8px 0 0;
              color: var(--muted);
              font-size: 12px;
            }

            .report-meta {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-top: 18px;
            }

            .meta-chip {
              display: inline-block;
              padding: 5px 11px;
              border: 1px solid var(--border);
              border-radius: 999px;
              background: var(--surface);
              color: var(--text);
              font-size: 11px;
              font-weight: 700;
            }

            .status {
              border-color: #bfdbfe;
              background: var(--primary-light);
              color: #1d4ed8;
            }

            .main-section { margin-top: 28px; }

            .section-heading {
              display: flex;
              align-items: center;
              gap: 11px;
              margin: 0 0 16px;
              padding-bottom: 11px;
              border-bottom: 1px solid var(--border);
              color: var(--heading);
              font-size: 19px;
              font-weight: 800;
            }

            .section-number {
              display: inline-flex;
              width: 30px;
              height: 30px;
              flex-shrink: 0;
              align-items: center;
              justify-content: center;
              border-radius: 9px;
              background: var(--primary-light);
              color: var(--primary);
              font-size: 12px;
            }

            table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              border: 1px solid var(--border);
              border-radius: 10px;
              overflow: hidden;
            }

            th, td {
              padding: 11px 14px;
              border-bottom: 1px solid var(--border);
              text-align: left;
              vertical-align: top;
              overflow-wrap: anywhere;
              white-space: pre-wrap;
            }

            th {
              width: 31%;
              background: var(--surface);
              color: #475569;
              font-weight: 700;
            }

            td { color: var(--text); }

            tr:last-child th,
            tr:last-child td { border-bottom: none; }

            .content-section {
              margin-top: 15px;
              overflow: hidden;
              border: 1px solid var(--border);
              border-radius: 11px;
              page-break-inside: avoid;
            }

            .content-section h3 {
              margin: 0;
              padding: 12px 16px;
              border-bottom: 1px solid var(--border);
              background: var(--primary-light);
              color: #1e40af;
              font-size: 13px;
              font-weight: 800;
            }

            .section-content { padding: 15px 16px; }

            .content-text {
              margin: 0;
              color: var(--text);
              white-space: pre-wrap;
              overflow-wrap: anywhere;
            }

            .empty {
              margin: 0;
              color: var(--muted);
              font-style: italic;
            }

            ul {
              margin: 0;
              padding-left: 22px;
            }

            li {
              margin: 0 0 8px;
              padding-left: 3px;
              overflow-wrap: anywhere;
              white-space: pre-wrap;
            }

            li:last-child { margin-bottom: 0; }

            .report-footer {
              margin-top: 28px;
              padding-top: 13px;
              border-top: 1px solid var(--border);
              color: var(--muted);
              font-size: 10px;
              text-align: center;
            }

            @page {
              size: A4;
              margin: 14mm;
            }

            @media print {
              body {
                padding: 0;
                background: white;
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }

              .report {
                max-width: none;
                padding: 0;
                border: none;
                border-radius: 0;
                box-shadow: none;
              }

              .section-heading,
              tr,
              .content-section {
                page-break-inside: avoid;
              }

              .report-header { page-break-after: avoid; }
            }
          </style>
        </head>

        <body>
          <main class="report">
            <header class="report-header">
              <p class="eyebrow">Mentor–Mentee Programme</p>
              <h1>${escapeHtml(meetingTitle)}</h1>

              <p class="subtitle">
                Meeting report generated on
                ${escapeHtml(new Date().toLocaleString("en-IN"))}
              </p>

              <div class="report-meta">
                <span class="meta-chip status">
                  ${escapeHtml(getStatusLabel(status))}
                </span>

                <span class="meta-chip">
                  ${escapeHtml(formatDate(startAt))}
                </span>

                <span class="meta-chip">
                  Duration: ${escapeHtml(duration || "Unavailable")}
                </span>
              </div>
            </header>

            <section class="main-section">
              <h2 class="section-heading">
                <span class="section-number">01</span>
                Meeting Details
              </h2>

              <table>
                <tbody>${makeRows(meetingRows)}</tbody>
              </table>
            </section>

            <section class="main-section">
              <h2 class="section-heading">
                <span class="section-number">02</span>
                Discussion &amp; Feedback
              </h2>

              ${discussionFeedbackHtml}
            </section>

            <footer class="report-footer">
              Mentor–Mentee Project · Meeting Report
            </footer>
          </main>

          <script>
            window.onload = function () {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    reportWindow.document.close();
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="meeting-summary-title"
        className="fixed left-1/2 top-1/2 z-[9999] flex max-h-[90vh] w-[94vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1
                id="meeting-summary-title"
                className="break-words text-xl font-bold text-slate-800"
              >
                {viewMeeting?.title || "Mentorship Meeting"}
              </h1>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(status)}`}
              >
                {status === "COMPLETED" && (
                  <CheckCircle2 size={13} />
                )}
                {getStatusLabel(status)}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CalendarDays size={15} />
                {formatDate(startAt)}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={15} />
                {startTime || "Time unavailable"}
                {endTime ? ` - ${endTime}` : ""}
                {duration ? ` (${duration})` : ""}
              </div>

              {meetingId != null && (
                <span className="break-all text-xs text-slate-400">
                  ID: {meetingId}
                </span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadReport}
              disabled={reportLoading}
              className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-wait disabled:opacity-50 sm:px-4"
            >
              <Download size={16} />
              <span className="hidden sm:inline">
                Download Report
              </span>
              <span className="sm:hidden">Report</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close meeting summary"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          {reportLoading && (
            <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Loading the latest saved meeting details...
            </div>
          )}

          {reportError && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {reportError}
              <p className="mt-1 text-xs">
                The report is showing the meeting information currently
                available in the parent component. Some saved details
                may be missing.
              </p>
            </div>
          )}

          <div className="grid items-start gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
            <StudentDetailsCard
              student={student}
              meeting={viewMeeting}
            />

            <div className="min-w-0 space-y-4">
              {/* Notes, discussion points, remarks and rating */}
              <MeetingSummaryCard
                summary={summary}
                notes={notes}
                discussionPoints={discussionPoints}
                remarks={remarks}
                rating={rating}
                feedback={feedbackText}
                mentorFeedback={feedbackRecord}
              />

              {/* Agenda and meeting information */}
              <section className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                  <FileText
                    size={17}
                    className="text-blue-600"
                  />

                  <h2 className="text-sm font-semibold text-slate-800">
                    Meeting Notes and Agenda
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Agenda
                    </p>
                    <p className="whitespace-pre-wrap break-words">
                      {agenda || "No agenda was recorded."}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Description
                    </p>
                    <p className="whitespace-pre-wrap break-words">
                      {description || "No description was recorded."}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <FileText size={13} />
                      Recorded Notes
                    </p>
                    <p className="whitespace-pre-wrap break-words">
                      {notes || "No meeting notes have been recorded."}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <MessageSquare size={13} />
                      Discussion Points
                    </p>

                    {discussionPoints.length > 0 ? (
                      <ul className="list-disc space-y-1 pl-5">
                        {discussionPoints.map((point, index) => (
                          <li
                            key={`${index}-${point}`}
                            className="whitespace-pre-wrap break-words"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        No discussion points have been recorded.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <ClipboardList size={13} />
                      Feedback &amp; Remarks
                    </p>
                    <p className="whitespace-pre-wrap break-words">
                      {remarks ||
                        "No feedback or remarks have been recorded."}
                    </p>
                  </div>

                  {venue && (
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {isOnline ? "Meeting Link" : "Location"}
                      </p>

                      <p className="flex items-start gap-2 break-all">
                        {isOnline ? (
                          <Video
                            size={15}
                            className="mt-0.5 shrink-0"
                          />
                        ) : (
                          <MapPin
                            size={15}
                            className="mt-0.5 shrink-0"
                          />
                        )}

                        {isOnline ? (
                          <a
                            href={venue}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            {venue}
                          </a>
                        ) : (
                          venue
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingSummaryModal;