import React from "react";
import { GitBranch, TrendingUp } from "lucide-react";

import TimelineItem from "./TimelineItem";

const timeline = [
  {
    id: 1,
    title: "Research Topic Approved",
    date: "10 Jan 2025",
    description:
      "Mentor approved the proposed research topic.",
    completed: true,
  },
  {
    id: 2,
    title: "Literature Review Completed",
    date: "24 Jan 2025",
    description:
      "Completed survey of existing journals and publications.",
    completed: true,
  },
  {
    id: 3,
    title: "Proposal Submitted",
    date: "08 Feb 2025",
    description:
      "Research proposal submitted for departmental review.",
    completed: true,
  },
  {
    id: 4,
    title: "Paper Under Review",
    date: "15 Mar 2025",
    description:
      "Paper submitted to an international journal.",
    completed: false,
    current: true,
  },
  {
    id: 5,
    title: "Publication",
    date: "Pending",
    description:
      "Awaiting final publication decision.",
    completed: false,
  },
];

const ResearchTimeline = () => {
  const completedSteps = timeline.filter(
    (step) => step.completed
  ).length;

  const progress = Math.round(
    (completedSteps / timeline.length) * 100
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-[16px] font-semibold text-slate-800">
            Research Timeline
          </h2>

          <p className="mt-1 text-[12px] text-slate-500">
            Progress of the student's research journey.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <GitBranch
            size={22}
            className="text-blue-600"
          />
        </div>
      </div>

      {/* ================= Progress ================= */}

      <div className="border-b border-slate-100 p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={15}
              className="text-green-600"
            />

            <span className="text-[12px] font-medium text-slate-700">
              Overall Progress
            </span>
          </div>

          <span className="text-[12px] font-bold text-blue-600">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* ================= Timeline ================= */}

      <div className="p-5">
        {timeline.map((item, index) => (
          <TimelineItem
            key={item.id}
            title={item.title}
            date={item.date}
            description={item.description}
            completed={item.completed}
            current={item.current}
            isLast={index === timeline.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ResearchTimeline;