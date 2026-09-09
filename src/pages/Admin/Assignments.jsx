import React, { useEffect, useMemo, useState } from "react";

import { Plus } from "lucide-react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AssignmentBanner from "../../components/Admin/Assignments/AssignmentBanner";
import AssignmentFilters from "../../components/Admin/Assignments/AssignmentFilters";
import AssignmentWorkspace from "../../components/Admin/Assignments/AssignmentWorkspace";
import AddStudentModal from "../../components/Admin/Assignments/Students/AddStudentModal";

import { getAssignmentContext } from "../../api/assignment.api";

// ============================================================
// EMPTY FILTER OPTIONS
// ============================================================

const EMPTY_FILTER_OPTIONS = {
  academicYears: [],
  terms: [],
  departments: [],
  years: [],
  sections: [],
};

// ============================================================
// INITIAL FILTERS
// ============================================================

const INITIAL_FILTERS = {
  academicYearId: "",
  academicYear: "",
  termId: "",
  departmentId: "",
  semesterNumber: "",
  section: "",
  view: "assign",
};

// ============================================================
// ASSIGNMENTS PAGE
// ============================================================

const Assignments = () => {
  // ==========================================================
  // FILTER STATE
  // ==========================================================

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // ==========================================================
  // BACKEND CONTEXT
  // ==========================================================

  const [context, setContext] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ==========================================================
  // REFRESH KEY
  // ==========================================================
  //
  // Used to explicitly reload the assignment context after:
  //
  // - student import
  // - assignment changes
  // - manual refresh
  //
  // ==========================================================

  const [refreshKey, setRefreshKey] = useState(0);

  // ==========================================================
  // ADD STUDENTS MODAL
  // ==========================================================

  const [showAddStudentsModal, setShowAddStudentsModal] = useState(false);

  // ==========================================================
  // LOAD ASSIGNMENT CONTEXT
  // ==========================================================

  useEffect(() => {
    let cancelled = false;

    const loadContext = async () => {
      try {
        setLoading(true);

        setError("");

        // ==================================================
        // API REQUEST
        // ==================================================

        const data = await getAssignmentContext({
          academicYearId: filters.academicYearId || undefined,

          academicYear: filters.academicYear || undefined,

          termId: filters.termId || undefined,

          departmentId: filters.departmentId || undefined,

          semesterNumber: filters.semesterNumber || undefined,

          section: filters.section || undefined,
        });

        if (cancelled) {
          return;
        }

        // ==================================================
        // SAVE CONTEXT
        // ==================================================

        setContext(data);

        // ==================================================
        // INITIAL ACADEMIC YEAR
        // ==================================================

        if (!filters.academicYearId && !filters.academicYear) {
          const firstAcademicYear = data?.filterOptions?.academicYears?.[0];

          if (firstAcademicYear) {
            setFilters((previous) => ({
              ...previous,

              academicYearId: firstAcademicYear.id,

              academicYear: firstAcademicYear.name,
            }));
          }
        }

        // ==================================================
        // INITIAL TERM
        // ==================================================

        if (filters.academicYearId && !filters.termId) {
          const firstTerm = data?.filterOptions?.terms?.[0];

          if (firstTerm) {
            setFilters((previous) => ({
              ...previous,

              termId: firstTerm.id,
            }));
          }
        }
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("Assignment context error:", err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load assignment data.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadContext();

    return () => {
      cancelled = true;
    };
  }, [
    filters.academicYearId,
    filters.academicYear,
    filters.termId,
    filters.departmentId,
    filters.semesterNumber,
    filters.section,
    refreshKey,
  ]);

  // ==========================================================
  // FILTER OPTIONS
  // ==========================================================

  const filterOptions = useMemo(() => {
    return {
      ...EMPTY_FILTER_OPTIONS,

      ...(context?.filterOptions || {}),
    };
  }, [context]);

  // ==========================================================
  // FILTER CHANGE
  // ==========================================================

  const handleFilterChange = (key, value, option = null) => {
    setFilters((previous) => {
      const next = {
        ...previous,

        [key]: value,
      };

      // ====================================================
      // ACADEMIC YEAR CHANGE
      // ====================================================

      if (key === "academicYearId") {
        next.academicYear = option?.name || "";

        next.termId = "";

        next.departmentId = "";

        next.semesterNumber = "";

        next.section = "";
      }

      // ====================================================
      // TERM CHANGE
      // ====================================================

      if (key === "termId") {
        next.departmentId = "";

        next.semesterNumber = "";

        next.section = "";
      }

      // ====================================================
      // DEPARTMENT CHANGE
      // ====================================================

      if (key === "departmentId") {
        next.semesterNumber = "";

        next.section = "";
      }

      // ====================================================
      // SEMESTER CHANGE
      // ====================================================

      if (key === "semesterNumber") {
        next.section = "";
      }

      return next;
    });
  };

  // ==========================================================
  // REFRESH ASSIGNMENT DATA
  // ==========================================================

  const handleRefresh = () => {
    setError("");

    setRefreshKey((previous) => previous + 1);
  };

  // ==========================================================
  // STUDENTS IMPORTED SUCCESSFULLY
  // ==========================================================

  const handleStudentsImported = () => {
    // ------------------------------------------------------
    // Close modal
    // ------------------------------------------------------

    setShowAddStudentsModal(false);

    // ------------------------------------------------------
    // Clear existing context
    // ------------------------------------------------------

    setContext(null);

    // ------------------------------------------------------
    // Reload assignment data
    // ------------------------------------------------------

    setRefreshKey((previous) => previous + 1);
  };

  // ==========================================================
  // SELECTED TERM
  // ==========================================================

  const selectedTerm = useMemo(() => {
    return (
      filterOptions.terms?.find((term) => term.id === filters.termId) || null
    );
  }, [filterOptions.terms, filters.termId]);

  // ==========================================================
  // SELECTED ACADEMIC YEAR
  // ==========================================================

  const selectedAcademicYear = useMemo(() => {
    return (
      filterOptions.academicYears?.find(
        (year) => year.id === filters.academicYearId,
      ) || null
    );
  }, [filterOptions.academicYears, filters.academicYearId]);

  // ==========================================================
  // SELECTED DEPARTMENT
  // ==========================================================

  const selectedDepartment = useMemo(() => {
    return (
      filterOptions.departments?.find(
        (department) => department.id === filters.departmentId,
      ) || null
    );
  }, [filterOptions.departments, filters.departmentId]);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="ml-[290px] min-h-screen">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <AdminHeader />

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="p-6">
          <div className="mx-auto flex max-w-[1700px] flex-col gap-6">
            {/* ==================================================
                PAGE ACTION BAR
            ================================================== */}

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Mentor Assignments
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage student-to-mentor assignments.
                </p>
              </div>

              {/* =================================================
                  ADD STUDENTS
              ================================================= */}

              <button
                type="button"
                onClick={() => setShowAddStudentsModal(true)}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
              >
                <Plus size={18} />
                Add Students
              </button>
            </div>

            {/* ==================================================
                ASSIGNMENT BANNER
            ================================================== */}

            <AssignmentBanner
              term={selectedTerm}
              academicYear={selectedAcademicYear}
              filters={filters}
            />

            {/* ==================================================
                FILTERS
            ================================================== */}

            <AssignmentFilters
              filters={filters}
              filterOptions={filterOptions}
              onChange={handleFilterChange}
            />

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* ==================================================
                WORKSPACE
            ================================================== */}

            <AssignmentWorkspace
              filters={filters}
              context={context}
              loading={loading}
              onRefresh={handleRefresh}
            />
          </div>
        </main>
      </div>

      {/* ========================================================
          ADD STUDENTS MODAL
      ======================================================== */}

      <AddStudentModal
        open={showAddStudentsModal}
        onClose={() => setShowAddStudentsModal(false)}
        departments={filterOptions.departments || []}
        selectedDepartmentId={filters.departmentId}
        termId={filters.termId}
        onSuccess={handleStudentsImported}
      />
    </div>
  );
};

export default Assignments;
