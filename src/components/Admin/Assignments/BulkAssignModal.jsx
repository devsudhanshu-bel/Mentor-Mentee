import React, { useEffect, useMemo, useState } from "react";
import { X, Upload, FileText, LoaderCircle } from "lucide-react";
import { getAssignmentContext, bulkAssignStudentsFromPdf } from "../../../api/assignment.api";

const BulkAssignModal = ({ termId, onClose, onComplete }) => {
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [files, setFiles] = useState({});
  const [busyMentor, setBusyMentor] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!termId) throw new Error("Select an academic term before bulk assigning.");
        const context = await getAssignmentContext({ termId });
        if (alive) setMentors(Array.isArray(context?.mentors) ? context.mentors : []);
      } catch (e) { if (alive) setError(e?.response?.data?.message || e.message || "Unable to load mentors."); }
      finally { if (alive) setLoadingMentors(false); }
    })();
    return () => { alive = false; };
  }, [termId]);

  const adminId = useMemo(() => {
    try { const u = JSON.parse(localStorage.getItem("user") || "null"); return u?.id || u?.userId || u?.userAccountId || ""; } catch { return ""; }
  }, []);

  const handleUpload = async (mentor) => {
    const file = files[mentor.id];
    if (!file) { setError(`Choose a PDF for ${mentor.fullName} first.`); return; }
    if (!adminId) { setError("Logged-in admin account could not be identified."); return; }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) { setError("Please select a PDF file."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("PDF must be 10 MB or smaller."); return; }
    setBusyMentor(mentor.id); setError(""); setSuccess("");
    try {
      const result = await bulkAssignStudentsFromPdf({ file, teacherId: mentor.id, termId, assignedBy: adminId });
      setSuccess(result?.message || `Students assigned to ${mentor.fullName}.`);
      setFiles((prev) => ({ ...prev, [mentor.id]: null }));
      if (typeof onComplete === "function") await onComplete();
    } catch (e) { setError(e?.response?.data?.message || e?.response?.data?.error || e.message || "Bulk assignment failed."); }
    finally { setBusyMentor(null); }
  };

  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="bulk-assign-title">
    <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
        <div><h2 id="bulk-assign-title" className="text-base font-semibold text-slate-800">Bulk Assign Students</h2><p className="mt-1 text-xs text-slate-500">Upload a PDF for each mentor. Use a table with Register Number and Name columns.</p></div>
        <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close"><X size={18}/></button>
      </div>
      <div className="overflow-y-auto p-5">
        <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800"><strong>Expected PDF format:</strong> REGISTER NUMBER | NAME<br/>Register numbers may contain letters, numbers, or symbols. All students are validated before any assignment is created.</div>
        {error && <div role="alert" className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</div>}
        {success && <div role="status" className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">{success}</div>}
        {loadingMentors ? <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500"><LoaderCircle className="animate-spin" size={17}/> Loading mentors…</div> : mentors.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">No mentors found for this term.</p> : <div className="space-y-3">{mentors.map((mentor) => <div key={mentor.id} className={`grid grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)] items-center gap-4 rounded-xl border p-4 ${selectedMentor === mentor.id ? "border-blue-300 bg-blue-50/40" : "border-slate-200"}`}>
          <button type="button" onClick={() => setSelectedMentor(mentor.id)} className="min-w-0 text-left"><span className="block truncate text-sm font-semibold text-slate-800">{mentor.fullName}</span><span className="mt-1 block truncate text-xs text-slate-500">{mentor.department?.name || mentor.departments?.name || "Department not specified"}</span><span className="mt-1 block truncate text-[11px] text-slate-400">{mentor.employeeCode || mentor.email || ""}</span></button>
          <div className="flex min-w-0 items-center gap-2"><label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 hover:border-blue-300"><FileText size={15} className="shrink-0 text-slate-400"/><span className="truncate">{files[mentor.id]?.name || "Choose PDF…"}</span><input className="hidden" type="file" accept="application/pdf,.pdf" onChange={(e) => { setFiles((prev) => ({ ...prev, [mentor.id]: e.target.files?.[0] || null })); setSelectedMentor(mentor.id); setError(""); }}/></label><button type="button" onClick={() => handleUpload(mentor)} disabled={busyMentor !== null} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{busyMentor === mentor.id ? <LoaderCircle size={14} className="animate-spin"/> : <Upload size={14}/>} Upload PDF</button></div>
        </div>)}</div>}
      </div>
      <div className="flex justify-end border-t border-slate-200 px-5 py-3"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">Close</button></div>
    </div>
  </div>;
};
export default BulkAssignModal;
