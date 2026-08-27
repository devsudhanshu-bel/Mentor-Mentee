import React from "react";

const courses = [
  {
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
    point: 9,
    attendance: 96,
  },
  {
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
    point: 10,
    attendance: 95,
  },
  {
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
    point: 9,
    attendance: 93,
  },
  {
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
    point: 9,
    attendance: 92,
  },
  {
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
    point: 9,
    attendance: 91,
  },
  {
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
    point: 8,
    attendance: 90,
  },
  {
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
    point: 8,
    attendance: 92,
  },
  {
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
    point: 7,
    attendance: 89,
  },
];

const badgeColor = (attendance) => {
  if (attendance >= 95)
    return "bg-green-100 text-green-700";

  if (attendance >= 90)
    return "bg-emerald-100 text-emerald-700";

  return "bg-orange-100 text-orange-600";
};

const AcademicTable = () => {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead className="bg-slate-50">

            <tr className="text-[12px] text-slate-700">

              <th className="p-3 border">#</th>

              <th className="p-3 border">
                Course Code
              </th>

              <th className="p-3 border text-left min-w-[250px]">
                Course Name
              </th>

              <th className="p-3 border">
                Credits
              </th>

              <th className="p-3 border">
                CIA 1
              </th>

              <th className="p-3 border">
                CIA 2
              </th>

              <th className="p-3 border">
                CIA 3
              </th>

              <th className="p-3 border">
                MSE
              </th>

              <th className="p-3 border">
                ESE
              </th>

              <th className="p-3 border">
                Obtained
              </th>

              <th className="p-3 border">
                Max
              </th>

              <th className="p-3 border">
                Grade
              </th>

              <th className="p-3 border">
                Point
              </th>

              <th className="p-3 border">
                Attendance
              </th>

            </tr>

          </thead>

          <tbody>
                        {courses.map((course, index) => (
              <tr
                key={course.code}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {index + 1}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px] font-medium">
                  {course.code}
                </td>

                <td className="border border-slate-200 p-3 text-[12px]">
                  {course.name}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {course.credits}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {course.cia1}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {course.cia2}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {course.cia3}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {course.mse}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {course.ese}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px] font-medium">
                  {course.obtained}
                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px]">
                  {course.max}
                </td>

                <td className="border border-slate-200 p-3 text-center">

                  <span
                    className={`
                      px-2
                      py-1
                      rounded-full
                      text-[11px]
                      font-semibold

                      ${
                        course.grade === "A+"
                          ? "bg-blue-100 text-blue-700"
                          : course.grade === "A"
                          ? "bg-green-100 text-green-700"
                          : course.grade === "A-"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    `}
                  >
                    {course.grade}
                  </span>

                </td>

                <td className="border border-slate-200 p-3 text-center text-[12px] font-semibold">
                  {course.point}
                </td>

                <td className="border border-slate-200 p-3 text-center">

                  <span
                    className={`
                      px-2.5
                      py-1
                      rounded-full
                      text-[11px]
                      font-medium
                      ${badgeColor(course.attendance)}
                    `}
                  >
                    {course.attendance}%
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AcademicTable;