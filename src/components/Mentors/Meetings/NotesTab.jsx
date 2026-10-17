import React, { useState } from "react";
import {
  Save,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

const NotesTab = ({
  notes = "",
  setNotes,
  saveNotes,
  lastSaved = "Not saved",
  saving = false,
}) => {
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    if (saving || typeof saveNotes !== "function") return;

    setSaveError("");

    try {
      await saveNotes();
    } catch (error) {
      setSaveError(
        error?.message ||
          "Unable to save meeting notes. Please try again."
      );
    }
  };

  const handleNotesChange = (event) => {
    setNotes?.(event.target.value);
    setSaveError("");
  };

  const characterCount = notes.length;
  const isSaved = lastSaved === "Saved" && !saving;

  return (
    <div className="p-5">
      {/* Save Button */}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || typeof saveNotes !== "function"}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <LoaderCircle
              size={15}
              className="animate-spin"
            />
          ) : (
            <Save size={15} />
          )}

          {saving ? "Saving..." : "Save Notes"}
        </button>
      </div>

      {/* Error Message */}
      {saveError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {saveError}
        </div>
      )}

      {/* Notes Editor */}
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Write meeting notes here..."
        maxLength={50000}
        aria-label="Meeting notes"
        disabled={saving}
        className="h-[420px] w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-[13px] leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-wait disabled:bg-slate-50"
      />

      {/* Save Status and Character Count */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12px] text-slate-500">
          {saving ? (
            <LoaderCircle
              size={14}
              className="animate-spin text-blue-600"
            />
          ) : isSaved ? (
            <CheckCircle2
              size={14}
              className="text-emerald-600"
            />
          ) : null}

          <span>Last saved:</span>

          <span
            className={`font-semibold ${
              saving
                ? "text-blue-600"
                : isSaved
                  ? "text-emerald-600"
                  : "text-slate-600"
            }`}
          >
            {saving ? "Saving..." : lastSaved}
          </span>
        </div>

        <div className="text-[12px] text-slate-400">
          {characterCount.toLocaleString()} / 50,000 characters
        </div>
      </div>
    </div>
  );
};

export default NotesTab;