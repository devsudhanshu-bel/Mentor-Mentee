import prisma from "../../../config/prisma.hod.js";

const CATEGORY_BY_RESOURCE = {
  research: "RESEARCH",
  cocurricular: "CO_CURRICULAR",
  "extra-curricular": "EXTRA_CURRICULAR",
  "awards-achievements": "AWARDS",
  certificates: "CERTIFICATES",
};

const fail = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getStudent = async (studentId) => {
  const student = await prisma.students.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      registerNumber: true,
      admissionNumber: true,
      fullName: true,
      email: true,
      phone: true,
      profileImage: true,
      programme: true,
      semester: true,
      section: true,
      status: true,
      currentCGPA: true,
      overallAttendance: true,
      totalCredits: true,
      academicStanding: true,
      academicSetupCompleted: true,
      departmentId: true,
      departments: { select: { id: true, name: true, code: true } },
    },
  });

  if (!student) throw fail("Student not found.", 404);

  const assignment = await prisma.mentor_assignments.findFirst({
    where: { studentId, status: "ACTIVE" },
    orderBy: { assignedAt: "desc" },
    include: {
      teachers: {
        select: {
          id: true,
          fullName: true,
          employeeCode: true,
          email: true,
          designation: true,
          departmentId: true,
          departments_teachers_departmentIdTodepartments: {
            select: { name: true, code: true },
          },
        },
      },
      academic_terms: { select: { id: true, name: true, status: true } },
    },
  });

  return {
    ...student,
    department: student.departments,
    mentor: assignment?.teachers || null,
    activeMentorAssignment: assignment
      ? {
          id: assignment.id,
          assignedAt: assignment.assignedAt,
          term: assignment.academic_terms,
        }
      : null,
  };
};

const ensureStudent = async (studentId) => {
  if (!studentId) throw fail("Student ID is required.", 400);
  return getStudent(studentId);
};

const getCategoryDocuments = async (studentId, category) => {
  await ensureStudent(studentId);
  return prisma.student_documents.findMany({
    where: { studentId, category },
    orderBy: { uploadedAt: "desc" },
  });
};

const getDashboard = async (studentId, resource) => {
  const student = await ensureStudent(studentId);
  const category = CATEGORY_BY_RESOURCE[resource];
  if (!category) throw fail("Unsupported student profile resource.", 400);

  const documents = await getCategoryDocuments(studentId, category);
  const count = (predicate) => documents.filter(predicate).length;
  const verified = (d) => d.researchReviewStatus === "VERIFIED";
  const pending = (d) =>
    !d.researchReviewStatus ||
    ["NOT_REVIEWED", "PENDING"].includes(d.researchReviewStatus);
  const corrections = (d) => d.researchReviewStatus === "CORRECTIONS_REQUESTED";

  let stats;
  if (resource === "research") {
    stats = {
      totalSubmissions: documents.length,
      verified: count(verified),
      pendingReview: count(pending),
      correctionsRequested: count(corrections),
    };
  } else if (resource === "cocurricular") {
    stats = {
      totalActivities: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
      drafts: 0,
      achievements: count(verified),
    };
  } else if (resource === "extra-curricular") {
    stats = {
      totalActivities: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
      drafts: 0,
      achievements: count(verified),
    };
  } else if (resource === "awards-achievements") {
    stats = {
      totalAwards: documents.length,
      totalAchievements: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
      documents: count((d) => Boolean(d.fileUrl)),
    };
  } else {
    stats = {
      totalCertificates: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
    };
  }

  return {
    success: true,
    data: {
      student,
      mentor: student.mentor,
      stats,
      documents,
    },
  };
};

const listDocuments = async (studentId, filters = {}) => {
  const student = await ensureStudent(studentId);
  const page = Math.max(1, Number(filters.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(filters.limit) || 10));
  const where = { studentId };

  if (filters.category) where.category = filters.category;
  if (filters.fileType) where.fileType = filters.fileType;
  if (filters.search) {
    where.OR = [
      { documentName: { contains: String(filters.search), mode: "insensitive" } },
      { description: { contains: String(filters.search), mode: "insensitive" } },
      { fileType: { contains: String(filters.search), mode: "insensitive" } },
    ];
  }

  const [documents, total] = await Promise.all([
    prisma.student_documents.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.student_documents.count({ where }),
  ]);

  return {
    success: true,
    data: {
      student,
      mentor: student.mentor,
      documents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  };
};

const getDocument = async (studentId, documentId, resource = "documents") => {
  await ensureStudent(studentId);
  const where = { id: documentId, studentId };
  if (CATEGORY_BY_RESOURCE[resource]) where.category = CATEGORY_BY_RESOURCE[resource];
  const document = await prisma.student_documents.findFirst({ where });
  if (!document) throw fail("Student document not found.", 404);
  return { success: true, data: document };
};

const reviewDocument = async (studentId, documentId, resource, body = {}) => {
  await ensureStudent(studentId);
  const category = CATEGORY_BY_RESOURCE[resource];
  if (!category) throw fail("Unsupported review resource.", 400);

  const document = await prisma.student_documents.findFirst({
    where: { id: documentId, studentId, category },
    select: { id: true },
  });
  if (!document) throw fail("Document not found for this student.", 404);

  const status = String(body.status || "").toUpperCase();
  if (!["VERIFIED", "CORRECTIONS_REQUESTED"].includes(status)) {
    throw fail("Review status must be VERIFIED or CORRECTIONS_REQUESTED.", 400);
  }
  const mentorRemark = String(body.mentorRemark || "").trim() || null;
  if (status === "CORRECTIONS_REQUESTED" && !mentorRemark) {
    throw fail("A remark is required when requesting corrections.", 400);
  }

  const updated = await prisma.student_documents.update({
    where: { id: documentId },
    data: {
      researchReviewStatus: status,
      // Admin identity is not a teacher foreign key; do not misattribute this to a mentor.
      reviewedByTeacherId: null,
      reviewedAt: new Date(),
      mentorRemark,
      updatedAt: new Date(),
    },
  });
  return {
    success: true,
    message: status === "VERIFIED" ? "Record verified successfully." : "Corrections requested successfully.",
    data: updated,
  };
};


const getDocumentsDashboard = async (studentId) => {
  const student = await ensureStudent(studentId);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [totalDocuments, recentlyAdded, groupedCategories, latestDocuments] =
    await Promise.all([
      prisma.student_documents.count({ where: { studentId } }),
      prisma.student_documents.count({
        where: { studentId, uploadedAt: { gte: sevenDaysAgo } },
      }),
      prisma.student_documents.groupBy({
        by: ["category"],
        where: { studentId },
        _count: { _all: true },
      }),
      prisma.student_documents.findMany({
        where: { studentId },
        orderBy: { uploadedAt: "desc" },
        take: 6,
      }),
    ]);

  const categories = groupedCategories.map((item) => ({
    category: item.category,
    count: item._count._all,
  }));
  const stats = {
    totalDocuments,
    totalCategories: categories.length,
    recentlyAdded,
    totalFiles: totalDocuments,
  };

  return {
    success: true,
    data: {
      student,
      mentor: student.mentor,
      stats,
      categories,
      documents: latestDocuments,
      availableCategories: [
        "ACADEMICS", "CERTIFICATES", "INTERNSHIPS", "PROJECTS",
        "RESEARCH", "CO_CURRICULAR", "EXTRA_CURRICULAR",
        "AWARDS", "PERSONAL", "OTHER",
      ],
    },
  };
};

const getAttendance = async (studentId, semesterValue) => {
  const student = await ensureStudent(studentId);
  const semester = Number(semesterValue || String(student.semester || "").match(/\d+/)?.[0] || 1);
  if (!Number.isInteger(semester) || semester < 1 || semester > 8) {
    throw fail("Semester must be between 1 and 8.", 400);
  }

  const academicSemester = await prisma.academic_semesters.findUnique({
    where: { studentId_semesterNumber: { studentId, semesterNumber: semester } },
    include: { subjects: { orderBy: { createdAt: "asc" } } },
  });
  const raw = academicSemester?.subjects || [];
  const subjects = raw.map((subject) => {
    const held = Number(subject.classesHeld || 0);
    const attended = Number(subject.classesAttended || 0);
    const percentage = held > 0
      ? Number(((attended / held) * 100).toFixed(2))
      : Number(subject.attendance || 0);
    return {
      id: subject.id,
      courseCode: subject.courseCode,
      subjectName: subject.courseName,
      credits: Number(subject.credits || 0),
      classesHeld: held,
      classesAttended: attended,
      percentage,
      storedAttendance: subject.attendance ?? null,
    };
  });
  const classesHeld = subjects.reduce((n, x) => n + x.classesHeld, 0);
  const classesAttended = subjects.reduce((n, x) => n + x.classesAttended, 0);
  const stored = subjects.filter((x) => x.storedAttendance != null);
  const percentage = classesHeld
    ? Number(((classesAttended / classesHeld) * 100).toFixed(2))
    : stored.length
      ? Number((stored.reduce((n, x) => n + Number(x.storedAttendance), 0) / stored.length).toFixed(2))
      : Number(student.overallAttendance || 0);

  return {
    semester,
    semesterExists: Boolean(academicSemester),
    currentSemester: Number(String(student.semester || "").match(/\d+/)?.[0] || 1),
    hasAttendance: subjects.some((x) => x.classesHeld > 0 || x.storedAttendance != null),
    student,
    mentor: student.mentor,
    academicYear: academicSemester?.academic_years || null,
    term: null,
    subjects,
    summary: { classesHeld, classesAttended, percentage },
  };
};

const getAcademics = async (studentId) => {
  const student = await ensureStudent(studentId);
  const records = await prisma.academic_semesters.findMany({
    where: { studentId },
    orderBy: { semesterNumber: "asc" },
    include: { subjects: { orderBy: { courseCode: "asc" } } },
  });
  const backlogs = await prisma.academic_backlogs.findMany({
    where: { studentId },
    orderBy: [{ status: "asc" }, { semesterNumber: "asc" }],
  });
  return {
    success: true,
    data: {
      student,
      mentor: student.mentor,
      semesters: records,
      backlogs,
      overall: {
        currentCGPA: student.currentCGPA,
        totalCredits: student.totalCredits,
        overallAttendance: student.overallAttendance,
        academicStanding: student.academicStanding,
      },
    },
  };
};

const getAcademicSemester = async (studentId, semesterValue) => {
  await ensureStudent(studentId);

  const semesterNumber = Number(semesterValue);
  if (!Number.isInteger(semesterNumber) || semesterNumber < 1 || semesterNumber > 8) {
    throw fail("Semester number must be between 1 and 8.", 400);
  }

  const record = await prisma.academic_semesters.findUnique({
    where: {
      studentId_semesterNumber: { studentId, semesterNumber },
    },
    include: {
      subjects: { orderBy: { courseCode: "asc" } },
    },
  });

  if (!record) {
    const student = await getStudent(studentId);
    const currentSemester = Number(String(student.semester || "").match(/\d+/)?.[0] || 1);
    return {
      id: null,
      studentId,
      semesterNumber,
      status: semesterNumber === currentSemester ? "CURRENT" : semesterNumber < currentSemester ? "NO_RECORD" : "LOCKED",
      sgpa: null,
      totalCredits: 0,
      creditsEarned: 0,
      backlogs: 0,
      subjects: [],
    };
  }

  return record;
};

const getMeetings = async (studentId) => {
  await ensureStudent(studentId);
  const meetings = await prisma.mentor_meetings.findMany({
    where: { studentId },
    include: {
      students: { select: { id: true, fullName: true, registerNumber: true } },
      teachers: { select: { id: true, fullName: true, employeeCode: true, email: true } },
      mentor_meeting_notes: true,
      mentor_meeting_discussion_points: { orderBy: { position: "asc" } },
      mentor_meeting_feedback: true,
    },
    orderBy: { startAt: "desc" },
  });
  return { success: true, data: meetings };
};

const getInternships = async (studentId) => {
  const student = await ensureStudent(studentId);
  const internships = await prisma.student_internships.findMany({
    where: { studentId },
    include: { internship_documents: true, internship_reviews: { include: { reviewer: true }, orderBy: { reviewedAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });
  return {
    success: true,
    data: {
      student,
      internships,
      current: internships.filter((x) => !["COMPLETED", "CANCELLED"].includes(x.status)),
      history: internships.filter((x) => ["COMPLETED", "CANCELLED"].includes(x.status)),
      pendingVerifications: internships.filter((x) =>
        ["PENDING", "PENDING_INITIAL_VERIFICATION", "PENDING_COMPLETION_VERIFICATION"].includes(x.verificationStatus) ||
        x.completionVerificationStatus === "PENDING"
      ),
    },
  };
};

const getInternshipQueue = async (studentId, stage) => {
  const all = (await getInternships(studentId)).data.internships;
  return {
    success: true,
    data: all.filter((item) => stage === "initial"
      ? ["PENDING", "PENDING_INITIAL_VERIFICATION"].includes(item.verificationStatus)
      : ["PENDING", "PENDING_COMPLETION_VERIFICATION"].includes(item.completionVerificationStatus)),
  };
};

const getInternshipById = async (internshipId) => {
  const internship = await prisma.student_internships.findUnique({
    where: { id: internshipId },
    include: { student: true, internship_documents: true, internship_reviews: { include: { reviewer: true }, orderBy: { reviewedAt: "desc" } } },
  });
  if (!internship) throw fail("Internship not found.", 404);
  return { success: true, data: internship };
};

const reviewInternship = async (internshipId, stage, body = {}) => {
  const existing = await prisma.student_internships.findUnique({ where: { id: internshipId } });
  if (!existing) throw fail("Internship not found.", 404);
  const decision = String(body.decision || "").toUpperCase();
  if (!["APPROVED", "REJECTED"].includes(decision)) throw fail("Decision must be APPROVED or REJECTED.", 400);
  if (decision === "REJECTED" && !String(body.remarks || "").trim()) throw fail("Remarks are required when rejecting an internship.", 400);

  const remarks = String(body.remarks || "").trim() || null;
  const now = new Date();
  const data = stage === "completion"
    ? {
        completionVerificationStatus: decision,
        completionMentorRemark: remarks,
        completionVerifiedAt: now,
        ...(decision === "APPROVED" ? { status: "COMPLETED", ...(Number.isFinite(Number(body.rating)) ? { rating: Number(body.rating) } : {}) } : {}),
      }
    : {
        verificationStatus: decision,
        mentorRemark: remarks,
        verifiedAt: now,
        ...(decision === "REJECTED" ? { status: "ONGOING" } : {}),
      };
  const updated = await prisma.student_internships.update({ where: { id: internshipId }, data });
  return { success: true, message: "Internship review saved.", data: updated };
};

export default {
  getStudent, getDashboard, getDocumentsDashboard, listDocuments, getDocument, reviewDocument,
  getAttendance, getAcademics, getAcademicSemester, getMeetings, getInternships,
  getInternshipQueue, getInternshipById, reviewInternship,
};
