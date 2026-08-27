import prisma from "../../../../../config/prisma.js";

import ApiError from "../../../../../utils/ApiError.js";

class PersonalService {
  /**
   * ==================================================
   * Create Personal Profile
   * ==================================================
   */
  async create(userId, data) {
    //--------------------------------------------------
    // Check Existing Profile
    //--------------------------------------------------

    const existingProfile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },
      });

    if (existingProfile) {
      throw new ApiError(
        409,
        "Personal profile already exists"
      );
    }

    //--------------------------------------------------
    // Create Profile
    //--------------------------------------------------

    const profile =
      await prisma.studentProfile.create({
        data: {
          //--------------------------------------------------
          // Relation
          //--------------------------------------------------

          userId,

          //--------------------------------------------------
          // Basic Information
          //--------------------------------------------------

          registerNumber:
            data.registerNumber,

          admissionNumber:
            data.admissionNumber,

          profileImage:
            data.profileImage,

          dateOfBirth:
            data.dateOfBirth
              ? new Date(data.dateOfBirth)
              : null,

          gender:
            data.gender,

          bloodGroup:
            data.bloodGroup,

          nationality:
            data.nationality,

          religion:
            data.religion,

          department:
            data.department,

          programme:
            data.programme,

          semester:
            data.semester,

          section:
            data.section,

          studentType:
            data.studentType,

          //--------------------------------------------------
          // Address Information
          //--------------------------------------------------

          address:
            data.address,

          permanentAddress:
            data.permanentAddress,

          //--------------------------------------------------
          // Academic Summary
          //--------------------------------------------------

          yearsAtUniversity:
            data.yearsAtUniversity,

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

          academicStanding:
            data.academicStanding,

          currentMentor:
            data.currentMentor,
        },
      });

    return profile;
  }
    /**
   * ==================================================
   * Get Personal Profile
   * ==================================================
   */
  async get(userId) {
    //--------------------------------------------------
    // Fetch Profile
    //--------------------------------------------------

    const profile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },

        include: {
          user: {
            select: {
              fullName: true,
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

    //--------------------------------------------------
    // Check Profile
    //--------------------------------------------------

    if (!profile) {
      return null;
    }

    //--------------------------------------------------
    // Response
    //--------------------------------------------------

    return {
      //--------------------------------------------------
      // IDs
      //--------------------------------------------------

      id: profile.id,

      userId: profile.userId,

      //--------------------------------------------------
      // User Information
      //--------------------------------------------------

      fullName:
        profile.user.fullName,

      username:
        profile.user.username,

      email:
        profile.contactDetails?.personalEmail ??
        profile.user.email,

      phoneNumber:
        profile.contactDetails?.personalMobile ??
        null,

      role:
        profile.user.role,

      isActive:
        profile.user.isActive,

      //--------------------------------------------------
      // Personal Information
      //--------------------------------------------------

      registerNumber:
        profile.registerNumber,

      admissionNumber:
        profile.admissionNumber,

      profileImage:
        profile.profileImage,

      dateOfBirth:
        profile.dateOfBirth,

      gender:
        profile.gender,

      bloodGroup:
        profile.bloodGroup,

      nationality:
        profile.nationality,

      religion:
        profile.religion,

      department:
        profile.department,

      programme:
        profile.programme,

      semester:
        profile.semester,

      section:
        profile.section,

      studentType:
        profile.studentType,

      //--------------------------------------------------
      // Address Information
      //--------------------------------------------------

      address:
        profile.address,

      permanentAddress:
        profile.permanentAddress,

      //--------------------------------------------------
      // Academic Summary
      //--------------------------------------------------

      yearsAtUniversity:
        profile.yearsAtUniversity,

      totalCredits:
        profile.totalCredits,

      currentCGPA:
        profile.currentCGPA,

      overallAttendance:
        profile.overallAttendance,

      academicStanding:
        profile.academicStanding,

      currentMentor:
        profile.currentMentor,

      //--------------------------------------------------
      // Timestamps
      //--------------------------------------------------

      createdAt:
        profile.createdAt,

      updatedAt:
        profile.updatedAt,
    };
  }
    /**
   * ==================================================
   * Update Personal Profile
   * ==================================================
   */
  async update(userId, data) {
    //--------------------------------------------------
    // Check Existing Profile
    //--------------------------------------------------

    const existingProfile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!existingProfile) {
      throw new ApiError(
        404,
        "Personal profile not found"
      );
    }

    //--------------------------------------------------
    // Update Profile
    //--------------------------------------------------

    const profile =
      await prisma.studentProfile.update({
        where: {
          userId,
        },

        data: {
          //--------------------------------------------------
          // Basic Information
          //--------------------------------------------------

          registerNumber:
            data.registerNumber,

          admissionNumber:
            data.admissionNumber,

          profileImage:
            data.profileImage,

          dateOfBirth:
            data.dateOfBirth
              ? new Date(data.dateOfBirth)
              : null,

          gender:
            data.gender,

          bloodGroup:
            data.bloodGroup,

          nationality:
            data.nationality,

          religion:
            data.religion,

          department:
            data.department,

          programme:
            data.programme,

          semester:
            data.semester,

          section:
            data.section,

          studentType:
            data.studentType,

          //--------------------------------------------------
          // Address Information
          //--------------------------------------------------

          address:
            data.address,

          permanentAddress:
            data.permanentAddress,

          //--------------------------------------------------
          // Academic Summary
          //--------------------------------------------------

          yearsAtUniversity:
            data.yearsAtUniversity,

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

          academicStanding:
            data.academicStanding,

          currentMentor:
            data.currentMentor,
        },
      });

    return profile;
  }
}

export default new PersonalService();