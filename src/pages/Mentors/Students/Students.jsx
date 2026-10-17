import React, { useCallback, useEffect, useMemo, useState } from "react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

// Mentor Dashboard components
import WelcomeBanner from "../../../components/Mentors/Dashboard/WelcomeBanner";
import TodaysSchedule from "../../../components/Mentors/Dashboard/TodaysSchedule";
import UpcomingDeadlines from "../../../components/Mentors/Dashboard/UpcomingDeadlines";

// Students components
import StudentFilters from "../../../components/Mentors/Students/List/StudentFilters";
import StudentGridHeader from "../../../components/Mentors/Students/List/StudentGridHeader";
import StudentCard from "../../../components/Mentors/Students/List/StudentCard";
import StudentPagination from "../../../components/Mentors/Students/List/StudentPagination";

import api from "../../../api/axios";

const Students = () => {
  // ==========================================================
  // STUDENTS
  // ==========================================================

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // FILTERS
  // ==========================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [programme, setProgramme] = useState("");
  const [semester, setSemester] = useState("");
  const [status, setStatus] = useState("");

  // ==========================================================
  // SORT
  // ==========================================================

  const [sortBy, setSortBy] = useState("name-asc");

  // ==========================================================
  // FETCH MY STUDENTS
  // ==========================================================

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/mentor/students");
      const studentList = response.data?.data?.students || [];

      setStudents(studentList);
    } catch (err) {
      console.error("Failed to fetch mentor students:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your students."
      );

      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ==========================================================
  // FILTER + SORT STUDENTS
  // ==========================================================

  const filteredStudents = useMemo(() => {
    let result = [...students];

    // SEARCH

    const search = searchTerm.trim().toLowerCase();

    if (search) {
      result = result.filter((student) => {
        const name = student.name?.toLowerCase() || "";
        const registerNumber =
          student.registerNumber?.toLowerCase() || "";

        return (
          name.includes(search) ||
          registerNumber.includes(search)
        );
      });
    }

    // PROGRAMME

    if (programme) {
      result = result.filter(
        (student) =>
          student.programme?.toLowerCase() ===
          programme.toLowerCase()
      );
    }

    // SEMESTER

    if (semester) {
      result = result.filter(
        (student) =>
          String(student.semester) === String(semester)
      );
    }

    // STATUS

    if (status) {
      result = result.filter(
        (student) => student.status === status
      );
    }

    // SORT

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");

        case "cgpa-high":
          return (
            (Number(b.currentCGPA) || 0) -
            (Number(a.currentCGPA) || 0)
          );

        case "cgpa-low":
          return (
            (Number(a.currentCGPA) || 0) -
            (Number(b.currentCGPA) || 0)
          );

        case "assigned-newest":
          return (
            new Date(b.assignedAt || 0) -
            new Date(a.assignedAt || 0)
          );

        case "assigned-oldest":
          return (
            new Date(a.assignedAt || 0) -
            new Date(b.assignedAt || 0)
          );

        case "name-asc":
        default:
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    return result;
  }, [
    students,
    searchTerm,
    programme,
    semester,
    status,
    sortBy,
  ]);

  // ==========================================================
  // RESET FILTERS
  // ==========================================================

  const handleResetFilters = () => {
    setSearchTerm("");
    setProgramme("");
    setSemester("");
    setStatus("");
    setSortBy("name-asc");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}

      <MentorSidebar />

      {/* Main Content */}

      <div className="ml-[290px] min-h-screen">
        <MentorHeader />

        <main className="space-y-4 p-6">
          {/* Dashboard Welcome Banner */}

          <WelcomeBanner />

          {/* Today's Schedule and Upcoming Deadlines */}

          <section className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-2">
            <TodaysSchedule />
            <UpcomingDeadlines />
          </section>

          {/* My Students */}

          <section id="my-students" className="space-y-4">
            {/* Students Heading */}

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  My Students
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage and track the progress of your assigned mentees.
                </p>
              </div>

              <span className="inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {loading
                  ? "Loading students..."
                  : `${filteredStudents.length} ${
                      filteredStudents.length === 1
                        ? "student"
                        : "students"
                    } shown`}
              </span>
            </div>

            {/* Student Filters */}

            <StudentFilters
              searchTerm={searchTerm}
              programme={programme}
              semester={semester}
              status={status}
              onSearchChange={setSearchTerm}
              onProgrammeChange={setProgramme}
              onSemesterChange={setSemester}
              onStatusChange={setStatus}
              onReset={handleResetFilters}
            />

            {/* Student Grid Header */}

            <StudentGridHeader
              totalStudents={filteredStudents.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Loading State */}

            {loading && (
              <section className="flex min-h-[250px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                  <p className="text-sm font-medium text-slate-600">
                    Loading your students...
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Please wait a moment.
                  </p>
                </div>
              </section>
            )}

            {/* Error State */}

            {!loading && error && (
              <section className="flex min-h-[250px] items-center justify-center rounded-2xl border border-red-100 bg-white px-5">
                <div className="text-center">
                  <h3 className="text-base font-semibold text-red-600">
                    Unable to load students
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={fetchStudents}
                    className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              </section>
            )}

            {/* Empty State */}

            {!loading &&
              !error &&
              filteredStudents.length === 0 && (
                <section className="flex min-h-[250px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-400"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="10" cy="7" r="4" />
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>

                    <h3 className="text-base font-semibold text-slate-800">
                      {students.length === 0
                        ? "No Students Assigned"
                        : "No Students Found"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {students.length === 0
                        ? "You currently don't have any active mentees assigned to you."
                        : "Try adjusting your search or filters to find a student."}
                    </p>

                    {students.length > 0 && (
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="mt-4 rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>
                </section>
              )}

            {/* Student Cards */}

            {!loading &&
              !error &&
              filteredStudents.length > 0 && (
                <section className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filteredStudents.map((student) => (
                    <StudentCard
                      key={student.assignmentId}
                      student={student}
                    />
                  ))}
                </section>
              )}

            {/* Pagination */}

            {!loading &&
              !error &&
              filteredStudents.length > 0 && (
                <StudentPagination
                  totalStudents={filteredStudents.length}
                />
              )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Students;
