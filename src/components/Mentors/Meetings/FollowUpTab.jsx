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
    <div className="min-w-0 p-3 sm:p-5">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
          Follow-up Meeting
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-[13px] sm:leading-normal">
          Schedule the next mentorship session and define the agenda.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Date & Time */}
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays size={17} className="shrink-0 text-blue-600" />

              <label
                htmlFor="follow-up-date"
                className="text-sm font-medium text-slate-700 sm:text-base"
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
              className="w-full min-w-0 rounded-lg border border-slate-300 px-2.5 py-2.5 text-xs outline-none transition focus:border-blue-500 disabled:bg-slate-50 sm:px-3 sm:text-[13px]"
            />
          </div>

          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <Clock3 size={17} className="shrink-0 text-blue-600" />

              <label
                htmlFor="follow-up-time"
                className="text-sm font-medium text-slate-700 sm:text-base"
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
              className="w-full min-w-0 rounded-lg border border-slate-300 px-2.5 py-2.5 text-xs outline-none transition focus:border-blue-500 disabled:bg-slate-50 sm:px-3 sm:text-[13px]"
            />
          </div>
        </div>

        {/* Agenda */}
        <div className="mt-4 min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mt-6 sm:p-5">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <ClipboardList size={18} className="shrink-0 text-blue-600" />

            <h3 className="text-sm font-semibold text-slate-700 sm:text-base">
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
            className="w-full min-w-0 resize-y rounded-lg border border-slate-300 p-3 text-xs leading-6 outline-none transition focus:border-blue-500 disabled:bg-slate-50 sm:p-4 sm:text-[13px]"
          />

          <div className="mt-2 break-words text-right text-[11px] text-slate-400 sm:text-xs">
            {(followUp.agenda || "").length}/5,000 characters
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 break-words rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 sm:text-sm"
            >
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-col-reverse justify-between gap-3 sm:mt-5 sm:flex-row sm:items-center">
            <p className="text-[11px] leading-5 text-slate-500 sm:text-xs">
              Choose a future date and a suitable time for your next session.
            </p>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-[13px]"
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
