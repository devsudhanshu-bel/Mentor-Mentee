import React, { useEffect, useState } from "react";

import AssignmentHeader from "./Header/AssignmentHeader";

import StudentPanel from "./Students/StudentPanel";
import MentorPanel from "./Mentors/MentorPanel";

import AssignButton from "./Center/AssignButton";

import AssignmentFooter from "./Footer/AssignmentFooter";

import AllAssignmentsPanel from "./AllAssignments/AllAssignmentsPanel";
import TransferTicketsPanel from "./TransferTickets/TransferTicketsPanel";

import { assignStudentsToMentor } from "../../../api/assignment.api";

// ============================================================
// STABLE EMPTY ARRAYS
// ============================================================

const EMPTY_STUDENTS = [];
const EMPTY_MENTORS = [];

// ============================================================
// ASSIGNMENT WORKSPACE
// ============================================================

const AssignmentWorkspace = ({
  filters = {},
  context = null,
  loading = false,
  onRefresh,
}) => {
  // ============================================================
  // STATE
  // ============================================================

  const [activeTab, setActiveTab] = useState("unassigned");

  const [search, setSearch] = useState("");

  const [selectedStudents, setSelectedStudents] = useState([]);

  const [selectedMentor, setSelectedMentor] = useState(null);

  const [assigning, setAssigning] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  // ============================================================
  // REAL BACKEND DATA
  // ============================================================

  const students = Array.isArray(context?.students)
    ? context.students
    : EMPTY_STUDENTS;

  const mentors = Array.isArray(context?.mentors)
    ? context.mentors
    : EMPTY_MENTORS;

  const counts = context?.counts || {};

  // ============================================================
  // CLEAN INVALID STUDENT SELECTIONS
  // ============================================================

  useEffect(() => {
    if (selectedStudents.length === 0) {
      return;
    }

    const availableIds = new Set(students.map((student) => student.id));

    const validSelections = selectedStudents.filter((id) =>
      availableIds.has(id),
    );

    if (validSelections.length !== selectedStudents.length) {
      setSelectedStudents(validSelections);
    }
  }, [students, selectedStudents]);

  // ============================================================
  // CLEAN INVALID MENTOR SELECTION
  // ============================================================

  useEffect(() => {
    if (selectedMentor === null) {
      return;
    }

    const mentorExists = mentors.some((mentor) => mentor.id === selectedMentor);

    if (!mentorExists) {
      setSelectedMentor(null);
    }
  }, [mentors, selectedMentor]);

  // ============================================================
  // CLEAR SELECTION WHEN FILTER CONTEXT CHANGES
  // ============================================================

  useEffect(() => {
    setSelectedStudents([]);
    setSelectedMentor(null);
  }, [
    filters.academicYearId,
    filters.termId,
    filters.departmentId,
    filters.semesterNumber,
    filters.section,
  ]);

  // ============================================================
  // ASSIGN STUDENTS
  // ============================================================

  const handleAssign = async () => {
    // --------------------------------------------------------
    // STUDENT VALIDATION
    // --------------------------------------------------------

    if (selectedStudents.length === 0) {
      setError("Please select at least one student.");

      return;
    }

    // --------------------------------------------------------
    // MENTOR VALIDATION
    // --------------------------------------------------------

    if (!selectedMentor) {
      setError("Please select a mentor.");

      return;
    }

    // --------------------------------------------------------
    // TERM VALIDATION
    // --------------------------------------------------------

    if (!filters.termId) {
      setError("Please select an academic term before assigning students.");

      return;
    }

    try {
      setAssigning(true);
      setError("");
      setMessage("");

      // ------------------------------------------------------
      // GET LOGGED-IN ADMIN
      // ------------------------------------------------------

      let user = null;

      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          user = JSON.parse(storedUser);
        }
      } catch (storageError) {
        console.error("Unable to read logged-in user:", storageError);
      }

      const assignedBy = user?.id || user?.userId || user?.userAccountId;

      if (!assignedBy) {
        throw new Error("Logged-in admin account could not be identified.");
      }

      // ------------------------------------------------------
      // API
      // ------------------------------------------------------

      const response = await assignStudentsToMentor({
        studentIds: selectedStudents,

        teacherId: selectedMentor,

        termId: filters.termId,

        assignedBy,
      });

      // ------------------------------------------------------
      // SUCCESS
      // ------------------------------------------------------

      setMessage(response?.message || "Students assigned successfully.");

      // ------------------------------------------------------
      // CLEAR SELECTION
      // ------------------------------------------------------

      setSelectedStudents([]);
      setSelectedMentor(null);

      // ------------------------------------------------------
      // REFRESH
      // ------------------------------------------------------

      if (typeof onRefresh === "function") {
        await onRefresh();
      }
    } catch (err) {
      console.error("Assignment failed:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to assign students.",
      );
    } finally {
      setAssigning(false);
    }
  };

  // ============================================================
  // CLEAR STATUS MESSAGE
  // ============================================================

  useEffect(() => {
    if (!message && !error) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, error]);

  // ============================================================
  // FILTER BUTTON
  // ============================================================

  const handleFiltersClick = () => {
    // Filters are controlled by Assignments.jsx.
  };

  // ============================================================
  // BULK ASSIGN
  // ============================================================

  const handleBulkAssign = () => {
    if (selectedStudents.length === 0) {
      setError("Select at least one student first.");

      return;
    }

    setError("");

    setMessage(
      `${selectedStudents.length} student${
        selectedStudents.length !== 1 ? "s" : ""
      } selected for assignment.`,
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* ======================================================
          HEADER
          ====================================================== */}

      <AssignmentHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
        onFiltersClick={handleFiltersClick}
        onBulkAssign={handleBulkAssign}
        studentCount={counts.unassignedStudents ?? students.length}
        transferCount={counts.pendingTransferRequests ?? 0}
      />

      {/* ======================================================
          STATUS
          ====================================================== */}

      {(message || error) && (
        <div className="px-5 pt-4">
          <div
            className={`
              rounded-lg
              border
              px-4
              py-2.5
              text-xs
              font-medium
              ${
                error
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-emerald-200 bg-emerald-50 text-emerald-600"
              }
            `}
          >
            {error || message}
          </div>
        </div>
      )}

      {/* ======================================================
          UNASSIGNED
          ====================================================== */}

      {activeTab === "unassigned" && (
        <>
          <div
            className="
              grid
              grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)]
              items-stretch
              gap-5
              p-5
            "
          >
            {/* STUDENTS */}

            <StudentPanel
              students={students}
              search={search}
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
              loading={loading}
            />

            {/* ASSIGN */}

            <AssignButton
              selectedStudents={selectedStudents}
              selectedMentor={selectedMentor}
              onAssign={handleAssign}
              disabled={assigning || !filters.termId}
            />

            {/* MENTORS */}

            <MentorPanel
              mentors={mentors}
              search={search}
              selectedMentor={selectedMentor}
              setSelectedMentor={setSelectedMentor}
              loading={loading}
            />
          </div>

          {/* FOOTER */}

          <AssignmentFooter
            selectedStudents={selectedStudents}
            selectedMentor={selectedMentor}
            setSelectedStudents={setSelectedStudents}
            onAssign={handleAssign}
          />
        </>
      )}

      {/* ======================================================
          ALL ASSIGNMENTS
          ====================================================== */}

      {activeTab === "all" && (
        <AllAssignmentsPanel
          termId={filters.termId}
          departmentId={filters.departmentId}
          search={search}
        />
      )}

      {/* ======================================================
          TRANSFER REQUESTS
          ====================================================== */}

      {activeTab === "transfer" && (
        <TransferTicketsPanel termId={filters.termId} search={search} />
      )}

      {/* ======================================================
          HISTORY
          ====================================================== */}

      {activeTab === "history" && (
        <div className="p-10 text-center">
          <p className="text-sm font-semibold text-slate-700">
            Assignment History
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Assignment history will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentWorkspace;
