import express from "express";

import TermChangeController from "./termChange.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/* ==========================================================
   HOD / ADMIN
   Existing term-change functionality
========================================================== */

/*
 * Get current + next term context
 */
router.get("/context", TermChangeController.getContext);

/*
 * Submit a term-change request
 *
 * This endpoint is for the logged-in admin/HOD side.
 */
router.post(
  "/request",
  authenticate,
  authorize("ADMIN"),
  TermChangeController.createRequest,
);

/* ==========================================================
   SUPER ADMIN ONLY
========================================================== */

/*
 * Every endpoint below requires:
 *
 * 1. Valid JWT
 * 2. SYSTEM_ADMIN role
 *
 * Normal ADMIN/HOD credentials will receive
 * an authorization error.
 */

/*
 * Get all term-change requests
 */
router.get(
  "/requests",
  authenticate,
  authorize("SYSTEM_ADMIN"),
  TermChangeController.getRequests,
);

/*
 * Approve a term-change request
 */
router.patch(
  "/requests/:requestId/approve",
  authenticate,
  authorize("SYSTEM_ADMIN"),
  TermChangeController.approveRequest,
);

/*
 * Reject a term-change request
 */
router.patch(
  "/requests/:requestId/reject",
  authenticate,
  authorize("SYSTEM_ADMIN"),
  TermChangeController.rejectRequest,
);

export default router;
