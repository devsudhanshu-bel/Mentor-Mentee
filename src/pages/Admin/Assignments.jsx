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
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="ml-0 min-h-screen w-full min-w-0 lg:ml-[290px] lg:w-[calc(100%-290px)]">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <AdminHeader />

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="w-full min-w-0 p-3 sm:p-4 lg:p-6">
          <div className="mx-auto flex w-full min-w-0 max-w-[1700px] flex-col gap-4 sm:gap-6">
            {/* ==================================================
                PAGE ACTION BAR
            ================================================== */}

            <div className="flex min-w-0 flex-col items-stretch justify-between gap-3 min-[480px]:flex-row min-[480px]:items-center">
              <div>
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Mentor Assignments
                </h1>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Manage student-to-mentor assignments.
                </p>
              </div>

              {/* =================================================
                  ADD STUDENTS
              ================================================= */}

              <button
                type="button"
                onClick={() => setShowAddStudentsModal(true)}
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md min-[480px]:w-auto sm:px-5"
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
              onTermChangeRequested={(result) => {
                const activatedTerm = result?.activatedTerm;
                if (!activatedTerm?.id) return;

                setFilters({
                  ...INITIAL_FILTERS,
                  academicYearId: activatedTerm.academicYearId || "",
                  academicYear: activatedTerm.academicYearName || "",
                  termId: activatedTerm.id,
                  view: filters.view || "assign",
                });
                setContext(null);
                setRefreshKey((previous) => previous + 1);
              }}
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
              <div className="min-w-0 break-words rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs text-red-700 sm:px-4 sm:py-3 sm:text-sm">
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
