
import React, { useEffect, useState } from "react";
import { UserRound, Pencil, Save, X } from "lucide-react";

const AboutMe = ({
  about = "",
  profileExists = true,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(about ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDescription(about ?? "");
  }, [about]);

  const handleCancel = () => {
    setDescription(about ?? "");
    setError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    const trimmedDescription = description.trim();

    setError("");

    if (!trimmedDescription) {
      setError("Please enter your About Me description.");
      return;
    }

    if (trimmedDescription.length > 2000) {
      setError("Description cannot exceed 2000 characters.");
      return;
    }

    /*
     * A new profile must be created through Personal Information first.
     * Do not send an incomplete profile creation payload from this section.
     */
    if (!profileExists) {
      setError(
        "Please fill in and save Personal Information first, then save About Me."
      );
      return;
    }

    if (typeof onSave !== "function") {
      setError("Profile save handler is not configured.");
      return;
    }

    try {
      setSaving(true);

      // Update only the About Me field.
      const result = await onSave({
        about: trimmedDescription,
      });

      if (result?.profileExists === false) {
        setError(
          "Please fill in and save Personal Information first, then save About Me."
        );
        return;
      }

      setDescription(trimmedDescription);
      setIsEditing(false);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save your About Me section."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-[194px]">
      {/* ================= Header ================= */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <UserRound size={18} className="text-blue-600" />

          <h2 className="text-[18px] font-semibold text-slate-900">
            About Me
          </h2>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => {
              setDescription(about ?? "");
              setError("");
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={14} />
            Edit
          </button>
        )}
      </div>

      {/* ================= Content ================= */}
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Tell us about yourself, your experience, and your interests..."
            rows={5}
            maxLength={2000}
            disabled={saving}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-[13px] leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          />

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              {description.length}/2000 characters
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <X size={14} />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-[12px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-[12px] text-red-600">
              {error}
            </p>
          )}
        </div>
      ) : (
        <p className="whitespace-pre-wrap break-words text-[13px] leading-6 text-slate-600">
          {about?.trim() ||
            "No description added yet. Click Edit to tell us about yourself."}
        </p>
      )}
    </div>
  );
};

export default AboutMe;
