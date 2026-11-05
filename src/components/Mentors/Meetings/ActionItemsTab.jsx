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
    <div className="min-w-0 p-3 sm:p-5">

      {/* Header */}

      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">

          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
            Action Items
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-[13px] sm:leading-normal">
            Assign and track the tasks discussed during
            the mentorship meeting.
          </p>

        </div>

        <div className="flex w-fit shrink-0 items-center gap-3 rounded-lg bg-blue-50 px-4 py-2 text-center sm:block">

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

        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-9 text-center sm:py-12">

          <CheckSquare
            size={36}
            className="mx-auto mb-3 text-slate-300 sm:h-[42px] sm:w-[42px]"
          />

          <p className="text-xs text-slate-500 sm:text-[13px]">
            No action items added yet.
          </p>

        </div>

      ) : (

        <div className="space-y-2.5 sm:space-y-3">

          {actionItems.map((item, index) => (

            <div
              key={index}
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:gap-3 sm:px-4"
            >

              <button
                type="button"
                onClick={() => toggleTask(index)}
                className="flex min-w-0 flex-1 items-center gap-2.5 text-left sm:gap-3"
              >

                {item.completed ? (

                  <CircleCheckBig
                    size={18}
                    className="shrink-0 text-emerald-600"
                  />

                ) : (

                  <Square
                    size={18}
                    className="shrink-0 text-slate-400"
                  />

                )}

                <span
                  className={`break-words text-xs sm:text-[13px] ${
                    item.completed
                      ? "line-through text-slate-400"
                      : "text-slate-700"
                  }`}
                >
                  {item.task}
                </span>

              </button>

              <button
                type="button"
                aria-label={`Delete action item ${index + 1}`}
                onClick={() => deleteTask(index)}
                className="shrink-0 rounded-md p-2 text-red-500 transition hover:bg-red-50"
              >

                <Trash2 size={15} />

              </button>

            </div>

          ))}

        </div>

      )}

      {/* Add Task */}

      <div className="mt-4 flex min-w-0 gap-2 sm:mt-5">

        <input
          value={taskInput}
          onChange={(e) =>
            setTaskInput(e.target.value)
          }
          placeholder="Add new task..."
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 sm:text-[13px]"
        />

        <button
          type="button"
          onClick={handleAddTask}
          aria-label="Add action item"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 sm:w-12"
        >

          <Plus size={17} />

        </button>

      </div>

    </div>
  );
};

export default ActionItemsTab;
