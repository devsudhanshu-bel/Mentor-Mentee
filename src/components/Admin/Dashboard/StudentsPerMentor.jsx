import React from "react";

const StudentsPerMentor = ({ mentors = [] }) => {
  const visibleMentors = mentors.slice(0, 5);

  const maxStudents = Math.max(
    30,
    ...visibleMentors.map((mentor) => mentor.students || 0),
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[420px] p-6 flex flex-col">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-slate-800">
          Students per Mentor
        </h2>

        <button
          type="button"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          View All
        </button>
      </div>

      {/* ================= Chart ================= */}

      <div className="flex-1 flex flex-col justify-around">
        {visibleMentors.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
            No mentor workload data available.
          </div>
        ) : (
          visibleMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="grid grid-cols-[150px_1fr_38px] items-center gap-5"
            >
              <p className="text-[13px] font-medium text-slate-700 truncate">
                {mentor.name}
              </p>

              <div className="relative">
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
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

              <span className="text-sm font-bold text-slate-700 text-right">
                {mentor.students}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ================= Axis ================= */}

      <div className="mt-8 pl-[170px] pr-[18px]">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>0</span>
          <span>{Math.round(maxStudents / 3)}</span>
          <span>{Math.round((maxStudents * 2) / 3)}</span>
          <span>{maxStudents}</span>
        </div>

        <div className="mt-2 flex justify-center">
          <span className="text-[11px] font-medium text-slate-500">
            Number of Students
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentsPerMentor;
