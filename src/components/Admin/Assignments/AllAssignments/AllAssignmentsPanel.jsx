import React, { useEffect, useMemo, useState } from "react";

import {
  getAssignmentContext,
  getAllAssignments,
} from "../../../../api/assignment.api";

import AssignmentTable from "./Table/AssignmentTable";
import AssignmentPagination from "./Table/AssignmentPagination";

const AllAssignmentsPanel = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        setError("");

        // ---------------------------------------------------------
        // Get active term
        // ---------------------------------------------------------
        const contextResponse = await getAssignmentContext({});

        const termId = contextResponse?.data?.termId || contextResponse?.termId;

        if (!termId) {
          throw new Error("Active academic term could not be determined.");
        }

        // ---------------------------------------------------------
        // Get assignments
        // ---------------------------------------------------------
        const response = await getAllAssignments({
          termId,
        });

        const rawAssignments = response?.data || response || [];

        if (!Array.isArray(rawAssignments)) {
          setAssignments([]);
          return;
        }

        // ---------------------------------------------------------
        // Convert backend structure → existing UI structure
        // ---------------------------------------------------------
        const normalizedAssignments = rawAssignments.map((assignment) => {
          const student = assignment?.students || {};

          const teacher = assignment?.teachers || {};

          const term = assignment?.academic_terms || {};

          const assignedDate = assignment?.assignedAt
            ? new Date(assignment.assignedAt)
            : null;

          return {
            id: assignment?.id,

            // ===================================================
            // MENTOR
            // ===================================================
            mentor: {
              name: teacher?.fullName || "Unknown Mentor",

              department: teacher?.department || "Computer Science",
            },

            // ===================================================
            // MENTEE
            // ===================================================
            mentee: {
              name: student?.fullName || "Unknown Student",

              usn: student?.registerNumber || "N/A",

              year: student?.semester
                ? `Semester ${student.semester}`
                : term?.semesterNumber
                  ? `Semester ${term.semesterNumber}`
                  : "N/A",
            },

            // ===================================================
            // ASSIGNED ON
            // ===================================================
            assignedOn: {
              date: assignedDate
                ? assignedDate.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A",

              time: assignedDate
                ? assignedDate.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A",
            },

            // Keep backend information available
            assignmentId: assignment?.id,
            studentId: assignment?.studentId,
            teacherId: assignment?.teacherId,
            termId: assignment?.termId,
            status: assignment?.status,

            students: student,
            teachers: teacher,
            academic_terms: term,
          };
        });

        setAssignments(normalizedAssignments);
        setPage(1);
      } catch (err) {
        console.error("Failed to load all assignments:", err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load assignments.",
        );

        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  // -------------------------------------------------------------
  // Pagination
  // -------------------------------------------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(assignments.length / ITEMS_PER_PAGE),
  );

  const paginatedAssignments = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return assignments.slice(start, start + ITEMS_PER_PAGE);
  }, [assignments, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // -------------------------------------------------------------
  // Loading
  // -------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="mt-3 text-sm font-medium text-slate-600">
            Loading assignments...
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Error
  // -------------------------------------------------------------

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center">
          <p className="text-sm font-semibold text-red-700">
            Failed to load assignments
          </p>

          <p className="mt-1 text-xs text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Empty
  // -------------------------------------------------------------

  if (assignments.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            No assignments found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Assigned mentor–mentee relationships will appear here.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Main
  // -------------------------------------------------------------

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <AssignmentTable assignments={paginatedAssignments} />
      </div>

      <AssignmentPagination
        total={assignments.length}
        page={page}
        currentPage={page}
        pageSize={ITEMS_PER_PAGE}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AllAssignmentsPanel;
