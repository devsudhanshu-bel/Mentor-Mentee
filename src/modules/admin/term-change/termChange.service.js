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
