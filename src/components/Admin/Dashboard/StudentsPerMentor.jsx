import React from "react";

const StudentsPerMentor = ({ mentors = [] }) => {
  const visibleMentors = mentors.slice(0, 5);

  const maxStudents = Math.max(
    30,
    ...visibleMentors.map((mentor) => mentor.students || 0),
  );

  return (
    <div className="flex h-[420px] min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-6">
      {/* ================= Header ================= */}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 sm:mb-8">
        <h2 className="text-[16px] font-semibold text-slate-800 sm:text-lg">
          Students per Mentor
        </h2>

        <button
          type="button"
          className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* ================= Chart ================= */}

      <div className="flex flex-1 min-w-0 flex-col justify-around">
        {visibleMentors.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-center text-sm text-slate-400">
            No mentor workload data available.
          </div>
        ) : (
          visibleMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,2fr)_32px] items-center gap-2 sm:grid-cols-[150px_minmax(0,1fr)_38px] sm:gap-5"
            >
              <p className="truncate text-[11px] font-medium text-slate-700 sm:text-[13px]">
                {mentor.name}
              </p>

              <div className="relative min-w-0">
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (mentor.students / maxStudents) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <span className="text-right text-xs font-bold text-slate-700 sm:text-sm">
                {mentor.students}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ================= Axis ================= */}

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_32px] gap-2 sm:mt-8 sm:grid-cols-[150px_minmax(0,1fr)_38px] sm:gap-5">
        <div className="col-start-2 min-w-0">
          <div className="flex justify-between text-[10px] text-slate-400 sm:text-[11px]">
            <span>0</span>
            <span>{Math.round(maxStudents / 3)}</span>
            <span>{Math.round((maxStudents * 2) / 3)}</span>
            <span>{maxStudents}</span>
          </div>

          <div className="mt-2 flex justify-center">
            <span className="text-center text-[10px] font-medium text-slate-500 sm:text-[11px]">
              Number of Students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPerMentor;
