import { randomUUID } from "crypto";

import hodPrisma from "../../../../../config/prisma.hod.js";
import ApiError from "../../../../../utils/ApiError.js";

/*
 * ==========================================================
 * PARENT / GUARDIAN SERVICE
 *
 * NEW SCHEMA:
 *
 * students.id
 *      ↓
 * student_parent_details.studentId
 *
 * Existing API contract preserved.
 * ==========================================================
 */

class ParentService {
  /* ========================================================
     FIND STUDENT
  ======================================================== */

  async findStudent(userId) {
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

  /* ========================================================
     CREATE
  ======================================================== */

  async create(userId, data) {
    const student = await this.findStudent(userId);

    if (!student) {
      throw new ApiError(
        404,
        "Create personal profile before adding parent details",
      );
    }

    const existingParent = await hodPrisma.student_parent_details.findUnique({
      where: {
        studentId: student.id,
      },
    });

    if (existingParent) {
      throw new ApiError(409, "Parent details already exist");
    }

    const parent = await hodPrisma.student_parent_details.create({
      data: {
        id: randomUUID(),

        studentId: student.id,

        /* Father */

        fatherName: data.fatherName,

        fatherOccupation: data.fatherOccupation,

        fatherCompany: data.fatherCompany,

        fatherAnnualIncome: data.fatherAnnualIncome,

        fatherQualification: data.fatherQualification,

        fatherEmail: data.fatherEmail,

        fatherPhone: data.fatherPhone,

        fatherAddress: data.fatherAddress,

        /* Mother */

        motherName: data.motherName,

        motherOccupation: data.motherOccupation,

        motherCompany: data.motherCompany,

        motherAnnualIncome: data.motherAnnualIncome,

        motherQualification: data.motherQualification,

        motherEmail: data.motherEmail,

        motherPhone: data.motherPhone,

        motherAddress: data.motherAddress,

        /* Guardian */

        guardianName: data.guardianName,

        guardianRelationship: data.guardianRelationship,

        guardianPhone: data.guardianPhone,

        guardianAlternatePhone: data.guardianAlternatePhone,

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    });

    return parent;
  }

  /* ========================================================
     GET
  ======================================================== */

  async get(userId) {
    const student = await this.findStudent(userId);

    if (!student) {
      return null;
    }

    return await hodPrisma.student_parent_details.findUnique({
      where: {
        studentId: student.id,
      },
    });
  }

  /* ========================================================
     UPDATE
  ======================================================== */

  async update(userId, data) {
    const student = await this.findStudent(userId);

    if (!student) {
      throw new ApiError(404, "Personal profile not found");
    }

    const existingParent = await hodPrisma.student_parent_details.findUnique({
      where: {
        studentId: student.id,
      },
    });

    if (!existingParent) {
      throw new ApiError(404, "Parent details not found");
    }

    /*
     * ----------------------------------------------------------
     * ONLY UPDATE VALUES THAT WERE ACTUALLY SENT.
     *
     * Existing values are therefore preserved.
     * ----------------------------------------------------------
     */

    const updateData = {
      updatedAt: new Date(),
    };

    const fields = [
      "fatherName",
      "fatherOccupation",
      "fatherCompany",
      "fatherAnnualIncome",
      "fatherQualification",
      "fatherEmail",
      "fatherPhone",
      "fatherAddress",

      "motherName",
      "motherOccupation",
      "motherCompany",
      "motherAnnualIncome",
      "motherQualification",
      "motherEmail",
      "motherPhone",
      "motherAddress",

      "guardianName",
      "guardianRelationship",
      "guardianPhone",
      "guardianAlternatePhone",
    ];

    for (const field of fields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field] === "" ? null : data[field];
      }
    }

    const updatedParent = await hodPrisma.student_parent_details.update({
      where: {
        studentId: student.id,
      },

      data: updateData,
    });

    /*
     * Return the actual database record.
     */

    return updatedParent;
  }
}

export default new ParentService();
