import React, { useEffect, useMemo, useState } from "react";

import { Plus, RefreshCw } from "lucide-react";
import AddMentorModal from "../../components/Admin/Mentors/AddMentorModal";

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
  const [showAddMentor, setShowAddMentor] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

      setMentors(Array.isArray(result?.mentors) ? result.mentors : []);

      setCounts(
        result?.counts ?? {
          totalMentors: 0,
          activeMentors: 0,
          mentorsWithStudents: 0,
          averageStudents: 0,
        },
      );

      setDepartments(
        Array.isArray(result?.departments) ? result.departments : [],
      );
    } catch (err) {
      console.error("Failed to fetch mentors:", err);

      setError(err?.response?.data?.message || "Failed to load mentors.");

      setMentors([]);
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
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <AdminSidebar />

      {/* ==================================================
          MAIN
      ================================================== */}

      <div className="ml-0 min-h-screen w-full min-w-0 lg:ml-[290px] lg:w-[calc(100%-290px)]">
        <AdminHeader />

        <main className="min-w-0 space-y-4 p-3 sm:space-y-5 sm:p-4 lg:p-6">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                Mentors
              </h1>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                View and manage all mentors across the institution.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 min-[420px]:flex-row sm:w-auto sm:shrink-0">
              {/* Refresh */}
              <button
                type="button"
                onClick={fetchMentors}
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  hover:bg-slate-50
                  disabled:opacity-50
                  min-[420px]:w-auto
                  sm:px-4
                  sm:py-3
                "
              >
                <RefreshCw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              {/* Add Mentor */}
              <button
                type="button"
                onClick={() => {
                  setSuccessMessage("");
                  setShowAddMentor(true);
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  hover:bg-blue-700
                  min-[420px]:w-auto
                  sm:px-5
                  sm:py-3
                "
              >
                <Plus size={18} />
                Add Mentor
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs leading-5 text-emerald-800 sm:px-4 sm:text-sm">
              {successMessage}
            </div>
          )}

          {/* ==================================================
              KPI
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
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs leading-5 text-red-700 sm:px-4 sm:text-sm">
              {error}
            </div>
          )}

          {/* ==================================================
              TABLE
          ================================================== */}

          <div className="min-w-0">
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
          </div>

          <AddMentorModal
            open={showAddMentor}
            departments={departments}
            onClose={() => setShowAddMentor(false)}
            onCreated={async (mentor) => {
              setShowAddMentor(false);
              setSuccessMessage(`Mentor ${mentor?.fullName || mentor?.username || "account"} created successfully.`);
              await fetchMentors();
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Mentors;
