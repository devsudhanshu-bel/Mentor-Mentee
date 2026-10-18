
import { randomUUID } from "node:crypto";
import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

const MEETING_STATUSES = [
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

const MEETING_TYPES = ["REGULAR", "SPECIAL", "INSTANT"];
const MEETING_MODES = ["IN_PERSON", "ONLINE"];
const PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"];
const FREQUENCIES = ["WEEKLY", "BIWEEKLY", "MONTHLY"];

// ==========================================================
// SHARED MEETING RESPONSE
// ==========================================================

const meetingInclude = {
  students: {
    select: {
      id: true,
      fullName: true,
      registerNumber: true,
      email: true,
      departmentId: true,
      yearsAtUniversity: true,
      semester: true,
      programme: true,
      section: true,
      departments: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
      academicSemesters: {
        select: {
          semesterNumber: true,
          status: true,
        },
        orderBy: {
          semesterNumber: "desc",
        },
      },
      mentor_assignments: {
        where: { status: "ACTIVE" },
        select: {
          id: true,
          status: true,
          academic_terms: {
            select: {
              semesterNumber: true,
              status: true,
            },
          },
          teachers: {
            select: {
              id: true,
              fullName: true,
              employeeCode: true,
              email: true,
            },
          },
        },
      },
    },
  },
  teachers: {
    select: {
      id: true,
      fullName: true,
      employeeCode: true,
      email: true,
    },
  },
  mentor_meeting_notes: true,
  mentor_meeting_discussion_points: {
    orderBy: { position: "asc" },
  },
  mentor_meeting_feedback: true,
};

// ==========================================================
// COMMON HELPERS
// ==========================================================

const ensure = (condition, status, message) => {
  if (!condition) {
    throw new ApiError(status, message);
  }
};

const getAccountId = (user) =>
  user?.id ??
  user?.userId ??
  user?.sub ??
  user?.accountId ??
  null;

const parseDate = (value, fieldName) => {
  const date = new Date(value);

  ensure(
    value !== undefined &&
      value !== null &&
      value !== "" &&
      !Number.isNaN(date.getTime()),
    400,
    `${fieldName} must be a valid date`
  );

  return date;
};

const validateTimeRange = (startAt, endAt) => {
  ensure(
    endAt > startAt,
    400,
    "Meeting end time must be after start time"
  );
};

async function resolveTeacherId(user) {
  if (user?.teacherId) {
    const teacher = await prisma.teachers.findUnique({
      where: { id: user.teacherId },
      select: { id: true },
    });

    if (teacher) return teacher.id;
  }

  const accountId = getAccountId(user);

  ensure(accountId, 401, "Authenticated account ID is missing");

  const teacher = await prisma.teachers.findFirst({
    where: {
      OR: [
        { userAccountId: accountId },
        { id: accountId },
      ],
    },
    select: { id: true },
  });

  ensure(
    teacher,
    403,
    "No teacher profile is linked to this account"
  );

  return teacher.id;
}

async function resolveStudentId(user) {
  if (user?.studentId) {
    const student = await prisma.students.findUnique({
      where: { id: user.studentId },
      select: { id: true },
    });

    if (student) return student.id;
  }

  const accountId = getAccountId(user);

  ensure(accountId, 401, "Authenticated account ID is missing");

  const student = await prisma.students.findFirst({
    where: {
      OR: [
        { userAccountId: accountId },
        { id: accountId },
      ],
    },
    select: { id: true },
  });

  ensure(
    student,
    403,
    "No student profile is linked to this account"
  );

  return student.id;
}

async function ensureAssignedMentor(mentorTeacherId, studentId) {
  const assignment = await prisma.mentor_assignments.findFirst({
    where: {
      teacherId: mentorTeacherId,
      studentId,
      status: "ACTIVE",
    },
    select: { id: true },
  });

  ensure(
    assignment,
    403,
    "You do not have an active mentor assignment for this student"
  );
}

// ==========================================================
// MEETING LOOKUPS
// ==========================================================

async function getMentorMeeting(mentorTeacherId, meetingId) {
  const meeting = await prisma.mentor_meetings.findFirst({
    where: {
      id: meetingId,
      mentorTeacherId,
    },
    include: meetingInclude,
  });

  ensure(meeting, 404, "Meeting not found");

  return meeting;
}

async function getStudentMeeting(studentId, meetingId) {
  const meeting = await prisma.mentor_meetings.findFirst({
    where: {
      id: meetingId,
      studentId,
    },
    include: meetingInclude,
  });

  ensure(meeting, 404, "Meeting not found");

  return meeting;
}

// ==========================================================
// INPUT VALIDATION AND MAPPING
// ==========================================================

function validateMeetingInput(input, { creating = false } = {}) {
  ensure(
    input && typeof input === "object" && !Array.isArray(input),
    400,
    "Meeting data must be an object"
  );

  if (creating || input.title !== undefined) {
    ensure(
      typeof input.title === "string" &&
        input.title.trim().length > 0,
      400,
      "Meeting title is required"
    );
  }

  if (input.meetingType !== undefined) {
    ensure(
      MEETING_TYPES.includes(input.meetingType),
      400,
      "Invalid meeting type"
    );
  }

  if (input.mode !== undefined) {
    ensure(
      MEETING_MODES.includes(input.mode),
      400,
      "Invalid meeting mode"
    );
  }

  if (input.priority !== undefined) {
    ensure(
      PRIORITIES.includes(input.priority),
      400,
      "Invalid meeting priority"
    );
  }
}

function buildMeetingData(input, { creating = false } = {}) {
  const data = {};

  const textFields = [
    "title",
    "venue",
    "meetingLink",
    "agenda",
    "description",
    "meetingType",
    "mode",
    "priority",
  ];

  for (const field of textFields) {
    if (input[field] !== undefined) {
      const value = input[field];

      if (
        [
          "title",
          "venue",
          "meetingLink",
          "agenda",
          "description",
        ].includes(field)
      ) {
        data[field] =
          typeof value === "string"
            ? value.trim() || null
            : value;
      } else {
        data[field] = value;
      }
    }
  }

  if (input.startAt !== undefined) {
    data.startAt = parseDate(input.startAt, "startAt");
  }

  if (input.endAt !== undefined) {
    data.endAt = parseDate(input.endAt, "endAt");
  }

  if (creating) {
    data.status = "SCHEDULED";
  }

  if (data.startAt && data.endAt) {
    validateTimeRange(data.startAt, data.endAt);
  }

  return data;
}

function validateModeDetails(data, existing = null) {
  const mode = data.mode ?? existing?.mode;

  const venue =
    data.venue !== undefined ? data.venue : existing?.venue;

  const meetingLink =
    data.meetingLink !== undefined
      ? data.meetingLink
      : existing?.meetingLink;

  if (mode === "ONLINE") {
    ensure(
      typeof meetingLink === "string" &&
        meetingLink.trim().length > 0,
      400,
      "meetingLink is required for online meetings"
    );
  }

  if (mode === "IN_PERSON") {
    ensure(
      typeof venue === "string" && venue.trim().length > 0,
      400,
      "venue is required for in-person meetings"
    );
  }
}

function assertStatusTransition(current, next) {
  const transitions = {
    SCHEDULED: ["IN_PROGRESS", "CANCELLED", "NO_SHOW"],
    IN_PROGRESS: ["COMPLETED", "CANCELLED"],
    COMPLETED: [],
    CANCELLED: [],
    NO_SHOW: [],
  };

  ensure(
    MEETING_STATUSES.includes(next),
    400,
    "Invalid meeting status"
  );

  ensure(
    transitions[current]?.includes(next),
    409,
    `Cannot change meeting status from ${current} to ${next}`
  );
}

function dateWithTime(date, time, fieldName) {
  ensure(
    typeof time === "string" && /^\d{2}:\d{2}$/.test(time),
    400,
    `${fieldName} must use HH:mm format`
  );

  const [hours, minutes] = time.split(":").map(Number);

  ensure(
    hours >= 0 &&
      hours <= 23 &&
      minutes >= 0 &&
      minutes <= 59,
    400,
    `${fieldName} is invalid`
  );

  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);

  return result;
}

function addRecurrence(date, frequency) {
  const next = new Date(date);

  if (frequency === "WEEKLY") {
    next.setDate(next.getDate() + 7);
  } else if (frequency === "BIWEEKLY") {
    next.setDate(next.getDate() + 14);
  } else if (frequency === "MONTHLY") {
    const originalDay = next.getDate();

    next.setDate(1);
    next.setMonth(next.getMonth() + 1);

    const lastDay = new Date(
      next.getFullYear(),
      next.getMonth() + 1,
      0
    ).getDate();

    next.setDate(Math.min(originalDay, lastDay));
  }

  return next;
}

function normalizeFeedbackInput(input = {}) {
  return {
    rating: input.rating,
    feedback:
      input.feedback ??
      input.comments ??
      input.remarks ??
      null,
  };
}

function combineDateAndTime(dateValue, timeValue) {
  const date = parseDate(dateValue, "date");
  return dateWithTime(date, timeValue, "time");
}

// ==========================================================
// MEETINGS SERVICE
// ==========================================================

const MeetingsService = {
  // --------------------------------------------------------
  // ASSIGNED STUDENTS
  // --------------------------------------------------------

  async listAssignedStudents(user) {
    const mentorTeacherId = await resolveTeacherId(user);

    const assignments = await prisma.mentor_assignments.findMany({
      where: {
        teacherId: mentorTeacherId,
        status: "ACTIVE",
      },
      select: {
        students: {
          select: {
            id: true,
            fullName: true,
            registerNumber: true,
            email: true,
            status: true,
            departmentId: true,
            departments: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
            yearsAtUniversity: true,
            semester: true,
            programme: true,
            section: true,
          },
        },
      },
    });

    const uniqueStudents = new Map();

    for (const assignment of assignments) {
      const student = assignment.students;

      if (student && !uniqueStudents.has(student.id)) {
        uniqueStudents.set(student.id, student);
      }
    }

    return [...uniqueStudents.values()].sort((a, b) =>
      (a.fullName || "").localeCompare(b.fullName || "")
    );
  },

  // --------------------------------------------------------
  // CREATE MEETING - INDIVIDUAL OR ALL MENTEES
  // --------------------------------------------------------

  async createMeeting(user, input) {
    const mentorTeacherId = await resolveTeacherId(user);

    validateMeetingInput(input, { creating: true });

    const startAt = parseDate(input.startAt, "startAt");
    const endAt = parseDate(input.endAt, "endAt");

    validateTimeRange(startAt, endAt);

    const data = buildMeetingData(input, { creating: true });

    validateModeDetails(data);

    // ======================================================
    // BULK CREATION FOR ALL ACTIVE ASSIGNED MENTEES
    // ======================================================

    if (input.allStudents === true) {
      ensure(
        !input.studentId,
        400,
        "Do not provide studentId when scheduling for all mentees"
      );

      ensure(
        !input.followUpToMeetingId,
        400,
        "Follow-up meetings must target one specific student"
      );

      const assignments = await prisma.mentor_assignments.findMany({
        where: {
          teacherId: mentorTeacherId,
          status: "ACTIVE",
        },
        select: {
          students: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      });

      const uniqueStudentIds = new Set();

      for (const assignment of assignments) {
        const student = assignment.students;

        if (
          student?.id &&
          !["INACTIVE", "DISABLED"].includes(
            String(student.status ?? "").toUpperCase()
          )
        ) {
          uniqueStudentIds.add(student.id);
        }
      }

      const studentIds = [...uniqueStudentIds];

      ensure(
        studentIds.length > 0,
        400,
        "No active assigned mentees were found"
      );

      // Prepare all meeting records before starting the transaction.
      const meetingRecords = studentIds.map((studentId) => ({
        id: randomUUID(),
        mentorTeacherId,
        studentId,
        ...data,
      }));

      // Bulk insert and fetch the created meetings atomically.
      return prisma.$transaction(
        async (tx) => {
          await tx.mentor_meetings.createMany({
            data: meetingRecords,
          });

          const meetings = await tx.mentor_meetings.findMany({
            where: {
              id: {
                in: meetingRecords.map((meeting) => meeting.id),
              },
              mentorTeacherId,
            },
            include: meetingInclude,
            orderBy: {
              startAt: "asc",
            },
          });

          return {
            allStudents: true,
            totalCreated: meetings.length,
            meetings,
          };
        },
        {
          maxWait: 10000,
          timeout: 20000,
        }
      );
    }

    // ======================================================
    // EXISTING SINGLE-MENTEE CREATION
    // ======================================================

    ensure(input.studentId, 400, "studentId is required");

    await ensureAssignedMentor(mentorTeacherId, input.studentId);

    if (input.followUpToMeetingId) {
      const parentMeeting = await getMentorMeeting(
        mentorTeacherId,
        input.followUpToMeetingId
      );

      ensure(
        parentMeeting.studentId === input.studentId,
        400,
        "A follow-up meeting must belong to the same student"
      );

      data.followUpToMeetingId = parentMeeting.id;
    }

    return prisma.mentor_meetings.create({
      data: {
        id: randomUUID(),
        mentorTeacherId,
        studentId: input.studentId,
        ...data,
      },
      include: meetingInclude,
    });
  },

  // --------------------------------------------------------
  // LIST MENTOR MEETINGS
  // --------------------------------------------------------

  async listMentorMeetings(user, query = {}) {
    const mentorTeacherId = await resolveTeacherId(user);
    const where = { mentorTeacherId };

    if (query.status) {
      ensure(
        MEETING_STATUSES.includes(query.status),
        400,
        "Invalid status filter"
      );

      where.status = query.status;
    }

    if (query.studentId) {
      where.studentId = query.studentId;
    }

    if (query.from || query.to) {
      where.startAt = {};

      if (query.from) {
        where.startAt.gte = parseDate(query.from, "from");
      }

      if (query.to) {
        where.startAt.lte = parseDate(query.to, "to");
      }

      ensure(
        !where.startAt.gte ||
          !where.startAt.lte ||
          where.startAt.gte <= where.startAt.lte,
        400,
        "'from' must be before or equal to 'to'"
      );
    }

    return prisma.mentor_meetings.findMany({
      where,
      include: meetingInclude,
      orderBy: { startAt: "asc" },
    });
  },

  // --------------------------------------------------------
  // GET MENTOR MEETING
  // --------------------------------------------------------

  async getMentorMeeting(user, meetingId) {
    const mentorTeacherId = await resolveTeacherId(user);
    return getMentorMeeting(mentorTeacherId, meetingId);
  },

  // --------------------------------------------------------
  // UPDATE MEETING
  // --------------------------------------------------------

  async updateMeeting(user, meetingId, input) {
    const mentorTeacherId = await resolveTeacherId(user);

    const existing = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    ensure(
      existing.status === "SCHEDULED",
      409,
      "Only scheduled meetings can be edited or rescheduled"
    );

    validateMeetingInput(input);

    const data = buildMeetingData(input);
    const startAt = data.startAt ?? existing.startAt;
    const endAt = data.endAt ?? existing.endAt;

    validateTimeRange(startAt, endAt);

    if (input.studentId && input.studentId !== existing.studentId) {
      await ensureAssignedMentor(mentorTeacherId, input.studentId);
      data.studentId = input.studentId;
    }

    validateModeDetails(data, existing);

    return prisma.mentor_meetings.update({
      where: { id: meetingId },
      data,
      include: meetingInclude,
    });
  },

  // --------------------------------------------------------
  // CANCEL MEETING
  // --------------------------------------------------------

  async cancelMeeting(user, meetingId) {
    const mentorTeacherId = await resolveTeacherId(user);

    const meeting = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    assertStatusTransition(meeting.status, "CANCELLED");

    return prisma.mentor_meetings.update({
      where: { id: meetingId },
      data: { status: "CANCELLED" },
      include: meetingInclude,
    });
  },

  // --------------------------------------------------------
  // CHANGE MEETING STATUS
  // --------------------------------------------------------

  async changeMeetingStatus(user, meetingId, status) {
    const mentorTeacherId = await resolveTeacherId(user);

    const meeting = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    assertStatusTransition(meeting.status, status);

    const data = { status };

    if (status === "IN_PROGRESS") {
      data.startedAt = new Date();
    }

    if (status === "COMPLETED") {
      data.endedAt = new Date();
    }

    return prisma.mentor_meetings.update({
      where: { id: meetingId },
      data,
      include: meetingInclude,
    });
  },

  // --------------------------------------------------------
  // STUDENT MEETING LIST
  // --------------------------------------------------------

  async listStudentMeetings(user, query = {}) {
    const studentId = await resolveStudentId(user);
    const where = { studentId };

    if (query.status) {
      ensure(
        MEETING_STATUSES.includes(query.status),
        400,
        "Invalid status filter"
      );

      where.status = query.status;
    }

    if (query.from || query.to) {
      where.startAt = {};

      if (query.from) {
        where.startAt.gte = parseDate(query.from, "from");
      }

      if (query.to) {
        where.startAt.lte = parseDate(query.to, "to");
      }

      ensure(
        !where.startAt.gte ||
          !where.startAt.lte ||
          where.startAt.gte <= where.startAt.lte,
        400,
        "'from' must be before or equal to 'to'"
      );
    }

    return prisma.mentor_meetings.findMany({
      where,
      include: meetingInclude,
      orderBy: { startAt: "asc" },
    });
  },

  // --------------------------------------------------------
  // GET STUDENT MEETING
  // --------------------------------------------------------

  async getStudentMeeting(user, meetingId) {
    const studentId = await resolveStudentId(user);
    return getStudentMeeting(studentId, meetingId);
  },

  // --------------------------------------------------------
  // NOTES
  // --------------------------------------------------------

  async saveNotes(user, meetingId, content) {
    const mentorTeacherId = await resolveTeacherId(user);

    const meeting = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    ensure(
      ["IN_PROGRESS", "COMPLETED"].includes(meeting.status),
      409,
      "Notes can only be saved for an in-progress or completed meeting"
    );

    ensure(
      typeof content === "string",
      400,
      "content must be a string"
    );

    return prisma.mentor_meeting_notes.upsert({
      where: { meetingId },
      create: {
        id: randomUUID(),
        meetingId,
        content,
      },
      update: {
        content,
        updatedAt: new Date(),
      },
    });
  },

  // --------------------------------------------------------
  // DISCUSSION POINTS
  // --------------------------------------------------------

  async addDiscussionPoint(user, meetingId, content) {
    const mentorTeacherId = await resolveTeacherId(user);

    const meeting = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    ensure(
      ["IN_PROGRESS", "COMPLETED"].includes(meeting.status),
      409,
      "Discussion points can only be added to an in-progress or completed meeting"
    );

    ensure(
      typeof content === "string" && content.trim(),
      400,
      "Discussion point content is required"
    );

    const position =
      await prisma.mentor_meeting_discussion_points.count({
        where: { meetingId },
      });

    return prisma.mentor_meeting_discussion_points.create({
      data: {
        id: randomUUID(),
        meetingId,
        content: content.trim(),
        position,
      },
    });
  },

  async updateDiscussionPoint(user, meetingId, pointId, content) {
    const mentorTeacherId = await resolveTeacherId(user);

    const meeting = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    ensure(
      ["IN_PROGRESS", "COMPLETED"].includes(meeting.status),
      409,
      "Discussion points can only be edited during or after an active meeting"
    );

    ensure(
      typeof content === "string" && content.trim(),
      400,
      "Discussion point content is required"
    );

    const point =
      await prisma.mentor_meeting_discussion_points.findFirst({
        where: { id: pointId, meetingId },
        select: { id: true },
      });

    ensure(point, 404, "Discussion point not found");

    return prisma.mentor_meeting_discussion_points.update({
      where: { id: pointId },
      data: {
        content: content.trim(),
        updatedAt: new Date(),
      },
    });
  },

  async deleteDiscussionPoint(user, meetingId, pointId) {
    const mentorTeacherId = await resolveTeacherId(user);

    const meeting = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    ensure(
      ["IN_PROGRESS", "COMPLETED"].includes(meeting.status),
      409,
      "Discussion points can only be deleted during or after an active meeting"
    );

    const point =
      await prisma.mentor_meeting_discussion_points.findFirst({
        where: { id: pointId, meetingId },
        select: { id: true },
      });

    ensure(point, 404, "Discussion point not found");

    await prisma.mentor_meeting_discussion_points.delete({
      where: { id: pointId },
    });

    return { id: pointId, deleted: true };
  },

  // --------------------------------------------------------
  // MENTOR FEEDBACK
  // --------------------------------------------------------

  async saveFeedback(user, meetingId, input = {}) {
    const mentorTeacherId = await resolveTeacherId(user);

    const meeting = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    ensure(
      ["IN_PROGRESS", "COMPLETED"].includes(meeting.status),
      409,
      "Feedback can only be saved during an in-progress or completed meeting"
    );

    const { rating, feedback } = normalizeFeedbackInput(input);
    const normalizedRating = Number(rating);

    ensure(
      Number.isInteger(normalizedRating) &&
        normalizedRating >= 1 &&
        normalizedRating <= 5,
      400,
      "rating must be an integer from 1 to 5"
    );

    ensure(
      feedback === null || typeof feedback === "string",
      400,
      "feedback must be a string"
    );

    const normalizedFeedback =
      typeof feedback === "string"
        ? feedback.trim() || null
        : null;

    return prisma.mentor_meeting_feedback.upsert({
      where: { meetingId },
      create: {
        id: randomUUID(),
        meetingId,
        mentorTeacherId,
        rating: normalizedRating,
        feedback: normalizedFeedback,
      },
      update: {
        rating: normalizedRating,
        feedback: normalizedFeedback,
        updatedAt: new Date(),
      },
    });
  },

  // --------------------------------------------------------
  // FOLLOW-UP MEETINGS
  // --------------------------------------------------------

  async scheduleFollowUp(user, meetingId, input = {}) {
    const mentorTeacherId = await resolveTeacherId(user);

    const previous = await getMentorMeeting(
      mentorTeacherId,
      meetingId
    );

    ensure(
      ["IN_PROGRESS", "COMPLETED"].includes(previous.status),
      409,
      "Follow-up meetings can be scheduled after a meeting has started"
    );

    let startAt;
    let endAt;

    if (input.startAt && input.endAt) {
      startAt = parseDate(input.startAt, "startAt");
      endAt = parseDate(input.endAt, "endAt");
    } else {
      ensure(
        input.date && input.time,
        400,
        "A follow-up date and time are required"
      );

      startAt = combineDateAndTime(input.date, input.time);

      const durationMinutes = Number(input.durationMinutes ?? 30);

      ensure(
        Number.isFinite(durationMinutes) &&
          durationMinutes > 0 &&
          durationMinutes <= 480,
        400,
        "durationMinutes must be between 1 and 480"
      );

      endAt = new Date(
        startAt.getTime() + durationMinutes * 60 * 1000
      );
    }

    validateTimeRange(startAt, endAt);

    ensure(
      startAt > new Date(),
      400,
      "A follow-up meeting must be scheduled in the future"
    );

    const mode = input.mode ?? previous.mode;

    const venue =
      input.venue ??
      (mode === "IN_PERSON" ? previous.venue : null);

    const meetingLink =
      input.meetingLink ??
      (mode === "ONLINE" ? previous.meetingLink : null);

    const followUpInput = {
      studentId: previous.studentId,
      title: input.title?.trim() || `Follow-up: ${previous.title}`,
      meetingType: input.meetingType ?? "REGULAR",
      mode,
      priority: input.priority ?? previous.priority ?? "NORMAL",
      startAt,
      endAt,
      venue,
      meetingLink,
      agenda: input.agenda ?? null,
      description: input.description ?? null,
      followUpToMeetingId: previous.id,
    };

    return this.createMeeting(user, followUpInput);
  },

  // --------------------------------------------------------
  // RECURRING MEETINGS
  // --------------------------------------------------------

  async createRecurringSeries(user, input = {}) {
    const mentorTeacherId = await resolveTeacherId(user);
    const studentId = input.studentId;

    ensure(studentId, 400, "studentId is required");

    ensure(
      typeof input.title === "string" && input.title.trim(),
      400,
      "Meeting title is required"
    );

    ensure(
      FREQUENCIES.includes(input.frequency),
      400,
      "Invalid recurrence frequency"
    );

    const meetingType = input.meetingType ?? "REGULAR";
    const mode = input.mode ?? "IN_PERSON";
    const priority = input.priority ?? "NORMAL";

    ensure(MEETING_TYPES.includes(meetingType), 400, "Invalid meeting type");
    ensure(MEETING_MODES.includes(mode), 400, "Invalid meeting mode");
    ensure(PRIORITIES.includes(priority), 400, "Invalid meeting priority");

    validateModeDetails({
      mode,
      venue: input.venue,
      meetingLink: input.meetingLink,
    });

    await ensureAssignedMentor(mentorTeacherId, studentId);

    const startDate = parseDate(input.startDate, "startDate");

    const endDate = input.endDate
      ? parseDate(input.endDate, "endDate")
      : null;

    ensure(
      !endDate || endDate >= startDate,
      400,
      "endDate must be on or after startDate"
    );

    if (input.frequency !== "MONTHLY") {
      ensure(
        Number.isInteger(input.dayOfWeek) &&
          input.dayOfWeek >= 0 &&
          input.dayOfWeek <= 6,
        400,
        "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)"
      );
    }

    const firstStart = dateWithTime(
      startDate,
      input.startTime,
      "startTime"
    );

    const firstEnd = dateWithTime(
      startDate,
      input.endTime,
      "endTime"
    );

    validateTimeRange(firstStart, firstEnd);

    const maxDate =
      endDate ??
      new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000);

    ensure(
      maxDate.getTime() - startDate.getTime() <=
        366 * 24 * 60 * 60 * 1000,
      400,
      "Recurring series cannot exceed one year"
    );

    return prisma.$transaction(
      async (tx) => {
        const seriesId = randomUUID();

        await tx.mentor_meeting_series.create({
          data: {
            id: seriesId,
            mentorTeacherId,
            studentId,
            frequency: input.frequency,
            startDate,
            endDate,
            dayOfWeek: input.dayOfWeek ?? null,
            startTime: input.startTime,
            endTime: input.endTime,
            timezone: input.timezone ?? "Asia/Kolkata",
          },
        });

        const occurrences = [];
        let current = new Date(startDate);

        if (input.frequency !== "MONTHLY") {
          const offset =
            (input.dayOfWeek - current.getDay() + 7) % 7;

          current.setDate(current.getDate() + offset);
        }

        let count = 0;

        while (current <= maxDate && count < 53) {
          const startAt = dateWithTime(
            current,
            input.startTime,
            "startTime"
          );

          const endAt = dateWithTime(
            current,
            input.endTime,
            "endTime"
          );

          validateTimeRange(startAt, endAt);

          occurrences.push({
            id: randomUUID(),
            mentorTeacherId,
            studentId,
            seriesId,
            title: input.title.trim(),
            meetingType,
            mode,
            priority,
            startAt,
            endAt,
            venue: input.venue?.trim() || null,
            meetingLink: input.meetingLink?.trim() || null,
            agenda: input.agenda?.trim() || null,
            description: input.description?.trim() || null,
            status: "SCHEDULED",
          });

          count++;

          const next = addRecurrence(current, input.frequency);

          ensure(
            next.getTime() > current.getTime(),
            400,
            "Could not calculate the next recurring meeting date"
          );

          current = next;
        }

        if (occurrences.length) {
          await tx.mentor_meetings.createMany({
            data: occurrences,
          });
        }

        return {
          seriesId,
          occurrencesCreated: occurrences.length,
        };
      },
      {
        maxWait: 10000,
        timeout: 20000,
      }
    );
  },

  async listRecurringSeries(user) {
    const mentorTeacherId = await resolveTeacherId(user);

    return prisma.mentor_meeting_series.findMany({
      where: { mentorTeacherId },
      include: {
        mentor_meetings: {
          orderBy: { startAt: "asc" },
        },
        students: {
          select: {
            id: true,
            fullName: true,
            registerNumber: true,
            email: true,
            departments: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
            yearsAtUniversity: true,
            semester: true,
          },
        },
      },
      orderBy: { startDate: "desc" },
    });
  },

  async cancelRecurringSeries(user, seriesId) {
    const mentorTeacherId = await resolveTeacherId(user);

    const series = await prisma.mentor_meeting_series.findFirst({
      where: {
        id: seriesId,
        mentorTeacherId,
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    ensure(series, 404, "Recurring series not found");

    if (!series.isActive) {
      return {
        id: seriesId,
        isActive: false,
        cancelledOccurrences: 0,
      };
    }

    return prisma.$transaction(
      async (tx) => {
        await tx.mentor_meeting_series.update({
          where: { id: seriesId },
          data: {
            isActive: false,
            updatedAt: new Date(),
          },
        });

        const result = await tx.mentor_meetings.updateMany({
          where: {
            seriesId,
            status: "SCHEDULED",
            startAt: { gte: new Date() },
          },
          data: {
            status: "CANCELLED",
            updatedAt: new Date(),
          },
        });

        return {
          id: seriesId,
          isActive: false,
          cancelledOccurrences: result.count,
        };
      },
      {
        maxWait: 10000,
        timeout: 20000,
      }
    );
  },
};

export default MeetingsService;
