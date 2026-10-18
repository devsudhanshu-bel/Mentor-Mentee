
import React, { useEffect, useState } from "react";
import {
  Pencil,
  Users,
  GraduationCap,
  Globe,
  Megaphone,
  CalendarDays,
  Send,
  CheckCircle2,
  X,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";

import api from "../../../api/axios";

const audienceOptions = [
  {
    value: "MENTORS",
    label: "Mentors only",
    description: "Send to faculty mentors.",
    icon: Users,
    iconStyle: "bg-blue-50 text-blue-600",
    selectedStyle: "border-blue-300 bg-blue-50/70",
  },
  {
    value: "STUDENTS",
    label: "Students only",
    description: "Send to all students.",
    icon: GraduationCap,
    iconStyle: "bg-emerald-50 text-emerald-600",
    selectedStyle: "border-emerald-300 bg-emerald-50/70",
  },
  {
    value: "ALL",
    label: "Everyone",
    description: "Send to mentors and students.",
    icon: Globe,
    iconStyle: "bg-purple-50 text-purple-600",
    selectedStyle: "border-purple-300 bg-purple-50/70",
  },
];

const initialForm = {
  title: "",
  audience: "ALL",
  category: "General",
  priority: "Normal",
  message: "",
  expiryDate: "",
};

const categoryMap = {
  General: "GENERAL",
  Academic: "ACADEMIC",
  "Meeting / Event": "MEETING_EVENT",
  "Urgent Notice": "URGENT_NOTICE",
};

const priorityMap = {
  Normal: "NORMAL",
  High: "HIGH",
  Urgent: "URGENT",
};

const successMessage = {
  MENTORS: {
    title: "Announcement published!",
    description: "Your announcement was published for the mentor audience.",
    recipients: "Target audience: Mentors only",
  },
  STUDENTS: {
    title: "Announcement published!",
    description: "Your announcement was published for the student audience.",
    recipients: "Target audience: Students only",
  },
  ALL: {
    title: "Announcement published!",
    description: "Your announcement was published for mentors and students.",
    recipients: "Target audience: Mentors and students",
  },
};

const CreateAnnouncement = ({
  onPublish,
  selectedAudience,
  onAudienceChange,
}) => {
  const [form, setForm] = useState(() => ({
    ...initialForm,
    audience: selectedAudience || "ALL",
  }));

  const [isPublishing, setIsPublishing] = useState(false);
  const [successAudience, setSuccessAudience] = useState(null);
  const [error, setError] = useState("");

  // Keep the form audience synchronized with the cards above.
  useEffect(() => {
    if (
      selectedAudience &&
      selectedAudience !== form.audience
    ) {
      setForm((previous) => ({
        ...previous,
        audience: selectedAudience,
      }));
    }
  }, [selectedAudience, form.audience]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (field === "audience") {
      onAudienceChange?.(value);
    }

    setError("");
  };

  const handleClear = () => {
    setForm({
      ...initialForm,
      audience: selectedAudience || "ALL",
    });

    setError("");
  };

  const handlePublish = async (event) => {
    event.preventDefault();

    if (isPublishing) return;

    setError("");
    setSuccessAudience(null);

    if (!form.title.trim() || !form.message.trim()) {
      setError("Enter an announcement title and message.");
      return;
    }

    if (
      form.expiryDate &&
      new Date(`${form.expiryDate}T23:59:59`) <= new Date()
    ) {
      setError("Please select an expiry date that has not passed.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      message: form.message.trim(),
      audience: form.audience,
      category: categoryMap[form.category],
      priority: priorityMap[form.priority],
      status: "PUBLISHED",
      expiresAt: form.expiryDate
        ? new Date(`${form.expiryDate}T23:59:59`).toISOString()
        : null,
    };

    try {
      setIsPublishing(true);

      const response = await api.post(
        "/admin/announcements",
        payload
      );

      const body = response.data;

      if (body?.success === false) {
        throw new Error(
          body.message || "Failed to publish announcement."
        );
      }

      const savedAnnouncement = body?.data;

      if (!savedAnnouncement?.id) {
        throw new Error(
          "The server response did not contain the saved announcement."
        );
      }

      // Update the published list only after the server succeeds.
      onPublish?.({
        ...savedAnnouncement,
        audience: savedAnnouncement.audience || form.audience,
        category: form.category,
        priority: form.priority,
        publishedAt:
          savedAnnouncement.publishedAt || new Date().toISOString(),
        expiryDate: form.expiryDate,
      });

      setSuccessAudience(form.audience);

      setForm({
        ...initialForm,
        audience: form.audience,
      });
    } catch (err) {
      console.error("Failed to publish announcement:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to publish announcement. Please try again."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handlePublish}
        className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        {/* Heading */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Pencil size={19} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900">
              Create New Announcement
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              Compose a message and choose its audience.
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="announcement-title"
            className="mb-1.5 block text-sm font-semibold text-slate-800"
          >
            Announcement Title
          </label>

          <input
            id="announcement-title"
            type="text"
            maxLength={150}
            value={form.title}
            onChange={(event) =>
              updateField("title", event.target.value)
            }
            placeholder="e.g. Internal Assessment Schedule"
            required
            disabled={isPublishing}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
          />
        </div>

        {/* Target audience */}
        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-semibold text-slate-800">
            Target Audience
          </legend>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {audienceOptions.map((option) => {
              const Icon = option.icon;
              const selected = form.audience === option.value;

              return (
                <label
                  key={option.value}
                  className={`flex min-w-0 cursor-pointer items-start gap-2 rounded-xl border p-2 transition ${
                    selected
                      ? option.selectedStyle
                      : "border-slate-200 hover:border-blue-200"
                  } ${
                    isPublishing
                      ? "cursor-not-allowed opacity-70"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="announcement-audience"
                    value={option.value}
                    checked={selected}
                    disabled={isPublishing}
                    onChange={() =>
                      updateField("audience", option.value)
                    }
                    className="mt-1 h-3.5 w-3.5 shrink-0 accent-blue-600"
                  />

                  <div className="min-w-0">
                    <div
                      className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg ${option.iconStyle}`}
                    >
                      <Icon size={17} />
                    </div>

                    <p className="text-xs font-semibold leading-4 text-slate-800">
                      {option.label}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                      {option.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Category */}
        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-semibold text-slate-800">
            Category
          </legend>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {Object.keys(categoryMap).map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600"
              >
                <input
                  type="radio"
                  name="announcement-category"
                  value={category}
                  checked={form.category === category}
                  disabled={isPublishing}
                  onChange={() => updateField("category", category)}
                  className="h-3.5 w-3.5 accent-blue-600"
                />

                {category}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Priority */}
        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-semibold text-slate-800">
            Priority
          </legend>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {Object.keys(priorityMap).map((priority) => (
              <label
                key={priority}
                className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600"
              >
                <input
                  type="radio"
                  name="announcement-priority"
                  value={priority}
                  checked={form.priority === priority}
                  disabled={isPublishing}
                  onChange={() => updateField("priority", priority)}
                  className="h-3.5 w-3.5 accent-blue-600"
                />

                {priority}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Message */}
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label
              htmlFor="announcement-message"
              className="text-sm font-semibold text-slate-800"
            >
              Announcement Message
            </label>

            <span className="shrink-0 text-[11px] text-slate-400">
              {form.message.length}/1000
            </span>
          </div>

          <textarea
            id="announcement-message"
            value={form.message}
            onChange={(event) =>
              updateField("message", event.target.value)
            }
            placeholder="Write the announcement details here..."
            rows={3}
            maxLength={1000}
            required
            disabled={isPublishing}
            className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm leading-5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
          />
        </div>

        {/* Expiry date */}
        <div className="mb-4">
          <label
            htmlFor="announcement-expiry"
            className="mb-1.5 block text-sm font-semibold text-slate-800"
          >
            Expiry Date{" "}
            <span className="font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <div className="relative">
            <CalendarDays
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="announcement-expiry"
              type="date"
              value={form.expiryDate}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={(event) =>
                updateField("expiryDate", event.target.value)
              }
              disabled={isPublishing}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p
            role="alert"
            className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
          >
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleClear}
            disabled={isPublishing}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RotateCcw size={15} />
            Clear
          </button>

          <button
            type="submit"
            disabled={isPublishing}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPublishing ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send size={15} />
                Publish Announcement
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success popup: only shown after successful API response */}
      {successAudience && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={() => setSuccessAudience(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-success-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close popup"
              onClick={() => setSuccessAudience(null)}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={19} />
            </button>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={32} />
            </div>

            <h2
              id="announcement-success-title"
              className="text-xl font-bold text-slate-900"
            >
              {successMessage[successAudience].title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {successMessage[successAudience].description}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-3 text-sm font-medium text-blue-700">
              <Megaphone size={17} />
              <span>{successMessage[successAudience].recipients}</span>
            </div>

            <button
              type="button"
              onClick={() => setSuccessAudience(null)}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAnnouncement;
