import express from "express";

import AssignmentController from "./assignment.controller.js";
import transferRoutes from "./transfer/transfer.routes.js";

const router = express.Router();

// ============================================================
// TRANSFER REQUESTS
// ============================================================

router.use("/transfers", transferRoutes);

// ============================================================
// ASSIGNMENT CONTEXT
// ============================================================

// GET
// /api/admin/assignments/context

router.get("/context", AssignmentController.getAssignmentContext);

// ============================================================
// CREATE ASSIGNMENTS
// ============================================================

// POST
// /api/admin/assignments

router.post("/", AssignmentController.assignStudents);

// ============================================================
// GET ALL ASSIGNMENTS
// ============================================================

// GET
// /api/admin/assignments

router.get("/", AssignmentController.getAllAssignments);

export default router;
