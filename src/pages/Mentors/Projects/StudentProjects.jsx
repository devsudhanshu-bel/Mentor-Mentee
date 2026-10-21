import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, FolderKanban, LoaderCircle, RefreshCw, FileText, ExternalLink, CheckCircle2, MessageCircle, Send } from "lucide-react";
import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";
import { getStudentProjects, updateStudentProjectStatus, getProjectMessages, sendProjectMessage } from "../../../api/projects.api";

const STATUS_LABELS = { ASSIGNED: "Assigned", ONGOING: "Ongoing", COMPLETED: "Completed" };
const STATUS_STYLES = {
  ASSIGNED: "bg-blue-50 text-blue-700 ring-blue-600/20",
  ONGOING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};
const formatDate = (value) => value ? new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "No deadline";

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
  const studentName = location.state?.studentName || "Selected student";
  const registerNumber = location.state?.registerNumber;

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try { const items = await getStudentProjects(studentId); setProjects(items); const loaded = await Promise.all(items.map(async project => [project.id, await getProjectMessages(project.id).catch(() => [])])); setThreads(Object.fromEntries(loaded)); }
    catch (err) { setError(err.response?.data?.message || "Unable to load projects for this student."); }
    finally { setLoading(false); }
  }, [studentId]);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  const changeStatus = async (projectId, status) => {
    setUpdatingId(projectId);
    setError("");
    setNotice("");
    try {
      const updated = await updateStudentProjectStatus(projectId, status);
      setProjects((current) => current.map((project) => project.id === projectId ? { ...project, ...updated } : project));
      setNotice("Project status updated.");
    } catch (err) { setError(err.response?.data?.message || "Unable to update project status."); }
    finally { setUpdatingId(""); }
  };

  return <div className="min-h-screen bg-slate-50"><MentorSidebar /><div className="min-h-screen lg:ml-[290px]"><MentorHeader /><main className="mx-auto max-w-7xl p-5 md:p-8">
    <button onClick={() => navigate("/mentor/projects")} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-700"><ArrowLeft size={17} /> Back to Projects</button>
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-600"><FolderKanban size={17} /> Student project portfolio</div><h1 className="text-3xl font-bold tracking-tight text-slate-900">{studentName}</h1>{registerNumber && <p className="mt-1 text-sm text-slate-500">{registerNumber}</p>}<p className="mt-2 text-sm text-slate-500">Review assigned work and update project progress.</p></div><button onClick={loadProjects} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh</button></div>
    {notice && <div role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div>}
    {error && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    {loading ? <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-14 text-sm text-slate-500"><LoaderCircle size={18} className="animate-spin" /> Loading projects...</div> : projects.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center"><FolderKanban size={38} className="mx-auto mb-3 text-slate-300" /><h2 className="font-semibold text-slate-800">No projects assigned yet</h2><p className="mt-1 text-sm text-slate-500">Return to the Projects page and assign the first project to this student.</p></div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <React.Fragment key={project.id}>{viewingProjectId===project.id&&<div className="fixed inset-0 z-[90] bg-slate-950/50" onClick={()=>setViewingProjectId("")} aria-hidden="true"/>}<article className={viewingProjectId===project.id?"fixed inset-4 z-[100] mx-auto max-h-[calc(100vh-2rem)] w-auto max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:inset-y-8":"relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"}>{viewingProjectId===project.id&&<div className="mb-3 flex justify-end"><button type="button" onClick={()=>setViewingProjectId("")} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Close details ✕</button></div>}<div className="mb-4 flex items-start justify-between gap-3"><span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">{project.projectType}</span><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[project.status] || STATUS_STYLES.ASSIGNED}`}>{STATUS_LABELS[project.status] || project.status}</span></div><h2 className="text-lg font-bold leading-snug text-slate-900">{project.title}</h2>{viewingProjectId!==project.id&&<div className="mt-3"><p className="text-sm text-slate-500">Deadline: {formatDate(project.deadline)}</p><button type="button" onClick={()=>setViewingProjectId(project.id)} className="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">View Project</button></div>}{viewingProjectId===project.id&&<><div className="mt-4 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} /> <span>{formatDate(project.deadline)}</span></div>{project.description && <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3"><p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">Project description / instructions</p><p className="whitespace-pre-wrap text-sm text-slate-700">{project.description}</p></div>}{(project.submittedAt || project.submissionUrl) ? <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800"><CheckCircle2 size={16} /> Submitted by student</div><p className="mb-3 break-all text-sm text-emerald-900">{project.submissionFilename || "Project attachment"}</p><div className="mb-3 text-xs text-emerald-700">{project.submittedAt ? `Submitted ${formatDate(project.submittedAt)}` : "Submission received"}{project.submissionSize ? ` · ${(project.submissionSize / (1024 * 1024)).toFixed(1)} MB` : ""}</div>{project.submissionUrl && <a href={project.submissionUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"><FileText size={15} /> View attachment <ExternalLink size={14} /></a>}</div> : <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-3 text-sm text-slate-500">Awaiting student submission</div>}<div className="mt-auto border-t border-slate-100 pt-4 mt-5"><label htmlFor={`status-${project.id}`} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Update status</label><select id={`status-${project.id}`} value={project.status} disabled={updatingId === project.id} onChange={(event) => changeStatus(project.id, event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"><option value="ASSIGNED">Assigned</option><option value="ONGOING">Ongoing</option><option value="COMPLETED">Completed</option></select>{updatingId === project.id && <p className="mt-2 text-xs text-slate-500">Saving status...</p>}</div><div className="mt-5 border-t border-slate-100 pt-4"><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800"><MessageCircle size={16}/> Messages with student</h3><div className="mb-3 max-h-44 space-y-2 overflow-y-auto">{(threads[project.id]||[]).length===0?<p className="text-xs text-slate-400">No messages yet.</p>:(threads[project.id]||[]).map(message=><div key={message.id} className={`rounded-lg p-3 text-sm ${message.senderRole==="MENTOR"?"ml-5 bg-slate-100 text-slate-700":"mr-5 bg-indigo-50 text-indigo-900"}`}><p className="mb-1 text-[11px] font-semibold uppercase tracking-wide">{message.senderRole==="MENTOR"?"You":"Student"}</p><p className="whitespace-pre-wrap">{message.message}</p><p className="mt-1 text-[10px] opacity-60">{message.createdAt?new Date(message.createdAt).toLocaleString():""}</p></div>)}</div><div className="flex gap-2"><input value={threadDrafts[project.id]||""} maxLength={5000} onChange={e=>setThreadDrafts(c=>({...c,[project.id]:e.target.value}))} placeholder="Message this student..." className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"/><button type="button" disabled={!(threadDrafts[project.id]||"").trim()||sendingId===project.id} onClick={async()=>{const text=(threadDrafts[project.id]||"").trim();if(!text)return;setSendingId(project.id);setError("");try{await sendProjectMessage(project.id,text);setThreadDrafts(c=>({...c,[project.id]:""}));setThreads(c=>({...c,[project.id]:[...(c[project.id]||[]),{id:`local-${Date.now()}`,senderRole:"MENTOR",message:text,createdAt:new Date().toISOString()}]}));const fresh=await getProjectMessages(project.id);setThreads(c=>({...c,[project.id]:fresh}));}catch(err){setError(err.response?.data?.message||"Unable to send message.");}finally{setSendingId("");}}} className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white disabled:bg-slate-300"><Send size={14}/>{sendingId===project.id?"Sending":"Send"}</button></div></div></>}</article></React.Fragment>)}</div>}
  </main></div></div>;
}
