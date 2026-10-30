import React, { useEffect, useMemo, useState } from "react";
import { Loader2, UserPlus, X } from "lucide-react";
import { createMentor } from "../../../api/mentor.api";

const initialForm = {
  fullName: "",
  employeeCode: "",
  email: "",
  username: "",
  password: "",
  departmentId: "",
  phone: "",
  designation: "",
  maxMentees: "30",
  isActive: true,
};

const inputClass = "mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "block text-xs font-semibold text-slate-600";

export default function AddMentorModal({ open, departments = [], onClose, onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sortedDepartments = useMemo(
    () => [...departments].sort((a, b) => String(a.name).localeCompare(String(b.name))),
    [departments],
  );

  useEffect(() => {
    if (open) {
      setForm({ ...initialForm, departmentId: sortedDepartments[0]?.id || "" });
      setError("");
      setSubmitting(false);
    }
  }, [open, sortedDepartments]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => { if (event.key === "Escape" && !submitting) onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, submitting, onClose]);

  if (!open) return null;

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleEmailChange = (value) => {
    update("email", value);
    // Suggest a username only while the user has not manually changed it.
    setForm((current) => ({
      ...current,
      email: value,
      username: current.usernameTouched ? current.username : (value.split("@")[0] || "").toLowerCase().replace(/[^a-z0-9._-]/g, ""),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.fullName.trim() || !form.employeeCode.trim() || !form.email.trim() || !form.username.trim() || !form.password || !form.departmentId) {
      setError("Complete all required fields, including department and temporary password.");
      return;
    }
    if (form.password.length < 8) {
      setError("Temporary password must contain at least 8 characters.");
      return;
    }
    const capacity = Number(form.maxMentees);
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 500) {
      setError("Maximum mentees must be a whole number between 1 and 500.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createMentor({
        fullName: form.fullName.trim(),
        employeeCode: form.employeeCode.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        password: form.password,
        departmentId: form.departmentId,
        phone: form.phone.trim() || null,
        designation: form.designation.trim() || null,
        maxMentees: capacity,
        isActive: form.isActive,
      });
      await onCreated?.(result?.mentor || result);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "Unable to create mentor. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="add-mentor-title" className="my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600"><UserPlus size={21} /></div>
            <div>
              <h2 id="add-mentor-title" className="text-xl font-bold text-slate-900">Add Mentor</h2>
              <p className="mt-1 text-sm text-slate-500">Create the login account and linked mentor record.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} disabled={submitting} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-5">
          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-800">Required details</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>Full name <span className="text-red-500">*</span><input className={inputClass} autoFocus value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Dr. Ananya Rao" required maxLength={120} /></label>
              <label className={labelClass}>Employee code <span className="text-red-500">*</span><input className={inputClass} value={form.employeeCode} onChange={(e) => update("employeeCode", e.target.value.toUpperCase().replace(/\s/g, ""))} placeholder="e.g. FAC2026001" required maxLength={40} /></label>
              <label className={labelClass}>Institutional email <span className="text-red-500">*</span><input type="email" className={inputClass} value={form.email} onChange={(e) => handleEmailChange(e.target.value)} placeholder="mentor@christuniversity.in" required maxLength={254} /></label>
              <label className={labelClass}>Login username <span className="text-red-500">*</span><input className={inputClass} value={form.username} onChange={(e) => setForm((current) => ({ ...current, usernameTouched: true, username: e.target.value.toLowerCase().replace(/\s/g, "") }))} placeholder="e.g. ananya.rao" required minLength={3} maxLength={60} autoComplete="off" /><span className="mt-1 block font-normal text-slate-400">Used to sign in; email may also be used.</span></label>
              <label className={labelClass}>Temporary password <span className="text-red-500">*</span><input type="password" className={inputClass} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 8 characters" required minLength={8} autoComplete="new-password" /></label>
              <label className={labelClass}>Department <span className="text-red-500">*</span><select className={inputClass} value={form.departmentId} onChange={(e) => update("departmentId", e.target.value)} required><option value="">Select department</option>{sortedDepartments.map((department) => <option key={department.id} value={department.id}>{department.name}{department.code ? ` (${department.code})` : ""}</option>)}</select>{sortedDepartments.length === 0 && <span className="mt-1 block font-normal text-amber-600">No departments returned by the server. Create a department first.</span>}</label>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-800">Professional and workload details <span className="font-normal text-slate-400">(optional)</span></h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>Phone number<input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Contact number" maxLength={30} /></label>
              <label className={labelClass}>Designation<input className={inputClass} value={form.designation} onChange={(e) => update("designation", e.target.value)} placeholder="e.g. Assistant Professor" maxLength={100} /></label>
              <label className={labelClass}>Maximum mentees<input type="number" min="1" max="500" step="1" className={inputClass} value={form.maxMentees} onChange={(e) => update("maxMentees", e.target.value)} required /></label>
              <label className="flex items-center gap-3 self-end rounded-xl border border-slate-200 p-3 text-sm text-slate-700"><input type="checkbox" checked={form.isActive} onChange={(e) => update("isActive", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /><span><span className="block font-semibold">Active mentor</span><span className="text-xs text-slate-500">Allow this mentor to sign in.</span></span></label>
            </div>
          </div>

          {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} disabled={submitting} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={submitting || sortedDepartments.length === 0} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : <><UserPlus size={16} /> Create Mentor</>}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
