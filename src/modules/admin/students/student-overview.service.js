import hodPrisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

class StudentOverviewService {
  async getOverview(studentId) {
    if (!studentId) {
      throw new ApiError(400, "Student ID is required");
    }

    const student = await hodPrisma.students.findUnique({
      where: { id: studentId },

      include: {
        departments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },

        contactDetails: true,

        academicSemesters: {
          orderBy: {
            semesterNumber: "asc",
          },

          include: {
            subjects: {
              orderBy: {
                courseName: "asc",
              },
            },

            academic_years: {
              select: {
                name: true,
              },
            },
          },
        },

        academicBacklogs: {
          orderBy: {
            semesterNumber: "asc",
          },
        },

        documents: {
          orderBy: {
            uploadedAt: "desc",
          },
        },

        mentor_assignments: {
          where: {
            status: "ACTIVE",
          },

          orderBy: {
            assignedAt: "desc",
          },

          take: 1,

          include: {
            teachers: {
              select: {
                id: true,
                employeeCode: true,
                fullName: true,
                email: true,
                phone: true,
                designation: true,
              },
            },

            academic_terms: {
              select: {
                id: true,
                name: true,
                semesterNumber: true,
                startDate: true,
                endDate: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    const semesters = student.academicSemesters || [];

    const latestSemester =
      semesters.length > 0 ? semesters[semesters.length - 1] : null;

    const latestSubjects = latestSemester?.subjects || [];

    // Attendance is weighted by the number of classes held.
    // Subjects without recorded classes are excluded.
    const attendanceSubjects = semesters.flatMap((semester) =>
      (semester.subjects || []).filter(
        (subject) =>
          Number(subject.classesHeld) > 0 &&
          Number(subject.classesAttended) >= 0,
      ),
    );

    const totalClassesHeld = attendanceSubjects.reduce(
      (sum, subject) => sum + Number(subject.classesHeld || 0),
      0,
    );

    const totalClassesAttended = attendanceSubjects.reduce(
      (sum, subject) => sum + Number(subject.classesAttended || 0),
      0,
    );

    const calculatedAttendance =
      totalClassesHeld > 0
        ? Number(((totalClassesAttended / totalClassesHeld) * 100).toFixed(2))
        : null;

    // Use the persisted overallAttendance when available;
    // otherwise calculate it from subject attendance.
    const overallAttendance =
      student.overallAttendance !== null &&
      student.overallAttendance !== undefined
        ? Number(student.overallAttendance)
        : calculatedAttendance;

    const activeBacklogs = (student.academicBacklogs || []).filter(
      (backlog) => backlog.status === "ACTIVE",
    );

    const subjects = latestSubjects.map((subject) => ({
      id: subject.id,
      courseCode: subject.courseCode,
      courseName: subject.courseName,
      credits: subject.credits,
      grade: subject.grade,
      gradePoint: subject.gradePoint,
      marksObtained: subject.totalMarksObtained,
      maximumMarks: subject.maximumMarks,
      attendance:
        subject.attendance !== null && subject.attendance !== undefined
          ? Number(subject.attendance)
          : Number(subject.classesHeld) > 0
            ? Number(
                (
                  (Number(subject.classesAttended || 0) /
                    Number(subject.classesHeld)) *
                  100
                ).toFixed(2),
              )
            : null,
      classesAttended: subject.classesAttended,
      classesHeld: subject.classesHeld,
    }));

    const academicProgress = semesters.map((semester) => ({
      id: semester.id,
      semesterNumber: semester.semesterNumber,
      label: `Sem ${semester.semesterNumber}`,
      sgpa: semester.sgpa,
      totalCredits: semester.totalCredits,
      creditsEarned: semester.creditsEarned,
      backlogs: semester.backlogs,
      status: semester.status,
      academicYear: semester.academic_years?.name || null,
    }));

    const mentorAssignment = student.mentor_assignments?.[0] || null;

    const documents = (student.documents || []).map((document) => ({
      id: document.id,
      name: document.documentName,
      category: document.category,
      description: document.description,
      fileType: document.fileType,
      fileSize: document.fileSize,
      fileUrl: document.fileUrl,
      uploadedAt: document.uploadedAt,
    }));

    return {
      student: {
        id: student.id,
        registerNumber: student.registerNumber,
        admissionNumber: student.admissionNumber,
        fullName: student.fullName,
        email: student.contactDetails?.personalEmail || student.email || null,
        phone: student.contactDetails?.personalMobile || student.phone || null,
        status: student.status,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        profileImage: student.profileImage,
        programme: student.programme,
        department: student.departments,
        section: student.section,
        semester: student.semester,
        address:
          student.contactDetails?.currentAddress ||
          student.address ||
          student.contactDetails?.permanentAddress ||
          student.permanentAddress ||
          null,
        nationality: student.nationality,
        bloodGroup: student.bloodGroup,
        studentType: student.studentType,
        academicStanding: student.academicStanding,
      },

      mentor: mentorAssignment?.teachers
        ? {
            ...mentorAssignment.teachers,
            assignmentId: mentorAssignment.id,
            assignedAt: mentorAssignment.assignedAt,
            term: mentorAssignment.academic_terms,
          }
        : null,

      statistics: {
        attendance: overallAttendance,
        cgpa: student.currentCGPA,
        totalCredits: student.totalCredits,
        creditsEarned: semesters.reduce(
          (sum, semester) => sum + Number(semester.creditsEarned || 0),
          0,
        ),
        totalBacklogs: activeBacklogs.length,
        semesterCount: semesters.length,
      },

      academicProgress,

      currentSemester: latestSemester
        ? {
            id: latestSemester.id,
            semesterNumber: latestSemester.semesterNumber,
            sgpa: latestSemester.sgpa,
            totalCredits: latestSemester.totalCredits,
            creditsEarned: latestSemester.creditsEarned,
            backlogs: latestSemester.backlogs,
            status: latestSemester.status,
            academicYear: latestSemester.academic_years?.name || null,
          }
        : null,

      subjects,

      backlogs: activeBacklogs.map((backlog) => ({
        id: backlog.id,
        subjectCode: backlog.subjectCode,
        subjectName: backlog.subjectName,
        semesterNumber: backlog.semesterNumber,
        status: backlog.status,
      })),

      documents,

      // These records are not represented by dedicated models
      // in the currently inspected HOD Prisma schema.
      internships: [],
      research: [],
      certificates: [],
      coCurricularActivities: [],
      meetings: [],
      mentorRemarks: [],
      actionItems: [],
    };
  }
}

export default new StudentOverviewService();
