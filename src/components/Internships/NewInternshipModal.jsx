
import React, { useState } from "react";
import { X, BriefcaseBusiness, LoaderCircle } from "lucide-react";
import internshipService from "../../services/internshipService";

const initialForm = {
  internshipType: "ONGOING",
  companyName: "",
  internshipTitle: "",
  role: "",
  startDate: "",
  endDate: "",
  location: "",
  mode: "ONSITE",
  projectName: "",
  description: "",
};

const NewInternshipModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isAlreadyCompleted = form.internshipType === "ALREADY_COMPLETED";

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.endDate && form.endDate < form.startDate) {
      setError("The end date cannot be before the start date.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,
        endDate: form.endDate || null,
        role: form.role.trim() || null,
        location: form.location.trim() || null,
        mode: form.mode || null,
        projectName: form.projectName.trim() || null,
        description: form.description.trim() || null,
      };

      await internshipService.create(payload);
      await onCreated?.();
    } catch (err) {
      setError(err.message || "Could not create the internship.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-internship-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <BriefcaseBusiness size={22} />
            </div>
            <div>
              <h2
                id="new-internship-title"
                className="text-lg font-bold text-slate-900"
              >
                New Internship
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter your internship details to get started.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={submit} className="space-y-6 p-5 sm:p-7">
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="internshipType">
              Internship Type *
            </label>
            <select
              id="internshipType"
              name="internshipType"
              value={form.internshipType}
              onChange={update}
              className={inputClass}
              required
            >
              <option value="ONGOING">Ongoing Internship</option>
              <option value="ALREADY_COMPLETED">
                Already Completed Internship
              </option>
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {isAlreadyCompleted
                ? "You will need to provide the offer letter and all completion documents."
                : "Start with your offer letter. Completion documents can be submitted later."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="companyName">
                Company Name *
              </label>
              <input
                id="companyName"
                name="companyName"
                value={form.companyName}
                onChange={update}
                className={inputClass}
                placeholder="e.g. Acme Technologies"
                maxLength={150}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="internshipTitle">
                Internship Title *
              </label>
              <input
                id="internshipTitle"
                name="internshipTitle"
                value={form.internshipTitle}
                onChange={update}
                className={inputClass}
                placeholder="e.g. Software Engineering Intern"
                maxLength={150}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="role">
                Role
              </label>
              <input
                id="role"
                name="role"
                value={form.role}
                onChange={update}
                className={inputClass}
                placeholder="e.g. Frontend Developer"
                maxLength={150}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="projectName">
                Project Name
              </label>
              <input
                id="projectName"
                name="projectName"
                value={form.projectName}
                onChange={update}
                className={inputClass}
                placeholder="Optional"
                maxLength={200}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="startDate">
                Start Date *
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={update}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="endDate">
                End Date {isAlreadyCompleted ? "*" : ""}
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={update}
                min={form.startDate || undefined}
                className={inputClass}
                required={isAlreadyCompleted}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={update}
                className={inputClass}
                placeholder="e.g. Bengaluru or Remote"
                maxLength={200}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="mode">
                Work Mode
              </label>
              <select
                id="mode"
                name="mode"
                value={form.mode}
                onChange={update}
                className={inputClass}
              >
                <option value="ONSITE">On-site</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={update}
              rows={4}
              maxLength={3000}
              className={inputClass}
              placeholder="Describe your responsibilities or internship work."
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <LoaderCircle size={17} className="animate-spin" />}
              {saving ? "Creating..." : "Create Internship"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewInternshipModal;
