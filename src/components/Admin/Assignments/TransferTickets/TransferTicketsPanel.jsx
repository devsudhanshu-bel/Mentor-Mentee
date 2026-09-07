import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  SlidersHorizontal,
  X,
  UserRound,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { getAssignmentContext } from "../../../../api/assignment.api";

import {
  getTransferRequests,
  manualStudentTransfer,
  getStudentTransferDetails,
} from "../../../../api/transfer.api";

import TicketTable from "./Table/TicketTable";
import TicketPagination from "./Table/TicketPagination";

const TransferTicketsPanel = () => {
  // ============================================================
  // TRANSFER REQUESTS
  // ============================================================

  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  // ============================================================
  // MANUAL TRANSFER
  // ============================================================

  const [manualTransferOpen, setManualTransferOpen] = useState(false);

  const [registerNumber, setRegisterNumber] = useState("");

  const [student, setStudent] = useState(null);

  const [mentors, setMentors] = useState([]);

  const [selectedMentorId, setSelectedMentorId] = useState("");

  const [reason, setReason] = useState("");

  const [studentLoading, setStudentLoading] = useState(false);

  const [mentorLoading, setMentorLoading] = useState(false);

  const [transferLoading, setTransferLoading] = useState(false);

  const [manualError, setManualError] = useState("");

  const ITEMS_PER_PAGE = 10;

  // ============================================================
  // LOAD TRANSFER REQUESTS
  // ============================================================

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const context = await getAssignmentContext({});

      const termId = context?.data?.termId || context?.termId;

      const response = await getTransferRequests({
        termId,
        status: statusFilter,
        search: search.trim(),
      });

      const result = response?.data || response || {};

      const requests = result?.requests || [];

      // ========================================================
      // NORMALIZE BACKEND DATA → EXISTING TICKET UI
      // ========================================================

      const normalized = requests.map((request) => {
        const studentData = request?.students || {};

        const currentMentor =
          request?.teachers_mentor_transfer_requests_currentMentorIdToteachers ||
          null;

        const requestedMentor =
          request?.teachers_mentor_transfer_requests_requestedMentorIdToteachers ||
          null;

        const initiatedTeacher =
          request?.teachers_mentor_transfer_requests_initiatedByTeacherIdToteachers ||
          null;

        const studentDepartment = studentData?.departments?.name || "";

        const currentMentorDepartment =
          currentMentor?.departments_teachers_departmentIdTodepartments?.name ||
          studentDepartment;

        const requestedMentorDepartment =
          requestedMentor?.departments_teachers_departmentIdTodepartments
            ?.name || "";

        const createdAt = request?.createdAt
          ? new Date(request.createdAt)
          : null;

        // ======================================================
        // REQUESTER
        // ======================================================

        const requesterName = initiatedTeacher?.fullName || "Unknown Mentor";

        const requesterSubtitle = initiatedTeacher?.employeeCode || "Mentor";

        const initials =
          requesterName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join("") || "?";

        // ======================================================
        // RETURN NORMALIZED OBJECT
        // ======================================================

        return {
          id: request?.id,

          requester: {
            initials,
            name: requesterName,
            subtitle: requesterSubtitle,
            type: "Mentor",
          },

          currentAssignment: {
            name: studentData?.fullName || "Unknown Student",

            department: [
              studentData?.registerNumber,
              studentData?.semester ? `Semester ${studentData.semester}` : "",
            ]
              .filter(Boolean)
              .join(" • "),
          },

          recommendedMentor: {
            name: requestedMentor?.fullName || "Not specified",

            department: requestedMentorDepartment,
          },

          reason: request?.reason || "No reason provided",

          status:
            request?.status === "PENDING"
              ? "Pending"
              : request?.status === "APPROVED"
                ? "Approved"
                : request?.status === "REJECTED"
                  ? "Rejected"
                  : request?.status,

          createdOn: {
            date: createdAt
              ? createdAt.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A",

            time: createdAt
              ? createdAt.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "N/A",
          },

          // ====================================================
          // ORIGINAL BACKEND INFORMATION
          // ====================================================

          requestId: request?.id,

          studentId: request?.studentId,

          studentRegisterNumber: studentData?.registerNumber || "",

          currentMentorId: request?.currentMentorId || null,

          requestedMentorId: request?.requestedMentorId || null,

          rawStatus: request?.status || "",
        };
      });

      setTickets(normalized);
      setPage(1);
    } catch (err) {
      console.error("Failed to load transfer requests:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load transfer requests.",
      );

      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL / STATUS LOAD
  // ============================================================

  useEffect(() => {
    loadRequests();
  }, [statusFilter]);

  // ============================================================
  // SEARCH FILTER
  // ============================================================

  const filteredTickets = useMemo(() => {
    if (!search.trim()) {
      return tickets;
    }

    const value = search.trim().toLowerCase();

    return tickets.filter((ticket) =>
      [
        ticket.id,
        ticket.requester?.name,
        ticket.requester?.subtitle,
        ticket.currentAssignment?.name,
        ticket.currentAssignment?.department,
        ticket.recommendedMentor?.name,
        ticket.recommendedMentor?.department,
        ticket.reason,
        ticket.studentRegisterNumber,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(value)),
    );
  }, [tickets, search]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTickets.length / ITEMS_PER_PAGE),
  );

  const paginatedTickets = filteredTickets.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  // ============================================================
  // LOAD MENTORS FOR MANUAL TRANSFER
  // ============================================================

  const loadMentors = async () => {
    try {
      setMentorLoading(true);
      setManualError("");

      const context = await getAssignmentContext({});

      const contextData = context?.data || context || {};

      const mentorData = contextData?.mentors || [];

      const normalizedMentors = mentorData
        .map((mentor) => {
          const capacity = mentor?.capacity ?? mentor?.maxMentees ?? 0;

          const assigned = mentor?.assigned ?? mentor?.currentMentees ?? 0;

          const availableSlots =
            mentor?.availableSlots ?? Math.max(0, capacity - assigned);

          return {
            id: mentor?.id,

            name: mentor?.name || mentor?.fullName || "Unknown Mentor",

            employeeCode: mentor?.employeeCode || "",

            department: mentor?.department || mentor?.departments?.name || "",

            assigned,

            capacity,

            availableSlots,
          };
        })
        .filter((mentor) => mentor.id);

      setMentors(normalizedMentors);
    } catch (err) {
      console.error("Failed to load mentors:", err);

      setMentors([]);

      setManualError(err?.response?.data?.message || "Unable to load mentors.");
    } finally {
      setMentorLoading(false);
    }
  };

  // ============================================================
  // OPEN MANUAL TRANSFER
  // ============================================================

  const openManualTransfer = () => {
    setManualTransferOpen(true);

    setRegisterNumber("");

    setStudent(null);

    setSelectedMentorId("");

    setReason("");

    setManualError("");

    loadMentors();
  };

  // ============================================================
  // CLOSE MANUAL TRANSFER
  // ============================================================

  const closeManualTransfer = () => {
    if (transferLoading) {
      return;
    }

    setManualTransferOpen(false);

    setRegisterNumber("");

    setStudent(null);

    setSelectedMentorId("");

    setReason("");

    setManualError("");
  };

  // ============================================================
  // FIND STUDENT BY REGISTER NUMBER
  // ============================================================

  const findStudent = async () => {
    const value = registerNumber.trim();

    if (!value) {
      setManualError("Enter a student register number.");

      return;
    }

    try {
      setStudentLoading(true);

      setManualError("");

      setStudent(null);

      setSelectedMentorId("");

      // ======================================================
      // DIRECT TRANSFER API LOOKUP
      //
      // GET
      // /api/admin/assignments/transfers/student/:registerNumber
      // ======================================================

      const response = await getStudentTransferDetails(value);

      const data = response?.data || response;

      // ======================================================
      // HANDLE POSSIBLE BACKEND WRAPPERS
      // ======================================================

      const studentData = data?.student || data?.data?.student || data;

      if (!studentData || !studentData.registerNumber) {
        throw new Error("Student not found.");
      }

      setStudent(studentData);
    } catch (err) {
      console.error("Failed to find student:", err);

      setStudent(null);

      if (err?.response?.status === 404) {
        setManualError("Student not found.");
      } else {
        setManualError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to find student.",
        );
      }
    } finally {
      setStudentLoading(false);
    }
  };

  // ============================================================
  // MANUAL TRANSFER
  // ============================================================

  const handleManualTransfer = async () => {
    // ==========================================================
    // STUDENT VALIDATION
    // ==========================================================

    if (!student) {
      setManualError("Search and select a student first.");

      return;
    }

    // ==========================================================
    // MENTOR VALIDATION
    // ==========================================================

    if (!selectedMentorId) {
      setManualError("Select the new mentor.");

      return;
    }

    // ==========================================================
    // REASON VALIDATION
    // ==========================================================

    if (!reason.trim()) {
      setManualError("A transfer reason / remark is required.");

      return;
    }

    // ==========================================================
    // PREVENT SAME MENTOR
    // ==========================================================

    const currentMentorId =
      student?.currentMentor?.id || student?.currentMentorId || null;

    if (
      currentMentorId &&
      String(currentMentorId) === String(selectedMentorId)
    ) {
      setManualError(
        "The selected mentor is already assigned to this student.",
      );

      return;
    }

    try {
      setTransferLoading(true);

      setManualError("");

      await manualStudentTransfer({
        registerNumber: student.registerNumber,

        requestedMentorId: selectedMentorId,

        reason: reason.trim(),
      });

      window.alert(
        `Student ${student.registerNumber} transferred successfully.`,
      );

      closeManualTransfer();

      await loadRequests();
    } catch (err) {
      console.error("Manual transfer failed:", err);

      setManualError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to transfer student.",
      );
    } finally {
      setTransferLoading(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-blue-600" />

          <p className="mt-3 text-sm font-medium text-slate-600">
            Loading transfer requests...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN
  // ============================================================

  return (
    <>
      <div className="overflow-hidden">
        {/* ======================================================
            TOOLBAR
            ====================================================== */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          {/* ====================================================
              SEARCH
              ==================================================== */}

          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by ticket, mentor or register number..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* ====================================================
              ACTIONS
              ==================================================== */}

          <div className="ml-4 flex items-center gap-2">
            {/* ALL */}

            <button
              type="button"
              onClick={() => {
                setStatusFilter("");

                setPage(1);
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                statusFilter === ""
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              All
            </button>

            {/* PENDING */}

            <button
              type="button"
              onClick={() => {
                setStatusFilter("PENDING");

                setPage(1);
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                statusFilter === "PENDING"
                  ? "bg-amber-50 text-amber-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Pending
            </button>

            {/* APPROVED */}

            <button
              type="button"
              onClick={() => {
                setStatusFilter("APPROVED");

                setPage(1);
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                statusFilter === "APPROVED"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Approved
            </button>

            {/* REJECTED */}

            <button
              type="button"
              onClick={() => {
                setStatusFilter("REJECTED");

                setPage(1);
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                statusFilter === "REJECTED"
                  ? "bg-red-50 text-red-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Rejected
            </button>

            {/* FILTERS */}

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            {/* MANUAL TRANSFER */}

            <button
              type="button"
              onClick={openManualTransfer}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <UserRound size={17} />
              Manual Transfer
            </button>
          </div>
        </div>

        {/* ======================================================
            ERROR
            ====================================================== */}

        {error && (
          <div className="border-b border-red-200 bg-red-50 px-6 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* ======================================================
            TABLE
            ====================================================== */}

        {paginatedTickets.length > 0 ? (
          <div className="overflow-x-auto">
            <TicketTable tickets={paginatedTickets} />
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700">
                No transfer requests found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Mentor-initiated transfer requests will appear here.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================
            PAGINATION
            ====================================================== */}

        <TicketPagination
          total={filteredTickets.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* ========================================================
          MANUAL TRANSFER MODAL
          ======================================================== */}

      {manualTransferOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* ==================================================
                HEADER
                ================================================== */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Manual Student Transfer
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Transfer a student on their behalf after an in-person request.
                </p>
              </div>

              <button
                type="button"
                onClick={closeManualTransfer}
                disabled={transferLoading}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==================================================
                BODY
                ================================================== */}

            <div className="space-y-5 px-6 py-6">
              {/* =================================================
                  REGISTER NUMBER
                  ================================================= */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Student Register Number
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={registerNumber}
                    onChange={(e) => {
                      setRegisterNumber(e.target.value);

                      setStudent(null);

                      setSelectedMentorId("");

                      setManualError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        findStudent();
                      }
                    }}
                    placeholder="Enter register number"
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={findStudent}
                    disabled={studentLoading || !registerNumber.trim()}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {studentLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Search size={16} />
                    )}
                    Search
                  </button>
                </div>
              </div>

              {/* =================================================
                  STUDENT DETAILS
                  ================================================= */}

              {student && (
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <UserRound size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900">
                        {student.fullName || "Unknown Student"}
                      </p>

                      <p className="mt-1 text-xs font-medium text-blue-700">
                        {student.registerNumber}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        {student.email && <span>{student.email}</span>}

                        {student.semester && (
                          <span>Semester {student.semester}</span>
                        )}

                        {student.section && (
                          <span>Section {student.section}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      CURRENT MENTOR
                      ================================================= */}

                  <div className="mt-4 border-t border-blue-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Current Mentor
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {student.currentMentor?.fullName ||
                        student.currentMentorName ||
                        "No mentor assigned"}
                    </p>

                    {student.currentMentor?.employeeCode && (
                      <p className="mt-0.5 text-xs text-slate-500">
                        {student.currentMentor.employeeCode}
                      </p>
                    )}

                    {student.currentMentor
                      ?.departments_teachers_departmentIdTodepartments
                      ?.name && (
                      <p className="mt-0.5 text-xs text-slate-500">
                        {
                          student.currentMentor
                            .departments_teachers_departmentIdTodepartments.name
                        }
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  NEW MENTOR
                  ================================================= */}

              {student && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Transfer To
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  {mentorLoading ? (
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">
                      <Loader2 size={16} className="animate-spin" />
                      Loading mentors...
                    </div>
                  ) : (
                    <select
                      value={selectedMentorId}
                      onChange={(e) => setSelectedMentorId(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select new mentor</option>

                      {mentors
                        .filter(
                          (mentor) =>
                            String(mentor.id) !==
                            String(
                              student?.currentMentor?.id ||
                                student?.currentMentorId ||
                                "",
                            ),
                        )
                        .map((mentor) => (
                          <option
                            key={mentor.id}
                            value={mentor.id}
                            disabled={mentor.availableSlots <= 0}
                          >
                            {mentor.name}

                            {mentor.employeeCode
                              ? ` • ${mentor.employeeCode}`
                              : ""}

                            {mentor.department ? ` • ${mentor.department}` : ""}

                            {mentor.availableSlots <= 0
                              ? " • FULL"
                              : ` • ${mentor.availableSlots} slots`}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              )}

              {/* =================================================
                  REASON
                  ================================================= */}

              {student && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Reason / Admin Remark
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);

                      setManualError("");
                    }}
                    rows={4}
                    placeholder="Enter the reason provided by the student for requesting this transfer..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    This remark is submitted together with the manual transfer
                    operation for administrative reference.
                  </p>
                </div>
              )}

              {/* =================================================
                  MANUAL ERROR
                  ================================================= */}

              {manualError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {manualError}
                  </p>
                </div>
              )}
            </div>

            {/* ==================================================
                FOOTER
                ================================================== */}

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={closeManualTransfer}
                disabled={transferLoading}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleManualTransfer}
                disabled={
                  transferLoading ||
                  !student ||
                  !selectedMentorId ||
                  !reason.trim()
                }
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {transferLoading && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                <ArrowRight size={16} />
                Transfer Student
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferTicketsPanel;
