import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

// ==========================================================
// GET ACTIVE MENTOR
// ==========================================================

const getMentor = async (userAccountId) => {
  const mentor = await prisma.teachers.findFirst({
    where: {
      userAccountId,
      isActive: true,
    },
    select: {
      id: true,
      fullName: true,
      departmentId: true,
    },
  });

  if (!mentor) {
    throw new ApiError(404, "Active mentor profile not found");
  }

  return mentor;
};

// ==========================================================
// VERIFY STUDENT AND ACTIVE MENTOR ASSIGNMENT
// ==========================================================

const getAssignedStudent = async (userAccountId, studentId) => {
  const mentor = await getMentor(userAccountId);

  const student = await prisma.students.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      registerNumber: true,
      admissionNumber: true,
      fullName: true,
      email: true,
      phone: true,
      gender: true,
      status: true,
      departmentId: true,
      dateOfBirth: true,
      profileImage: true,
      programme: true,
      section: true,
      semester: true,
      studentType: true,
      currentCGPA: true,
      overallAttendance: true,
      totalCredits: true,
      academicStanding: true,
      academicSetupCompleted: true,
      nationality: true,
      bloodGroup: true,
      address: true,
      permanentAddress: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const assignment = await prisma.mentor_assignments.findFirst({
    where: {
      studentId,
      teacherId: mentor.id,
      status: "ACTIVE",
    },
    select: {
      id: true,
      assignedAt: true,
      termId: true,
    },
  });

  if (!assignment) {
    throw new ApiError(
      403,
      "You are not the active mentor assigned to this student",
    );
  }

  return {
    mentor,
    student,
    assignment,
  };
};

// ==========================================================
// GET COMPLETE STUDENT OVERVIEW
// ==========================================================

const getStudentOverview = async (userAccountId, studentId) => {
  const { student, assignment } = await getAssignedStudent(
    userAccountId,
    studentId,
  );

  const [
    academicSemesters,
    internships,
    researchDocuments,
    coCurricularDocuments,
    extraCurricularDocuments,
    awardDocuments,
    certificateDocuments,
    allDocuments,
  ] = await Promise.all([
    // ------------------------------------------------------
    // ACADEMIC PROGRESS
    // Prisma relation name: subjects
    // ------------------------------------------------------
    prisma.academic_semesters.findMany({
      where: {
        studentId,
      },
      orderBy: {
        semesterNumber: "asc",
      },
      include: {
        subjects: true,
      },
    }),

    // ------------------------------------------------------
    // INTERNSHIPS
    // ------------------------------------------------------
    prisma.student_internships.findMany({
      where: {
        studentId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        internship_documents: true,
      },
    }),

    // ------------------------------------------------------
    // RESEARCH DOCUMENTS
    // ------------------------------------------------------
    prisma.student_documents.findMany({
      where: {
        studentId,
        category: "RESEARCH",
      },
      orderBy: {
        uploadedAt: "desc",
      },
    }),

    // ------------------------------------------------------
    // CO-CURRICULAR ACTIVITIES
    // ------------------------------------------------------
    prisma.student_documents.findMany({
      where: {
        studentId,
        category: "CO_CURRICULAR",
      },
      orderBy: {
        uploadedAt: "desc",
      },
    }),

    // ------------------------------------------------------
    // EXTRA-CURRICULAR ACTIVITIES
    // ------------------------------------------------------
    prisma.student_documents.findMany({
      where: {
        studentId,
        category: "EXTRA_CURRICULAR",
      },
      orderBy: {
        uploadedAt: "desc",
      },
    }),

    // ------------------------------------------------------
    // AWARDS AND ACHIEVEMENTS
    // ------------------------------------------------------
    prisma.student_documents.findMany({
      where: {
        studentId,
        category: "AWARDS",
      },
      orderBy: {
        uploadedAt: "desc",
      },
    }),

    // ------------------------------------------------------
    // CERTIFICATES
    // ------------------------------------------------------
    prisma.student_documents.findMany({
      where: {
        studentId,
        category: "CERTIFICATES",
      },
      orderBy: {
        uploadedAt: "desc",
      },
    }),

    // ------------------------------------------------------
    // ALL STUDENT DOCUMENTS
    // ------------------------------------------------------
    prisma.student_documents.findMany({
      where: {
        studentId,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    }),
  ]);

  // ========================================================
  // CALCULATE STATISTICS
  // ========================================================

  const completedInternships = internships.filter(
    (internship) => internship.status === "COMPLETED",
  );

  const pendingInternshipVerification = internships.filter(
    (internship) =>
      internship.verificationStatus === "PENDING" ||
      internship.completionVerificationStatus === "PENDING",
  );

  const verifiedResearchDocuments = researchDocuments.filter(
    (document) => document.researchReviewStatus === "APPROVED",
  );

  const pendingResearchDocuments = researchDocuments.filter(
    (document) =>
      document.researchReviewStatus === "PENDING" ||
      document.researchReviewStatus === "NOT_REVIEWED",
  );

  // ========================================================
  // FORMAT ACADEMIC PROGRESS
  // ========================================================

  const academicProgress = academicSemesters.map((semester) => ({
    id: semester.id,
    semesterNumber: semester.semesterNumber,
    academicYearId: semester.academicYearId,
    status: semester.status,
    entryStatus: semester.entryStatus,
    sgpa: semester.sgpa,
    totalCredits: semester.totalCredits,
    creditsEarned: semester.creditsEarned,
    backlogs: semester.backlogs,

    // Corrected relation name: subjects
    subjects: (semester.subjects ?? []).map((subject) => ({
      id: subject.id,
      courseCode: subject.courseCode,
      courseName: subject.courseName,
      credits: subject.credits,
      grade: subject.grade,
      gradePoint: subject.gradePoint,
      totalMarksObtained: subject.totalMarksObtained,
      maximumMarks: subject.maximumMarks,
      attendance: subject.attendance,
      classesAttended: subject.classesAttended,
      classesHeld: subject.classesHeld,
    })),
  }));

  // ========================================================
  // RETURN OVERVIEW RESPONSE
  // ========================================================

  return {
    student,

    mentorAssignment: assignment,

    statistics: {
      attendance: student.overallAttendance ?? null,
      cgpa: student.currentCGPA ?? null,

      academics: {
        totalSemesters: academicSemesters.length,

        completedSemesters: academicSemesters.filter(
          (semester) => semester.status === "COMPLETED",
        ).length,

        totalBacklogs: academicSemesters.reduce(
          (total, semester) => total + (semester.backlogs ?? 0),
          0,
        ),
      },

      internships: {
        total: internships.length,
        completed: completedInternships.length,
        pendingVerification: pendingInternshipVerification.length,
      },

      research: {
        total: researchDocuments.length,
        approved: verifiedResearchDocuments.length,
        pendingReview: pendingResearchDocuments.length,
      },

      coCurricular: {
        total: coCurricularDocuments.length,
      },

      extraCurricular: {
        total: extraCurricularDocuments.length,
      },

      awards: {
        total: awardDocuments.length,
      },

      certificates: {
        total: certificateDocuments.length,
      },

      documents: {
        total: allDocuments.length,
      },
    },

    academicProgress,
    internships,
    research: researchDocuments,
    coCurricularActivities: coCurricularDocuments,
    extraCurricularActivities: extraCurricularDocuments,
    awards: awardDocuments,
    certificates: certificateDocuments,
    documents: allDocuments,
  };
};

// ==========================================================
// EXPORT SERVICE
// ==========================================================

export default {
  getStudentOverview,
};