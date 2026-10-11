import { randomUUID } from "crypto";

import hodPrisma from "../../../../../config/prisma.hod.js";
import ApiError from "../../../../../utils/ApiError.js";

/*
 * ==========================================================
 * PERSONAL PROFILE SERVICE
 *
 * OLD SCHEMA:
 * studentProfile
 *
 * NEW SCHEMA:
 * students
 *
 * AUTH RELATION:
 *
 * user_accounts.id
 *        ↓
 * students.userAccountId
 *
 * Existing API contract is preserved.
 * ==========================================================
 */

class PersonalService {
  /* ========================================================
     FIND AUTHENTICATED STUDENT
  ======================================================== */

  async findStudent(userId) {
    if (!userId) {
      throw new ApiError(401, "Authenticated user not found");
    }

    const student = await hodPrisma.students.findUnique({
      where: {
        userAccountId: userId,
      },

      include: {
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
          },
        },

        contactDetails: {
          select: {
            personalMobile: true,
            personalEmail: true,
          },
        },
      },
    });

    return student;
  }

  /* ========================================================
     RESOLVE DEPARTMENT
  ======================================================== */

  async resolveDepartmentId(departmentId, departmentName) {
    /*
     * If departmentId is already supplied,
     * verify it directly.
     */

    if (departmentId) {
      const department = await hodPrisma.departments.findUnique({
        where: {
          id: departmentId,
        },

        select: {
          id: true,
        },
      });

      if (!department) {
        throw new ApiError(400, "Selected department was not found");
      }

      return department.id;
    }

    /*
     * Existing frontend may still send:
     *
     * department: "Computer Science..."
     *
     * Resolve that name into departmentId.
     */

    if (departmentName) {
      const department = await hodPrisma.departments.findFirst({
        where: {
          name: {
            equals: String(departmentName).trim(),

            mode: "insensitive",
          },
        },

        select: {
          id: true,
        },
      });

      if (department) {
        return department.id;
      }
    }

    return null;
  }

  /* ========================================================
     CREATE PERSONAL PROFILE
  ======================================================== */

  async create(userId, data) {
    /*
     * In the new schema, students are normally already
     * created during Admin student import.
     */

    const existingStudent = await this.findStudent(userId);

    if (existingStudent) {
      throw new ApiError(409, "Personal profile already exists");
    }

    /*
     * Get authenticated user account.
     */

    const user = await hodPrisma.user_accounts.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Authenticated user not found");
    }

    /*
     * Department is required by the new students table.
     */

    const departmentId = await this.resolveDepartmentId(
      data.departmentId,
      data.department,
    );

    if (!departmentId) {
      throw new ApiError(400, "Department is required");
    }

    /*
     * New students table requires:
     *
     * id
     * registerNumber
     * fullName
     * departmentId
     */

    if (!data.registerNumber) {
      throw new ApiError(400, "Register number is required");
    }

    if (!data.fullName) {
      throw new ApiError(400, "Full name is required");
    }

    const profile = await hodPrisma.students.create({
      data: {
        id: randomUUID(),

        registerNumber: String(data.registerNumber).trim(),

        admissionNumber: data.admissionNumber || null,

        fullName: String(data.fullName).trim(),

        email: data.email ?? user.email ?? null,

        phone: data.phone ?? data.phoneNumber ?? null,

        profileImage: data.profileImage ?? null,

        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,

        gender: data.gender ?? null,

        bloodGroup: data.bloodGroup ?? null,

        nationality: data.nationality ?? null,

        religion: data.religion ?? null,

        departmentId,

        programme: data.programme ?? null,

        semester: data.semester ?? null,

        section: data.section ?? null,

        studentType: data.studentType ?? null,

        address: data.address ?? null,

        permanentAddress: data.permanentAddress ?? null,

        yearsAtUniversity: data.yearsAtUniversity ?? null,

        totalCredits:
          data.totalCredits !== undefined &&
          data.totalCredits !== null &&
          data.totalCredits !== ""
            ? Number(data.totalCredits)
            : null,

        currentCGPA:
          data.currentCGPA !== undefined &&
          data.currentCGPA !== null &&
          data.currentCGPA !== ""
            ? Number(data.currentCGPA)
            : null,

        overallAttendance:
          data.overallAttendance !== undefined &&
          data.overallAttendance !== null &&
          data.overallAttendance !== ""
            ? Number(data.overallAttendance)
            : null,

        academicStanding: data.academicStanding ?? null,

        academicSetupCompleted: false,

        userAccountId: user.id,

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    });

    return profile;
  }

  /* ========================================================
     GET PERSONAL PROFILE
  ======================================================== */

  async get(userId) {
    const profile = await this.findStudent(userId);

    if (!profile) {
      return null;
    }

    /*
     * Find active mentor through:
     *
     * students
     *   ↓
     * mentor_assignments
     *   ↓
     * teachers
     */

    const mentorAssignment = await hodPrisma.mentor_assignments.findFirst({
      where: {
        studentId: profile.id,

        status: "ACTIVE",
      },

      orderBy: {
        assignedAt: "desc",
      },

      select: {
        teacherId: true,

        teachers: {
          select: {
            id: true,
            employeeCode: true,
            fullName: true,
            email: true,
            phone: true,
            designation: true,
            isActive: true,
          },
        },
      },
    });

    /*
     * Preserve the exact response shape expected by
     * the existing Profile frontend.
     */

    return {
      /* ----------------------------------------------------
         IDs
      ---------------------------------------------------- */

      id: profile.id,

      userId: profile.userAccountId,

      /* ----------------------------------------------------
         User Information
      ---------------------------------------------------- */

      fullName: profile.fullName,

      username: profile.user_accounts?.username ?? null,

      email:
        profile.contactDetails?.personalEmail ??
        profile.email ??
        profile.user_accounts?.email ??
        null,

      phoneNumber:
        profile.contactDetails?.personalMobile ?? profile.phone ?? null,

      role: profile.user_accounts?.role ?? "STUDENT",

      isActive: profile.user_accounts?.isActive ?? true,

      /* ----------------------------------------------------
         Personal Information
      ---------------------------------------------------- */

      registerNumber: profile.registerNumber,

      admissionNumber: profile.admissionNumber,

      profileImage: profile.profileImage,

      dateOfBirth: profile.dateOfBirth,

      gender: profile.gender,

      bloodGroup: profile.bloodGroup,

      nationality: profile.nationality,

      religion: profile.religion,

      department: profile.departments?.name ?? null,

      departmentId: profile.departmentId,

      programme: profile.programme,

      semester: profile.semester,

      section: profile.section,

      studentType: profile.studentType,

      /* ----------------------------------------------------
         Address
      ---------------------------------------------------- */

      address: profile.address,

      permanentAddress: profile.permanentAddress,

      /* ----------------------------------------------------
         Academic Summary
      ---------------------------------------------------- */

      yearsAtUniversity: profile.yearsAtUniversity,

      totalCredits: profile.totalCredits,

      currentCGPA: profile.currentCGPA,

      overallAttendance: profile.overallAttendance,

      academicStanding: profile.academicStanding,

      /* ----------------------------------------------------
         Mentor
      ---------------------------------------------------- */

      currentMentor: mentorAssignment?.teachers?.fullName ?? null,

      mentor: mentorAssignment?.teachers ?? null,

      /* ----------------------------------------------------
         Metadata
      ---------------------------------------------------- */

      createdAt: profile.createdAt,

      updatedAt: profile.updatedAt,
    };
  }

  /* ========================================================
     UPDATE PERSONAL PROFILE
  ======================================================== */

  async update(userId, data) {
    const existingProfile = await this.findStudent(userId);

    if (!existingProfile) {
      throw new ApiError(404, "Personal profile not found");
    }

    /*
     * ----------------------------------------------------------
     * Build update object ONLY from fields explicitly supplied.
     *
     * This is extremely important.
     *
     * We must NOT send null for fields that the frontend did
     * not intend to change.
     * ----------------------------------------------------------
     */

    const updateData = {
      updatedAt: new Date(),
    };

    /*
     * ----------------------------------------------------------
     * BASIC INFORMATION
     * ----------------------------------------------------------
     */

    if (data.fullName !== undefined) {
      updateData.fullName =
        data.fullName === null
          ? existingProfile.fullName
          : String(data.fullName).trim();
    }

    if (data.registerNumber !== undefined) {
      const value = String(data.registerNumber).trim();

      if (value && value !== existingProfile.registerNumber) {
        const duplicate = await hodPrisma.students.findFirst({
          where: {
            registerNumber: value,
            NOT: {
              id: existingProfile.id,
            },
          },
          select: {
            id: true,
          },
        });

        if (duplicate) {
          throw new ApiError(
            409,
            "Another student already uses this register number",
          );
        }
      }

      if (value) {
        updateData.registerNumber = value;
      }
    }

    if (data.admissionNumber !== undefined) {
      const value =
        data.admissionNumber === null
          ? null
          : String(data.admissionNumber).trim();

      if (value && value !== existingProfile.admissionNumber) {
        const duplicate = await hodPrisma.students.findFirst({
          where: {
            admissionNumber: value,
            NOT: {
              id: existingProfile.id,
            },
          },
          select: {
            id: true,
          },
        });

        if (duplicate) {
          throw new ApiError(
            409,
            "Another student already uses this admission number",
          );
        }
      }

      updateData.admissionNumber = value || null;
    }

    if (data.profileImage !== undefined) {
      updateData.profileImage =
        data.profileImage === "" ? null : data.profileImage;
    }

    /*
     * ----------------------------------------------------------
     * DATE OF BIRTH
     * ----------------------------------------------------------
     */

    if (data.dateOfBirth !== undefined) {
      if (data.dateOfBirth === null || data.dateOfBirth === "") {
        updateData.dateOfBirth = null;
      } else {
        const date = new Date(data.dateOfBirth);

        if (Number.isNaN(date.getTime())) {
          throw new ApiError(400, "Invalid date of birth");
        }

        updateData.dateOfBirth = date;
      }
    }

    /*
     * ----------------------------------------------------------
     * ENUM / PERSONAL FIELDS
     * ----------------------------------------------------------
     */

    if (data.gender !== undefined) {
      updateData.gender = data.gender === "" ? null : data.gender;
    }

    if (data.bloodGroup !== undefined) {
      updateData.bloodGroup = data.bloodGroup === "" ? null : data.bloodGroup;
    }

    if (data.nationality !== undefined) {
      updateData.nationality =
        data.nationality === "" ? null : String(data.nationality).trim();
    }

    if (data.religion !== undefined) {
      updateData.religion =
        data.religion === "" ? null : String(data.religion).trim();
    }

    /*
     * ----------------------------------------------------------
     * DEPARTMENT
     * ----------------------------------------------------------
     */

    if (data.departmentId !== undefined || data.department !== undefined) {
      const resolvedDepartment = await this.resolveDepartmentId(
        data.departmentId,
        data.department,
      );

      if (!resolvedDepartment) {
        throw new ApiError(400, "Selected department was not found");
      }

      updateData.departmentId = resolvedDepartment;
    }

    /*
     * ----------------------------------------------------------
     * PROGRAMME / SEMESTER / SECTION
     * ----------------------------------------------------------
     */

    if (data.programme !== undefined) {
      updateData.programme =
        data.programme === "" ? null : String(data.programme).trim();
    }

    if (data.semester !== undefined) {
      updateData.semester =
        data.semester === "" ? null : String(data.semester).trim();
    }

    if (data.section !== undefined) {
      updateData.section =
        data.section === "" ? null : String(data.section).trim();
    }

    if (data.studentType !== undefined) {
      updateData.studentType =
        data.studentType === "" ? null : data.studentType;
    }

    /*
     * ----------------------------------------------------------
     * ADDRESS
     * ----------------------------------------------------------
     */

    if (data.address !== undefined) {
      updateData.address =
        data.address === "" ? null : String(data.address).trim();
    }

    if (data.permanentAddress !== undefined) {
      updateData.permanentAddress =
        data.permanentAddress === ""
          ? null
          : String(data.permanentAddress).trim();
    }

    /*
     * ----------------------------------------------------------
     * PHONE
     * ----------------------------------------------------------
     */

    if (data.phone !== undefined || data.phoneNumber !== undefined) {
      const phoneValue =
        data.phone !== undefined ? data.phone : data.phoneNumber;

      updateData.phone = phoneValue === "" ? null : phoneValue;
    }

    /*
     * ----------------------------------------------------------
     * ACADEMIC SUMMARY
     *
     * These are preserved unless explicitly supplied.
     * ----------------------------------------------------------
     */

    if (data.yearsAtUniversity !== undefined) {
      updateData.yearsAtUniversity =
        data.yearsAtUniversity === ""
          ? null
          : String(data.yearsAtUniversity).trim();
    }

    if (data.totalCredits !== undefined) {
      if (data.totalCredits === "" || data.totalCredits === null) {
        updateData.totalCredits = null;
      } else {
        const value = Number(data.totalCredits);

        if (!Number.isInteger(value)) {
          throw new ApiError(400, "Total credits must be a valid integer");
        }

        updateData.totalCredits = value;
      }
    }

    if (data.currentCGPA !== undefined) {
      if (data.currentCGPA === "" || data.currentCGPA === null) {
        updateData.currentCGPA = null;
      } else {
        const value = Number(data.currentCGPA);

        if (Number.isNaN(value)) {
          throw new ApiError(400, "Current CGPA must be a valid number");
        }

        updateData.currentCGPA = value;
      }
    }

    if (data.overallAttendance !== undefined) {
      if (data.overallAttendance === "" || data.overallAttendance === null) {
        updateData.overallAttendance = null;
      } else {
        const value = Number(data.overallAttendance);

        if (Number.isNaN(value)) {
          throw new ApiError(400, "Overall attendance must be a valid number");
        }

        updateData.overallAttendance = value;
      }
    }

    if (data.academicStanding !== undefined) {
      updateData.academicStanding =
        data.academicStanding === ""
          ? null
          : String(data.academicStanding).trim();
    }

    /*
     * ----------------------------------------------------------
     * UPDATE EXISTING STUDENT
     * ----------------------------------------------------------
     */

    const updatedProfile = await hodPrisma.students.update({
      where: {
        id: existingProfile.id,
      },

      data: updateData,
    });

    /*
     * ----------------------------------------------------------
     * RETURN FRESH DATA
     *
     * Fetch again so frontend receives the actual database
     * state after the update.
     * ----------------------------------------------------------
     */

    const freshProfile = await this.get(userId);

    return freshProfile;
  }
}

export default new PersonalService();
