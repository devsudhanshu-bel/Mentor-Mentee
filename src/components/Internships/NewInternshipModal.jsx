
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
    "mt-1.5 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-3.5";

  const labelClass = "text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-2 sm:p-4 md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-internship-title"
        className="my-auto flex max-h-[96dvh] w-full min-w-0 max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[92dvh]"
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-4 sm:px-6 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-xl bg-blue-50 p-2.5 text-blue-600 sm:p-3">
              <BriefcaseBusiness size={22} />
            </div>

            <div className="min-w-0">
              <h2
                id="new-internship-title"
                className="text-base font-bold text-slate-900 sm:text-lg"
              >
                New Internship
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Enter your internship details to get started.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </header>

        {/* Form */}
        <form
          onSubmit={submit}
          className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:space-y-6 sm:p-6 md:p-7"
        >
          {error && (
            <div
              role="alert"
              className="break-words rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
            >
              {error}
            </div>
          )}

          {/* Internship Type */}
          <div className="min-w-0">
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

          {/* Internship Details */}
          <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
            <div className="min-w-0">
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

            <div className="min-w-0">
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

            <div className="min-w-0">
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

            <div className="min-w-0">
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

            <div className="min-w-0">
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

            <div className="min-w-0">
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

            <div className="min-w-0">
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

            <div className="min-w-0">
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

          {/* Description */}
          <div className="min-w-0">
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
              className={`${inputClass} resize-y`}
              placeholder="Describe your responsibilities or internship work."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving && (
                <LoaderCircle size={17} className="animate-spin" />
              )}

              {saving ? "Creating..." : "Create Internship"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewInternshipModal;
