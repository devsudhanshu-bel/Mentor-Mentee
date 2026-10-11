import hodPrisma from "../../../../config/prisma.hod.js";
import ApiError from "../../../../utils/ApiError.js";

import crypto from "crypto";

class TransferService {
  // ============================================================
  // GET TRANSFER REQUESTS
  // ============================================================

  async getTransferRequests({ termId, status, search }) {
    const where = {
      // Only mentor-initiated requests should appear
      requestSource: "TEACHER",
    };

    if (termId) {
      where.termId = termId;
    }

    if (status) {
      where.status = status;
    }

    if (search?.trim()) {
      const value = search.trim();

      where.students = {
        OR: [
          {
            registerNumber: {
              contains: value,
              mode: "insensitive",
            },
          },
          {
            fullName: {
              contains: value,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    const requests = await hodPrisma.mentor_transfer_requests.findMany({
      where,

      include: {
        students: {
          select: {
            id: true,
            registerNumber: true,
            fullName: true,
            email: true,
            semester: true,
            section: true,

            departments: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },

        teachers_mentor_transfer_requests_currentMentorIdToteachers: {
          select: {
            id: true,
            employeeCode: true,
            fullName: true,

            departments_teachers_departmentIdTodepartments: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },

        teachers_mentor_transfer_requests_requestedMentorIdToteachers: {
          select: {
            id: true,
            employeeCode: true,
            fullName: true,

            departments_teachers_departmentIdTodepartments: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },

        teachers_mentor_transfer_requests_initiatedByTeacherIdToteachers: {
          select: {
            id: true,
            employeeCode: true,
            fullName: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return requests;
  }

  // ============================================================
  // GET STUDENT TRANSFER DETAILS
  // ============================================================

  async getStudentTransferDetails(registerNumber) {
    const value = registerNumber?.trim();

    if (!value) {
      throw new ApiError(400, "Student register number is required");
    }

    // ----------------------------------------------------------
    // Resolve REGISTER NUMBER → students.id
    // ----------------------------------------------------------

    const student = await hodPrisma.students.findUnique({
      where: {
        registerNumber: value,
      },

      select: {
        id: true,
        registerNumber: true,
        fullName: true,
        email: true,
        phone: true,
        semester: true,
        section: true,
        status: true,
        departmentId: true,

        departments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    // ----------------------------------------------------------
    // IMPORTANT:
    // Non-existent student = 404
    // ----------------------------------------------------------

    if (!student) {
      throw new ApiError(404, "Student not found.");
    }

    // ----------------------------------------------------------
    // Find current ACTIVE assignment
    // ----------------------------------------------------------

    const currentAssignment = await hodPrisma.mentor_assignments.findFirst({
      where: {
        studentId: student.id,
        status: "ACTIVE",
      },

      orderBy: {
        assignedAt: "desc",
      },

      select: {
        id: true,
        termId: true,
        assignedAt: true,

        teachers: {
          select: {
            id: true,
            employeeCode: true,
            fullName: true,
            email: true,
            maxMentees: true,

            departments_teachers_departmentIdTodepartments: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    return {
      id: student.id,

      registerNumber: student.registerNumber,

      fullName: student.fullName,

      email: student.email,

      phone: student.phone,

      semester: student.semester,

      section: student.section,

      status: student.status,

      department: student.departments,

      currentMentor: currentAssignment?.teachers || null,

      currentMentorId: currentAssignment?.teachers?.id || null,

      currentAssignmentId: currentAssignment?.id || null,

      termId: currentAssignment?.termId || null,
    };
  }

  // ============================================================
  // APPROVE TRANSFER REQUEST
  // ============================================================

  async approveTransferRequest({ requestId, reviewedBy }) {
    if (!reviewedBy) {
      throw new ApiError(401, "Reviewer information is missing");
    }

    const request = await hodPrisma.mentor_transfer_requests.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new ApiError(404, "Transfer request not found");
    }

    if (request.status !== "PENDING") {
      throw new ApiError(
        400,
        `Transfer request is already ${request.status.toLowerCase()}`,
      );
    }

    if (!request.requestedMentorId) {
      throw new ApiError(400, "Requested mentor is missing");
    }

    const requestedMentor = await hodPrisma.teachers.findUnique({
      where: {
        id: request.requestedMentorId,
      },

      select: {
        id: true,
        employeeCode: true,
        fullName: true,
        maxMentees: true,
        isActive: true,
      },
    });

    if (!requestedMentor) {
      throw new ApiError(404, "Requested mentor not found");
    }

    if (!requestedMentor.isActive) {
      throw new ApiError(400, "Requested mentor is inactive");
    }

    const activeCount = await hodPrisma.mentor_assignments.count({
      where: {
        teacherId: requestedMentor.id,

        termId: request.termId,

        status: "ACTIVE",
      },
    });

    if (activeCount >= requestedMentor.maxMentees) {
      throw new ApiError(
        409,
        "Requested mentor has reached maximum mentee capacity",
      );
    }

    const result = await hodPrisma.$transaction(async (tx) => {
      const currentAssignment = await tx.mentor_assignments.findFirst({
        where: {
          studentId: request.studentId,

          termId: request.termId,

          status: "ACTIVE",
        },
      });

      if (currentAssignment) {
        await tx.mentor_assignments.update({
          where: {
            id: currentAssignment.id,
          },

          data: {
            status: "TRANSFERRED",
            endedAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      const newAssignment = await tx.mentor_assignments.create({
        data: {
          id: crypto.randomUUID(),

          studentId: request.studentId,

          teacherId: request.requestedMentorId,

          termId: request.termId,

          status: "ACTIVE",

          assignedBy: reviewedBy,

          assignedAt: new Date(),

          createdAt: new Date(),

          updatedAt: new Date(),
        },
      });

      const updatedRequest = await tx.mentor_transfer_requests.update({
        where: {
          id: request.id,
        },

        data: {
          status: "APPROVED",

          reviewedBy,

          reviewedAt: new Date(),

          updatedAt: new Date(),
        },
      });

      return {
        assignment: newAssignment,

        request: updatedRequest,
      };
    });

    return result;
  }

  // ============================================================
  // REJECT TRANSFER REQUEST
  // ============================================================

  async rejectTransferRequest({ requestId, rejectionReason, reviewedBy }) {
    if (!reviewedBy) {
      throw new ApiError(401, "Reviewer information is missing");
    }

    const request = await hodPrisma.mentor_transfer_requests.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new ApiError(404, "Transfer request not found");
    }

    if (request.status !== "PENDING") {
      throw new ApiError(
        400,
        `Transfer request is already ${request.status.toLowerCase()}`,
      );
    }

    const updatedRequest = await hodPrisma.mentor_transfer_requests.update({
      where: {
        id: requestId,
      },

      data: {
        status: "REJECTED",

        reviewedBy,

        reviewedAt: new Date(),

        rejectionReason:
          rejectionReason?.trim() ||
          "Transfer request rejected by administrator.",

        updatedAt: new Date(),
      },
    });

    return updatedRequest;
  }

  // ============================================================
  // ADMIN MANUAL STUDENT TRANSFER
  // ============================================================

  async manualStudentTransfer({
    registerNumber,
    requestedMentorId,
    reason,
    assignedBy,
  }) {
    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    const value = registerNumber?.trim();

    if (!value) {
      throw new ApiError(400, "Student register number is required");
    }

    if (!requestedMentorId) {
      throw new ApiError(400, "New mentor is required");
    }

    if (!reason?.trim()) {
      throw new ApiError(400, "Transfer reason / remark is required");
    }

    if (!assignedBy) {
      throw new ApiError(401, "Administrator information is missing");
    }

    // ----------------------------------------------------------
    // FIND STUDENT USING REGISTER NUMBER
    // ----------------------------------------------------------

    const student = await hodPrisma.students.findUnique({
      where: {
        registerNumber: value,
      },

      select: {
        id: true,
        registerNumber: true,
        fullName: true,
        departmentId: true,
      },
    });

    if (!student) {
      throw new ApiError(404, "Student not found.");
    }

    // ----------------------------------------------------------
    // FIND CURRENT ACTIVE ASSIGNMENT
    // ----------------------------------------------------------

    const currentAssignment = await hodPrisma.mentor_assignments.findFirst({
      where: {
        studentId: student.id,

        status: "ACTIVE",
      },

      orderBy: {
        assignedAt: "desc",
      },

      select: {
        id: true,
        teacherId: true,
        termId: true,

        teachers: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });

    if (!currentAssignment) {
      throw new ApiError(
        400,
        "Student does not have an active mentor assignment",
      );
    }

    // ----------------------------------------------------------
    // SAME MENTOR CHECK
    // ----------------------------------------------------------

    if (currentAssignment.teacherId === requestedMentorId) {
      throw new ApiError(
        400,
        "Student is already assigned to the selected mentor",
      );
    }

    // ----------------------------------------------------------
    // VERIFY NEW MENTOR
    // ----------------------------------------------------------

    const newMentor = await hodPrisma.teachers.findUnique({
      where: {
        id: requestedMentorId,
      },

      select: {
        id: true,
        employeeCode: true,
        fullName: true,
        maxMentees: true,
        isActive: true,
        departmentId: true,
      },
    });

    if (!newMentor) {
      throw new ApiError(404, "New mentor not found");
    }

    if (!newMentor.isActive) {
      throw new ApiError(400, "Selected mentor is inactive");
    }

    // ----------------------------------------------------------
    // CHECK CAPACITY
    // ----------------------------------------------------------

    const activeCount = await hodPrisma.mentor_assignments.count({
      where: {
        teacherId: requestedMentorId,

        termId: currentAssignment.termId,

        status: "ACTIVE",
      },
    });

    if (activeCount >= newMentor.maxMentees) {
      throw new ApiError(
        409,
        "Selected mentor has reached maximum mentee capacity",
      );
    }

    // ----------------------------------------------------------
    // TRANSACTION
    // ----------------------------------------------------------

    const result = await hodPrisma.$transaction(async (tx) => {
      // End old assignment

      await tx.mentor_assignments.update({
        where: {
          id: currentAssignment.id,
        },

        data: {
          status: "TRANSFERRED",

          endedAt: new Date(),

          updatedAt: new Date(),
        },
      });

      // Create new assignment

      const newAssignment = await tx.mentor_assignments.create({
        data: {
          id: crypto.randomUUID(),

          studentId: student.id,

          teacherId: requestedMentorId,

          termId: currentAssignment.termId,

          status: "ACTIVE",

          assignedBy,

          assignedAt: new Date(),

          createdAt: new Date(),

          updatedAt: new Date(),
        },
      });

      // ----------------------------------------------------
      // IMPORTANT:
      // Store Admin's manual-transfer remark.
      //
      // This is NOT a pending request.
      // It is immediately APPROVED and recorded as IN_PERSON.
      // ----------------------------------------------------

      const auditRecord = await tx.mentor_transfer_requests.create({
        data: {
          id: crypto.randomUUID(),

          studentId: student.id,

          currentMentorId: currentAssignment.teacherId,

          requestedMentorId,

          termId: currentAssignment.termId,

          requestSource: "IN_PERSON",

          initiatedByUserId: assignedBy,

          reason: reason.trim(),

          status: "APPROVED",

          reviewedBy: assignedBy,

          reviewedAt: new Date(),

          createdAt: new Date(),

          updatedAt: new Date(),
        },
      });

      return {
        newAssignment,
        auditRecord,
      };
    });

    return {
      student: {
        id: student.id,
        registerNumber: student.registerNumber,
        fullName: student.fullName,
      },

      previousMentor: {
        id: currentAssignment.teacherId,
        name: currentAssignment.teachers?.fullName || "",
      },

      newMentor: {
        id: newMentor.id,
        employeeCode: newMentor.employeeCode,
        name: newMentor.fullName,
      },

      termId: currentAssignment.termId,

      reason: reason.trim(),

      assignmentId: result.newAssignment.id,

      transferRecordId: result.auditRecord.id,
    };
  }
}

export default new TransferService();
