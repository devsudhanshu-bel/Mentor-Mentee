import React from "react";
import { AlertTriangle } from "lucide-react";

const students = [
  {
    id: 1,
    name: "Karan Patel",
    semester: "BCA | IV Sem",
    metric: "Attendance",
    value: "62%",
    badge: "Low Attendance",
    avatar: "https://i.pravatar.cc/100?img=12",
    badgeColor:
      "bg-red-50 text-red-600 border border-red-100",
  },
  {
    id: 2,
    name: "Meera Reddy",
    semester: "MCA | II Sem",
    metric: "CGPA",
    value: "6.45",
    badge: "Academic Concern",
    avatar: "https://i.pravatar.cc/100?img=5",
    badgeColor:
      "bg-orange-50 text-orange-600 border border-orange-100",
  },
  {
    id: 3,
    name: "Vivek Singh",
    semester: "BCA | VI Sem",
    metric: "Attendance",
    value: "65%",
    badge: "Low Attendance",
    avatar: "https://i.pravatar.cc/100?img=15",
    badgeColor:
      "bg-red-50 text-red-600 border border-red-100",
  },
  {
    id: 4,
    name: "Ananya Iyer",
    semester: "MCA | IV Sem",
    metric: "CGPA",
    value: "6.80",
    badge: "Academic Concern",
    avatar: "https://i.pravatar.cc/100?img=32",
    badgeColor:
      "bg-orange-50 text-orange-600 border border-orange-100",
  },
];

const StudentsRequiringAttention = () => {
  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex min-w-0 items-start justify-between gap-3 sm:mb-5 sm:items-center">
        <div className="flex min-w-0 items-start gap-2 sm:items-center">
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-orange-500 sm:mt-0"
          />
          <h2 className="min-w-0 break-words text-[15px] font-semibold leading-5 text-slate-800 sm:text-[16px]">
            Students Requiring Attention
          </h2>
        </div>

        <button className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Student List */}
      <div className="min-w-0 space-y-3 sm:space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex min-w-0 items-start justify-between gap-2 border-b border-slate-100 pb-3 last:border-none last:pb-0 sm:items-center sm:gap-3 sm:pb-4"
          >
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <img
                src={student.avatar}
                alt={student.name}
                className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
              />

              <div className="min-w-0">
                <h3 className="break-words text-[13px] font-semibold leading-5 text-slate-800 sm:text-[14px]">
                  {student.name}
                </h3>

                <p className="break-words text-[11px] leading-4 text-slate-500">
                  {student.semester}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 shrink-0 flex-col items-end text-right">
              <p className="text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                {student.metric}:{" "}
                <span className="font-semibold text-red-500">
                  {student.value}
                </span>
              </p>

              <span
                className={`mt-1 inline-flex max-w-full whitespace-normal rounded-full px-2 py-1 text-right text-[9px] font-medium leading-3 sm:px-2.5 sm:text-[10px] ${student.badgeColor}`}
              >
                {student.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-4 break-words text-[11px] leading-5 text-blue-600 sm:mt-5">
        Support your mentees and help them grow.
      </p>
    </div>
  );
};

export default StudentsRequiringAttention;
