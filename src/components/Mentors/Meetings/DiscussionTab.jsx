
import React, { useState } from "react";
import {
  MessageCircle,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  LoaderCircle,
} from "lucide-react";

const DiscussionTab = ({
  discussionPoints = [],
  setDiscussionPoints,
  onAddDiscussion,
  onUpdateDiscussion,
  onDeleteDiscussion,
  saving = false,
}) => {
  const [discussionInput, setDiscussionInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [localError, setLocalError] = useState("");

  const handleAddDiscussion = async (event) => {
    event?.preventDefault();

    const content = discussionInput.trim();

    if (!content) {
      setLocalError("Please enter a discussion point.");
      return;
    }

    setLocalError("");

    try {
      if (onAddDiscussion) {
        await onAddDiscussion(content);
      } else if (setDiscussionPoints) {
        // Backward compatibility only.
        // This fallback updates local state and does not persist to the API.
        setDiscussionPoints((previous) => [...previous, content]);
      }

      setDiscussionInput("");
    } catch {
      // The parent should display the API error.
    }
  };

  const handleStartEdit = (index, point) => {
    setEditingIndex(index);
    setEditingValue(
      typeof point === "string"
        ? point
        : point?.content ?? point?.text ?? ""
    );
    setLocalError("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingValue("");
    setLocalError("");
  };

  const handleSaveEdit = async (index) => {
    const content = editingValue.trim();

    if (!content) {
      setLocalError("Discussion points cannot be empty.");
      return;
    }

    setLocalError("");

    try {
      if (onUpdateDiscussion) {
        await onUpdateDiscussion(index, content);
      } else if (setDiscussionPoints) {
        // Backward compatibility only.
        setDiscussionPoints((previous) =>
          previous.map((point, pointIndex) =>
            pointIndex === index ? content : point
          )
        );
      }

      setEditingIndex(null);
      setEditingValue("");
    } catch {
      // Keep the editor open when the API operation fails.
    }
  };

  const handleDeleteDiscussion = async (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this discussion point?"
    );

    if (!confirmed) return;

    setLocalError("");
    setDeletingIndex(index);

    try {
      if (onDeleteDiscussion) {
        await onDeleteDiscussion(index);
      } else if (setDiscussionPoints) {
        // Backward compatibility only.
        setDiscussionPoints((previous) =>
          previous.filter((_, pointIndex) => pointIndex !== index)
        );
      }
    } catch {
      // The parent should display the API error.
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Discussion Points
        </h2>

        <p className="mt-1 text-[13px] text-slate-500">
          Record the important topics discussed during this meeting.
        </p>
      </div>

      {/* Error */}
      {localError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {localError}
        </div>
      )}

      {/* Empty State */}
      {discussionPoints.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
          <MessageCircle
            size={40}
            className="mx-auto mb-3 text-slate-300"
          />

          <p className="text-[13px] text-slate-500">
            No discussion points added yet.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Add a topic below to keep a record of the conversation.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {discussionPoints.map((point, index) => {
            const content =
              typeof point === "string"
                ? point
                : point?.content ?? point?.text ?? "";

            const isEditing = editingIndex === index;
            const isDeleting = deletingIndex === index;

            return (
              <div
                key={point?.id ?? `${content}-${index}`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={editingValue}
                      onChange={(event) =>
                        setEditingValue(event.target.value)
                      }
                      maxLength={2000}
                      rows={3}
                      autoFocus
                      disabled={saving}
                      className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-50"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                      >
                        <X size={14} />
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveEdit(index)}
                        disabled={saving || !editingValue.trim()}
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {saving ? (
                          <LoaderCircle size={14} className="animate-spin" />
                        ) : (
                          <Check size={14} />
                        )}
                        Save changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <MessageCircle
                        size={17}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <span className="whitespace-pre-wrap break-words text-[13px] text-slate-700">
                        {content}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(index, point)}
                        disabled={saving || deletingIndex !== null}
                        aria-label="Edit discussion point"
                        title="Edit discussion point"
                        className="rounded-md p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDiscussion(index)}
                        disabled={saving || deletingIndex !== null}
                        aria-label="Delete discussion point"
                        title="Delete discussion point"
                        className="rounded-md p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <LoaderCircle
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add New */}
      <form onSubmit={handleAddDiscussion} className="mt-5">
        <label
          htmlFor="discussion-point-input"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Add a discussion point
        </label>

        <div className="flex gap-2">
          <input
            id="discussion-point-input"
            value={discussionInput}
            onChange={(event) => setDiscussionInput(event.target.value)}
            placeholder="e.g. Internship progress and next steps"
            maxLength={2000}
            disabled={saving}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500 disabled:bg-slate-50"
          />

          <button
            type="submit"
            disabled={saving || !discussionInput.trim()}
            aria-label="Add discussion point"
            title="Add discussion point"
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Plus size={17} />
            )}
            <span className="hidden text-sm sm:inline">Add</span>
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Maximum 2,000 characters per discussion point.
        </p>
      </form>
    </div>
  );
};

export default DiscussionTab;
