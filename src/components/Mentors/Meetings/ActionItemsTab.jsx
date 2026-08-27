import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Square,
  CircleCheckBig,
  CheckSquare,
} from "lucide-react";

const ActionItemsTab = ({
  actionItems,
  setActionItems,
}) => {
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    setActionItems([
      ...actionItems,
      {
        task: taskInput,
        completed: false,
      },
    ]);

    setTaskInput("");
  };

  const toggleTask = (index) => {
    const updated = [...actionItems];

    updated[index].completed =
      !updated[index].completed;

    setActionItems(updated);
  };

  const deleteTask = (index) => {
    setActionItems(
      actionItems.filter((_, i) => i !== index)
    );
  };

  const completedTasks = actionItems.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="p-5">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Action Items
          </h2>

          <p className="mt-1 text-[13px] text-slate-500">
            Assign and track the tasks discussed during
            the mentorship meeting.
          </p>

        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-2 text-center">

          <p className="text-[11px] text-slate-500">
            Progress
          </p>

          <p className="text-sm font-bold text-blue-700">
            {completedTasks} / {actionItems.length}
          </p>

        </div>

      </div>

      {/* Empty State */}

      {actionItems.length === 0 ? (

        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">

          <CheckSquare
            size={42}
            className="mx-auto mb-3 text-slate-300"
          />

          <p className="text-[13px] text-slate-500">
            No action items added yet.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {actionItems.map((item, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >

              <button
                onClick={() => toggleTask(index)}
                className="flex items-center gap-3"
              >

                {item.completed ? (

                  <CircleCheckBig
                    size={18}
                    className="text-emerald-600"
                  />

                ) : (

                  <Square
                    size={18}
                    className="text-slate-400"
                  />

                )}

                <span
                  className={`text-[13px] ${
                    item.completed
                      ? "line-through text-slate-400"
                      : "text-slate-700"
                  }`}
                >
                  {item.task}
                </span>

              </button>

              <button
                onClick={() => deleteTask(index)}
                className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
              >

                <Trash2 size={15} />

              </button>

            </div>

          ))}

        </div>

      )}

      {/* Add Task */}

      <div className="mt-5 flex gap-2">

        <input
          value={taskInput}
          onChange={(e) =>
            setTaskInput(e.target.value)
          }
          placeholder="Add new task..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleAddTask}
          className="rounded-lg bg-blue-600 px-4 text-white transition hover:bg-blue-700"
        >

          <Plus size={17} />

        </button>

      </div>

    </div>
  );
};

export default ActionItemsTab;