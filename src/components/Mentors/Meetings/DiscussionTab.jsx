import React, { useState } from "react";
import { MessageCircle, Plus, Trash2 } from "lucide-react";

const DiscussionTab = ({
  discussionPoints,
  setDiscussionPoints,
}) => {
  const [discussionInput, setDiscussionInput] = useState("");

  const handleAddDiscussion = () => {
    if (!discussionInput.trim()) return;

    setDiscussionPoints([
      ...discussionPoints,
      discussionInput,
    ]);

    setDiscussionInput("");
  };

  const handleDeleteDiscussion = (index) => {
    setDiscussionPoints(
      discussionPoints.filter((_, i) => i !== index)
    );
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

        </div>

      ) : (

        <div className="space-y-3">

          {discussionPoints.map((point, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >

              <div className="flex items-center gap-3">

                <MessageCircle
                  size={17}
                  className="text-blue-600"
                />

                <span className="text-[13px] text-slate-700">
                  {point}
                </span>

              </div>

              <button
                onClick={() => handleDeleteDiscussion(index)}
                className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
              >

                <Trash2 size={15} />

              </button>

            </div>

          ))}

        </div>

      )}

      {/* Add New */}

      <div className="mt-5 flex gap-2">

        <input
          value={discussionInput}
          onChange={(e) => setDiscussionInput(e.target.value)}
          placeholder="Add discussion point..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleAddDiscussion}
          className="rounded-lg bg-blue-600 px-4 text-white transition hover:bg-blue-700"
        >

          <Plus size={17} />

        </button>

      </div>

    </div>
  );
};

export default DiscussionTab;