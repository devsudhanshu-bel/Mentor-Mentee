import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, RotateCcw, RefreshCw, GraduationCap, UserRound, Mail, BookOpen, Users } from "lucide-react";
import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";
import { getAdminStudentDirectory, getAdminMentors } from "../../api/admin.api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [mentors, setMentors] = useState([]);
  const [sort, setSort] = useState("name-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminStudentDirectory({ search, semester, sort, mentorId });
      setStudents(Array.isArray(data?.students) ? data.students : []);
    } catch (e) {
      setError(e?.response?.data?.message || "Unable to load the student directory.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    getAdminMentors()
      .then((items) => { if (!cancelled) setMentors(items); })
      .catch(() => { if (!cancelled) setMentors([]); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [search, semester, sort, mentorId]);

  const semesters = useMemo(
    () => [...new Set(students.map(s => s.semester).filter(Boolean))]
      .sort((a, b) => Number(a) - Number(b)),
    [students]
  );
  const reset = () => {
    setSearch("");
    setSemester("");
    setMentorId("");
    setSort("name-asc");
  };
  return <div className="min-h-screen bg-slate-100"><AdminSidebar /><div className="ml-[290px] min-h-screen"><AdminHeader /><main className="space-y-5 p-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-3xl font-bold text-slate-900">Students</h1><p className="mt-1 text-sm text-slate-500">Institution-wide student directory and current mentor assignments.</p></div><button onClick={load} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"><RefreshCw size={16} className={loading ? "animate-spin" : ""}/> Refresh</button></div>
    <section className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(240px,1fr)_190px_190px_190px_auto]">
      <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3"><Search size={17} className="text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, register number, email..." className="w-full py-2.5 text-sm outline-none"/></label>
      <select value={semester} onChange={e=>setSemester(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><option value="">All semesters</option>{semesters.map(s=><option key={s} value={s}>Semester {s}</option>)}</select>
      <select value={mentorId} onChange={e => setMentorId(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm" aria-label="Filter by mentor">
        <option value="">All mentors</option>
        {mentors.map(mentor => (
          <option key={mentor.id} value={mentor.id}>
            {mentor.fullName || mentor.name || mentor.displayName || "Unnamed mentor"}
          </option>
        ))}
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><option value="name-asc">Name (A–Z)</option><option value="name-desc">Name (Z–A)</option><option value="semester-desc">Semester (high–low)</option></select>
      <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-500 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50"><RotateCcw size={15}/> Reset</button>
    </section>
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600"><span>Total students: <strong className="text-blue-700">{students.length}</strong></span><span>Active mentor assignment is shown where available.</span></div>
    {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
    {loading ? <div className="rounded-xl bg-white p-10 text-center text-slate-500">Loading student directory…</div> : students.length === 0 ? <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">No students found for the selected filters.</div> : <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">{students.map(student => <article key={student.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5"><div className="flex items-start gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-600">{student.profileImage ? <img src={student.profileImage} alt="" className="h-full w-full object-cover"/> : <UserRound size={26}/>}</div><div className="min-w-0 flex-1"><h2 className="font-semibold text-slate-900">{student.fullName}</h2><p className="mt-1 text-xs text-slate-500">{student.registerNumber}</p><span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{student.status || "Student"}</span></div></div>
      <div className="mt-4 space-y-2 text-sm text-slate-600"><p className="flex items-start gap-2"><Mail size={15} className="mt-0.5 shrink-0 text-slate-400"/><span className="break-all">{student.email || "No email recorded"}</span></p><p className="flex items-start gap-2"><BookOpen size={15} className="mt-0.5 shrink-0 text-slate-400"/><span>{student.programme || "Programme not recorded"}{student.semester ? ` · Semester ${student.semester}` : ""}</span></p></div>
      <div className="mt-4 grid grid-cols-2 divide-x divide-slate-200 rounded-xl border border-slate-100 bg-slate-50 text-center"><div className="p-3"><p className="text-xs text-slate-500">Current CGPA</p><p className="mt-1 font-semibold text-slate-900">{student.currentCGPA ?? "—"}</p></div><div className="p-3"><p className="text-xs text-slate-500">Attendance</p><p className="mt-1 font-semibold text-slate-900">{student.overallAttendance == null ? "—" : `${student.overallAttendance}%`}</p></div></div>
      <div className="mt-4 rounded-xl border border-slate-200 p-3"><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><Users size={14}/> Assigned mentor</div>{student.mentor ? <><p className="font-semibold text-slate-800">{student.mentor.fullName}</p><p className="mt-1 text-xs text-slate-500">{student.mentor.employeeCode}{student.mentor.department?.name ? ` · ${student.mentor.department.name}` : ""}</p><p className="mt-1 text-xs text-emerald-700">Active assignment{student.mentor.term?.semesterNumber ? ` · Semester ${student.mentor.term.semesterNumber}` : ""}</p></> : <p className="text-sm font-medium text-amber-700">No active mentor assigned</p>}</div>
      <Link to={`/admin/overview/students/${student.id}`} className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><GraduationCap size={16}/> Open Student Profile →</Link>
    </div></article>)}</div>}
  </main></div></div>;
};
export default Students;
