import express from "express";
import academicController from "../controllers/academic.controller.js";

const router = express.Router();

// =========================================================
// ACADEMIC ROUTES
// =========================================================

/**
 * Get complete academic overview
 *
 * GET /api/mentee/academics
 */
router.get("/", academicController.getProfile);

/**
 * Get a specific semester
 *
 * GET /api/mentee/academics/semester/:semesterNumber
 */
router.get("/semester/:semesterNumber", academicController.getSemester);

/**
 * Create/save semester academic information
 *
 * POST /api/mentee/academics/semester
 */
router.post("/semester", academicController.saveSemester);

/**
 * EDIT A SPECIFIC SEMESTER
 *
 * PUT /api/mentee/academics/semester/:semesterNumber
 *
 * Examples:
 *
 * PUT /semester/1
 * PUT /semester/2
 * PUT /semester/3
 *
 * Only the selected semester is updated.
 */
router.put("/semester/:semesterNumber", academicController.updateSemester);

// =========================================================
// BACKLOG ROUTES
// =========================================================

/**
 * Get all backlogs
 *
 * GET /api/mentee/academics/backlogs
 */
router.get("/backlogs", academicController.getBacklogs);

/**
 * Create backlog
 *
 * POST /api/mentee/academics/backlogs
 */
router.post("/backlogs", academicController.createBacklog);

/**
 * Edit backlog
 *
 * PUT /api/mentee/academics/backlogs/:id
 */
router.put("/backlogs/:id", academicController.updateBacklog);

/**
 * Delete backlog
 *
 * DELETE /api/mentee/academics/backlogs/:id
 */
router.delete("/backlogs/:id", academicController.deleteBacklog);

/**
 * Clear backlog
 *
 * PATCH /api/mentee/academics/backlogs/:id/clear
 */
router.patch("/backlogs/:id/clear", academicController.clearBacklog);

export default router;
