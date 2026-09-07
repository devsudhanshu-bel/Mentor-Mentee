import React, { useEffect, useState } from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import AssignmentBanner from "../../components/Admin/Assignments/AssignmentBanner";
import AssignmentFilters from "../../components/Admin/Assignments/AssignmentFilters";
import AssignmentWorkspace from "../../components/Admin/Assignments/AssignmentWorkspace";

import { getAssignmentContext } from "../../api/assignment.api";

const EMPTY_FILTER_OPTIONS = {
  academicYears: [],
  terms: [],
  departments: [],
  years: [],
  sections: [],
};

const INITIAL_FILTERS = {
  academicYearId: "",
  academicYear: "",
  termId: "",
  departmentId: "",
  semesterNumber: "",
  section: "",
  view: "assign",
};

const Assignments = () => {
  // ============================================================
  // FILTER STATE
  // ============================================================

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // ============================================================
  // BACKEND CONTEXT
  // ============================================================

  const [context, setContext] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ============================================================
  // LOAD ASSIGNMENT CONTEXT
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    const loadContext = async () => {
      try {
        setLoading(true);
        setError("");

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

        setContext(data);

        // ======================================================
        // INITIAL ACADEMIC YEAR
        // ======================================================

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

        // ======================================================
        // INITIAL TERM
        // ======================================================
        //
        // Once the academic year is selected,
        // automatically select the first available term.
        //
        // This keeps the banner and workspace populated
        // without hardcoding any term.
        //
        // ======================================================

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
  ]);

  // ============================================================
  // FILTER CHANGE
  // ============================================================

  const handleFilterChange = (key, value, option = null) => {
    setFilters((previous) => {
      const next = {
        ...previous,
        [key]: value,
      };

      // ======================================================
      // ACADEMIC YEAR
      // ======================================================

      if (key === "academicYearId") {
        next.academicYearId = value;

        next.academicYear = option?.name || "";

        next.termId = "";
        next.departmentId = "";
        next.semesterNumber = "";
        next.section = "";
      }

      // ======================================================
      // TERM
      // ======================================================

      if (key === "termId") {
        next.termId = value;

        next.departmentId = "";
        next.semesterNumber = "";
        next.section = "";
      }

      // ======================================================
      // DEPARTMENT
      // ======================================================

      if (key === "departmentId") {
        next.departmentId = value;

        next.semesterNumber = "";
        next.section = "";
      }

      // ======================================================
      // YEAR / SEMESTER
      // ======================================================

      if (key === "semesterNumber") {
        next.semesterNumber = value;

        next.section = "";
      }

      // ======================================================
      // SECTION
      // ======================================================

      if (key === "section") {
        next.section = value;
      }

      // ======================================================
      // VIEW
      // ======================================================

      if (key === "view") {
        next.view = value;
      }

      return next;
    });
  };

  // ============================================================
  // FILTER OPTIONS
  // ============================================================

  const filterOptions = context?.filterOptions || EMPTY_FILTER_OPTIONS;

  // ============================================================
  // SELECTED TERM
  // ============================================================
  //
  // IMPORTANT:
  //
  // This is the term selected by the HOD in the cascade.
  // AssignmentBanner receives THIS exact object.
  //
  // ============================================================

  const selectedTerm =
    filterOptions.terms?.find((term) => term.id === filters.termId) ||
    context?.term ||
    null;

  // ============================================================
  // SELECTED ACADEMIC YEAR
  // ============================================================

  const selectedAcademicYear =
    filterOptions.academicYears?.find(
      (year) => year.id === filters.academicYearId,
    ) ||
    context?.academicYear ||
    null;

  // ============================================================
  // REFRESH
  // ============================================================

  const handleRefresh = async () => {
    try {
      setError("");

      const data = await getAssignmentContext({
        academicYearId: filters.academicYearId || undefined,

        academicYear: filters.academicYear || undefined,

        termId: filters.termId || undefined,

        departmentId: filters.departmentId || undefined,

        semesterNumber: filters.semesterNumber || undefined,

        section: filters.section || undefined,
      });

      setContext(data);
    } catch (err) {
      console.error("Assignment refresh error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to refresh assignment data.",
      );
    }
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar />

      {/* ======================================================
          MAIN AREA
      ====================================================== */}

      <div className="ml-[290px] min-h-screen">
        <AdminHeader />

        <main className="p-6">
          <div className="mx-auto flex max-w-[1700px] flex-col gap-6">
            {/* ==================================================
                BANNER
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
                API ERROR
            ================================================== */}

            {error && (
              <div
                className="
                  rounded-lg
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-xs
                  font-medium
                  text-red-600
                "
              >
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
    </div>
  );
};

export default Assignments;
