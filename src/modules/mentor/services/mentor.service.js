import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

class MentorService {
  /* ==========================================================
     GET CURRENT STUDENT'S MENTOR

     JWT user ID
          ↓
     students.userAccountId
          ↓
     active mentor_assignments
          ↓
     teachers
          ↓
     teacher_profiles
  ========================================================== */

  async getMyMentor(userId) {
    // ========================================================
    // 1. Find logged-in student
    // ========================================================

    const student = await prisma.students.findUnique({
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
            isActive: true,
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

    const assignment = await prisma.mentor_assignments.findFirst({
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

  /* ==========================================================
     GET MENTOR PROFILE
  ========================================================== */

  async getProfile(userId) {
    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      include: {
        teacher_profiles: true,

        departments_teachers_departmentIdTodepartments: {
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

    if (!teacher) {
      return {
        profileExists: false,
        profile: null,
      };
    }

    const department = teacher.departments_teachers_departmentIdTodepartments;

    // ========================================================
    // PROFILE DOES NOT EXIST
    // ========================================================

    if (!teacher.teacher_profiles) {
      return {
        profileExists: false,

        profile: {
          id: null,

          teacherId: teacher.id,
          userId,

          fullName: teacher.fullName,

          employeeCode: teacher.employeeCode,
          employeeId: teacher.employeeCode,

          email: teacher.email || teacher.user_accounts?.email || null,

          phone: teacher.phone,

          designation: teacher.designation,

          department: department?.name || null,
          departmentCode: department?.code || null,

          profileImage: null,

          qualification: null,
          specialization: null,

          office: null,
          officeHours: null,

          about: null,

          highlightOne: null,
          highlightTwo: null,
          highlightThree: null,

          linkedIn: null,
          googleScholar: null,
          researchGate: null,
          orcid: null,
          website: null,

          isActive:
            teacher.isActive && (teacher.user_accounts?.isActive ?? true),

          createdAt: teacher.createdAt,
          updatedAt: teacher.updatedAt,
        },
      };
    }

    // ========================================================
    // PROFILE EXISTS
    // ========================================================

    const profile = teacher.teacher_profiles;

    return {
      profileExists: true,

      profile: {
        id: profile.id,

        teacherId: teacher.id,
        userId,

        fullName: teacher.fullName,

        employeeCode: teacher.employeeCode,
        employeeId: teacher.employeeCode,

        email: teacher.email || teacher.user_accounts?.email || null,

        phone: teacher.phone,

        designation: teacher.designation,

        department: department?.name || null,
        departmentCode: department?.code || null,

        profileImage: profile.profileImage,

        qualification: profile.qualification,
        specialization: profile.specialization,

        office: profile.office,
        officeHours: profile.officeHours,

        about: profile.about,

        highlightOne: profile.highlightOne,
        highlightTwo: profile.highlightTwo,
        highlightThree: profile.highlightThree,

        linkedIn: profile.linkedIn,
        googleScholar: profile.googleScholar,
        researchGate: profile.researchGate,
        orcid: profile.orcid,
        website: profile.website,

        isActive: teacher.isActive && (teacher.user_accounts?.isActive ?? true),

        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    };
  }

  /* ==========================================================
     GET MENTOR OVERVIEW
  ========================================================== */

  async getOverview(userId) {
    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        fullName: true,
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor teacher record not found.");
    }

    const assignedStudents = await prisma.mentor_assignments.count({
      where: {
        teacherId: teacher.id,

        status: "ACTIVE",

        academic_terms: {
          status: "ACTIVE",
        },
      },
    });

    /*
     * Meetings module is not yet connected.
     * Keep the existing UI-compatible value for now.
     */
    const completedMeetings = 48;

    return {
      assignedStudents,
      completedMeetings,
    };
  }

  /* ==========================================================
     CREATE MENTOR PROFILE
  ========================================================== */

  async createProfile(userId, data) {
    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      include: {
        teacher_profiles: true,
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor teacher record not found.");
    }

    if (teacher.teacher_profiles) {
      throw new ApiError(400, "Profile already exists.");
    }

    const now = new Date();

    await prisma.$transaction(async (tx) => {
      await tx.teacher_profiles.create({
        data: {
          id: crypto.randomUUID(),

          teacherId: teacher.id,

          profileImage: this.cleanNullableString(data.profileImage),

          qualification: this.cleanNullableString(data.qualification),

          specialization: this.cleanSpecialization(data.specialization),

          office: this.cleanNullableString(data.office),

          officeHours: this.cleanNullableString(data.officeHours),

          about: this.cleanNullableString(data.about),

          highlightOne: this.cleanNullableString(data.highlightOne),

          highlightTwo: this.cleanNullableString(data.highlightTwo),

          highlightThree: this.cleanNullableString(data.highlightThree),

          linkedIn: this.cleanNullableString(data.linkedIn),

          googleScholar: this.cleanNullableString(data.googleScholar),

          researchGate: this.cleanNullableString(data.researchGate),

          orcid: this.cleanNullableString(data.orcid),

          website: this.cleanNullableString(data.website),

          createdAt: now,
          updatedAt: now,
        },
      });

      // ======================================================
      // UPDATE TEACHER
      // ======================================================

      const teacherUpdate = {
        updatedAt: now,
      };

      if (data.fullName !== undefined) {
        teacherUpdate.fullName = this.cleanString(data.fullName);
      }

      if (data.email !== undefined) {
        teacherUpdate.email = this.cleanString(data.email);
      }

      if (data.phone !== undefined) {
        teacherUpdate.phone = this.cleanString(data.phone);
      }

      if (data.designation !== undefined) {
        teacherUpdate.designation = this.cleanString(data.designation);
      }

      await tx.teachers.update({
        where: {
          id: teacher.id,
        },

        data: teacherUpdate,
      });
    });

    return await this.getProfile(userId);
  }

  /* ==========================================================
     UPDATE MENTOR PROFILE
  ========================================================== */

  async updateProfile(userId, data) {
    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      include: {
        teacher_profiles: true,
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor teacher record not found.");
    }

    if (!teacher.teacher_profiles) {
      throw new ApiError(
        404,
        "Profile not found. Please create your profile first.",
      );
    }

    // ========================================================
    // TEACHER UPDATE
    // ========================================================

    const teacherUpdate = {
      updatedAt: new Date(),
    };

    if (data.fullName !== undefined) {
      teacherUpdate.fullName = this.cleanString(data.fullName);
    }

    if (data.email !== undefined) {
      teacherUpdate.email = this.cleanString(data.email);
    }

    if (data.phone !== undefined) {
      teacherUpdate.phone = this.cleanString(data.phone);
    }

    if (data.designation !== undefined) {
      teacherUpdate.designation = this.cleanString(data.designation);
    }

    // ========================================================
    // PROFILE UPDATE
    // ========================================================

    const profileUpdate = {
      updatedAt: new Date(),
    };

    if (data.profileImage !== undefined) {
      profileUpdate.profileImage = this.cleanNullableString(data.profileImage);
    }

    if (data.qualification !== undefined) {
      profileUpdate.qualification = this.cleanNullableString(
        data.qualification,
      );
    }

    if (data.specialization !== undefined) {
      profileUpdate.specialization = this.cleanSpecialization(
        data.specialization,
      );
    }

    if (data.office !== undefined) {
      profileUpdate.office = this.cleanNullableString(data.office);
    }

    if (data.officeHours !== undefined) {
      profileUpdate.officeHours = this.cleanNullableString(data.officeHours);
    }

    if (data.about !== undefined) {
      profileUpdate.about = this.cleanNullableString(data.about);
    }

    if (data.highlightOne !== undefined) {
      profileUpdate.highlightOne = this.cleanNullableString(data.highlightOne);
    }

    if (data.highlightTwo !== undefined) {
      profileUpdate.highlightTwo = this.cleanNullableString(data.highlightTwo);
    }

    if (data.highlightThree !== undefined) {
      profileUpdate.highlightThree = this.cleanNullableString(
        data.highlightThree,
      );
    }

    if (data.linkedIn !== undefined) {
      profileUpdate.linkedIn = this.cleanNullableString(data.linkedIn);
    }

    if (data.googleScholar !== undefined) {
      profileUpdate.googleScholar = this.cleanNullableString(
        data.googleScholar,
      );
    }

    if (data.researchGate !== undefined) {
      profileUpdate.researchGate = this.cleanNullableString(data.researchGate);
    }

    if (data.orcid !== undefined) {
      profileUpdate.orcid = this.cleanNullableString(data.orcid);
    }

    if (data.website !== undefined) {
      profileUpdate.website = this.cleanNullableString(data.website);
    }

    // ========================================================
    // EMAIL VALIDATION
    // ========================================================

    if (teacherUpdate.email !== undefined && teacherUpdate.email === "") {
      throw new ApiError(400, "Email cannot be empty.");
    }

    // ========================================================
    // DATABASE TRANSACTION
    // ========================================================

    await prisma.$transaction(async (tx) => {
      await tx.teachers.update({
        where: {
          id: teacher.id,
        },

        data: teacherUpdate,
      });

      await tx.teacher_profiles.update({
        where: {
          teacherId: teacher.id,
        },

        data: profileUpdate,
      });
    });

    // ========================================================
    // RETURN FRESH PROFILE
    // ========================================================

    return await this.getProfile(userId);
  }

  /* ==========================================================
     HELPERS
  ========================================================== */

  cleanString(value) {
    if (value === null) {
      return null;
    }

    if (typeof value === "string") {
      return value.trim();
    }

    return value;
  }

  cleanNullableString(value) {
    if (value === undefined || value === null) {
      return null;
    }

    const cleaned = String(value).trim();

    return cleaned === "" ? null : cleaned;
  }

  cleanSpecialization(value) {
    if (value === undefined || value === null) {
      return null;
    }

    const interests = String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .filter(
        (item, index, array) =>
          array.findIndex(
            (existing) => existing.toLowerCase() === item.toLowerCase(),
          ) === index,
      );

    return interests.length > 0 ? interests.join(", ") : null;
  }
}

export default new MentorService();
