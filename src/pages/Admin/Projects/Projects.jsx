import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Search, RefreshCw, Eye, Users, UserRound } from "lucide-react";
import { getAdminProjectStudents } from "../../../api/adminProjects.api";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [mentorFilter, setMentorFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true); setError("");
    try {
      const data = await getAdminProjectStudents();
      setStudents(Array.isArray(data.students) ? data.students : []);
      setMentors(Array.isArray(data.mentors) ? data.mentors : []);
    } catch (e) {
      setError(e.response?.data?.message || "Could not load the student project directory.");
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => students.filter((s) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [s.fullName, s.registerNumber, s.email, s.mentorName].some((v) => String(v || "").toLowerCase().includes(query));
    return matchesSearch && (mentorFilter === "ALL" || s.mentorId === mentorFilter);
  }), [students, search, mentorFilter]);

  return <div className="p-6 lg:p-8 space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-bold text-slate-900">Projects</h1><p className="mt-1 text-sm text-slate-500">Review student projects and submissions across mentors.</p></div>
      <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"><RefreshCw size={16}/> Refresh</button>
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Stat icon={<Users size={18}/>} label="Students" value={students.length}/>
      <Stat icon={<UserRound size={18}/>} label="Mentors" value={mentors.length}/>
      <Stat icon={<FolderKanban size={18}/>} label="Projects" value={students.reduce((n,s)=>n+(s.projectCount||0),0)}/>
    </div>
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row">
      <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student, register number, email, mentor..." className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-indigo-400"/></div>
      <select value={mentorFilter} onChange={e=>setMentorFilter(e.target.value)} className="min-w-56 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-indigo-400"><option value="ALL">All mentors</option>{mentors.map(m=><option key={m.id} value={m.id}>{m.name || "Mentor"}</option>)}</select>
    </div>
    {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-900">All students</h2><p className="mt-1 text-sm text-slate-500">{filtered.length} students match the current filters</p></div>
      {loading ? <div className="p-12 text-center text-sm text-slate-500">Loading students...</div> : filtered.length === 0 ? <div className="p-12 text-center text-sm text-slate-500">No students found for these filters.</div> : <div className="divide-y divide-slate-100">{filtered.map(s=><div key={s.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/70">
        <div className="min-w-0"><div className="font-semibold text-slate-900">{s.fullName || "Unnamed student"}</div><div className="mt-1 text-sm text-slate-500">{s.registerNumber || "No register number"}{s.email ? ` · ${s.email}` : ""}</div><div className="mt-2 flex items-center gap-2 text-sm text-slate-600"><UserRound size={15}/>{s.mentorName || "Not currently assigned"}</div></div>
        <div className="flex items-center gap-3"><span className="whitespace-nowrap rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">{s.projectCount || 0} projects</span><button onClick={()=>navigate(`/admin/projects/${encodeURIComponent(s.id)}`)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"><Eye size={16}/> View Projects</button></div>
      </div>)}</div>}
    </div>
  </div>;
}

function Stat({icon,label,value}) { return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">{icon}</div><div><div className="text-xs text-slate-500">{label}</div><div className="text-xl font-bold text-slate-900">{value}</div></div></div>; }
