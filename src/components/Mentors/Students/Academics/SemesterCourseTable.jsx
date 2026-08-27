import React from "react";

const courses = [
  {
    code: "CS2411",
    title: "Data Structures",
    category: "Core",
    credits: 4,
    grade: "A+",
    points: "9.2",
    status: "Completed",
  },
  {
    code: "CS2412",
    title: "Database Management Systems",
    category: "Core",
    credits: 4,
    grade: "A",
    points: "8.6",
    status: "Completed",
  },
  {
    code: "CS2413",
    title: "Discrete Mathematics",
    category: "Core",
    credits: 4,
    grade: "A+",
    points: "9.1",
    status: "Completed",
  },
  {
    code: "CS2414",
    title: "Object Oriented Programming",
    category: "Core",
    credits: 4,
    grade: "A",
    points: "8.4",
    status: "Completed",
  },
  {
    code: "CS2415",
    title: "Computer Networks",
    category: "Core",
    credits: 4,
    grade: "B+",
    points: "7.8",
    status: "Completed",
  },
  {
    code: "CS2416",
    title: "Web Technologies Lab",
    category: "Practical",
    credits: 2,
    grade: "A+",
    points: "9.3",
    status: "Completed",
  },
];

const SemesterCourseTable = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Semester IV - Course Details
        </h3>

        <button className="text-[11px] font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-slate-100">
        {/* Header */}
        <div className="grid grid-cols-12 bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-500">
          <div className="col-span-1">Code</div>
          <div className="col-span-3">Course</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1 text-center">Credits</div>
          <div className="col-span-1 text-center">Grade</div>
          <div className="col-span-2 text-center">Grade Point</div>
          <div className="col-span-2 text-center">Status</div>
        </div>

        {/* Rows */}
        {courses.map((course) => (
          <div
            key={course.code}
            className="grid grid-cols-12 items-center border-t border-slate-100 px-3 py-3"
          >
            <div className="col-span-1 text-[10px] font-medium text-blue-600">
              {course.code}
            </div>

            <div className="col-span-3 text-[11px] text-slate-700">
              {course.title}
            </div>

            <div className="col-span-2 text-[11px] text-slate-500">
              {course.category}
            </div>

            <div className="col-span-1 text-center text-[11px]">
              {course.credits}
            </div>

            <div className="col-span-1 text-center font-semibold text-slate-700">
              {course.grade}
            </div>

            <div className="col-span-2 text-center font-semibold text-slate-700">
              {course.points}
            </div>

            <div className="col-span-2 flex justify-center">
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-semibold text-emerald-700">
                {course.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-2 text-[10px] text-slate-500">
        Showing 6 of 6 courses
      </p>
    </div>
  );
};

export default SemesterCourseTable;