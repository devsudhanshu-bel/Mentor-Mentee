
import React, { useState } from "react";
import {
  CalendarDays,
  Clock3,
  ClipboardList,
  Save,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

const FollowUpTab = ({
  followUp = {
    date: "",
    time: "",
    agenda: "",
  },
  setFollowUp,
  onSaveFollowUp,
  saving = false,
}) => {
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFollowUp?.((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (saving) return;

    if (!followUp.date || !followUp.time || !followUp.agenda?.trim()) {
      setError("Please provide the date, time, and agenda.");
      return;
    }

    // The parent supplies the API callback.
    if (typeof onSaveFollowUp !== "function") {
      setError("Follow-up saving is not connected yet.");
      return;
    }

    setError("");

    try {
      await onSaveFollowUp();
    } catch (requestError) {
      setError(
        requestError?.message ||
          "Unable to schedule the follow-up. Please try again."
      );
    }
  };

  // Prevent scheduling a follow-up in the past.
  const now = new Date();
  const minimumDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Follow-up Meeting
        </h2>

        <p className="mt-1 text-[13px] text-slate-500">
          Schedule the next mentorship session and define the agenda.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Date & Time */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays size={17} className="text-blue-600" />

              <label
                htmlFor="follow-up-date"
                className="font-medium text-slate-700"
              >
                Meeting Date
              </label>
            </div>

            <input
              id="follow-up-date"
              type="date"
              min={minimumDate}
              value={followUp.date || ""}
              onChange={(event) =>
                handleChange("date", event.target.value)
              }
              required
              disabled={saving}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500 disabled:bg-slate-50"
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Clock3 size={17} className="text-blue-600" />

              <label
                htmlFor="follow-up-time"
                className="font-medium text-slate-700"
              >
                Meeting Time
              </label>
            </div>

            <input
              id="follow-up-time"
              type="time"
              value={followUp.time || ""}
              onChange={(event) =>
                handleChange("time", event.target.value)
              }
              required
              disabled={saving}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500 disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* Agenda */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList size={18} className="text-blue-600" />

            <h3 className="font-semibold text-slate-700">
              Agenda
            </h3>
          </div>

          <textarea
            rows={8}
            maxLength={5000}
            value={followUp.agenda || ""}
            onChange={(event) =>
              handleChange("agenda", event.target.value)
            }
            placeholder="Topics to be discussed during the next meeting..."
            required
            disabled={saving}
            className="w-full resize-y rounded-lg border border-slate-300 p-4 text-[13px] leading-6 outline-none transition focus:border-blue-500 disabled:bg-slate-50"
          />

          <div className="mt-2 text-right text-xs text-slate-400">
            {(followUp.agenda || "").length}/5,000 characters
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="mt-5 flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Choose a future date and a suitable time for your next session.
            </p>

            <button
              type="submit"
              disabled={saving}
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}

              {saving ? "Saving..." : "Save Follow-up"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FollowUpTab;
