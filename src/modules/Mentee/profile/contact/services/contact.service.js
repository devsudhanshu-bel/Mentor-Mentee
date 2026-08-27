import prisma from "../../../../../config/prisma.js";

import ApiError from "../../../../../utils/ApiError.js";

class ContactService {
  /**
   * Create Contact Details
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
        "Create personal profile before adding contact details"
      );
    }

    //--------------------------------------------------
    // Check Existing Contact Details
    //--------------------------------------------------

    const existingContact = await prisma.studentContactDetails.findUnique({
      where: {
        studentProfileId: studentProfile.id,
      },
    });

    if (existingContact) {
      throw new ApiError(
        409,
        "Contact details already exist"
      );
    }

    //--------------------------------------------------
    // Create Contact Details
    //--------------------------------------------------

    const contact = await prisma.studentContactDetails.create({
      data: {
        studentProfileId: studentProfile.id,

        permanentAddress: data.permanentAddress,
        currentAddress: data.currentAddress,
        addressType: data.addressType,
        durationAtCurrentAddress: data.durationAtCurrentAddress,

        personalMobile: data.personalMobile,
        alternateMobile: data.alternateMobile,

        personalEmail: data.personalEmail,
        alternateEmail: data.alternateEmail,

        whatsappNumber: data.whatsappNumber,
        telegramUsername: data.telegramUsername,

        linkedInProfile: data.linkedInProfile,
        githubProfile: data.githubProfile,

        preferredContactMethod: data.preferredContactMethod,
        preferredContactTime: data.preferredContactTime,
        communicationEmailPreference: data.communicationEmailPreference,

        allowWhatsappCommunication: data.allowWhatsappCommunication,
      },
    });

    return contact;
  }

  /**
   * Get Contact Details
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

    return await prisma.studentContactDetails.findUnique({
      where: {
        studentProfileId: studentProfile.id,
      },
    });
  }

  /**
   * Update Contact Details
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
    // Check Contact Details
    //--------------------------------------------------

    const existingContact = await prisma.studentContactDetails.findUnique({
      where: {
        studentProfileId: studentProfile.id,
      },
    });

    if (!existingContact) {
      throw new ApiError(
        404,
        "Contact details not found"
      );
    }

    //--------------------------------------------------
    // Update Contact Details
    //--------------------------------------------------

    const contact = await prisma.studentContactDetails.update({
      where: {
        studentProfileId: studentProfile.id,
      },
      data: {
        permanentAddress: data.permanentAddress,
        currentAddress: data.currentAddress,
        addressType: data.addressType,
        durationAtCurrentAddress: data.durationAtCurrentAddress,

        personalMobile: data.personalMobile,
        alternateMobile: data.alternateMobile,

        personalEmail: data.personalEmail,
        alternateEmail: data.alternateEmail,

        whatsappNumber: data.whatsappNumber,
        telegramUsername: data.telegramUsername,

        linkedInProfile: data.linkedInProfile,
        githubProfile: data.githubProfile,

        preferredContactMethod: data.preferredContactMethod,
        preferredContactTime: data.preferredContactTime,
        communicationEmailPreference: data.communicationEmailPreference,

        allowWhatsappCommunication: data.allowWhatsappCommunication,
      },
    });

    return contact;
  }
}

export default new ContactService();