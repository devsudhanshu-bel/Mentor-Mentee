
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  Search,
  Plus,
  Eye,
  X,
  CalendarDays,
  LoaderCircle,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";
import api from "../../../api/axios";
import { assignStudentProject } from "../../../api/projects.api";

const emptyForm = {
  title: "",
  projectType: "Academic",
  deadline: "",
  description: "",
};

export default function MentorProjects() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    api.get("/mentor/students")
      .then((response) => {
        if (active) {
          setStudents(response.data?.data?.students || []);
        }
      })
      .catch((error) => {
        if (active) {
          setLoadError(
            error.response?.data?.message ||
              "Unable to load your assigned students."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return students;

    return students.filter((student) =>
      [
        student.name,
        student.registerNumber,
        student.programme,
      ].some((value) =>
        String(value || "").toLowerCase().includes(term)
      )
    );
  }, [students, search]);

  const openAssign = (student) => {
    setSelectedStudent(student);
    setForm(emptyForm);
    setFormError("");
    setNotice("");
  };

  const submitProject = async (event) => {
    event.preventDefault();

    if (!selectedStudent) return;

    setSaving(true);
    setFormError("");

    try {
      await assignStudentProject(selectedStudent.studentId, {
        title: form.title.trim(),
        projectType: form.projectType,
        deadline: form.deadline || null,
        description: form.description.trim() || null,
      });

      setSelectedStudent(null);
      setForm(emptyForm);
      setNotice(`Project assigned to ${selectedStudent.name}.`);
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Unable to assign this project. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-50">

      <MentorSidebar />

      <div className="min-h-screen min-w-0 w-full lg:ml-[290px]">

        <MentorHeader />

        <main className="mx-auto w-full min-w-0 max-w-7xl px-3 py-4 sm:px-5 sm:py-5 md:p-8">

          {/* PAGE HEADER */}

          <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Projects
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Assign projects and track progress for your currently assigned students.
              </p>
            </div>

            {/* ASSIGNED STUDENTS */}

            <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:w-auto sm:px-5">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Assigned students
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {students.length}
              </p>

            </div>

          </div>

          {/* NOTIFICATIONS */}

          {notice && (
            <div
              role="status"
              className="mb-5 break-words rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              {notice}
            </div>
          )}

          {loadError && (
            <div
              role="alert"
              className="mb-5 break-words rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {loadError}
            </div>
          )}

          {/* STUDENTS SECTION */}

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* SECTION HEADER */}

            <div className="flex min-w-0 flex-col gap-4 border-b border-slate-100 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-w-0">

                <h2 className="font-semibold text-slate-900">
                  Your students
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Projects can only be assigned to students linked to your active mentorship.
                </p>

              </div>

              {/* SEARCH */}

              <div className="relative w-full min-w-0 sm:max-w-xs">

                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={17}
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search students..."
                  className="w-full min-w-0 rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-base sm:text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

            </div>

            {/* LOADING */}

            {loading ? (

              <div className="flex items-center justify-center gap-2 px-4 py-12 text-center text-sm text-slate-500 sm:p-14">

                <LoaderCircle className="animate-spin" size={18} />

                Loading assigned students...

              </div>

            ) : filteredStudents.length === 0 ? (

              /* EMPTY STATE */

              <div className="p-6 text-center sm:p-12">

                <FolderKanban
                  className="mx-auto mb-3 text-slate-300"
                  size={34}
                />

                <p className="font-medium text-slate-700">
                  No students found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try a different search or check your active student assignments.
                </p>

              </div>

            ) : (

              /* STUDENTS TABLE */

              <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[680px] text-left text-sm">

                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">

                    <tr>
                      <th className="px-5 py-4 font-semibold">
                        Student
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Register number
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Programme
                      </th>

                      <th className="px-5 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredStudents.map((student) => (

                      <tr
                        key={student.studentId}
                        className="hover:bg-slate-50/70"
                      >

                        <td className="px-5 py-4">

                          <div className="flex min-w-0 items-center gap-3">

                            {student.profileImage ? (

                              <img
                                src={student.profileImage}
                                alt=""
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                              />

                            ) : (

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-700">
                                {(student.name || "S")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                            )}

                            <span className="min-w-0 break-words font-semibold text-slate-800">
                              {student.name}
                            </span>

                          </div>

                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {student.registerNumber || "—"}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {student.programme || "—"}
                        </td>

                        <td className="px-5 py-4">

                          <div className="flex flex-wrap justify-end gap-2">

                            <button
                              onClick={() => openAssign(student)}
                              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                            >
                              <Plus size={14} />
                              Assign Project
                            </button>

                            <button
                              onClick={() =>
                                navigate(
                                  `/mentor/projects/${encodeURIComponent(student.studentId)}`,
                                  {
                                    state: {
                                      studentName: student.name,
                                      registerNumber: student.registerNumber,
                                    },
                                  }
                                )
                              }
                              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                              <Eye size={14} />
                              View Projects
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </main>

      </div>

      {/* ASSIGN PROJECT MODAL */}

      {selectedStudent && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-2 sm:p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !saving
            ) {
              setSelectedStudent(null);
            }
          }}
        >

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="assign-project-title"
            className="max-h-[calc(100dvh-1rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl bg-white p-4 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-6"
          >

            {/* MODAL HEADER */}

            <div className="mb-5 flex items-start justify-between gap-3">

              <div className="min-w-0">

                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Assign to student
                </p>

                <h2
                  id="assign-project-title"
                  className="mt-1 break-words text-lg font-bold text-slate-900 sm:text-xl"
                >
                  {selectedStudent.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the project details below.
                </p>

              </div>

              <button
                disabled={saving}
                onClick={() => setSelectedStudent(null)}
                aria-label="Close dialog"
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={submitProject}
              className="space-y-4"
            >

              {/* TITLE */}

              <div>

                <label
                  htmlFor="project-title"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Project title{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  id="project-title"
                  required
                  maxLength={180}
                  value={form.title}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title: event.target.value,
                    })
                  }
                  placeholder="e.g. Smart Campus Monitoring System"
                  className="w-full min-w-0 rounded-xl border border-slate-200 px-3.5 py-3 text-base sm:text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              {/* PROJECT TYPE */}

              <div>

                <label
                  htmlFor="project-type"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Project type{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  id="project-type"
                  required
                  value={form.projectType}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      projectType: event.target.value,
                    })
                  }
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base sm:text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option>Academic</option>
                  <option>Research</option>
                  <option>Industry</option>
                  <option>Capstone</option>
                  <option>Personal</option>
                  <option>Other</option>
                </select>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="project-description"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Project description{" "}
                  <span className="font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="project-description"
                  rows={4}
                  maxLength={5000}
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  placeholder="Explain the requirements, expected deliverables, or instructions..."
                  className="w-full min-w-0 resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-base sm:text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              {/* DEADLINE */}

              <div>

                <label
                  htmlFor="project-deadline"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Deadline{" "}
                  <span className="font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <div className="relative">

                  <CalendarDays
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={17}
                  />

                  <input
                    id="project-deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        deadline: event.target.value,
                      })
                    }
                    className="w-full min-w-0 rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-base sm:text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>

              </div>

              {/* ERROR */}

              {formError && (
                <p
                  role="alert"
                  className="break-words rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {formError}
                </p>
              )}

              {/* FOOTER */}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end sm:gap-3">

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setSelectedStudent(null)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 sm:w-auto"
                >
                  {saving && (
                    <LoaderCircle
                      className="animate-spin"
                      size={16}
                    />
                  )}

                  {saving ? "Assigning..." : "Assign project"}

                </button>

              </div>

            </form>

          </section>

        </div>

      )}

    </div>
  );
}
