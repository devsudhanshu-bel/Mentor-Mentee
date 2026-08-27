import React from "react";
import { FileText } from "lucide-react";

const subjects = [
  {
    code: "AI3501",
    name: "Machine Learning",
    held: 42,
    attended: 40,
    attendance: 95,
  },
  {
    code: "AI3502",
    name: "Deep Learning",
    held: 40,
    attended: 37,
    attendance: 93,
  },
  {
    code: "AI3503",
    name: "Computer Vision",
    held: 40,
    attended: 36,
    attendance: 90,
  },
  {
    code: "CS3504",
    name: "Database Management Systems",
    held: 42,
    attended: 40,
    attendance: 95,
  },
  {
    code: "CS3505",
    name: "Operating Systems",
    held: 40,
    attended: 35,
    attendance: 88,
  },
  {
    code: "MA3501",
    name: "Optimization Techniques",
    held: 36,
    attended: 33,
    attendance: 92,
  },
  {
    code: "HS3501",
    name: "Professional Ethics",
    held: 34,
    attended: 32,
    attendance: 94,
  },
  {
    code: "ME3502",
    name: "Engineering Economics",
    held: 38,
    attended: 36,
    attendance: 95,
  },
];

const getBadge = (attendance) => {
  if (attendance >= 95)
    return "bg-green-100 text-green-700";

  if (attendance >= 90)
    return "bg-emerald-100 text-emerald-700";

  return "bg-orange-100 text-orange-600";
};

const SubjectAttendanceTable = () => {
  return (
    <div className="h-[450px] rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
      {/* ================= Header ================= */}

      <div className="px-5 pt-5 pb-3">
        <h2 className="text-[13px] font-semibold text-blue-600">
          Subject-wise Attendance
        </h2>
      </div>

      {/* ================= Table ================= */}

      <div className="flex-1 px-5 overflow-hidden">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-[11px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="w-8 py-2.5 font-medium text-center">#</th>

                <th className="px-3 py-2.5 text-left font-medium">
                  Subject Code
                </th>

                <th className="px-3 py-2.5 text-left font-medium">
                  Subject Name
                </th>

                <th className="px-3 py-2.5 text-center font-medium">
                  Classes Held
                </th>

                <th className="px-3 py-2.5 text-center font-medium">
                  Classes Attended
                </th>

                <th className="px-3 py-2.5 text-center font-medium">
                  Attendance
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject, index) => (
                <tr
                  key={subject.code}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="py-2 text-center text-slate-500">
                    {index + 1}
                  </td>

                  <td className="px-3 text-slate-700">
                    {subject.code}
                  </td>

                  <td className="px-3 text-slate-600">
                    {subject.name}
                  </td>

                  <td className="text-center text-slate-600">
                    {subject.held}
                  </td>

                  <td className="text-center text-slate-600">
                    {subject.attended}
                  </td>

                  <td className="text-center">
                    <span
                      className={`inline-flex min-w-[58px] justify-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getBadge(
                        subject.attendance
                      )}`}
                    >
                      {subject.attendance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex justify-center px-5 py-4">
        <button className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-[11px] font-medium text-blue-600 transition-all duration-200 hover:bg-blue-50">
          <FileText size={13} />

          View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default SubjectAttendanceTable;