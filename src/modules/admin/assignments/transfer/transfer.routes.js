import express from "express";

import TransferController from "./transfer.controller.js";

const router = express.Router();

// ============================================================
// TRANSFER REQUESTS
// ============================================================

// Get mentor-initiated transfer requests
router.get("/", TransferController.getTransferRequests);

// ============================================================
// STUDENT LOOKUP FOR ADMIN MANUAL TRANSFER
// ============================================================

// Search student by REGISTER NUMBER
router.get(
  "/student/:registerNumber",
  TransferController.getStudentTransferDetails,
);

// ============================================================
// APPROVE TRANSFER REQUEST
// ============================================================

router.patch("/:requestId/approve", TransferController.approveTransferRequest);

// ============================================================
// REJECT TRANSFER REQUEST
// ============================================================

router.patch("/:requestId/reject", TransferController.rejectTransferRequest);

// ============================================================
// ADMIN MANUAL TRANSFER
// ============================================================

router.post("/manual", TransferController.manualStudentTransfer);

export default router;
