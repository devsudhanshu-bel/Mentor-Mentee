
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  LoaderCircle,
  RefreshCw,
  FileText,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import {
  getStudentProjects,
  updateStudentProjectStatus,
  getProjectMessages,
  sendProjectMessage,
} from "../../../api/projects.api";

const STATUS_LABELS = {
  ASSIGNED: "Assigned",
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
};

const STATUS_STYLES = {
  ASSIGNED: "bg-blue-50 text-blue-700 ring-blue-600/20",
  ONGOING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "No deadline";

// ==========================================================
// STUDENT PROJECTS
// ==========================================================

export default function StudentProjects() {
  const { studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [notice, setNotice] = useState("");

  const [threads, setThreads] = useState({});
  const [threadDrafts, setThreadDrafts] = useState({});
  const [sendingId, setSendingId] = useState("");

  const [viewingProjectId, setViewingProjectId] = useState("");

  const studentName =
    location.state?.studentName || "Selected student";

  const registerNumber = location.state?.registerNumber;

  // ========================================================
  // LOAD PROJECTS AND MESSAGES
  // ========================================================

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const items = await getStudentProjects(studentId);

      setProjects(items);

      const loaded = await Promise.all(
        items.map(async (project) => [
          project.id,
          await getProjectMessages(project.id).catch(() => []),
        ])
      );

      setThreads(Object.fromEntries(loaded));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load projects for this student."
      );
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // ========================================================
  // UPDATE PROJECT STATUS
  // ========================================================

  const changeStatus = async (projectId, status) => {
    setUpdatingId(projectId);
    setError("");
    setNotice("");

    try {
      const updated = await updateStudentProjectStatus(
        projectId,
        status
      );

      setProjects((current) =>
        current.map((project) =>
          project.id === projectId
            ? { ...project, ...updated }
            : project
        )
      );

      setNotice("Project status updated.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update project status."
      );
    } finally {
      setUpdatingId("");
    }
  };

  // ========================================================
  // SEND PROJECT MESSAGE
  // ========================================================

  const handleSendMessage = async (projectId) => {
    const text = (threadDrafts[projectId] || "").trim();

    if (!text) return;

    setSendingId(projectId);
    setError("");

    try {
      await sendProjectMessage(projectId, text);

      setThreadDrafts((current) => ({
        ...current,
        [projectId]: "",
      }));

      setThreads((current) => ({
        ...current,
        [projectId]: [
          ...(current[projectId] || []),
          {
            id: `local-${Date.now()}`,
            senderRole: "MENTOR",
            message: text,
            createdAt: new Date().toISOString(),
          },
        ],
      }));

      const fresh = await getProjectMessages(projectId);

      setThreads((current) => ({
        ...current,
        [projectId]: fresh,
      }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send message."
      );
    } finally {
      setSendingId("");
    }
  };

  // ========================================================
  // PROJECT CARD
  // ========================================================

  const renderProject = (project) => {
    const isViewing = viewingProjectId === project.id;

    const messages = threads[project.id] || [];

    return (
      <article
        key={project.id}
        className={`
          min-w-0 rounded-2xl border border-slate-200 bg-white
          shadow-sm transition-all duration-300
          ${
            isViewing
              ? "relative z-[100] flex max-h-[calc(100dvh-1rem)] w-full max-w-3xl flex-col overflow-hidden shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
              : "flex h-full min-h-[220px] flex-col overflow-hidden p-4 hover:shadow-md sm:min-h-[230px] sm:p-5"
          }
        `}
      >
        {/* EXPANDED VIEW CLOSE BUTTON */}

        {isViewing && (
          <div className="flex shrink-0 justify-end border-b border-slate-100 p-3 sm:p-4">
            <button
              type="button"
              onClick={() => setViewingProjectId("")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <X size={14} />
              Close details
            </button>
          </div>
        )}

        <div
          className={
            isViewing
              ? "min-h-0 flex-1 overflow-y-auto p-3 sm:p-5"
              : "flex flex-1 flex-col"
          }
        >
          {/* PROJECT HEADER */}

          <div className="mb-4 flex min-w-0 flex-wrap items-start justify-between gap-2">
            <span className="max-w-full break-words rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700 sm:text-xs">
              {project.projectType}
            </span>

            <span
              className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset sm:text-xs ${
                STATUS_STYLES[project.status] ||
                STATUS_STYLES.ASSIGNED
              }`}
            >
              {STATUS_LABELS[project.status] || project.status}
            </span>
          </div>

          {/* PROJECT TITLE */}

          <h2 className="break-words text-base font-bold leading-snug text-slate-900 sm:text-lg">
            {project.title}
          </h2>

          {/* COLLAPSED CARD */}

          {!isViewing && (
            <div className="mt-auto pt-5">
              <p className="text-xs text-slate-500 sm:text-sm">
                Deadline: {formatDate(project.deadline)}
              </p>

              <button
                type="button"
                onClick={() => setViewingProjectId(project.id)}
                className="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700 sm:text-sm"
              >
                View Project
              </button>
            </div>
          )}

          {/* EXPANDED PROJECT DETAILS */}

          {isViewing && (
            <>
              {/* DEADLINE */}

              <div className="mt-4 flex min-w-0 items-center gap-2 text-xs text-slate-500 sm:text-sm">
                <CalendarDays
                  size={16}
                  className="shrink-0"
                />

                <span>{formatDate(project.deadline)}</span>
              </div>

              {/* DESCRIPTION */}

              {project.description && (
                <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 sm:p-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-indigo-700 sm:text-xs">
                    Project description / instructions
                  </p>

                  <p className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-700 sm:text-sm">
                    {project.description}
                  </p>
                </div>
              )}

              {/* STUDENT SUBMISSION */}

              {(project.submittedAt || project.submissionUrl) ? (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 sm:p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-emerald-800 sm:text-sm">
                    <CheckCircle2
                      size={16}
                      className="shrink-0"
                    />

                    Submitted by student
                  </div>

                  <p className="mb-3 break-all text-xs text-emerald-900 sm:text-sm">
                    {project.submissionFilename ||
                      "Project attachment"}
                  </p>

                  <div className="mb-3 break-words text-[10px] text-emerald-700 sm:text-xs">
                    {project.submittedAt
                      ? `Submitted ${formatDate(project.submittedAt)}`
                      : "Submission received"}

                    {project.submissionSize
                      ? ` · ${(
                          project.submissionSize /
                          (1024 * 1024)
                        ).toFixed(1)} MB`
                      : ""}
                  </div>

                  {project.submissionUrl && (
                    <a
                      href={project.submissionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex max-w-full items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 sm:text-sm"
                    >
                      <FileText
                        size={15}
                        className="shrink-0"
                      />

                      View attachment

                      <ExternalLink
                        size={14}
                        className="shrink-0"
                      />
                    </a>
                  )}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-3 text-xs text-slate-500 sm:text-sm">
                  Awaiting student submission
                </div>
              )}

              {/* UPDATE STATUS */}

              <div className="mt-5 border-t border-slate-100 pt-4">
                <label
                  htmlFor={`status-${project.id}`}
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs"
                >
                  Update status
                </label>

                <select
                  id={`status-${project.id}`}
                  value={project.status}
                  disabled={updatingId === project.id}
                  onChange={(event) =>
                    changeStatus(project.id, event.target.value)
                  }
                  className="
                    w-full min-w-0 rounded-xl border border-slate-200
                    bg-white px-3 py-2.5 text-xs font-medium
                    text-slate-700 outline-none transition
                    focus:border-indigo-400 focus:ring-2
                    focus:ring-indigo-100
                    disabled:opacity-60 sm:text-sm
                  "
                >
                  <option value="ASSIGNED">Assigned</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>

                {updatingId === project.id && (
                  <p className="mt-2 text-[10px] text-slate-500 sm:text-xs">
                    Saving status...
                  </p>
                )}
              </div>

              {/* MESSAGES */}

              <div className="mt-5 border-t border-slate-100 pt-4">
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-800 sm:text-sm">
                  <MessageCircle size={16} />
                  Messages with student
                </h3>

                {/* MESSAGE HISTORY */}

                <div className="mb-3 max-h-48 space-y-2 overflow-y-auto rounded-lg sm:max-h-56">
                  {messages.length === 0 ? (
                    <p className="py-2 text-[11px] text-slate-400 sm:text-xs">
                      No messages yet.
                    </p>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`
                          min-w-0 rounded-lg p-3 text-xs sm:text-sm
                          ${
                            message.senderRole === "MENTOR"
                              ? "ml-3 bg-slate-100 text-slate-700 sm:ml-5"
                              : "mr-3 bg-indigo-50 text-indigo-900 sm:mr-5"
                          }
                        `}
                      >
                        <p className="mb-1 text-[9px] font-semibold uppercase tracking-wide sm:text-[11px]">
                          {message.senderRole === "MENTOR"
                            ? "You"
                            : "Student"}
                        </p>

                        <p className="whitespace-pre-wrap break-words leading-5">
                          {message.message}
                        </p>

                        <p className="mt-1 break-words text-[9px] opacity-60 sm:text-[10px]">
                          {message.createdAt
                            ? new Date(
                                message.createdAt
                              ).toLocaleString()
                            : ""}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* MESSAGE INPUT */}

                <div className="flex min-w-0 flex-col gap-2 min-[420px]:flex-row">
                  <input
                    value={threadDrafts[project.id] || ""}
                    maxLength={5000}
                    onChange={(event) =>
                      setThreadDrafts((current) => ({
                        ...current,
                        [project.id]: event.target.value,
                      }))
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey &&
                        (threadDrafts[project.id] || "").trim() &&
                        sendingId !== project.id
                      ) {
                        event.preventDefault();
                        handleSendMessage(project.id);
                      }
                    }}
                    placeholder="Message this student..."
                    className="
                      min-w-0 w-full flex-1 rounded-lg
                      border border-slate-200 px-3 py-2.5
                      text-xs outline-none transition
                      focus:border-indigo-400 focus:ring-2
                      focus:ring-indigo-100 sm:text-sm
                    "
                  />

                  <button
                    type="button"
                    disabled={
                      !(threadDrafts[project.id] || "").trim() ||
                      sendingId === project.id
                    }
                    onClick={() => handleSendMessage(project.id)}
                    className="
                      inline-flex w-full shrink-0 items-center
                      justify-center gap-2 rounded-lg
                      bg-indigo-600 px-4 py-2.5
                      text-xs font-semibold text-white
                      transition hover:bg-indigo-700
                      disabled:cursor-not-allowed
                      disabled:bg-slate-300
                      min-[420px]:w-auto
                    "
                  >
                    <Send size={14} />

                    {sendingId === project.id
                      ? "Sending"
                      : "Send"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </article>
    );
  };

  // ========================================================
  // MAIN RENDER
  // ========================================================

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <MentorSidebar />

      <div className="min-h-screen min-w-0 w-full lg:ml-[290px] lg:w-[calc(100%-290px)]">
        <MentorHeader />

        <main className="mx-auto w-full max-w-7xl min-w-0 p-3 sm:p-5 md:p-6 lg:p-8">
          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() => navigate("/mentor/projects")}
            className="mb-5 inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-slate-600 transition hover:text-indigo-700 sm:text-sm"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </button>

          {/* PAGE HEADER */}

          <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-indigo-600 sm:text-sm">
                <FolderKanban
                  size={17}
                  className="shrink-0"
                />
                Student project portfolio
              </div>

              <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {studentName}
              </h1>

              {registerNumber && (
                <p className="mt-1 break-words text-xs text-slate-500 sm:text-sm">
                  {registerNumber}
                </p>
              )}

              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                Review assigned work and update project progress.
              </p>
            </div>

            <button
              type="button"
              onClick={loadProjects}
              disabled={loading}
              className="
                inline-flex w-full shrink-0 items-center
                justify-center gap-2 rounded-xl
                border border-slate-200 bg-white
                px-4 py-2.5 text-xs font-semibold
                text-slate-700 shadow-sm transition
                hover:bg-slate-50 disabled:opacity-50
                sm:w-auto sm:text-sm
              "
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {/* SUCCESS NOTICE */}

          {notice && (
            <div
              role="status"
              className="mb-4 break-words rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs text-emerald-800 sm:px-4 sm:text-sm"
            >
              {notice}
            </div>
          )}

          {/* ERROR NOTICE */}

          {error && (
            <div
              role="alert"
              className="mb-4 break-words rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs text-red-700 sm:px-4 sm:text-sm"
            >
              {error}
            </div>
          )}

          {/* LOADING STATE */}

          {loading ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-10 text-xs text-slate-500 sm:p-14 sm:text-sm">
              <LoaderCircle
                size={22}
                className="animate-spin"
              />
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            /* EMPTY STATE */

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center sm:p-14">
              <FolderKanban
                size={38}
                className="mx-auto mb-3 text-slate-300"
              />

              <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
                No projects assigned yet
              </h2>

              <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500 sm:text-sm">
                Return to the Projects page and assign the first
                project to this student.
              </p>
            </div>
          ) : (
            /* PROJECT GRID */

            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <React.Fragment key={project.id}>
                  {/* BACKDROP FOR SELECTED PROJECT */}

                  {viewingProjectId === project.id && (
                    <div
                      className="fixed inset-0 z-[90] bg-slate-950/50"
                      onClick={() => setViewingProjectId("")}
                      aria-hidden="true"
                    />
                  )}

                  {/* PROJECT CARD / EXPANDED DETAILS */}

                  <div
                    className={
                      viewingProjectId === project.id
                        ? "fixed inset-2 z-[100] flex items-center justify-center sm:inset-4 md:inset-y-6"
                        : "min-w-0"
                    }
                  >
                    {renderProject(project)}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
