import React from "react";

const mentors = [
  {
    name: "Dr. Arjun Mehta",
    students: 24,
  },
  {
    name: "Dr. Neha Sharma",
    students: 22,
  },
  {
    name: "Prof. Vivek Singh",
    students: 21,
  },
  {
    name: "Dr. Meera Reddy",
    students: 20,
  },
  {
    name: "Dr. Karan Patel",
    students: 19,
  },
];

const maxStudents = 30;

const StudentsPerMentor = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[420px] p-6 flex flex-col">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-slate-800">
          Students per Mentor
        </h2>

        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
          View All
        </button>
      </div>

      {/* ================= Chart ================= */}

      <div className="flex-1 flex flex-col justify-around">
        {mentors.map((mentor) => (
          <div
            key={mentor.name}
            className="grid grid-cols-[150px_1fr_38px] items-center gap-5"
          >
            {/* Mentor Name */}

            <p className="text-[13px] font-medium text-slate-700 truncate">
              {mentor.name}
            </p>

            {/* Progress */}

            <div className="relative">
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${(mentor.students / maxStudents) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Value */}

            <span className="text-sm font-bold text-slate-700 text-right">
              {mentor.students}
            </span>
          </div>
        ))}
      </div>

      {/* ================= Axis ================= */}

      <div className="mt-8 pl-[170px] pr-[18px]">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
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