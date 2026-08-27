import React from "react";

const subjects = [
  {
    id: 1,
    code: "AI3501",
    name: "Machine Learning",
    credits: 4,
    cia1: 23,
    cia2: 24,
    cia3: 23,
    mse: 45,
    ese: 78,
    obtained: 193,
    max: 300,
    grade: "A",
    gradePoint: 9,
    attendance: 96,
  },
  {
    id: 2,
    code: "AI3502",
    name: "Deep Learning",
    credits: 4,
    cia1: 24,
    cia2: 23,
    cia3: 24,
    mse: 46,
    ese: 82,
    obtained: 199,
    max: 300,
    grade: "A+",
    gradePoint: 10,
    attendance: 95,
  },
  {
    id: 3,
    code: "AI3503",
    name: "Computer Vision",
    credits: 4,
    cia1: 22,
    cia2: 21,
    cia3: 22,
    mse: 43,
    ese: 76,
    obtained: 184,
    max: 300,
    grade: "A",
    gradePoint: 9,
    attendance: 93,
  },
  {
    id: 4,
    code: "CS3504",
    name: "Database Management Systems",
    credits: 4,
    cia1: 21,
    cia2: 22,
    cia3: 21,
    mse: 42,
    ese: 74,
    obtained: 180,
    max: 300,
    grade: "A",
    gradePoint: 9,
    attendance: 92,
  },
  {
    id: 5,
    code: "CS3505",
    name: "Operating Systems",
    credits: 4,
    cia1: 20,
    cia2: 23,
    cia3: 21,
    mse: 44,
    ese: 71,
    obtained: 179,
    max: 300,
    grade: "A",
    gradePoint: 9,
    attendance: 91,
  },
  {
    id: 6,
    code: "MA3501",
    name: "Optimization Techniques",
    credits: 3,
    cia1: 20,
    cia2: 21,
    cia3: 20,
    mse: 41,
    ese: 69,
    obtained: 171,
    max: 300,
    grade: "A-",
    gradePoint: 8,
    attendance: 90,
  },
  {
    id: 7,
    code: "HS3501",
    name: "Professional Ethics",
    credits: 2,
    cia1: 19,
    cia2: 20,
    cia3: 19,
    mse: 40,
    ese: 68,
    obtained: 166,
    max: 300,
    grade: "A-",
    gradePoint: 8,
    attendance: 92,
  },
  {
    id: 8,
    code: "ME3502",
    name: "Engineering Economics",
    credits: 3,
    cia1: 18,
    cia2: 19,
    cia3: 19,
    mse: 40,
    ese: 67,
    obtained: 163,
    max: 300,
    grade: "B+",
    gradePoint: 7,
    attendance: 89,
  },
];

const SemesterTable = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-[#0B63F6]">
          Semester V Details
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full border-collapse text-[11px] text-slate-700">

          <thead className="bg-white">

            <tr className="text-slate-700">

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-10 font-semibold"
              >
                #
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-24 font-semibold"
              >
                Course Code
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-3 py-2 min-w-[210px] font-semibold"
              >
                Course Name
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-16 font-semibold"
              >
                Credits
              </th>

              <th
                colSpan="3"
                className="border border-slate-200 px-2 py-2 text-center font-semibold"
              >
                CIA Marks
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-14 font-semibold"
              >
                MSE
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-14 font-semibold"
              >
                ESE
              </th>

              <th
                colSpan="2"
                className="border border-slate-200 px-2 py-2 text-center font-semibold"
              >
                Total Marks
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-14 font-semibold"
              >
                Grade
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-16 font-semibold"
              >
                Grade Point
              </th>

              <th
                rowSpan="2"
                className="border border-slate-200 px-2 py-2 w-24 font-semibold"
              >
                Attendance (%)
              </th>

            </tr>

            <tr>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                CIA 1
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                CIA 2
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                CIA 3
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                Obtained
              </th>

              <th className="border border-slate-200 px-2 py-1.5 font-medium">
                Max
              </th>

            </tr>

          </thead>

          <tbody>
                        {subjects.map((subject) => (
              <tr
                key={subject.id}
                className="hover:bg-slate-50 transition-colors duration-150"
              >
                <td className="border border-slate-200 px-2 py-3 text-center font-medium">
                  {subject.id}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center font-semibold text-[#0B3B8F] whitespace-nowrap">
                  {subject.code}
                </td>

                <td className="border border-slate-200 px-3 py-3 whitespace-nowrap">
                  {subject.name}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center font-medium">
                  {subject.credits}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  {subject.cia1}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  {subject.cia2}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  {subject.cia3}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  {subject.mse}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  {subject.ese}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center font-semibold">
                  {subject.obtained}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  {subject.max}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center font-semibold text-[#0B3B8F]">
                  {subject.grade}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  {subject.gradePoint}
                </td>

                <td className="border border-slate-200 px-2 py-3 text-center">
                  <span
                    className={`inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-[10px] font-semibold ${
                      subject.attendance >= 90
                        ? "bg-green-100 text-green-700"
                        : subject.attendance >= 85
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {subject.attendance}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
                  </table>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 px-5 py-3 bg-white">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span>CIA - Continuous Internal Assessment</span>

          <span className="text-slate-300">|</span>

          <span>MSE - Mid Semester Examination</span>

          <span className="text-slate-300">|</span>

          <span>ESE - End Semester Examination</span>
        </div>
      </div>
    </div>
  );
};

export default SemesterTable;