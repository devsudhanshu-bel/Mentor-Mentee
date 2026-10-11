import crypto from "crypto";

import hodPrisma from "../../../../../config/prisma.hod.js";
import ApiError from "../../../../../utils/ApiError.js";

class ContactService {
  /* ==========================================================
     FIND STUDENT FROM AUTHENTICATED USER
     
     user_accounts.id
            ↓
     students.userAccountId
  ========================================================== */

  async findStudent(userId) {
    if (!userId) {
      throw new ApiError(401, "Authenticated user not found");
    }

    const student = await hodPrisma.students.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        registerNumber: true,
        fullName: true,
      },
    });

    return student;
  }

  /* ==========================================================
     CREATE CONTACT DETAILS
  ========================================================== */

  async create(userId, data) {
    const student = await this.findStudent(userId);

    if (!student) {
      throw new ApiError(
        404,
        "Create personal profile before adding contact details",
      );
    }

    /* --------------------------------------------------------
       Check whether details already exist
    -------------------------------------------------------- */

    const existingContact = await hodPrisma.student_contact_details.findUnique({
      where: {
        studentId: student.id,
      },
    });

    if (existingContact) {
      throw new ApiError(409, "Contact details already exist");
    }

    /* --------------------------------------------------------
       CREATE
    -------------------------------------------------------- */

    const contact = await hodPrisma.student_contact_details.create({
      data: {
        id: crypto.randomUUID(),

        studentId: student.id,

        /* Address */

        permanentAddress: data.permanentAddress || null,

        currentAddress: data.currentAddress || null,

        addressType: data.addressType || null,

        durationAtCurrentAddress: data.durationAtCurrentAddress || null,

        /* Contact */

        personalMobile: data.personalMobile || null,

        alternateMobile: data.alternateMobile || null,

        personalEmail: data.personalEmail || null,

        alternateEmail: data.alternateEmail || null,

        /* Social */

        whatsappNumber: data.whatsappNumber || null,

        telegramUsername: data.telegramUsername || null,

        linkedInProfile: data.linkedInProfile || null,

        githubProfile: data.githubProfile || null,

        /* Preferences */

        preferredContactMethod: data.preferredContactMethod || null,

        preferredContactTime: data.preferredContactTime || null,

        communicationEmailPreference: data.communicationEmailPreference || null,

        allowWhatsappCommunication: Boolean(data.allowWhatsappCommunication),

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    });

    return contact;
  }

  /* ==========================================================
     GET CONTACT DETAILS
  ========================================================== */

  async get(userId) {
    const student = await this.findStudent(userId);

    if (!student) {
      return null;
    }

    const contact = await hodPrisma.student_contact_details.findUnique({
      where: {
        studentId: student.id,
      },
    });

    return contact;
  }

  /* ==========================================================
     UPDATE CONTACT DETAILS
  ========================================================== */

  async update(userId, data) {
    const student = await this.findStudent(userId);

    if (!student) {
      throw new ApiError(404, "Personal profile not found");
    }

    const existingContact = await hodPrisma.student_contact_details.findUnique({
      where: {
        studentId: student.id,
      },
    });

    if (!existingContact) {
      throw new ApiError(404, "Contact details not found");
    }

    /*
     * ----------------------------------------------------------
     * Only update explicitly supplied fields.
     * ----------------------------------------------------------
     */

    const updateData = {
      updatedAt: new Date(),
    };

    const fields = [
      "permanentAddress",
      "currentAddress",
      "addressType",
      "durationAtCurrentAddress",

      "personalMobile",
      "alternateMobile",
      "personalEmail",
      "alternateEmail",

      "whatsappNumber",
      "telegramUsername",
      "linkedInProfile",
      "githubProfile",

      "preferredContactMethod",
      "preferredContactTime",
      "communicationEmailPreference",
    ];

    for (const field of fields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field] === "" ? null : data[field];
      }
    }

    /*
     * Checkbox needs explicit boolean handling.
     */

    if (data.allowWhatsappCommunication !== undefined) {
      updateData.allowWhatsappCommunication = Boolean(
        data.allowWhatsappCommunication,
      );
    }

    const updatedContact = await hodPrisma.student_contact_details.update({
      where: {
        studentId: student.id,
      },

      data: updateData,
    });

    return updatedContact;
  }
}

export default new ContactService();
