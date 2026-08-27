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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle
            size={18}
            className="text-orange-500"
          />
          <h2 className="text-[16px] font-semibold text-slate-800">
            Students Requiring Attention
          </h2>
        </div>

        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Student List */}
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-none last:pb-0"
          >
            <div className="flex items-center gap-3">
              <img
                src={student.avatar}
                alt={student.name}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div>
                <h3 className="text-[14px] font-semibold text-slate-800">
                  {student.name}
                </h3>

                <p className="text-[11px] text-slate-500">
                  {student.semester}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-slate-500">
                {student.metric}:{" "}
                <span className="font-semibold text-red-500">
                  {student.value}
                </span>
              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${student.badgeColor}`}
              >
                {student.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-5 text-[11px] text-blue-600">
        Support your mentees and help them grow.
      </p>
    </div>
  );
};

export default StudentsRequiringAttention;