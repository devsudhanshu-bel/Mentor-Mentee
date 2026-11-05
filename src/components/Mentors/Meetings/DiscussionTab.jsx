
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
    <div className="min-w-0 p-3 sm:p-5">
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
          Discussion Points
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-[13px] sm:leading-normal">
          Record the important topics discussed during this meeting.
        </p>
      </div>

      {/* Error */}
      {localError && (
        <div
          role="alert"
          className="mb-4 break-words rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 sm:text-sm"
        >
          {localError}
        </div>
      )}

      {/* Empty State */}
      {discussionPoints.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-9 text-center sm:py-12">
          <MessageCircle
            size={34}
            className="mx-auto mb-3 text-slate-300 sm:h-10 sm:w-10"
          />

          <p className="text-xs text-slate-500 sm:text-[13px]">
            No discussion points added yet.
          </p>

          <p className="mt-1 text-[11px] leading-5 text-slate-400 sm:text-xs">
            Add a topic below to keep a record of the conversation.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 sm:space-y-3">
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
                className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-4"
              >
                {isEditing ? (
                  <div className="space-y-2.5 sm:space-y-3">
                    <textarea
                      value={editingValue}
                      onChange={(event) =>
                        setEditingValue(event.target.value)
                      }
                      maxLength={2000}
                      rows={3}
                      autoFocus
                      disabled={saving}
                      className="w-full min-w-0 resize-y rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-500 disabled:bg-slate-50 sm:text-[13px]"
                    />

                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2.5 py-2 text-[11px] font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 sm:px-3 sm:text-xs"
                      >
                        <X size={14} />
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveEdit(index)}
                        disabled={saving || !editingValue.trim()}
                        className="flex items-center justify-center gap-1 rounded-lg bg-blue-600 px-2.5 py-2 text-[11px] font-medium text-white hover:bg-blue-700 disabled:opacity-50 sm:px-3 sm:text-xs"
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
                  <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-2.5 sm:gap-3">
                      <MessageCircle
                        size={17}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <span className="min-w-0 whitespace-pre-wrap break-words text-xs leading-5 text-slate-700 sm:text-[13px]">
                        {content}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(index, point)}
                        disabled={saving || deletingIndex !== null}
                        aria-label="Edit discussion point"
                        title="Edit discussion point"
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 sm:p-2"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDiscussion(index)}
                        disabled={saving || deletingIndex !== null}
                        aria-label="Delete discussion point"
                        title="Delete discussion point"
                        className="rounded-md p-1.5 text-red-500 transition hover:bg-red-50 disabled:opacity-50 sm:p-2"
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
      <form onSubmit={handleAddDiscussion} className="mt-4 sm:mt-5">
        <label
          htmlFor="discussion-point-input"
          className="mb-2 block text-xs font-medium text-slate-700 sm:text-sm"
        >
          Add a discussion point
        </label>

        <div className="flex min-w-0 gap-2">
          <input
            id="discussion-point-input"
            value={discussionInput}
            onChange={(event) => setDiscussionInput(event.target.value)}
            placeholder="e.g. Internship progress and next steps"
            maxLength={2000}
            disabled={saving}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 disabled:bg-slate-50 sm:text-[13px]"
          />

          <button
            type="submit"
            disabled={saving || !discussionInput.trim()}
            aria-label="Add discussion point"
            title="Add discussion point"
            className="flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-0 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:h-auto sm:w-auto sm:px-4"
          >
            {saving ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Plus size={17} />
            )}
            <span className="hidden text-sm sm:inline">Add</span>
          </button>
        </div>

        <p className="mt-2 text-[11px] leading-5 text-slate-400 sm:text-xs">
          Maximum 2,000 characters per discussion point.
        </p>
      </form>
    </div>
  );
};

export default DiscussionTab;
