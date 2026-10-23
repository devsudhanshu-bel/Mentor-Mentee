import { randomUUID } from "crypto";

import hodPrisma from "../../../config/prisma.hod.js";

/* ==========================================================
   ACADEMIC TERM CALENDAR
==========================================================

   Odd Semester:
   June 1 → October 21

   Even Semester:
   October 22 → April 30 of following year

   These are DEFAULT dates only.

   HOD can select custom dates while creating
   the term-change request.

========================================================== */

const getFixedNextTerm = (currentTerm) => {
  const currentName = currentTerm?.name || "";

  const match = currentName.match(/^(Odd|Even)\s+Semester\s+(\d{4})$/i);

  if (!match) {
    throw new Error(
      `Unable to determine next academic term from "${currentName}"`,
    );
  }

  const currentType = match[1].toLowerCase();

  const currentYear = Number(match[2]);

  /* --------------------------------------------------------
     ODD → EVEN
  -------------------------------------------------------- */

  if (currentType === "odd") {
    return {
      name: `Even Semester ${currentYear}`,

      semesterNumber: Number(currentTerm.semesterNumber) + 1,

      defaultStartDate: new Date(currentYear, 9, 22),

      defaultEndDate: new Date(currentYear + 1, 3, 30),
    };
  }

  /* --------------------------------------------------------
     EVEN → ODD
  -------------------------------------------------------- */

  return {
    name: `Odd Semester ${currentYear + 1}`,

    semesterNumber: Number(currentTerm.semesterNumber) + 1,

    defaultStartDate: new Date(currentYear + 1, 5, 1),

    defaultEndDate: new Date(currentYear + 1, 9, 21),
  };
};

class TermChangeService {
  /* ========================================================
     GET TERM CHANGE CONTEXT
  ======================================================== */

  getTermChangeContext = async () => {
    /* ------------------------------------------------------
       Current active term
    ------------------------------------------------------ */

    const currentTerm = await hodPrisma.academic_terms.findFirst({
      where: {
        status: "ACTIVE",
      },

      orderBy: {
        startDate: "desc",
      },

      include: {
        academic_years: true,
      },
    });

    if (!currentTerm) {
      throw new Error("No active academic term found");
    }

    /* ------------------------------------------------------
       Pending request
    ------------------------------------------------------ */

    const pendingRequest = await hodPrisma.term_change_requests.findFirst({
      where: {
        status: "PENDING",
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    /* ------------------------------------------------------
       Automatically determine next term
    ------------------------------------------------------ */

    const fixedNextTerm = getFixedNextTerm(currentTerm);

    /* ------------------------------------------------------
       Check if next term already exists
    ------------------------------------------------------ */

    const existingNextTerm = await hodPrisma.academic_terms.findFirst({
      where: {
        name: fixedNextTerm.name,
      },

      orderBy: {
        startDate: "asc",
      },

      include: {
        academic_years: true,
      },
    });

    /* ------------------------------------------------------
       Return context
    ------------------------------------------------------ */

    return {
      currentTerm: {
        id: currentTerm.id,

        name: currentTerm.name,

        semesterNumber: currentTerm.semesterNumber,

        startDate: currentTerm.startDate,

        endDate: currentTerm.endDate,

        status: currentTerm.status,

        academicYear: currentTerm.academic_years
          ? {
              id: currentTerm.academic_years.id,

              name: currentTerm.academic_years.name,
            }
          : null,
      },

      nextTerm: {
        exists: Boolean(existingNextTerm),

        id: existingNextTerm?.id || null,

        name: existingNextTerm?.name || fixedNextTerm.name,

        semesterNumber:
          existingNextTerm?.semesterNumber || fixedNextTerm.semesterNumber,

        startDate:
          existingNextTerm?.startDate || fixedNextTerm.defaultStartDate,

        endDate: existingNextTerm?.endDate || fixedNextTerm.defaultEndDate,

        status: existingNextTerm?.status || "NOT_CREATED",
      },

      pendingRequest: pendingRequest
        ? {
            id: pendingRequest.id,

            requestedTermName: pendingRequest.requestedTermName,

            requestedSemesterNumber: pendingRequest.requestedSemesterNumber,

            requestedStartDate: pendingRequest.requestedStartDate,

            requestedEndDate: pendingRequest.requestedEndDate,

            status: pendingRequest.status,

            createdAt: pendingRequest.createdAt,
          }
        : null,
    };
  };

  /* ========================================================
     CREATE TERM CHANGE REQUEST
  ======================================================== */

  createRequest = async ({
    requestedStartDate,
    requestedEndDate,
    requestedBy,
  }) => {
    /* ------------------------------------------------------
       Required fields
    ------------------------------------------------------ */

    if (!requestedStartDate) {
      throw new Error("Start date is required");
    }

    if (!requestedEndDate) {
      throw new Error("End date is required");
    }

    if (!requestedBy) {
      throw new Error("Requester information is required");
    }

    /* ------------------------------------------------------
       Convert dates
    ------------------------------------------------------ */

    const startDate = new Date(requestedStartDate);

    const endDate = new Date(requestedEndDate);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new Error("Invalid term dates");
    }

    /* ------------------------------------------------------
       Date ordering
    ------------------------------------------------------ */

    if (endDate <= startDate) {
      throw new Error("End date must be after start date");
    }

    /* ------------------------------------------------------
       Get active term
    ------------------------------------------------------ */

    const currentTerm = await hodPrisma.academic_terms.findFirst({
      where: {
        status: "ACTIVE",
      },

      orderBy: {
        startDate: "desc",
      },
    });

    if (!currentTerm) {
      throw new Error("No active academic term found");
    }

    /* ------------------------------------------------------
       Prevent duplicate pending requests
    ------------------------------------------------------ */

    const existingPending = await hodPrisma.term_change_requests.findFirst({
      where: {
        status: "PENDING",
      },
    });

    if (existingPending) {
      throw new Error("A term change request is already pending approval");
    }

    /* ------------------------------------------------------
       Determine next term
    ------------------------------------------------------ */

    const fixedNextTerm = getFixedNextTerm(currentTerm);

    /* ------------------------------------------------------
       IMPORTANT:
       
       No fixed-calendar validation here.

       The default dates are only suggestions.
       The HOD-selected dates are stored exactly.
    ------------------------------------------------------ */

    const existingNextTerm = await hodPrisma.academic_terms.findFirst({
      where: {
        name: fixedNextTerm.name,
      },
    });

    /* ------------------------------------------------------
       Create request
    ------------------------------------------------------ */

    const request = await hodPrisma.term_change_requests.create({
      data: {
        id: randomUUID(),

        currentTermId: currentTerm.id,

        requestedTermName: fixedNextTerm.name,

        requestedSemesterNumber: fixedNextTerm.semesterNumber,

        requestedStartDate: startDate,

        requestedEndDate: endDate,

        requestedBy,

        status: "PENDING",

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    });

    return {
      id: request.id,

      currentTermId: request.currentTermId,

      requestedTermName: request.requestedTermName,

      requestedSemesterNumber: request.requestedSemesterNumber,

      requestedStartDate: request.requestedStartDate,

      requestedEndDate: request.requestedEndDate,

      status: request.status,

      requestedBy: request.requestedBy,

      createdAt: request.createdAt,

      nextTermExists: Boolean(existingNextTerm),
    };
  };


  /* ========================================================
     DIRECT ADMIN TERM ACTIVATION + STUDENT PROGRESSION
     ADMIN ONLY
  ======================================================== */

  activateTermDirectly = async ({
    requestedStartDate,
    requestedEndDate,
    expectedCurrentTermId,
    activatedBy,
  }) => {
    if (!requestedStartDate || !requestedEndDate) {
      throw new Error("Start date and end date are required.");
    }

    if (!expectedCurrentTermId || !activatedBy) {
      throw new Error("Current term and administrator identity are required.");
    }

    const startDate = new Date(requestedStartDate);
    const endDate = new Date(requestedEndDate);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      endDate <= startDate
    ) {
      throw new Error("Please provide a valid term date range.");
    }

    return hodPrisma.$transaction(
      async (tx) => {
        const currentTerm = await tx.academic_terms.findFirst({
          where: { status: "ACTIVE" },
          orderBy: { startDate: "desc" },
          include: { academic_years: true },
        });

        if (!currentTerm) {
          throw new Error("No active academic term was found.");
        }

        // Prevent a repeated click/request from advancing two terms.
        if (currentTerm.id !== expectedCurrentTermId) {
          const error = new Error(
            "The active term has changed since this dialog was opened. Refresh the page before trying again.",
          );
          error.statusCode = 409;
          throw error;
        }

        const fixedNextTerm = getFixedNextTerm(currentTerm);
        let targetYear = await tx.academic_years.findFirst({
          where: {
            startDate: { lte: startDate },
            endDate: { gte: endDate },
            departmentId: currentTerm.academic_years?.departmentId,
          },
          orderBy: { startDate: "desc" },
        });

        if (!targetYear) {
          const termMatch = fixedNextTerm.name.match(
            /^(Odd|Even)\s+Semester\s+(\d{4})$/i,
          );
          if (termMatch) {
            const termYear = Number(termMatch[2]);
            const yearName = `${termYear}-${String(termYear + 1).slice(-2)}`;
            targetYear = await tx.academic_years.findFirst({
              where: {
                name: yearName,
                departmentId: currentTerm.academic_years?.departmentId,
              },
            });
          }
        }

        if (!targetYear) {
          const error = new Error(
            "The academic year for the next term was not found. Create the target academic year first, then retry.",
          );
          error.statusCode = 400;
          throw error;
        }

        let nextTerm = await tx.academic_terms.findFirst({
          where: {
            academicYearId: targetYear.id,
            name: fixedNextTerm.name,
          },
        });

        if (!nextTerm) {
          nextTerm = await tx.academic_terms.create({
            data: {
              id: randomUUID(),
              academicYearId: targetYear.id,
              name: fixedNextTerm.name,
              semesterNumber: fixedNextTerm.semesterNumber,
              startDate,
              endDate,
              status: "UPCOMING",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        } else {
          nextTerm = await tx.academic_terms.update({
            where: { id: nextTerm.id },
            data: {
              semesterNumber: fixedNextTerm.semesterNumber,
              startDate,
              endDate,
              status: "UPCOMING",
              updatedAt: new Date(),
            },
          });
        }

        // Process students actively enrolled in the term being closed.
        const activeEnrollments = await tx.student_enrollments.findMany({
          where: {
            termId: currentTerm.id,
            status: "ACTIVE",
            students: { status: "ACTIVE" },
          },
          include: { students: true },
        });

        let promotedCount = 0;
        let graduatedCount = 0;

        for (const enrollment of activeEnrollments) {
          const student = enrollment.students;
          const currentSemester = Number(enrollment.semesterNumber);

          if (!Number.isInteger(currentSemester) || currentSemester < 1) {
            throw new Error(
              `Invalid semester number for student ${student.registerNumber}. No changes were committed.`,
            );
          }

          await tx.student_enrollments.update({
            where: { id: enrollment.id },
            data: {
              status: "COMPLETED",
              completedAt: new Date(),
              updatedAt: new Date(),
            },
          });

          // Preserve the current mentor relationship before closing its
          // term-specific assignment record. Historical assignments remain
          // ENDED; an equivalent ACTIVE record is created for the next term.
          const currentMentorAssignments = await tx.mentor_assignments.findMany({
            where: {
              studentId: student.id,
              termId: currentTerm.id,
              status: "ACTIVE",
            },
            select: {
              teacherId: true,
              assignedBy: true,
            },
          });

          await tx.mentor_assignments.updateMany({
            where: {
              studentId: student.id,
              termId: currentTerm.id,
              status: "ACTIVE",
            },
            data: {
              status: "ENDED",
              endedAt: new Date(),
              updatedAt: new Date(),
            },
          });

          if (currentSemester >= 8) {
            await tx.students.update({
              where: { id: student.id },
              data: {
                status: "GRADUATED",
                semester: "8",
                updatedAt: new Date(),
              },
            });
            graduatedCount += 1;
            continue;
          }

          const nextSemester = currentSemester + 1;

          // Upsert makes the transition safe if a target enrollment was
          // already created in advance; the expected-current-term guard
          // prevents this same activation from running twice.
          const existingNextEnrollment =
            await tx.student_enrollments.findUnique({
              where: {
                studentId_termId: {
                  studentId: student.id,
                  termId: nextTerm.id,
                },
              },
            });

          if (existingNextEnrollment) {
            await tx.student_enrollments.update({
              where: { id: existingNextEnrollment.id },
              data: {
                semesterNumber: nextSemester,
                status: "ACTIVE",
                enrolledAt: new Date(),
                completedAt: null,
                updatedAt: new Date(),
              },
            });
          } else {
            await tx.student_enrollments.create({
              data: {
                id: randomUUID(),
                studentId: student.id,
                termId: nextTerm.id,
                semesterNumber: nextSemester,
                status: "ACTIVE",
                enrolledAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
          }

          await tx.students.update({
            where: { id: student.id },
            data: {
              semester: String(nextSemester),
              updatedAt: new Date(),
            },
          });

          // Carry the existing mentor(s) into the new term. The old records
          // are retained as history, and duplicate active rows are avoided.
          for (const assignment of currentMentorAssignments) {
            const existingNextAssignment = await tx.mentor_assignments.findFirst({
              where: {
                studentId: student.id,
                teacherId: assignment.teacherId,
                termId: nextTerm.id,
                status: "ACTIVE",
              },
              select: { id: true },
            });

            if (!existingNextAssignment) {
              await tx.mentor_assignments.create({
                data: {
                  id: randomUUID(),
                  studentId: student.id,
                  teacherId: assignment.teacherId,
                  termId: nextTerm.id,
                  status: "ACTIVE",
                  assignedAt: new Date(),
                  assignedBy: assignment.assignedBy,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            }
          }

          promotedCount += 1;
        }

        await tx.academic_terms.update({
          where: { id: currentTerm.id },
          data: { status: "COMPLETED", updatedAt: new Date() },
        });

        await tx.academic_terms.update({
          where: { id: nextTerm.id },
          data: { status: "ACTIVE", updatedAt: new Date() },
        });

        if (currentTerm.academicYearId !== targetYear.id) {
          await tx.academic_years.update({
            where: { id: currentTerm.academicYearId },
            data: { status: "COMPLETED", updatedAt: new Date() },
          });
        }

        await tx.academic_years.update({
          where: { id: targetYear.id },
          data: { status: "ACTIVE", updatedAt: new Date() },
        });

        // Old pending requests are no longer actionable after direct activation.
        await tx.term_change_requests.updateMany({
          where: { status: "PENDING" },
          data: {
            status: "REJECTED",
            reviewedBy: activatedBy,
            reviewedAt: new Date(),
            reviewComment: "Superseded by direct Admin term activation.",
            updatedAt: new Date(),
          },
        });

        return {
          previousTerm: {
            id: currentTerm.id,
            name: currentTerm.name,
          },
          activatedTerm: {
            id: nextTerm.id,
            name: nextTerm.name,
            semesterNumber: nextTerm.semesterNumber,
            startDate: nextTerm.startDate,
            endDate: nextTerm.endDate,
            academicYearId: targetYear.id,
            academicYearName: targetYear.name,
          },
          promotedCount,
          graduatedCount,
          skippedCount: Math.max(0, activeEnrollments.length - promotedCount - graduatedCount),
        };
      },
      { maxWait: 10000, timeout: 60000 },
    );
  };

  /* ========================================================
     GET ALL TERM CHANGE REQUESTS
     SYSTEM ADMIN ONLY
  ======================================================== */

  getAllRequests = async () => {
    const requests = await hodPrisma.term_change_requests.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return requests;
  };

  /* ========================================================
     APPROVE TERM CHANGE REQUEST
     SYSTEM ADMIN ONLY
  ======================================================== */

  approveRequest = async ({ requestId, reviewedBy, reviewComment }) => {
    if (!requestId) {
      throw new Error("Term change request ID is required");
    }

    if (!reviewedBy) {
      throw new Error("Reviewer information is required");
    }

    /* ------------------------------------------------------
       Find request
    ------------------------------------------------------ */

    const request = await hodPrisma.term_change_requests.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new Error("Term change request not found");
    }

    /* ------------------------------------------------------
       Only PENDING requests can be approved
    ------------------------------------------------------ */

    if (request.status !== "PENDING") {
      throw new Error(
        `This request has already been ${request.status.toLowerCase()}`,
      );
    }

    /* ------------------------------------------------------
       Find current term
    ------------------------------------------------------ */

    const currentTerm = await hodPrisma.academic_terms.findUnique({
      where: {
        id: request.currentTermId,
      },
    });

    if (!currentTerm) {
      throw new Error("Current academic term not found");
    }

    if (currentTerm.status !== "ACTIVE") {
      throw new Error("The current academic term is no longer active");
    }

    /* ------------------------------------------------------
       TRANSACTION
    ------------------------------------------------------ */

    const result = await hodPrisma.$transaction(async (tx) => {
      /* ------------------------------------------------
             Find requested term
          ------------------------------------------------ */

      let nextTerm = await tx.academic_terms.findFirst({
        where: {
          name: request.requestedTermName,
        },

        orderBy: {
          startDate: "asc",
        },
      });

      /* ------------------------------------------------
             Determine academic year
          ------------------------------------------------ */

      let academicYear = null;

      if (nextTerm) {
        academicYear = await tx.academic_years.findUnique({
          where: {
            id: nextTerm.academicYearId,
          },
        });
      }

      /* ------------------------------------------------
             If not found through term,
             try requested date range
          ------------------------------------------------ */

      if (!academicYear) {
        academicYear = await tx.academic_years.findFirst({
          where: {
            startDate: {
              lte: request.requestedStartDate,
            },

            endDate: {
              gte: request.requestedEndDate,
            },
          },

          orderBy: {
            startDate: "desc",
          },
        });
      }

      /* ------------------------------------------------
             Try academic year based on
             next-term year.
          ------------------------------------------------ */

      if (!academicYear) {
        const termMatch = request.requestedTermName.match(
          /^(Odd|Even)\s+Semester\s+(\d{4})$/i,
        );

        if (termMatch) {
          const termYear = Number(termMatch[2]);

          const academicYearName = `${termYear}-${String(termYear + 1).slice(
            -2,
          )}`;

          academicYear = await tx.academic_years.findFirst({
            where: {
              name: academicYearName,
            },
          });
        }
      }

      if (!academicYear) {
        throw new Error(
          "Unable to determine academic year for the requested term",
        );
      }

      /* ------------------------------------------------
             Create next term if missing
          ------------------------------------------------ */

      if (!nextTerm) {
        nextTerm = await tx.academic_terms.create({
          data: {
            id: randomUUID(),

            academicYearId: academicYear.id,

            name: request.requestedTermName,

            semesterNumber: request.requestedSemesterNumber,

            startDate: request.requestedStartDate,

            endDate: request.requestedEndDate,

            status: "ACTIVE",
          },
        });
      } else {
        /* ----------------------------------------------
               Existing term:
               overwrite dates with the dates approved
               in the request.
            ---------------------------------------------- */

        nextTerm = await tx.academic_terms.update({
          where: {
            id: nextTerm.id,
          },

          data: {
            startDate: request.requestedStartDate,

            endDate: request.requestedEndDate,

            semesterNumber: request.requestedSemesterNumber,

            status: "ACTIVE",
          },
        });
      }

      /* ------------------------------------------------
             End previous term
          ------------------------------------------------ */

      await tx.academic_terms.update({
        where: {
          id: currentTerm.id,
        },

        data: {
          status: "ENDED",
        },
      });

      /* ------------------------------------------------
             Keep academic year statuses consistent
          ------------------------------------------------ */

      await tx.academic_years.updateMany({
        where: {
          status: "ACTIVE",

          id: {
            not: academicYear.id,
          },
        },

        data: {
          status: "ENDED",
        },
      });

      await tx.academic_years.update({
        where: {
          id: academicYear.id,
        },

        data: {
          status: "ACTIVE",
        },
      });

      /* ------------------------------------------------
             Mark request APPROVED
          ------------------------------------------------ */

      const updatedRequest = await tx.term_change_requests.update({
        where: {
          id: request.id,
        },

        data: {
          status: "APPROVED",

          reviewedBy: reviewedBy,

          reviewedAt: new Date(),

          reviewComment: reviewComment || null,
        },
      });

      return {
        request: updatedRequest,

        previousTerm: currentTerm,

        activatedTerm: nextTerm,
      };
    });

    return result;
  };

  /* ========================================================
     REJECT TERM CHANGE REQUEST
     SYSTEM ADMIN ONLY
  ======================================================== */

  rejectRequest = async ({ requestId, reviewedBy, reviewComment }) => {
    if (!requestId) {
      throw new Error("Term change request ID is required");
    }

    if (!reviewedBy) {
      throw new Error("Reviewer information is required");
    }

    /* ------------------------------------------------------
       Find request
    ------------------------------------------------------ */

    const request = await hodPrisma.term_change_requests.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new Error("Term change request not found");
    }

    /* ------------------------------------------------------
       Only PENDING requests can be rejected
    ------------------------------------------------------ */

    if (request.status !== "PENDING") {
      throw new Error(
        `This request has already been ${request.status.toLowerCase()}`,
      );
    }

    /* ------------------------------------------------------
       Reject request
    ------------------------------------------------------ */

    const updatedRequest = await hodPrisma.term_change_requests.update({
      where: {
        id: requestId,
      },

      data: {
        status: "REJECTED",

        reviewedBy: reviewedBy,

        reviewedAt: new Date(),

        reviewComment: reviewComment || null,
      },
    });

    return updatedRequest;
  };
}

export default new TermChangeService();
