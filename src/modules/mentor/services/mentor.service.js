import hodPrisma from "../../../../config/prisma.hod.js";
import ApiError from "../../../../utils/ApiError.js";

class MentorService {
  /**
   * ==========================================================
   * GET CURRENT STUDENT'S MENTOR
   *
   * JWT user ID
   *      ↓
   * students.userAccountId
   *      ↓
   * active mentor_assignments
   *      ↓
   * teachers
   *      ↓
   * teacher_profiles
   * ==========================================================
   */
  async getMyMentor(userId) {
    // ========================================================
    // 1. Find logged-in student
    // ========================================================

    const student = await hodPrisma.students.findUnique({
      where: {
        userAccountId: userId,
      },

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

        departments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },

        user_accounts: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            isActive: true,
            lastLogin: true,
          },
        },
      },
    });

    if (!student) {
      throw new ApiError(404, "Student profile not found");
    }

    // ========================================================
    // 2. Find active mentor assignment
    // ========================================================

    const assignment = await hodPrisma.mentor_assignments.findFirst({
      where: {
        studentId: student.id,
        status: "ACTIVE",
      },

      orderBy: {
        assignedAt: "desc",
      },

      select: {
        id: true,
        assignedAt: true,
        endedAt: true,
        status: true,

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

        teachers: {
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
          },
        },
      },
    });

    // ========================================================
    // 3. No mentor assigned
    // ========================================================

    if (!assignment) {
      return {
        assigned: false,

        student: {
          id: student.id,
          registerNumber: student.registerNumber,
          admissionNumber: student.admissionNumber,
          fullName: student.fullName,

          email: student.email ?? student.user_accounts?.email ?? null,

          phone: student.phone,
          profileImage: student.profileImage,
          programme: student.programme,
          semester: student.semester,
          section: student.section,

          department: student.departments
            ? {
                id: student.departments.id,
                name: student.departments.name,
                code: student.departments.code,
              }
            : null,
        },

        mentor: null,

        assignment: null,

        relationship: {
          mentorSince: null,
          assignmentStatus: null,
          term: null,
        },
      };
    }

    // ========================================================
    // 4. Prepare mentor information
    // ========================================================

    const teacher = assignment.teachers;

    const teacherDepartment =
      teacher.departments_teachers_departmentIdTodepartments;

    const teacherProfile = teacher.teacher_profiles;

    // ========================================================
    // 5. Return clean frontend response
    // ========================================================

    return {
      assigned: true,

      student: {
        id: student.id,
        registerNumber: student.registerNumber,
        admissionNumber: student.admissionNumber,
        fullName: student.fullName,

        email: student.email ?? student.user_accounts?.email ?? null,

        phone: student.phone,
        profileImage: student.profileImage,
        programme: student.programme,
        semester: student.semester,
        section: student.section,

        department: student.departments
          ? {
              id: student.departments.id,
              name: student.departments.name,
              code: student.departments.code,
            }
          : null,
      },

      mentor: {
        id: teacher.id,
        employeeCode: teacher.employeeCode,
        fullName: teacher.fullName,
        email: teacher.email,
        phone: teacher.phone,
        designation: teacher.designation,
        maxMentees: teacher.maxMentees,
        isActive: teacher.isActive,

        department: teacherDepartment
          ? {
              id: teacherDepartment.id,
              name: teacherDepartment.name,
              code: teacherDepartment.code,
            }
          : null,

        profile: teacherProfile
          ? {
              profileImage: teacherProfile.profileImage,

              qualification: teacherProfile.qualification,

              specialization: teacherProfile.specialization,

              office: teacherProfile.office,

              officeHours: teacherProfile.officeHours,

              about: teacherProfile.about,

              highlightOne: teacherProfile.highlightOne,

              highlightTwo: teacherProfile.highlightTwo,

              highlightThree: teacherProfile.highlightThree,

              linkedIn: teacherProfile.linkedIn,

              googleScholar: teacherProfile.googleScholar,

              researchGate: teacherProfile.researchGate,

              orcid: teacherProfile.orcid,

              website: teacherProfile.website,
            }
          : null,
      },

      assignment: {
        id: assignment.id,
        assignedAt: assignment.assignedAt,
        endedAt: assignment.endedAt,
        status: assignment.status,
      },

      relationship: {
        mentorSince: assignment.assignedAt,

        assignmentStatus: assignment.status,

        term: assignment.academic_terms
          ? {
              id: assignment.academic_terms.id,

              name: assignment.academic_terms.name,

              semesterNumber: assignment.academic_terms.semesterNumber,

              startDate: assignment.academic_terms.startDate,

              endDate: assignment.academic_terms.endDate,

              status: assignment.academic_terms.status,
            }
          : null,
      },
    };
  }
}

export default new MentorService();
