import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Search, Plus, Eye, X, CalendarDays, LoaderCircle } from "lucide-react";
import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";
import api from "../../../api/axios";
import { assignStudentProject } from "../../../api/projects.api";

const emptyForm = { title: "", projectType: "Academic", deadline: "", description: "" };

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
        if (active) setStudents(response.data?.data?.students || []);
      })
      .catch((error) => {
        if (active) setLoadError(error.response?.data?.message || "Unable to load your assigned students.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;
    return students.filter((student) =>
      [student.name, student.registerNumber, student.programme].some((value) => String(value || "").toLowerCase().includes(term))
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
      setFormError(error.response?.data?.message || "Unable to assign this project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <MentorSidebar />
      <div className="min-h-screen lg:ml-[290px]">
        <MentorHeader />
        <main className="mx-auto max-w-7xl p-5 md:p-8">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects</h1>
              <p className="mt-2 text-sm text-slate-500">Assign projects and track progress for your currently assigned students.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Assigned students</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{students.length}</p>
            </div>
          </div>

          {notice && <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div>}
          {loadError && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</div>}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div><h2 className="font-semibold text-slate-900">Your students</h2><p className="mt-1 text-sm text-slate-500">Projects can only be assigned to students linked to your active mentorship.</p></div>
              <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
            </div>
            {loading ? <div className="flex items-center justify-center gap-2 p-14 text-sm text-slate-500"><LoaderCircle className="animate-spin" size={18} /> Loading assigned students...</div> : filteredStudents.length === 0 ? <div className="p-12 text-center"><FolderKanban className="mx-auto mb-3 text-slate-300" size={34} /><p className="font-medium text-slate-700">No students found</p><p className="mt-1 text-sm text-slate-500">Try a different search or check your active student assignments.</p></div> : (
              <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Student</th><th className="px-5 py-4 font-semibold">Register number</th><th className="px-5 py-4 font-semibold">Programme</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredStudents.map((student) => <tr key={student.studentId} className="hover:bg-slate-50/70"><td className="px-5 py-4"><div className="flex items-center gap-3">{student.profileImage ? <img src={student.profileImage} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-700">{(student.name || "S").charAt(0).toUpperCase()}</div>}<span className="font-semibold text-slate-800">{student.name}</span></div></td><td className="px-5 py-4 text-slate-600">{student.registerNumber || "—"}</td><td className="px-5 py-4 text-slate-600">{student.programme || "—"}</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => openAssign(student)} className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"><Plus size={14} /> Assign Project</button><button onClick={() => navigate(`/mentor/projects/${encodeURIComponent(student.studentId)}`, { state: { studentName: student.name, registerNumber: student.registerNumber } })} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"><Eye size={14} /> View Projects</button></div></td></tr>)}</tbody></table></div>
            )}
          </section>
        </main>
      </div>

      {selectedStudent && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setSelectedStudent(null); }}><section role="dialog" aria-modal="true" aria-labelledby="assign-project-title" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Assign to student</p><h2 id="assign-project-title" className="mt-1 text-xl font-bold text-slate-900">{selectedStudent.name}</h2><p className="mt-1 text-sm text-slate-500">Enter the project details below.</p></div><button disabled={saving} onClick={() => setSelectedStudent(null)} aria-label="Close dialog" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={19} /></button></div>
        <form onSubmit={submitProject} className="space-y-4"><div><label htmlFor="project-title" className="mb-1.5 block text-sm font-medium text-slate-700">Project title <span className="text-red-500">*</span></label><input id="project-title" required maxLength={180} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Smart Campus Monitoring System" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
          <div><label htmlFor="project-type" className="mb-1.5 block text-sm font-medium text-slate-700">Project type <span className="text-red-500">*</span></label><select id="project-type" required value={form.projectType} onChange={(event) => setForm({ ...form, projectType: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"><option>Academic</option><option>Research</option><option>Industry</option><option>Capstone</option><option>Personal</option><option>Other</option></select></div>
          <div><label htmlFor="project-description" className="mb-1.5 block text-sm font-medium text-slate-700">Project description <span className="font-normal text-slate-400">(optional)</span></label><textarea id="project-description" rows={4} maxLength={5000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Explain the requirements, expected deliverables, or instructions..." className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
          <div><label htmlFor="project-deadline" className="mb-1.5 block text-sm font-medium text-slate-700">Deadline <span className="font-normal text-slate-400">(optional)</span></label><div className="relative"><CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input id="project-deadline" type="date" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div></div>
          {formError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" disabled={saving} onClick={() => setSelectedStudent(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{saving && <LoaderCircle className="animate-spin" size={16} />}{saving ? "Assigning..." : "Assign project"}</button></div>
        </form></section></div>}
    </div>
  );
}
