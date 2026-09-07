import TransferService from "./transfer.service.js";

import ApiResponse from "../../../../utils/ApiResponse.js";
import asyncHandler from "../../../../utils/asyncHandler.js";

class TransferController {
  // ============================================================
  // GET TRANSFER REQUESTS
  // ============================================================

  getTransferRequests = asyncHandler(async (req, res) => {
    const { termId, status, search } = req.query;

    const requests = await TransferService.getTransferRequests({
      termId,
      status,
      search,
    });

    return res.status(200).json(
      new ApiResponse(200, "Transfer requests fetched successfully", {
        requests,
      }),
    );
  });

  // ============================================================
  // GET STUDENT TRANSFER DETAILS
  // ============================================================

  getStudentTransferDetails = asyncHandler(async (req, res) => {
    const { registerNumber } = req.params;

    const student =
      await TransferService.getStudentTransferDetails(registerNumber);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Student transfer details fetched successfully",
          student,
        ),
      );
  });

  // ============================================================
  // APPROVE TRANSFER REQUEST
  // ============================================================

  approveTransferRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;

    const reviewedBy = req.user?.id;

    const result = await TransferService.approveTransferRequest({
      requestId,
      reviewedBy,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Transfer request approved successfully", result),
      );
  });

  // ============================================================
  // REJECT TRANSFER REQUEST
  // ============================================================

  rejectTransferRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;

    const { rejectionReason } = req.body;

    const reviewedBy = req.user?.id;

    const result = await TransferService.rejectTransferRequest({
      requestId,
      rejectionReason,
      reviewedBy,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Transfer request rejected successfully", result),
      );
  });

  // ============================================================
  // ADMIN MANUAL STUDENT TRANSFER
  // ============================================================

  manualStudentTransfer = asyncHandler(async (req, res) => {
    const { registerNumber, requestedMentorId, reason } = req.body;

    const assignedBy = req.user?.id;

    const result = await TransferService.manualStudentTransfer({
      registerNumber,
      requestedMentorId,
      reason,
      assignedBy,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Student transferred successfully", result));
  });
}

export default new TransferController();
