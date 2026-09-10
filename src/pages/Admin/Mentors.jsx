import React, { useEffect, useMemo, useState } from "react";

import { Plus, RefreshCw } from "lucide-react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import MentorKPICards from "../../components/Admin/Mentors/MentorKPICards";
import MentorTableFilters from "../../components/Admin/Mentors/MentorTableFilters";
import MentorTable from "../../components/Admin/Mentors/MentorTable";

import { getMentors } from "../../api/mentor.api";

const Mentors = () => {
  // ========================================================
  // DATA
  // ========================================================

  const [mentors, setMentors] = useState([]);

  const [counts, setCounts] = useState({
    totalMentors: 0,
    activeMentors: 0,
    mentorsWithStudents: 0,
    averageStudents: 0,
  });

  const [departments, setDepartments] = useState([]);

  // ========================================================
  // FILTERS
  // ========================================================

  const [search, setSearch] = useState("");

  const [departmentId, setDepartmentId] = useState("");

  const [status, setStatus] = useState("");

  const [workload, setWorkload] = useState("");

  // ========================================================
  // UI
  // ========================================================

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ========================================================
  // PAGINATION
  // ========================================================

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(8);

  // ========================================================
  // FETCH
  // ========================================================

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getMentors({
        search,
        departmentId,
        status,
        workload,
      });

      setMentors(result.mentors || []);

      setCounts(
        result.counts || {
          totalMentors: 0,
          activeMentors: 0,
          mentorsWithStudents: 0,
          averageStudents: 0,
        },
      );

      setDepartments(result.departments || []);
    } catch (err) {
      console.error("Failed to fetch mentors:", err);

      setError(err?.response?.data?.message || "Failed to load mentors.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // FETCH WHEN FILTERS CHANGE
  // ========================================================

  useEffect(() => {
    setCurrentPage(1);

    const timer = setTimeout(fetchMentors, 250);

    return () => clearTimeout(timer);
  }, [search, departmentId, status, workload]);

  // ========================================================
  // PAGINATION
  // ========================================================

  const totalMentors = mentors.length;

  const totalPages = Math.max(Math.ceil(totalMentors / rowsPerPage), 1);

  const safePage = Math.min(currentPage, totalPages);

  const paginatedMentors = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;

    return mentors.slice(start, start + rowsPerPage);
  }, [mentors, safePage, rowsPerPage]);

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ==================================================
          SIDEBAR
          ================================================== */}

      <AdminSidebar />

      {/* ==================================================
          MAIN
          ================================================== */}

      <div className="ml-[290px] min-h-screen">
        <AdminHeader />

        <main className="space-y-5 p-6">
          {/* ==================================================
              PAGE HEADER
              ================================================== */}

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Mentors</h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage all mentors across the institution.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchMentors}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Mentor
              </button>
            </div>
          </div>

          {/* ==================================================
              KPI CARDS
              ================================================== */}

          <MentorKPICards counts={counts} />

          {/* ==================================================
              FILTERS
              ================================================== */}

          <MentorTableFilters
            search={search}
            setSearch={setSearch}
            departmentId={departmentId}
            setDepartmentId={setDepartmentId}
            status={status}
            setStatus={setStatus}
            workload={workload}
            setWorkload={setWorkload}
            departments={departments}
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
              TABLE
              ================================================== */}

          <MentorTable
            mentors={paginatedMentors}
            loading={loading}
            totalMentors={totalMentors}
            currentPage={safePage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};

export default Mentors;