import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Paperclip,
  MessageCircle,
  CalendarDays,
  UserRound,
  FileText,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { getAdminProjectDetails } from "../../../api/adminProjects.api";

export default function AdminProjectDetails() {
  const { studentId, projectId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setData(await getAdminProjectDetails(projectId));
    } catch (e) {
      setError(e.response?.data?.message || "Could not load project details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  const p = data?.project;
  const attachment = p?.submissionUrl;

  return (
    <div className="min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-6 lg:p-8">
      <button
        onClick={() => navigate(`/admin/projects/${encodeURIComponent(studentId)}`)}
        className="inline-flex max-w-full items-center gap-2 text-left text-sm font-medium text-slate-600 hover:text-indigo-700"
      >
        <ArrowLeft size={17} className="shrink-0" />
        <span>Back to student projects</span>
      </button>

      <div className="flex min-w-0 flex-col items-start justify-between gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Project Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">Read-only project record</p>
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
          Loading project details...
        </div>
      ) : (
        p && (
          <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-5">
            <div className="min-w-0 space-y-4 sm:space-y-5">
              <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
                <div className="flex min-w-0 flex-col items-start justify-between gap-3 sm:flex-row sm:flex-wrap">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-indigo-600">
                      {p.projectType || "Project"}
                    </div>
                    <h2 className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                      {p.title}
                    </h2>
                  </div>
                  <Status status={p.status} />
                </div>

                <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                  <Info
                    icon={<UserRound size={16} />}
                    label="Student"
                    value={data.student?.fullName}
                  />
                  <Info
                    icon={<UserRound size={16} />}
                    label="Mentor"
                    value={data.mentor?.fullName}
                  />
                  <Info
                    icon={<CalendarDays size={16} />}
                    label="Deadline"
                    value={
                      p.deadline
                        ? new Date(p.deadline).toLocaleDateString()
                        : "Not specified"
                    }
                  />
                  <Info
                    icon={<CalendarDays size={16} />}
                    label="Assigned"
                    value={
                      p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"
                    }
                  />
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Project description / mentor instructions
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                    {p.description || "No description provided."}
                  </p>
                </div>
              </section>

              <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                  <Paperclip size={18} className="shrink-0" />
                  Student submission
                </h3>
                {attachment ? (
                  <div className="mt-3 flex min-w-0 flex-col items-start justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <div className="flex min-w-0 items-start gap-2 text-sm text-emerald-900">
                      <FileText size={18} className="mt-0.5 shrink-0" />
                      <span className="break-all">
                        {p.submissionFilename || "Submitted attachment"}
                      </span>
                    </div>
                    <a
                      href={attachment}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-800 underline"
                    >
                      View attachment <ExternalLink size={14} />
                    </a>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">
                    No attachment has been submitted.
                  </p>
                )}
                {p.submittedAt && (
                  <p className="mt-2 break-words text-xs text-slate-500">
                    Submitted on {new Date(p.submittedAt).toLocaleString()}
                  </p>
                )}
                {p.submissionSize != null && (
                  <p className="mt-1 text-xs text-slate-500">
                    File size: {(p.submissionSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </section>
            </div>

            <section className="h-fit min-w-0 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                <MessageCircle size={18} className="shrink-0" />
                Messages
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Conversation history · read-only
              </p>
              <div className="mt-4 max-h-[500px] space-y-3 overflow-y-auto sm:max-h-[650px]">
                {(data.messages || []).map((m, i) => (
                  <div
                    key={m.id || i}
                    className={`min-w-0 rounded-xl p-3 ${
                      String(m.senderRole).toUpperCase() === "MENTOR"
                        ? "bg-indigo-50"
                        : "bg-slate-100"
                    }`}
                  >
                    <div className="flex min-w-0 flex-col justify-between gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-xs font-bold uppercase text-slate-600">
                        {m.senderRole || "Participant"}
                      </span>
                      <span className="break-words text-[10px] text-slate-500 sm:text-right">
                        {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-800">
                      {m.message}
                    </p>
                  </div>
                ))}
                {(!data.messages || data.messages.length === 0) && (
                  <p className="text-sm text-slate-500">
                    No messages for this project.
                  </p>
                )}
              </div>
            </section>
          </div>
        )
      )}
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex min-w-0 gap-2">
      <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="mt-0.5 break-words text-sm font-medium text-slate-800">
          {value || "—"}
        </div>
      </div>
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
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}
    >
      {value.charAt(0) + value.slice(1).toLowerCase()}
    </span>
  );
}
