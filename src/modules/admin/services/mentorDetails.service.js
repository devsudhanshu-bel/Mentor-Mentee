import prisma from "../../../config/prisma.hod.js";

const COMPLETED_MEETING_STATUSES = new Set([
  "COMPLETED",
  "CONDUCTED",
  "FINISHED",
]);

const normalizeStatus = (status) =>
  String(status ?? "").trim().toUpperCase();

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateMentorId = (mentorId) => {
  if (!mentorId || typeof mentorId !== "string") {
    throw createError("A valid mentor ID is required.", 400);
  }
};

// ==========================================================
// GET MENTOR DETAILS AND METRICS
// ==========================================================

export const getMentorDetailsById = async (mentorId) => {
  validateMentorId(mentorId);

  const mentor = await prisma.teachers.findUnique({
    where: {
      id: mentorId,
    },
    select: {
      id: true,
      employeeCode: true,
      fullName: true,
      email: true,
      phone: true,
      designation: true,
      maxMentees: true,
      isActive: true,
      departmentId: true,
      createdAt: true,

      departments_teachers_departmentIdTodepartments: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },

      teacher_profiles: {
        select: {
          profileImage: true,
          qualification: true,
          specialization: true,
          office: true,
          officeHours: true,
          about: true,
          highlightOne: true,
          highlightTwo: true,
          highlightThree: true,
          linkedIn: true,
          googleScholar: true,
          researchGate: true,
          orcid: true,
          website: true,
        },
      },

      mentor_assignments: {
        where: {
          status: "ACTIVE",
        },
        select: {
          studentId: true,
          students: {
            select: {
              id: true,
              overallAttendance: true,
            },
          },
        },
      },

      mentor_meetings: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });

  if (!mentor) {
    throw createError("Mentor not found.", 404);
  }

  // Count distinct students with active assignments.
  const uniqueStudents = new Map();

  for (const assignment of mentor.mentor_assignments) {
    if (assignment.students) {
      uniqueStudents.set(
        assignment.studentId,
        assignment.students
      );
    }
  }

  const assignedStudents = [...uniqueStudents.values()];

  // Calculate average attendance, excluding unavailable values.
  const attendanceValues = assignedStudents
    .map((student) => student.overallAttendance)
    .filter(
      (attendance) =>
        typeof attendance === "number" &&
        Number.isFinite(attendance)
    );

  const averageAttendance =
    attendanceValues.length > 0
      ? Number(
          (
            attendanceValues.reduce(
              (total, attendance) => total + attendance,
              0
            ) / attendanceValues.length
          ).toFixed(1)
        )
      : null;

  // Count recognized completed meeting statuses.
  const meetingsConducted = mentor.mentor_meetings.filter(
    (meeting) =>
      COMPLETED_MEETING_STATUSES.has(
        normalizeStatus(meeting.status)
      )
  ).length;

  const department =
    mentor.departments_teachers_departmentIdTodepartments;

  const profile = mentor.teacher_profiles;

  return {
    mentor: {
      id: mentor.id,
      employeeCode: mentor.employeeCode,
      fullName: mentor.fullName,
      email: mentor.email,
      phone: mentor.phone,
      designation: mentor.designation,
      isActive: mentor.isActive,
      departmentId: mentor.departmentId,

      department: department
        ? {
            id: department.id,
            name: department.name,
            code: department.code,
          }
        : null,

      profile: profile
        ? {
            profileImage: profile.profileImage,
            qualification: profile.qualification,
            specialization: profile.specialization,
            office: profile.office,
            officeHours: profile.officeHours,
            about: profile.about,

            highlights: [
              profile.highlightOne,
              profile.highlightTwo,
              profile.highlightThree,
            ].filter(Boolean),

            linkedIn: profile.linkedIn,
            googleScholar: profile.googleScholar,
            researchGate: profile.researchGate,
            orcid: profile.orcid,
            website: profile.website,
          }
        : null,
    },

    metrics: {
      studentsAssigned: assignedStudents.length,
      maxMentees: mentor.maxMentees,

      availableCapacity: Math.max(
        0,
        mentor.maxMentees - assignedStudents.length
      ),

      capacityPercentage:
        mentor.maxMentees > 0
          ? Number(
              (
                (assignedStudents.length / mentor.maxMentees) *
                100
              ).toFixed(1)
            )
          : 0,

      meetingsConducted,
      averageAttendance,
      attendanceStudentsCount: attendanceValues.length,
    },
  };
};

// ==========================================================
// GET STUDENTS ASSIGNED TO A SPECIFIC MENTOR
// ==========================================================

export const getMentorAssignedStudentsByMentorId = async (
  mentorId
) => {
  validateMentorId(mentorId);

  // Verify that the requested mentor exists.
  const mentor = await prisma.teachers.findUnique({
    where: {
      id: mentorId,
    },
    select: {
      id: true,
    },
  });

  if (!mentor) {
    throw createError("Mentor not found.", 404);
  }

  // Retrieve active assignments belonging to this mentor.
  const assignments = await prisma.mentor_assignments.findMany({
    where: {
      teacherId: mentorId,
      status: "ACTIVE",
    },
    select: {
      studentId: true,
      termId: true,
      assignedAt: true,

      students: {
        select: {
          id: true,
          registerNumber: true,
          fullName: true,
          email: true,
          semester: true,
          section: true,
          yearsAtUniversity: true,
          overallAttendance: true,
          currentCGPA: true,
          status: true,
        },
      },
    },
    orderBy: {
      assignedAt: "desc",
    },
  });

  // Avoid duplicate students across academic terms.
  const uniqueStudents = new Map();

  for (const assignment of assignments) {
    const student = assignment.students;

    if (!student || uniqueStudents.has(student.id)) {
      continue;
    }

    uniqueStudents.set(student.id, {
      id: student.id,
      registerNumber: student.registerNumber,

      name: student.fullName,
      fullName: student.fullName,

      email: student.email,
      semester: student.semester,
      section: student.section,
      yearsAtUniversity: student.yearsAtUniversity,

      attendance: student.overallAttendance,
      overallAttendance: student.overallAttendance,

      currentCGPA: student.currentCGPA,

      status:
        student.status === "ACTIVE"
          ? "Active"
          : student.status,

      assignmentStatus: "ACTIVE",
      termId: assignment.termId,
    });
  }

  return {
    students: [...uniqueStudents.values()],
  };
};

// ==========================================================
// GET MEETINGS FOR A SPECIFIC MENTOR (ADMIN)
// GET /api/admin/mentors/:mentorId/meetings
// ==========================================================

export const getMentorMeetingsByMentorId = async (
  mentorId
) => {
  validateMentorId(mentorId);

  // Verify that the selected mentor exists.
  const mentor = await prisma.teachers.findUnique({
    where: {
      id: mentorId,
    },
    select: {
      id: true,
    },
  });

  if (!mentor) {
    throw createError("Mentor not found.", 404);
  }

  // Retrieve meetings belonging to the selected mentor.
  // The Prisma foreign-key field is mentorTeacherId.
  const records = await prisma.mentor_meetings.findMany({
    where: {
      mentorTeacherId: mentorId,
    },

    select: {
      id: true,
      mentorTeacherId: true,
      studentId: true,
      seriesId: true,
      followUpToMeetingId: true,

      title: true,
      meetingType: true,
      mode: true,
      status: true,
      priority: true,

      startAt: true,
      endAt: true,
      venue: true,
      meetingLink: true,
      agenda: true,
      description: true,

      startedAt: true,
      endedAt: true,
      createdAt: true,
      updatedAt: true,

      students: {
        select: {
          id: true,
          fullName: true,
          registerNumber: true,
        },
      },

      teachers: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },

    orderBy: {
      startAt: "desc",
    },
  });

  // Normalize meeting data for the existing frontend components.
  const meetings = records.map((meeting) => ({
    ...meeting,

    meetingId: meeting.id,

    student: meeting.students
      ? {
          id: meeting.students.id,
          fullName: meeting.students.fullName,
          registerNumber: meeting.students.registerNumber,
        }
      : null,

    studentName: meeting.students?.fullName ?? null,
    mentorName: meeting.teachers?.fullName ?? null,

    topic: meeting.title,
    meetingTitle: meeting.title,

    startTime: meeting.startAt,
    endTime: meeting.endAt,

    location: meeting.venue,
    meetingNotes: null,

    isRecurring: Boolean(meeting.seriesId),
  }));

  return {
    meetings,
    total: meetings.length,
  };
};