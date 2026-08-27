import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckSquare,
  Clock3,
  FileText,
  Flag,
  Link,
  List,
  MapPin,
  MessageCircle,
  Paperclip,
  Save,
  Star,
  User,
  Video,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  ListOrdered,
  CircleCheckBig,
  Square,
  Plus,
  Trash2,
  X,
} from "lucide-react";

const sidebarItems = [
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
  },
  {
    id: "discussion",
    label: "Discussion",
    icon: MessageCircle,
  },
  {
    id: "actions",
    label: "Action Items",
    icon: CheckSquare,
  },
  {
    id: "resources",
    label: "Resources",
    icon: BookOpen,
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: Star,
  },
  {
    id: "followup",
    label: "Follow-up",
    icon: CalendarDays,
  },
];

const MeetingWorkspace = () => {
  const [activeTab, setActiveTab] =
    useState("notes");

  const [seconds, setSeconds] =
    useState(0);

  const [notes, setNotes] =
    useState(`Discussed mid semester performance.

Sudhanshu has shown good progress in AI and ML subjects.

Needs improvement in DSA problem solving consistency.

Reviewed assignment 2 and project idea.

Encouraged to participate in upcoming hackathon.`);

  const [savedTime, setSavedTime] =
    useState("11:15 AM");

  const [discussionPoints, setDiscussionPoints] =
    useState([
      "Discussed Semester Performance",
      "Reviewed AI Mini Project",
      "Career Guidance for Placements",
    ]);

  const [newDiscussion, setNewDiscussion] =
    useState("");

  const [actionItems, setActionItems] =
    useState([
      {
        task: "Complete Resume",
        completed: false,
      },
      {
        task: "Finish Assignment 3",
        completed: true,
      },
      {
        task: "Practice Graph Algorithms",
        completed: false,
      },
    ]);

  const [newTask, setNewTask] =
    useState("");

  const [resources, setResources] =
    useState([
      "Operating Systems Notes.pdf",
      "Interview Preparation Sheet",
      "LeetCode Roadmap",
    ]);

  const [resourceName, setResourceName] =
    useState("");

  const [rating, setRating] =
    useState(4);

  const [feedback, setFeedback] =
    useState(
      "Student is sincere and actively participates in discussions. Needs to improve consistency in coding practice."
    );

  const [followUp, setFollowUp] =
    useState({
      date: "2026-07-25",
      time: "11:00",
      agenda: "Review Placement Preparation",
    });

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const duration = useMemo(() => {
    const hrs = String(
      Math.floor(seconds / 3600)
    ).padStart(2, "0");

    const mins = String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0");

    const secs = String(
      seconds % 60
    ).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  }, [seconds]);

  const saveNotes = () => {
    const now = new Date();

    setSavedTime(
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };
    return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= Header ================= */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50">
                <ArrowLeft size={18} />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-slate-800">
                    Progress Review Meeting
                  </h1>

                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                    Ongoing
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-5 text-sm text-slate-500">
                  <span>
                    Started at 11:02 AM
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={14} />
                    Duration :
                    <span className="font-semibold text-slate-700">
                      {duration}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <button className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">
            <X size={16} />
            End Meeting
          </button>
        </div>
      </div>

      {/* ================= Main ================= */}
      <div className="grid grid-cols-[230px_1fr_330px] gap-5 p-6">

        {/* ================= Sidebar ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveTab(item.id)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={17} />

                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= Center ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                      {/* ================= Content ================= */}

          {/* ================= NOTES ================= */}
          {activeTab === "notes" && (
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">
                Meeting Notes
              </h2>

              {/* Toolbar */}
              <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <button className="rounded p-2 hover:bg-white">
                  <Bold size={16} />
                </button>

                <button className="rounded p-2 hover:bg-white">
                  <Italic size={16} />
                </button>

                <button className="rounded p-2 hover:bg-white">
                  <Underline size={16} />
                </button>

                <div className="h-5 w-px bg-slate-300" />

                <button className="rounded p-2 hover:bg-white">
                  <List size={16} />
                </button>

                <button className="rounded p-2 hover:bg-white">
                  <ListOrdered size={16} />
                </button>

                <button className="rounded p-2 hover:bg-white">
                  <AlignLeft size={16} />
                </button>

                <div className="h-5 w-px bg-slate-300" />

                <button className="rounded p-2 hover:bg-white">
                  <Link size={16} />
                </button>

                <button className="rounded p-2 hover:bg-white">
                  <Paperclip size={16} />
                </button>
              </div>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                className="h-[420px] w-full resize-none rounded-xl border border-slate-200 p-4 text-[15px] leading-7 outline-none focus:border-blue-500"
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-emerald-600">
                  Saved at {savedTime}
                </span>

                <button
                  onClick={saveNotes}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                >
                  <Save size={16} />
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {/* ================= DISCUSSION ================= */}
          {activeTab === "discussion" && (
            <div className="p-6">
              <h2 className="mb-5 text-lg font-semibold">
                Discussion Points
              </h2>

              <div className="space-y-3">
                {discussionPoints.map(
                  (point, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      {point}
                    </div>
                  )
                )}
              </div>

              <div className="mt-5 flex gap-3">
                <input
                  value={newDiscussion}
                  onChange={(e) =>
                    setNewDiscussion(
                      e.target.value
                    )
                  }
                  placeholder="Add discussion point..."
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <button
                  onClick={() => {
                    if (
                      newDiscussion.trim()
                    ) {
                      setDiscussionPoints([
                        ...discussionPoints,
                        newDiscussion,
                      ]);

                      setNewDiscussion("");
                    }
                  }}
                  className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ================= ACTION ITEMS ================= */}
          {activeTab === "actions" && (
            <div className="p-6">
              <h2 className="mb-5 text-lg font-semibold">
                Action Items
              </h2>

              <div className="space-y-3">
                {actionItems.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                    >
                      <button
                        onClick={() => {
                          const updated = [
                            ...actionItems,
                          ];

                          updated[
                            index
                          ].completed =
                            !updated[index]
                              .completed;

                          setActionItems(
                            updated
                          );
                        }}
                        className="flex items-center gap-3"
                      >
                        {item.completed ? (
                          <CircleCheckBig
                            className="text-emerald-600"
                            size={20}
                          />
                        ) : (
                          <Square
                            className="text-slate-400"
                            size={20}
                          />
                        )}

                        <span
                          className={
                            item.completed
                              ? "line-through text-slate-400"
                              : ""
                          }
                        >
                          {item.task}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          setActionItems(
                            actionItems.filter(
                              (_, i) =>
                                i !== index
                            )
                          )
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )
                )}

                <div className="mt-5 flex gap-3">
                  <input
                    value={newTask}
                    onChange={(e) =>
                      setNewTask(
                        e.target.value
                      )
                    }
                    placeholder="New Action Item"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none"
                  />

                  <button
                    onClick={() => {
                      if (newTask.trim()) {
                        setActionItems([
                          ...actionItems,
                          {
                            task: newTask,
                            completed: false,
                          },
                        ]);

                        setNewTask("");
                      }
                    }}
                    className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
                    {/* ================= RESOURCES ================= */}
          {activeTab === "resources" && (
            <div className="p-6">
              <h2 className="mb-5 text-lg font-semibold text-slate-800">
                Learning Resources
              </h2>

              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-300"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen
                        size={18}
                        className="text-blue-600"
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {resource}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setResources(
                          resources.filter(
                            (_, i) => i !== index
                          )
                        )
                      }
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <input
                  value={resourceName}
                  onChange={(e) =>
                    setResourceName(e.target.value)
                  }
                  placeholder="Add resource name..."
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <button
                  onClick={() => {
                    if (!resourceName.trim()) return;

                    setResources([
                      ...resources,
                      resourceName,
                    ]);

                    setResourceName("");
                  }}
                  className="rounded-xl bg-blue-600 px-5 text-white transition hover:bg-blue-700"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ================= FEEDBACK ================= */}
          {activeTab === "feedback" && (
            <div className="p-6">
              <h2 className="mb-5 text-lg font-semibold text-slate-800">
                Mentor Feedback
              </h2>

              <p className="mb-4 text-sm text-slate-500">
                Rate the overall meeting.
              </p>

              <div className="mb-6 flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                  >
                    <Star
                      size={28}
                      fill={
                        value <= rating
                          ? "#FACC15"
                          : "none"
                      }
                      className={
                        value <= rating
                          ? "text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={feedback}
                onChange={(e) =>
                  setFeedback(e.target.value)
                }
                className="h-72 w-full resize-none rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* ================= FOLLOW UP ================= */}
          {activeTab === "followup" && (
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-slate-800">
                Schedule Follow-up
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Next Meeting Date
                  </label>

                  <input
                    type="date"
                    value={followUp.date}
                    onChange={(e) =>
                      setFollowUp({
                        ...followUp,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Time
                  </label>

                  <input
                    type="time"
                    value={followUp.time}
                    onChange={(e) =>
                      setFollowUp({
                        ...followUp,
                        time: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Agenda
                  </label>

                  <textarea
                    rows={5}
                    value={followUp.agenda}
                    onChange={(e) =>
                      setFollowUp({
                        ...followUp,
                        agenda: e.target.value,
                      })
                    }
                    className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
                  />
                </div>

                <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
                  Save Follow-up
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-slate-800">
            Meeting Details
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <User className="mt-1 text-blue-600" size={18} />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Student
                </p>
                <p className="font-medium text-slate-800">
                  Sudhanshu Sharma
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Video className="mt-1 text-blue-600" size={18} />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Meeting Mode
                </p>
                <p className="font-medium text-slate-800">
                  Google Meet
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-blue-600" size={18} />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Venue
                </p>
                <p className="font-medium text-slate-800">
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3 className="mt-1 text-blue-600" size={18} />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Duration
                </p>
                <p className="font-semibold text-blue-600">
                  {duration}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Current Status
              </p>

              <p className="mt-2 text-sm text-blue-800">
                Meeting is currently active. All notes and changes
                are stored locally and can be saved before ending
                the session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingWorkspace;