import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FolderKanban, Eye, RefreshCw } from "lucide-react";
import { getAdminProjectStudents } from "../../../api/adminProjects.api";

export default function AdminStudentProjects() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminProjectStudents();
      setStudent((data.students || []).find((s) => s.id === studentId) || null);
    } catch (e) {
      setError(e.response?.data?.message || "Could not load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [studentId]);

  return (
    <div className="min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-6 lg:p-8">
      <button
        onClick={() => navigate("/admin/projects")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-700"
      >
        <ArrowLeft size={17} className="shrink-0" />
        Back to Projects
      </button>

      <div className="flex min-w-0 flex-col items-start justify-between gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Student Projects
          </h1>
          <p className="mt-1 break-words text-sm text-slate-500">
            {student?.fullName || "Project overview"} ·{" "}
            {student?.mentorName || "Mentor not assigned"}
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:w-auto"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:p-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-6 text-center text-sm text-slate-500 sm:p-12 sm:text-base">
          Loading projects...
        </div>
      ) : !student ? (
        <div className="rounded-2xl border bg-white p-6 text-center text-sm text-slate-500 sm:p-12 sm:text-base">
          Student not found.
        </div>
      ) : (
        <>
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="text-sm text-slate-500">Register number</div>
            <div className="break-words font-semibold text-slate-900">
              {student.registerNumber || "—"}
            </div>
            <div className="mt-3 text-sm text-slate-500">Assigned mentor</div>
            <div className="break-words font-semibold text-slate-900">
              {student.mentorName}
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">
              Projects ({student.projects?.length || 0})
            </h2>
            <div className="mt-3 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
              {(student.projects || []).map((p) => (
                <article
                  key={p.id}
                  className="flex min-h-52 min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <FolderKanban size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="break-words font-semibold text-slate-900 sm:truncate"
                        title={p.title}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {p.projectType || "Project"}
                      </p>
                    </div>
                    <Status status={p.status} />
                  </div>

                  <div className="mt-4 min-h-10 line-clamp-2 break-words text-sm text-slate-600">
                    {p.description || "No description provided."}
                  </div>
                  <div className="mt-3 break-words text-xs text-slate-500">
                    Deadline:{" "}
                    {p.deadline
                      ? new Date(p.deadline).toLocaleDateString()
                      : "Not specified"}
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/projects/${encodeURIComponent(student.id)}/${encodeURIComponent(p.id)}`
                      )
                    }
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Eye size={16} />
                    View Project
                  </button>
                </article>
              ))}
            </div>

            {(!student.projects || student.projects.length === 0) && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 sm:p-10">
                No projects have been assigned to this student.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Status({ status }) {
  const value = String(status || "ASSIGNED").toUpperCase();
  const cls =
    value === "COMPLETED"
      ? "bg-emerald-50 text-emerald-700"
      : value === "ONGOING"
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}
    >
      {value.charAt(0) + value.slice(1).toLowerCase()}
    </span>
  );
}
