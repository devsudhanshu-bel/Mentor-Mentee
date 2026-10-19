
import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

class StudentReportService {
  async getStudentReport(mentorUserId, studentId, role = "MENTOR") {
    if (!mentorUserId) {
      throw new ApiError(401, "Authentication required");
    }

    if (!studentId) {
      throw new ApiError(400, "Student ID is required");
    }

    let mentor = null;

    if (role === "MENTOR") {
      mentor = await prisma.teachers.findUnique({
        where: { userAccountId: mentorUserId },
        select: {
          id: true,
          fullName: true,
          employeeCode: true,
          email: true,
          isActive: true,
        },
      });

      if (!mentor || !mentor.isActive) {
        throw new ApiError(403, "Active mentor profile not found");
      }

      const assignment = await prisma.mentor_assignments.findFirst({
        where: {
          teacherId: mentor.id,
          studentId,
          status: "ACTIVE",
        },
        select: { id: true },
      });

      if (!assignment) {
        throw new ApiError(
          403,
          "You are not currently assigned to this student",
        );
      }
    } else if (["ADMIN", "SYSTEM_ADMIN"].includes(role)) {
      mentor = {
        id: null,
        fullName: "Administration",
        employeeCode: null,
        email: null,
        isActive: true,
      };
    } else {
      throw new ApiError(403, "You are not authorized to view this report");
    }

    const student = await prisma.students.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        fullName: true,
        registerNumber: true,
        email: true,
        phone: true,
        programme: true,
        semester: true,
        section: true,
        academicStanding: true,
        currentCGPA: true,
        totalCredits: true,
        overallAttendance: true,
        academicSetupCompleted: true,
        academicSemesters: {
          orderBy: { semesterNumber: "asc" },
          include: {
            subjects: {
              orderBy: { courseCode: "asc" },
              select: {
                courseCode: true,
                courseName: true,
                credits: true,
                cia1: true,
                cia2: true,
                cia3: true,
                mse: true,
                ese: true,
                maximumMarks: true,
                totalMarksObtained: true,
                grade: true,
                gradePoint: true,
                attendance: true,
                classesAttended: true,
                classesHeld: true,
              },
            },
          },
        },
        academicBacklogs: {
          orderBy: [
            { semesterNumber: "asc" },
            { subjectCode: "asc" },
          ],
          select: {
            subjectCode: true,
            subjectName: true,
            semesterNumber: true,
            status: true,
            clearedSemesterNumber: true,
            clearedGrade: true,
            clearedMarks: true,
            clearedAt: true,
          },
        },
      },
    });

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    const internships = await prisma.student_internships.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
      select: {
        companyName: true,
        internshipTitle: true,
        role: true,
        startDate: true,
        endDate: true,
        location: true,
        mode: true,
        projectName: true,
        description: true,
        status: true,
        internshipType: true,
        verificationStatus: true,
        verifiedAt: true,
        mentorRemark: true,
        completionRequested: true,
        completionRequestedAt: true,
        completionVerificationStatus: true,
        completionMentorRemark: true,
        completionVerifiedAt: true,
        rating: true,
        internship_reviews: {
          orderBy: { reviewedAt: "desc" },
          select: {
            reviewStage: true,
            decision: true,
            remarks: true,
            reviewedAt: true,
          },
        },
      },
    });

    const meetings = await prisma.mentor_meetings.findMany({
      where: {
        studentId,
        ...(role === "MENTOR" ? { mentorTeacherId: mentor.id } : {}),
      },
      orderBy: { startAt: "desc" },
      include: {
        mentor_meeting_notes: {
          select: { content: true },
        },
        mentor_meeting_discussion_points: {
          orderBy: { position: "asc" },
          select: { content: true },
        },
        mentor_meeting_feedback: {
          select: {
            rating: true,
            feedback: true,
          },
        },
      },
    });

    return {
      generatedAt: new Date(),
      mentor,
      student,
      semesters: student.academicSemesters,
      internships,
      meetings,
    };
  }
}

export default new StudentReportService();
