import prisma from "../../../config/prisma.js";

import ApiError from "../../../utils/ApiError.js";

class AdminProfileService {
  /* ==========================================================
     Get Logged-in Admin Profile
  ========================================================== */

  async getProfile(userId) {
    const profile = await prisma.adminProfile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
            isActive: true,
          },
        },
      },
    });

    if (!profile) {
      return {
        profileExists: false,
        profile: null,
      };
    }

    return {
      profileExists: true,
      profile: {
        id: profile.id,
        userId: profile.userId,

        // User Details
        fullName: profile.user.fullName,
        email: profile.user.email,
        isActive: profile.user.isActive,

        // Professional Details
        employeeId: profile.employeeId,
        designation: profile.designation,
        department: profile.department,
        school: profile.school,
        qualification: profile.qualification,
        specialization: profile.specialization,

        // Personal Details
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        nationality: profile.nationality,
        dateOfJoining: profile.dateOfJoining,

        // Contact Details
        office: profile.office,
        officeHours: profile.officeHours,
        phone: profile.phone,

        // Profile
        profileImage: profile.profileImage,
        about: profile.about,

        // Metadata
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    };
  }

  /* ==========================================================
     Create Admin Profile
  ========================================================== */

  async createProfile(userId, data) {
    const existingProfile = await prisma.adminProfile.findUnique({
      where: {
        userId,
      },
    });

    if (existingProfile) {
      throw new ApiError(400, "Profile already exists");
    }

    const profile = await prisma.adminProfile.create({
      data: {
        userId,

        employeeId: data.employeeId,
        designation: data.designation,
        department: data.department,
        school: data.school,

        qualification: data.qualification,
        specialization: data.specialization,

        office: data.office,
        officeHours: data.officeHours,
        phone: data.phone,

        profileImage: data.profileImage,

        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        nationality: data.nationality,
        dateOfJoining: data.dateOfJoining,

        about: data.about,
      },
    });

    return profile;
  }

  /* ==========================================================
     Update Admin Profile
  ========================================================== */

  async updateProfile(userId, data) {
    const existingProfile = await prisma.adminProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!existingProfile) {
      throw new ApiError(
        404,
        "Profile not found. Please create your profile first."
      );
    }

    // Update User table
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName: data.fullName,
      },
    });

    // Update Admin Profile
    const profile = await prisma.adminProfile.update({
      where: {
        userId,
      },
      data: {
        employeeId: data.employeeId,
        designation: data.designation,
        department: data.department,
        school: data.school,

        qualification: data.qualification,
        specialization: data.specialization,

        office: data.office,
        officeHours: data.officeHours,
        phone: data.phone,

        profileImage: data.profileImage,

        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        nationality: data.nationality,
        dateOfJoining: data.dateOfJoining,

        about: data.about,
      },
    });

    return profile;
  }
}

export default new AdminProfileService();