import prisma from "../../../config/prisma.js";

import ApiError from "../../../utils/ApiError.js";

class MentorService {
  /* ==========================================================
     Get Logged-in Mentor Profile
  ========================================================== */

  async getProfile(userId) {
    const profile = await prisma.mentorProfile.findUnique({
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
        specialization: profile.specialization,
        qualification: profile.qualification,

        // Contact Details
        office: profile.office,
        officeHours: profile.officeHours,
        phone: profile.phone,

        // Profile
        profileImage: profile.profileImage,
        about: profile.about,

        // Highlights
        highlightOne: profile.highlightOne,
        highlightTwo: profile.highlightTwo,
        highlightThree: profile.highlightThree,

        // Social Links
        linkedIn: profile.linkedIn,
        googleScholar: profile.googleScholar,
        researchGate: profile.researchGate,
        orcid: profile.orcid,
        website: profile.website,

        // Metadata
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    };
  }

  /* ==========================================================
     Create Mentor Profile
  ========================================================== */

  async createProfile(userId, data) {
    const existingProfile = await prisma.mentorProfile.findUnique({
      where: {
        userId,
      },
    });

    if (existingProfile) {
      throw new ApiError(400, "Profile already exists");
    }

    const profile = await prisma.mentorProfile.create({
      data: {
        userId,

        employeeId: data.employeeId,
        designation: data.designation,
        department: data.department,
        school: data.school,

        specialization: data.specialization,
        qualification: data.qualification,

        office: data.office,
        officeHours: data.officeHours,
        phone: data.phone,

        profileImage: data.profileImage,

        about: data.about,

        highlightOne: data.highlightOne,
        highlightTwo: data.highlightTwo,
        highlightThree: data.highlightThree,

        linkedIn: data.linkedIn,
        googleScholar: data.googleScholar,
        researchGate: data.researchGate,
        orcid: data.orcid,
        website: data.website,
      },
    });

    return profile;
  }

  /* ==========================================================
     Update Mentor Profile
  ========================================================== */

  async updateProfile(userId, data) {
  const existingProfile = await prisma.mentorProfile.findUnique({
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

  // Update Mentor Profile
  const profile = await prisma.mentorProfile.update({
    where: {
      userId,
    },
    data: {
      employeeId: data.employeeId,
      designation: data.designation,
      department: data.department,
      school: data.school,

      specialization: data.specialization,
      qualification: data.qualification,

      office: data.office,
      officeHours: data.officeHours,
      phone: data.phone,

      profileImage: data.profileImage,

      about: data.about,

      highlightOne: data.highlightOne,
      highlightTwo: data.highlightTwo,
      highlightThree: data.highlightThree,

      linkedIn: data.linkedIn,
      googleScholar: data.googleScholar,
      researchGate: data.researchGate,
      orcid: data.orcid,
      website: data.website,
    },
  });

  return profile;
}
}

export default new MentorService();