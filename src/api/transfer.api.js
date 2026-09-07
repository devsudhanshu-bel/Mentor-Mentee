import api from "./axios";

// ============================================================
// GET TRANSFER REQUESTS
// ============================================================

export const getTransferRequests = async ({ termId, status, search } = {}) => {
  const params = {};

  if (termId) {
    params.termId = termId;
  }

  if (status) {
    params.status = status;
  }

  if (search?.trim()) {
    params.search = search.trim();
  }

  const response = await api.get("/admin/assignments/transfers", {
    params,
  });

  return response.data;
};

// ============================================================
// APPROVE TRANSFER REQUEST
// ============================================================

export const approveTransferRequest = async (requestId) => {
  const response = await api.patch(
    `/admin/assignments/transfers/${requestId}/approve`,
  );

  return response.data;
};

// ============================================================
// REJECT TRANSFER REQUEST
// ============================================================

export const rejectTransferRequest = async (requestId, rejectionReason) => {
  const response = await api.patch(
    `/admin/assignments/transfers/${requestId}/reject`,
    {
      rejectionReason,
    },
  );

  return response.data;
};

// ============================================================
// ADMIN MANUAL STUDENT TRANSFER
// ============================================================

export const manualStudentTransfer = async ({
  registerNumber,
  requestedMentorId,
  reason,
}) => {
  const response = await api.post("/admin/assignments/transfers/manual", {
    registerNumber,
    requestedMentorId,
    reason,
  });

  return response.data;
};

// ============================================================
// GET STUDENT TRANSFER DETAILS
// ============================================================

export const getStudentTransferDetails = async (registerNumber) => {
  const value = registerNumber?.trim();

  if (!value) {
    throw new Error("Student register number is required.");
  }

  const response = await api.get(
    `/admin/assignments/transfers/student/${encodeURIComponent(value)}`,
  );

  return response.data;
};
