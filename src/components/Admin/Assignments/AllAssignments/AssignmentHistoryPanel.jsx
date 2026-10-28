import React, { useEffect, useMemo, useState } from "react";
import { getAssignmentHistory } from "../../../../api/assignment.api";

const PAGE_SIZE = 10;
const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
};

export default function AssignmentHistoryPanel({ termId, departmentId, search = "" }) {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAssignmentHistory({ termId: termId || undefined, departmentId: departmentId || undefined, search, status: status === "ALL" ? undefined : status });
        if (!cancelled) setRows(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) {
          setRows([]);
          setError(err?.response?.data?.message || err?.message || "Could not load assignment history.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [termId, departmentId, search, status]);

  useEffect(() => setPage(1), [termId, departmentId, search, status]);
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const visibleRows = useMemo(() => rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [rows, page]);

  return (
    <section className="p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h3 className="text-sm font-semibold text-slate-800">Assignment history</h3><p className="mt-1 text-xs text-slate-500">Active and removed assignments retained in the database.</p></div>
        <div className="flex items-center gap-2"><label htmlFor="assignment-history-status" className="text-xs text-slate-500">Status</label><select id="assignment-history-status" value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700"><option value="ALL">All statuses</option><option value="ACTIVE">Active</option><option value="REMOVED">Removed</option></select></div>
      </div>
      {error && <div role="alert" className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>}
      <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="min-w-[760px] w-full border-collapse text-left text-xs">
        <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500"><tr>{["Student", "Register number", "Mentor", "Term", "Assigned on", "Ended on", "Status"].map((label) => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100">
          {loading ? <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-500">Loading assignment history…</td></tr> : visibleRows.length === 0 ? <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-500">No assignment history found for these filters.</td></tr> : visibleRows.map((item) => <tr key={item.id} className="hover:bg-slate-50/70">
            <td className="px-4 py-3 font-medium text-slate-800">{item.students?.fullName || "Unknown student"}</td><td className="px-4 py-3 text-slate-600">{item.students?.registerNumber || "—"}</td><td className="px-4 py-3 text-slate-700">{item.teachers?.fullName || "Unknown mentor"}</td><td className="px-4 py-3 text-slate-600">{item.academic_terms?.name || (item.academic_terms?.semesterNumber ? `Semester ${item.academic_terms.semesterNumber}` : "—")}</td><td className="px-4 py-3 text-slate-600">{formatDate(item.assignedAt)}</td><td className="px-4 py-3 text-slate-600">{formatDate(item.endedAt)}</td><td className="px-4 py-3"><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${item.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{item.status || "UNKNOWN"}</span></td>
          </tr>)}
        </tbody>
      </table></div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>{loading ? "Loading…" : `${rows.length} record${rows.length === 1 ? "" : "s"}`}</span><div className="flex items-center gap-2"><button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Previous</button><span>Page {Math.min(page, pageCount)} of {pageCount}</span><button type="button" disabled={page >= pageCount || loading} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Next</button></div></div>
    </section>
  );
}
