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

const badgeColor = (value) => {
  if (value >= 95) return "bg-green-100 text-green-700";
  if (value >= 90) return "bg-emerald-100 text-emerald-700";
  return "bg-orange-100 text-orange-700";
};

const SubjectAttendance = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3.5">
      {/* Heading */}
      <h3 className="text-[14px] font-semibold text-blue-600 mb-3">
        Subject-wise Attendance
      </h3>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-[11px] text-slate-600">
              <th className="py-2 px-2 text-center w-8">#</th>
              <th className="py-2 px-3 text-left">Subject Code</th>
              <th className="py-2 px-3 text-left">Subject Name</th>
              <th className="py-2 px-3 text-center">Classes Held</th>
              <th className="py-2 px-3 text-center">Classes Attended</th>
              <th className="py-2 px-3 text-center">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject, index) => (
              <tr
                key={subject.code}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="py-2 text-center text-[11px] text-slate-500">
                  {index + 1}
                </td>

                <td className="px-3 text-[11px] font-medium text-[#142970]">
                  {subject.code}
                </td>

                <td className="px-3 text-[11px] text-slate-700">
                  {subject.name}
                </td>

                <td className="text-center text-[11px] text-slate-700">
                  {subject.held}
                </td>

                <td className="text-center text-[11px] text-slate-700">
                  {subject.attended}
                </td>

                <td className="text-center">
                  <span
                    className={`inline-block min-w-[44px] rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeColor(
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

      {/* Button */}
      <div className="flex justify-center mt-2">
        <button className="flex items-center gap-2 rounded-lg border border-blue-300 px-5 py-1.5 text-[12px] font-medium text-blue-600 transition hover:bg-blue-50">
          <FileText size={14} />
          View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default SubjectAttendance;