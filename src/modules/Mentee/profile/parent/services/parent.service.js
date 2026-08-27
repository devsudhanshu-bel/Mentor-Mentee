import prisma from "../../../../../config/prisma.js";

import ApiError from "../../../../../utils/ApiError.js";

class ParentService {
  /**
   * Create Parent Details
   */
  async create(userId, data) {
    //--------------------------------------------------
    // Check Student Profile
    //--------------------------------------------------

    const studentProfile = await prisma.studentProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!studentProfile) {
      throw new ApiError(
        404,
        "Create personal profile before adding parent details"
      );
    }

    //--------------------------------------------------
    // Check Existing Parent Details
    //--------------------------------------------------

    const existingParent = await prisma.studentParentDetails.findUnique({
      where: {
        studentProfileId: studentProfile.id,
      },
    });

    if (existingParent) {
      throw new ApiError(
        409,
        "Parent details already exist"
      );
    }

    //--------------------------------------------------
    // Create Parent Details
    //--------------------------------------------------

    const parent = await prisma.studentParentDetails.create({
      data: {
        studentProfileId: studentProfile.id,

        // Father Details
        fatherName: data.fatherName,
        fatherOccupation: data.fatherOccupation,
        fatherCompany: data.fatherCompany,
        fatherAnnualIncome: data.fatherAnnualIncome,
        fatherQualification: data.fatherQualification,
        fatherEmail: data.fatherEmail,
        fatherPhone: data.fatherPhone,
        fatherAddress: data.fatherAddress,

        // Mother Details
        motherName: data.motherName,
        motherOccupation: data.motherOccupation,
        motherQualification: data.motherQualification,
        motherAnnualIncome: data.motherAnnualIncome,
        motherEmail: data.motherEmail,
        motherPhone: data.motherPhone,
        motherAddress: data.motherAddress,

        // Guardian Details
        guardianName: data.guardianName,
        guardianRelationship: data.guardianRelationship,
        guardianPhone: data.guardianPhone,
        guardianAlternatePhone: data.guardianAlternatePhone,
      },
    });

    return parent;
  }

  /**
   * Get Parent Details
   */
  async get(userId) {
    const studentProfile = await prisma.studentProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!studentProfile) {
      return null;
    }

    return await prisma.studentParentDetails.findUnique({
      where: {
        studentProfileId: studentProfile.id,
      },
    });
  }

  /**
   * Update Parent Details
   */
  async update(userId, data) {
    //--------------------------------------------------
    // Check Student Profile
    //--------------------------------------------------

    const studentProfile = await prisma.studentProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!studentProfile) {
      throw new ApiError(
        404,
        "Personal profile not found"
      );
    }

    //--------------------------------------------------
    // Check Parent Details
    //--------------------------------------------------

    const existingParent = await prisma.studentParentDetails.findUnique({
      where: {
        studentProfileId: studentProfile.id,
      },
    });

    if (!existingParent) {
      throw new ApiError(
        404,
        "Parent details not found"
      );
    }

    //--------------------------------------------------
    // Update Parent Details
    //--------------------------------------------------

    const parent = await prisma.studentParentDetails.update({
      where: {
        studentProfileId: studentProfile.id,
      },
      data: {
        // Father Details
        fatherName: data.fatherName,
        fatherOccupation: data.fatherOccupation,
        fatherCompany: data.fatherCompany,
        fatherAnnualIncome: data.fatherAnnualIncome,
        fatherQualification: data.fatherQualification,
        fatherEmail: data.fatherEmail,
        fatherPhone: data.fatherPhone,
        fatherAddress: data.fatherAddress,

        // Mother Details
        motherName: data.motherName,
        motherOccupation: data.motherOccupation,
        motherQualification: data.motherQualification,
        motherAnnualIncome: data.motherAnnualIncome,
        motherEmail: data.motherEmail,
        motherPhone: data.motherPhone,
        motherAddress: data.motherAddress,

        // Guardian Details
        guardianName: data.guardianName,
        guardianRelationship: data.guardianRelationship,
        guardianPhone: data.guardianPhone,
        guardianAlternatePhone: data.guardianAlternatePhone,
      },
    });

    return parent;
  }
}

export default new ParentService();