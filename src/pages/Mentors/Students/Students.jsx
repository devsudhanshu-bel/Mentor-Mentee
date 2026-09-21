import React, { useEffect, useMemo, useState } from "react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import StudentPageHeader from "../../../components/Mentors/Students/List/StudentPageHeader";
import StudentFilters from "../../../components/Mentors/Students/List/StudentFilters";
import StudentGridHeader from "../../../components/Mentors/Students/List/StudentGridHeader";
import StudentCard from "../../../components/Mentors/Students/List/StudentCard";
import StudentPagination from "../../../components/Mentors/Students/List/StudentPagination";

import api from "../../../api/axios";

const Students = () => {
  /* ==========================================================
     STUDENTS
  ========================================================== */

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ==========================================================
     FILTERS
  ========================================================== */

  const [searchTerm, setSearchTerm] = useState("");

  const [programme, setProgramme] = useState("");

  const [semester, setSemester] = useState("");

  const [status, setStatus] = useState("");

  /* ==========================================================
     SORT
  ========================================================== */

  const [sortBy, setSortBy] = useState("name-asc");

  /* ==========================================================
     FETCH MY STUDENTS
  ========================================================== */

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/mentor/students"
      );

      console.log(
        "My Students response:",
        response
      );

      const studentList =
        response.data?.data?.students || [];

      setStudents(studentList);
    } catch (error) {
      console.error(
        "Failed to fetch mentor students:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load your students."
      );

      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ==========================================================
     FILTER + SORT STUDENTS
  ========================================================== */

  const filteredStudents = useMemo(() => {
    let result = [...students];

    /* --------------------------------------------------------
       SEARCH
    -------------------------------------------------------- */

    const search = searchTerm
      .trim()
      .toLowerCase();

    if (search) {
      result = result.filter((student) => {
        const name =
          student.name?.toLowerCase() || "";

        const registerNumber =
          student.registerNumber?.toLowerCase() ||
          "";

        return (
          name.includes(search) ||
          registerNumber.includes(search)
        );
      });
    }

    /* --------------------------------------------------------
       PROGRAMME
    -------------------------------------------------------- */

    if (programme) {
      result = result.filter(
        (student) =>
          student.programme?.toLowerCase() ===
          programme.toLowerCase()
      );
    }

    /* --------------------------------------------------------
       SEMESTER
    -------------------------------------------------------- */

    if (semester) {
      result = result.filter(
        (student) =>
          String(student.semester) ===
          String(semester)
      );
    }

    /* --------------------------------------------------------
       STATUS
    -------------------------------------------------------- */

    if (status) {
      result = result.filter(
        (student) =>
          student.status === status
      );
    }

    /* --------------------------------------------------------
       SORT
    -------------------------------------------------------- */

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return (
            (b.name || "").localeCompare(
              a.name || ""
            )
          );

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
          return (
            (a.name || "").localeCompare(
              b.name || ""
            )
          );
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

  /* ==========================================================
     RESET FILTERS
  ========================================================== */

  const handleResetFilters = () => {
    setSearchTerm("");
    setProgramme("");
    setSemester("");
    setStatus("");
    setSortBy("name-asc");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <MentorSidebar />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="ml-[290px] min-h-screen">

        {/* Header */}
        <MentorHeader />

        {/* ====================================================
            STUDENTS CONTENT
        ==================================================== */}

        <main className="space-y-4 p-6">

          {/* ==================================================
              PAGE HEADER
          ================================================== */}

          <StudentPageHeader />

          {/* ==================================================
              FILTERS
          ================================================== */}

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

          {/* ==================================================
              GRID HEADER
          ================================================== */}

          <StudentGridHeader
            totalStudents={filteredStudents.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (
            <section className="flex min-h-[250px] items-center justify-center rounded-xl bg-white">
              <div className="text-center">

                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                <p className="text-sm font-medium text-slate-600">
                  Loading students...
                </p>

              </div>
            </section>
          )}

          {/* ==================================================
              ERROR
          ================================================== */}

          {!loading && error && (
            <section className="flex min-h-[250px] items-center justify-center rounded-xl bg-white">
              <div className="text-center">

                <p className="text-sm font-semibold text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchStudents}
                  className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Try Again
                </button>

              </div>
            </section>
          )}

          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {!loading &&
            !error &&
            filteredStudents.length === 0 && (
              <section className="flex min-h-[250px] items-center justify-center rounded-xl bg-white">
                <div className="text-center">

                  <p className="text-base font-semibold text-slate-700">
                    {students.length === 0
                      ? "No Students Assigned"
                      : "No Students Found"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {students.length === 0
                      ? "You currently don't have any active mentees."
                      : "Try adjusting your search or filters."}
                  </p>

                </div>
              </section>
            )}

          {/* ==================================================
              STUDENT CARDS
          ================================================== */}

          {!loading &&
            !error &&
            filteredStudents.length > 0 && (
              <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                {filteredStudents.map(
                  (student) => (
                    <StudentCard
                      key={student.assignmentId}
                      student={student}
                    />
                  )
                )}

              </section>
            )}

          {/* ==================================================
              PAGINATION
          ================================================== */}

          {!loading &&
            !error &&
            filteredStudents.length > 0 && (
              <StudentPagination
                totalStudents={
                  filteredStudents.length
                }
              />
            )}

        </main>
      </div>
    </div>
  );
};

export default Students;